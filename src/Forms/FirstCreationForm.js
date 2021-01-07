import React from 'react';

export default class FirstCreationForm extends React.Component{

    render(){
        return (
            <div>
                <label id ="databasecreatorheader" >Design a database and request</label><br></br>
                <div id="databasecreationSection" >
                    <label id="requestnamelabel" name = "database_location" >Database Location: </label>
                    <input type="text" id="databaselocationvalue" name="databaselocation" onChange = {(e)=>{this.props.updatehandler({"name": e.target.name,"value": e.target.value})}}/><br/><br/>
                    <label id="databasecreatorlabel">Database creator: </label>
                    <input type="text" id="databasecreatornamevalue" name="databasecreatornamevalue" onChange = {(e)=>{this.props.updatehandler({"name": e.target.name,"value": e.target.value})}}/><br/><br/>
                </div>
                <div id = "databaseapproverSection" >
                  <label id="databaseapprovernamelabel">Database Approver name: </label>
                  <input type="text" id="databaseapprovernamevalue" name="databaseapprovername" onChange = {(e)=>{this.props.updatehandler({"name": e.target.name,"value": e.target.value})}}/><br/><br/>
                  <label id="databaseapproveremailidlabel">Database Approver emailID: </label>
                  <input type="text" id="databaseapproveremailidvalue" name = "databaseapproveremailId" onChange = {(e)=>{this.props.updatehandler({"name": e.target.name,"value": e.target.value})}}/><br/><br/>
                </div>
                <button name="Request" onClick = {(e)=>this.props.clickhandler(e.target.name)}>Request</button>
            </div>
        )
    }
}