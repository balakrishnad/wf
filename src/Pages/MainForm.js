import React from 'react';
import FormTemplate from '../FormTemplates/FormTemplateComponent.js'
import FormIOTemplate from '../FormTemplates/FormIOTemplateComponent.js'
import * as Utils from '../utils/funcUtils.js'
import history from '../utils/history';
import jsonLogic from '../utils/logic'

export default class MainForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            request:{},
            workflow:{},
            requestData:{},
            workflowLaunch:false,
            formIO:false,
            formName:"",
            currentState:"",
            requestdatasubmissionId:""
          }
        
        this.updateRequest = this.updateRequest.bind(this)
        this.updatedData =this.updatedData.bind(this)
        this.createData = this.createData.bind(this)
        this.ExecuteRequest=this.ExecuteRequest.bind(this)
    }

    updatedData = async(requestData,targetState) => {
    
        const requestMetaData = {"data": {"requestId":this.state.request.data.requestId,"title": this.state.request.data.title,"workflowId":this.state.request.data.workflowId,"currentState":targetState,"requestDataId":this.state.request.data.requestDataId,
                                        "createdDate":this.state.request.data.createdDate,"createdBy":this.state.request.data.createdBy,"updateddate":Date.now().toString(),"updatedby":"Maharshi"}}
    
    
        const requestSubmissionData = {"data": {...requestData}}
    
        await Utils.updateRequest(requestMetaData,requestSubmissionData,this.state.request.submissionId,this.state.workflow.tableId,this.state.requestdatasubmissionId)

        history.goBack()
    
    }

    createData = async(requestData,targetState) =>{
    
        const requestId = Math.random().toString(36).substr(2, 9)
        const requestTitle = "requestName_"+requestId
        const requestDataId = Math.random().toString(36).substr(2, 9)
    
        const requestMetaData = {"data": {"requestId":requestId,"title": requestTitle,"workflowId":this.state.workflow.workflowId,"currentState":targetState,"requestDataId":requestDataId,"createdDate":Date.now().toString(),"createdBy":"Maharshi"}}
    
        const requestSubmissionData = {"data": {"requestDataId":requestDataId,...requestData}}
    
        await Utils.postRequest(requestMetaData,requestSubmissionData,this.state.workflow.tableId)

        history.goBack()
    }

    DisplayRequestForm = async(workflowId,requestId) => {

        let [request] = await Utils.fetchCurrentRequest(requestId);

        this.setState((prevState)=> { 
            return {request:{ 
                     ...request}}
         })

        let [workflow] = await Utils.fetchCurrentWorkflowData(workflowId);

        this.setState((prevState)=> { 
            return {workflow:{
                     ...workflow}}
         })
    
        let [requestData] = await Utils.fetchCurrentRequestData(workflow.tableId,request.data.requestDataId);

        this.setState((prevState)=> { 
            return {requestData:{
                     ...requestData.data}}
         })

        this.setState((prevState)=>{
            return{
                requestdatasubmissionId:requestData.submissionId
            }
        })

        this.LaunchFormByRequest(this.state.request.data,this.state.workflow)
    
    };

    DisplayWorkflowForm = async(workflowId) => {

        let [workflow] = await Utils.fetchCurrentWorkflowData(workflowId);

        this.setState((prevState)=> { 
            return {workflow:{ 
                     ...workflow}}
         })

        this.LaunchFormByWorkflow(this.state.workflow)
    
    };

    
    //Initial loading fetch workflow and request data based on url parameters

    componentDidMount() {

         if(this.props.match.params.requestId === undefined){
               this.DisplayWorkflowForm(this.props.match.params.workflowId);
               this.setState((prevState)=> { 
                return {workflowLaunch:true}
             })
         }
         else{
            this.DisplayRequestForm(this.props.match.params.workflowId,this.props.match.params.requestId)
            this.setState((prevState)=> { 
                return {workflowLaunch:false}
             })
         }
    }

    //Execute transition and launch actions

    ExecuteActions(actions){

        for(var index in actions){

        switch(actions[index]){
            case "SENDEMAIL":
             Utils.Send_Email();
             break;
            case "DONOTSENDEMAIL":
             Utils.Dont_Send_Email();
             break;
            case "CEATEDATABASE":
              Utils.Create_Database();
              break;
            case "DONOTCREATEDATABASE":
               Utils.Dont_Create_Database();
               break;
            case "FunctionA":
               Utils.FunctionA();
               break;
            case "FunctionB":
               Utils.FunctionB();
               break;
            default:
              console.log("Action is not defined")
        }
        }
    }  

    //Execute workflow request triggered from the form

    ExecuteRequest(actionType){

        try{

            const conditiondata = require('../Data/'+this.state.workflow.workflowDataFile+'.json');
        
            let state = conditiondata.states[this.state.currentState]

            let transitionaction = state?.on[actionType]

            if(transitionaction !== undefined)
            {
               //transitionaction.forEach(ExecuteConditions)
               try{
                //filter the array if there is a break default should not execute
                let flagCondition = false;
                for(var conditionaction of transitionaction){
                    let condition = conditionaction["cond"]
                    if(condition !== undefined){
                        if(jsonLogic.apply(condition,this.state.requestData)){
                            let actions = conditionaction.actions
                            let targetState = conditionaction.target
                            let targetstatedata = conditiondata.states[targetState]
                            if(targetstatedata !== undefined){
                                this.setState({currentState:targetState})
                                this.ExecuteActions(actions)
                                this.setState((prevState)=> { 
                                    return {requestData:{...prevState.requestData,...conditionaction.Data}}
                                },this.updateRequest)
            
                            }
                            else{
                                console.log("Target state is not defined")
                            }
                            flagCondition=true;
                            break
                        }
                      }
                   }
                if(!flagCondition){
                    for(var nonconditionaction of transitionaction){
                            let condition = nonconditionaction["cond"]
                            if(condition === undefined){
                            let actions = nonconditionaction.actions
                            let targetState = nonconditionaction.target
                            let targetstatedata = conditiondata.states[targetState]
                            if(targetstatedata !== undefined){
                                this.setState({currentState:targetState})
                                this.ExecuteActions(actions)
                                this.setState((prevState)=> { 
                                    return {requestData:{...prevState.requestData,...nonconditionaction.Data}}
                                },this.updateRequest)
            
                            }
                            else{
                                console.log("Target state is not defined")
                                }
                            break
                        }
                    }
                }

            }
            catch(e)
            {
                console.log("Logic exception")
            }
        }
        else{
            console.log("Action is not defined")
        }
        }
        catch(e){
            console.log("workflow file not found")
        }
    
    }

    //function triggered when the targetstate is updated

    updateRequest = () =>{

        const condition = require('../Data/'+this.state.workflow.workflowDataFile+'.json');

        let state = condition.states[this.state.currentState]

        if(state.invoke !== undefined){
            this.ExecuteActions([state.invoke])
        }

        if(this.state.workflowLaunch){
            this.createData(this.state.requestData,this.state.currentState)
        }
        else{
            this.updatedData(this.state.requestData,this.state.currentState)
        }
    }

    
    //Launch form based on workflow

    LaunchFormByWorkflow(workflowData){

        try{

            const condition = require('../Data/'+workflowData.workflowDataFile+'.json');

            if(workflowData.workflowversion === condition.version){
                let formstate = condition.states[condition.initial]

                if(formstate !== undefined){
                    if(formstate.form.formio !== undefined){
                        this.setState(({formIO:true}))
                        this.setState({formName: formstate.form.formio })
                    }
                    else{
                        this.setState(({formIO:false}))
                        this.setState({formName: formstate.form })
                    }
                    this.setState({currentState:condition.initial})
                    this.setState((prevState)=>({requestData:{...prevState.requestData,...condition.initialData}}))
                }
                else{
                    console.log("request state is not defined");
                }
            }
            else{
                console.log("version mismatch")
            }
        }
        catch(e){
            console.log(e)
        }
    }

    //Launch form based on requestData
    LaunchFormByRequest(request,workflowData){
       try{
            const condition = require('../Data/'+workflowData.workflowDataFile+'.json');

            if(workflowData.workflowversion === condition.version){
                let formstate = condition.states[request.currentState]

                if(formstate !== undefined){
                    if(formstate.form.formio !== undefined){
                        this.setState(({formIO:true}))
                        this.setState({formName: formstate.form.formio })
                    }
                    else{
                        this.setState(({formIO:false}))
                        this.setState({formName: formstate.form })
                    }
                    this.setState({currentState:request.currentState})
                }
                else{
                    console.log("request state is not defined");
                }
            }
            else{
                console.log("version mismatch")
            }
       }
        catch(e){
            console.log(" workflow file not found")
        }
    }

    UpdateInputParameterFormIO= (updatedInput) => {

        this.setState((prevState)=> { 
            return {requestData:{ 
                    ...prevState.requestData,
                    ...updatedInput}}  
        })
     }

    UpdateInputParameter= (updatedInput) => {

        this.setState((prevState)=> { 
           return {requestData:{
                    ...prevState.requestData, 
                    [updatedInput.name]:updatedInput.value}}
        })

     }

    DisplayFormTemplate = () =>{
        if(this.state.formIO){
            return <FormIOTemplate formName={this.state.formName} request= {this.props.request} handler={this.ExecuteRequest} updatehandler ={this.UpdateInputParameterFormIO}/>
        }
        else{
            return <FormTemplate formName={this.state.formName} request= {this.props.request} handler={(e)=>this.ExecuteRequest(e)} updatehandler ={this.UpdateInputParameter}/>
        }
    }

    render(){
        return (
            <div>
                {this.DisplayFormTemplate()}
            </div>
          );
    }
}