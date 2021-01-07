import React from 'react';

export default class SecondCreationForm extends React.Component{

    render(){
        return (
            <div>
                <label id ="databaseapproverheader" >Approve database request</label><br></br>
                <div id = "databaseapproverSection" >
                  <label id="databaseapprovernamelabel">Database Approver name: </label>
                  <input type="text" id="databaseapprovernamevalue" name="databaseapprovername" onChange = {(e)=>{this.props.updatehandler({"name": e.target.name,"value": e.target.value})}}/><br/><br/>
                  <label id="databaseapproveremailidlabel">Database Approver emailID: </label>
                  <input type="text" id="databaseapproveremailidvalue" name = "databaseapproveremailId" onChange = {(e)=>{this.props.updatehandler({"name": e.target.name,"value": e.target.value})}}/><br/><br/>
                </div>
                <button name="Approve" onClick = {(e)=>this.props.clickhandler(e.target.name)}>Approve</button>
                <button name="Reject" onClick = {(e)=>this.props.clickhandler(e.target.name)}>Reject</button>
            </div>
        )
    }
}