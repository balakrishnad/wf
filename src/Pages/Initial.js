import React, { useEffect, useState } from 'react';
import * as Utils from '../utils/funcUtils.js'
import { useHistory } from "react-router-dom";
import '../styles/Initial.css'
import '../styles/Card.css'

export default function Initial (){

  const history = useHistory();

  let[listofworkflow,setlistofWorkflow]=useState([])
  let[listofrequest,setlistofRequest]=useState([])

  const workflowListheader = 'List of workflows displayed';
  const requestListheader = 'List of requests displayed';

useEffect(() => {
  Utils.fetchWorkflowData()
    .then(listofworkflow => {
        setlistofWorkflow(listofworkflow)
    })
},[])

useEffect(() => {
  Utils.fetchRequestMetaData()
    .then(listofrequest => {
        setlistofRequest(listofrequest)
    })
},[])


const DisplayWorkflowForm = (workflowId) => {

  history.push(`/mainform/${workflowId}`)

};

const DisplayRequestForm = async(requestId) => {

  // let listofrequest = await Utils.fetchRequestMetaData()

  // let request = listofrequest.find(x=>x.data.requestId === requestId)

  let [request] = await Utils.fetchCurrentRequest(requestId);

  history.push(`/mainform/${request.data.workflowId}/${requestId}`)

};

  return (
    <div className = "Person">
      <div className = "Person">
        <h1>{workflowListheader}</h1>
        <div id ="resp-table-body" >
            {listofworkflow.length>0?<div id="resp-table-header">
              <div className="table-body-cell"> workflowname</div>
              <div className="table-body-cell"> workflowversion </div>
              <div className="table-body-cell"> workflowDataFile </div>
              <div className="table-body-cell"> tableId</div>
              <div className="table-body-cell"> LaunchAction</div>
            </div>:<p></p>}
          { listofworkflow.map(function(item) {
            return (
              <div className="resp-table-row">
                <div className="table-body-cell"> {item.workflowname} </div>
                <div className="table-body-cell"> {item.workflowversion} </div>
                <div className="table-body-cell"> {item.workflowDataFile}</div>
                <div className="table-body-cell"> {item.tableId}</div>
                <div className="table-body-cell">
                  <button key = {item.workflowId} onClick = {()=> DisplayWorkflowForm(item.workflowId)}>Launch Forms</button><br/><br/>
                </div>
            </div>);
          })}
        </div>
        <ul>
        </ul>
      </div>
      <h1>{requestListheader}</h1>
          <div>
          {listofrequest.map((item,index) => {
            return (
              <div className = "flex-container">
                <div className="individual-card" key={`card-${index}`}>
                     <div className="card">
                         <div className="card-header">
                             <p className="dueDate col-md-20 bold"> createdDate : {(new Date(item.data.createdDate*1)).toLocaleString()}</p>
                         </div>
                         <div className="card-body">
                             <p className="productName col-md-12 bold">{item.data.title}</p>
                             <p className="stage col-md-20 bold">State : <span>{item.data.currentState}</span></p>
                             <div className="btnGroup">
                               <button key = {item.data.requestId} onClick = {()=> DisplayRequestForm(item.data.requestId)}>Launch Forms</button><br/><br/>
                             </div>
                         </div>
                     </div>
                </div> 
              </div>
            )
          })}
        </div>
    </div>
  )
}