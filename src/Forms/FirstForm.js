import React from 'react';

export default class FirstForm extends React.Component{

    render(){
        return (
            <div>
                <label id ="requestHeader" >Create a request</label><br></br>
                <div id="requestSection" >
                    <label id="requestnamelabel" name = "requestor_name" >Requestor name: </label>
                    <input type="text" id="requestnamevalue" name="requestorname" onChange = {(e)=>{this.props.updatehandler({"name": e.target.name,"value": e.target.value})}}/><br/><br/>
                    <label id="requestemailidlabel">Requestor emailID: </label>
                    <input type="text" id="requestemailIdvalue" name="requestoremailId" onChange = {(e)=>{this.props.updatehandler({"name": e.target.name,"value": e.target.value})}}/><br/><br/>
                </div>
                <div id = "approverSection" >
                  <label id="approvernamelabel">Approver name: </label>
                  <input type="text" id="approvernamevalue" name="approvername" onChange = {(e)=>{this.props.updatehandler({"name": e.target.name,"value": e.target.value})}}/><br/><br/>
                  <label id="approveremailidlabel">Approver emailID: </label>
                  <input type="text" id="approveremailidvalue" name = "approveremailId" onChange = {(e)=>{this.props.updatehandler({"name": e.target.name,"value": e.target.value})}}/><br/><br/>
                </div>
                <button onClick = {this.props.clickhandler}>Request</button>
            </div>
        )
    }
}