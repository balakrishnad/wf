import React from 'react';
import { Form } from 'react-formio';
import '../styles/Initial.css'

export default class FormIOTemplate extends React.Component{

    createForm(){
            const formsrc = "https://bczrqfsivlgdiqk.form.io/"+ this.props.formName

            return (<Form src = {formsrc} onSubmit={(e)=>this.props.handler(e.state)} onChange={(e)=>this.props.updatehandler(e.data)}/>)
        
    }

    render(){
        return (
            <div class="Person">
                {this.createForm()}
            </div>
        )
    }
}