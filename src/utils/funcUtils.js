const Send_Email = () => console.log("Email is sent ")
    
  
const Dont_Send_Email = () => {
      console.log("Do not send email")
    }

const Create_Database = () => {
    console.log("Create a new database")
}

const Dont_Create_Database = () => { 
    console.log("Do not create a database")
}

const FunctionA = () =>{
  console.log("FunctionA is called")
}

const FunctionB = () =>{
  console.log("FunctionB is called")
}

const fetchCurrentRequest = async(requestId) => {

  const response = await fetch('https://bczrqfsivlgdiqk.form.io/requestmetadata/submission/?data.requestId='+requestId)
  
  const myJsonArray = await response.json();

  let listofrequest = []

   for(var json of myJsonArray)
   {
     let request={}
     request.submissionId=json._id
     request.data=json.data
     listofrequest.push(request)
   }

   return listofrequest
}

const fetchCurrentRequestData = async(tableId,requestDataId) => {

  const response = await fetch('https://bczrqfsivlgdiqk.form.io/'+tableId+'/submission/?data.requestDataId='+requestDataId)
  
  const myJsonArray = await response.json();

  let listofrequestdata = []

   for(var json of myJsonArray)
   {
     let requestData={}
     requestData.submissionId=json._id
     requestData.data=json.data
     listofrequestdata.push(requestData)
   }

   return listofrequestdata
}

const fetchCurrentWorkflowData = async(workflowId) => {

  const response = await fetch('https://bczrqfsivlgdiqk.form.io/workflowconfiguration/submission/?data.workflowId='+workflowId);
  
  const myJsonArray = await response.json();

  let listofworkflow = []

  for(var json of myJsonArray)
  {
    listofworkflow.push(json.data)
  }

  return listofworkflow
}


const fetchWorkflowData = async() =>{
  
    const response = await fetch('https://bczrqfsivlgdiqk.form.io/workflowconfiguration/submission/');
  
    const myJsonArray = await response.json();
  
    let listofworkflow = []
  
    for(var json of myJsonArray)
    {
      listofworkflow.push(json.data)
    }

    return listofworkflow
}

const fetchRequestMetaData = async() =>{
  
    const response = await fetch('https://bczrqfsivlgdiqk.form.io/requestmetadata/submission/');
    const myJsonArray = await response.json();
  
    let listofrequest = []
  
    for(var json of myJsonArray){
      let request={}
      request.submissionId=json._id
      request.data=json.data
      listofrequest.push(request)
    }

    return listofrequest
}

const fetchrequestData = async (tableId) => {

    const response = await fetch('https://bczrqfsivlgdiqk.form.io/'+tableId+'/submission/');
    const myJsonArray = await response.json();
  
    let listofrequestdata = []
  
    for(var json of myJsonArray)
    {
      let requestData={}
      requestData.submissionId=json._id
      requestData.data=json.data
      listofrequestdata.push(requestData)
    }

    return listofrequestdata
}

const updateRequest = async(requestMetaData,requestSubmissionData,requestSubmissionId,tableId,requestDataSubmissionId) =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    await fetch('https://bczrqfsivlgdiqk.form.io/requestmetadata/submission/'+requestSubmissionId, {
    method: 'PUT',
    headers:myHeaders,
    redirect: 'follow',
    body: JSON.stringify(requestMetaData),
    }).then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error))


    await fetch ('https://bczrqfsivlgdiqk.form.io/'+tableId+'/submission/'+ requestDataSubmissionId,{
    method: 'PUT',
    headers:myHeaders,
    redirect: 'follow',
    body: JSON.stringify(requestSubmissionData),
    }).then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error))     

}

const postRequest = async(requestMetaData,requestData,tableId) => {
     
    await fetch ('https://bczrqfsivlgdiqk.form.io/requestmetadata/submission/',{
      method:'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers:{
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      
      body:JSON.stringify(requestMetaData)
    });

    await fetch ('https://bczrqfsivlgdiqk.form.io/'+tableId+'/submission/',{
      method:'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers:{
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      
      body:JSON.stringify(requestData)
    });      

}

export {Send_Email,Dont_Send_Email,Create_Database,Dont_Create_Database,fetchWorkflowData,fetchRequestMetaData,fetchrequestData,fetchCurrentRequest,fetchCurrentRequestData,fetchCurrentWorkflowData,updateRequest,postRequest,FunctionA,FunctionB}