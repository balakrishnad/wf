import React from 'react';

export default class ThirdForm extends React.Component{

    render(){
        return (
            <div>
            <label id ="finalizeHeader" >Finalize a request</label>
                <div id="finalizerSection">
                    <label id="finalizernamevaluelabel" >Finalizer name: </label>
                    <input type="text" id="finalizernamevalue" name="finalizername" onChange = {(e)=>{this.props.updatehandler({"name": e.target.name,"value": e.target.value})}}/><br /><br />
                    <label id="finalizeremailidlabel" >Finalizer emailID: </label>
                    <input type="text" id="finalizeremailidvalue" name="finalizeremailId" onChange = {(e)=>{this.props.updatehandler({"name": e.target.name,"value": e.target.value})}}/><br /><br />
                </div>
                <button id="finalizeRequest" onClick = {this.props.clickhandler}>Finalize</button>
            </div>
        )
    }
}