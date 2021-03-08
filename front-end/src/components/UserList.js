import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios';

var allUsers = [];

function UserList(props) {
 // let match = useRouteMatch();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  function fetchAllUsers(){
    fetch("http://localhost:5000/all")
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setItems(result);
        allUsers = result;
        console.log("this is items", allUsers)
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }
   
  function deleteUser(id){
    alert(`Are you sure you want to delete ${id}?`)
    axios.delete(`http://localhost:5000/delete/${id}`)
    .then(response => {
      console.log(response)
      fetchAllUsers();
        },
        
    )
  .catch(err=>{
      console.log(err)
  })
  }


  useEffect(() => {
    
        fetchAllUsers()
  }, []) 

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {

    return (

      <div>

        <table class=" table table-light">
          <thead>
            <tr className='head-row'>
              <th scope="col">ID Number </th>
              <th scope="col">User Name </th>
              <th scope="col"> Contact Number</th>
              <th scope="col">Email </th>
              <th scope="col" className='action'> Actions </th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr>
                <td key={item.id}> {item.id} </td>
                <td key={item.username} > {item.username} </td>
                <td key={item.contact_number} >{item.contact_number}</td>
                <td key={item.email} >{item.email}</td>
                <td>
                  <EditModal  data={[item.id, item.username, item.contact_number, item.email, item.password]} />
                  <Button className='delete' onClick={(id)=> deleteUser(item.id)}> Delete </Button> </td>
              </tr>
            ))}

          </tbody>
        </table>

      </div>
    )
  }
}

function EditModal(props) {
  
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    username:props.data[1],
    email:props.data[3],
    contact_number:props.data[2],
    password : props.data[4]
})
   


function handle(e){
  const newdata = {...data}
  newdata[e.target.id] = e.target.value
  setData(newdata)
  console.log(newdata)
}

function editUser(id){
  axios.put(`http://localhost:5000/edit/${id}`,{
            username : data.username,
            email : data.email,
            id : data.id,
            contact_number : data.contact_number,
            password : data.password
  })
  .then(response => {
    console.log(response)
    test()
    
})
.catch(err=>{
    console.log(err)
})
}

  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true);         
  
   

  } 


  return (
    <>
      <Button className='edit' onClick={() => {handleShow()}}>
        Edit
        </Button>
    
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Edit a User </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
          <div>
          <label for="inputName" className="form-label"> Name : </label>
            <input type="name" className="form-control" onChange={(e)=>handle(e)} id="username" value={data.username} /> <br />


            <label for="inputEmail1" className="form-label">Email address :</label>
            <input type="email" className="form-control" onChange={(e)=>handle(e)} id="email" value={data.email}/> <br />

          
            <label for="exampleInputPassword1" className="form-label">Password :</label>
            <input type="password" className="form-control" onChange={(e)=>handle(e)} id="password" value={data.password} /> <br />


            <label for="inputContact" className="form-label">Contact :</label>
            <input type="contact" className="form-control" onChange={(e)=>handle(e)} id="contact_number" value={data.contact_number} /> <br />

          </div>

        </form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
          <Button variant="primary" onClick={(id)=> {editUser(props.data[0]); handleClose()}}>
            Save Changes
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserList