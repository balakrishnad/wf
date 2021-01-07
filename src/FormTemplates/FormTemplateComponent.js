import React from 'react';
import * as ConstEnums from '../utils/formenums.js'
import '../styles/Initial.css'

export default class FormTemplate extends React.Component{


    createForm(){
        const form = ConstEnums.formenum[this.props.formName];

        if(form !== undefined)
            return React.createElement(form, {updatehandler : this.props.updatehandler, clickhandler: this.props.handler})
        
    }

    render(){
        return (
            <div class="Person">
                {this.createForm()}
            </div>
        )
    }
}