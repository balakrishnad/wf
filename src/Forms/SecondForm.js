import React from 'react';

export default class SecondForm extends React.Component{

    render(){
        return (
            <div>
                <label id ="approveHeader" >Approve a request</label>
                <div id="approverSection" >
                    <label id="approvernamelabel">Approver name: </label>
                    <input type="text" id="approvernamevalue" name="approvername" onChange = {(e)=>{this.props.updatehandler({"name": e.target.name,"value": e.target.value})}}/><br /><br />
                    <label id="approveremailidlabel">Approver emailID: </label>
                    <input type="text" id="approveremailidvalue" name="approveremailId" onChange = {(e)=>{this.props.updatehandler({"name": e.target.name,"value": e.target.value})}}/><br /><br />
                </div>
                <div id="finalizerSection">
                    <label id="finalizernamevaluelabel" >Finalizer name: </label>
                    <input type="text" id="finalizernamevalue" name="finalizername" onChange = {(e)=>{this.props.updatehandler({"name": e.target.name,"value": e.target.value})}}/><br /><br />
                    <label id="finalizeremailidlabel" >Finalizer emailID: </label>
                    <input type="text" id="finalizeremailidvalue" name="finalizeremailId" onChange = {(e)=>{this.props.updatehandler({"name": e.target.name,"value": e.target.value})}}/><br /><br />
                </div>
                <button onClick = {this.props.clickhandler}>Approve</button>
            </div>
        )
    }
}