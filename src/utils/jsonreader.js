const fileSelectorbutton = document.getElementById('json-selector');

const filepath = document.getElementById('filepath');

let currentState= "";
let initialState = "";
let finalState = "";
let workflowObject=new Object();

fileSelectorbutton.addEventListener("click", (event) => {ReadWorkflowdata();readJSON(filepath.value);});

function readJSON(path) { 
    const json= '{ "name":"John", "age":30, "city":"New York"}';

    const fs = require('fs');
    fs.writeFile('workflowdata2.json', json, 'utf8', callback); 

    // var xhr = new XMLHttpRequest(); 
    // console.log('Path is '+path);
    // xhr.open('GET', path, true); 
    // xhr.responseType = 'blob'; 
    // xhr.onload = function(e) {  
    //   if (this.status == 200) { 
    //       var file = new File([this.response], 'temp'); 
    //       var fileReader = new FileReader(); 
    //       fileReader.addEventListener('load', function(){ 
    //            //do stuff with fileReader.result 
    //            const jsonResult= fileReader.result;
    //            var obj = JSON.parse(jsonResult);
    //            ReadJsonObject(obj);
    //       }); 
    //       fileReader.readAsText(file); 
    //   }  
    // } 
    // xhr.send(); 
} 

function ReadWorkflowdata(){
    //readJSON('worflowdata.json');
}

function ReadJsonObject(obj){
    if (typeof obj.WorkflowData === 'undefined') {
        if(obj.States.indexOf(currentState)!=-1)
        {
            //states are updated
            PerformActions(obj);
        }
        else
        {
            //we are in the first state
            initialState = obj.InitialState;
            currentState = obj.IntialState;
            finalState = obj.FinalState;
            PerformActions(obj);
        }
        console.log(obj)
      }
    else{

        //execute for workflowdata
        currentState = obj.WorkflowData.CurrentState;
        initialState = obj.WorkflowData.InitialState;
        finalState = obj.WorkflowData.FinalState;

        workflowObject= obj;
        
    }
    // for(var index in obj.steps)
    // {
    //     console.log(obj.steps[index]);
    // }

    
    // let CurrentStateObj = 
    // {
    //     CurrentState:obj.steps[0].ID,
    //     Steptype: obj.steps[0].steptype,
    //     Description: obj.steps[0].description,
    //     Inputs:obj.steps[0].Inputs,
    //     NextStepId: obj.steps[0].NextStepId
    // };
    // PerformActions(CurrentStateObj);

    //debugger;
}

function PerformActions(obj){
    for(var state in obj.states){
        if(obj.state.Name==currentState){
            ExecuteAction(obj.state.action)
            SaveTransition(obj.state.target)
        }
    }
    //if(obj.CurrentState === "Complete"){
      //  return;
    //}
    //debugger;
    //let status = "approved";
    //UpdateState(obj,status);
}

function ExecuteAction(action){
    switch(action){
        case sendEmail:
            sendEmail(action.InputParameters)
        case saveData:
            saveData(action.InputParameters)
    }

}

function sendEmail(InputParameters){

}

function saveData(InputParameters){


}
function SaveTransition(target){
    currentstate=target;
    UpdateCurrentStateinJson(currentState)

}

function UpdateCurrentStateinJson(currentState)
{
    workflowObject.WorkflowData.CurrentState=currentState;
    var json = Json.stringify(workflowObject);
    const fs = require('fs');
    fs.writeFile('workflowdata2.json', json, 'utf8', callback);
}

function SendEmail(obj,status){
    Email.send({
        Host : "smtp.office365.com",
        Username : username,
        Password : password,
        To : 'Vedantam.Chaitanya@pepsico.com',
        From : "maharshi.choudhury@pepsico.com",
        Subject : "This is the subject",
        Body : "And this is the body"
    }).then(
    message => alert(message)
    );
}