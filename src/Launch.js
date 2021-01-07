import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Initial from './Pages/Initial'
import MainForm from './Pages/MainForm';

export default function Launch() {

    return (
      <div className="App">
        <div >
          <Switch>
            <Route exact path="/">
                <Initial />
            </Route>
            
            <Route path={`/mainform/:workflowId/:requestId?`} 
              render={(props) =>  <MainForm {...props} />} />
          </Switch>
        </div>
      </div>
    );
}