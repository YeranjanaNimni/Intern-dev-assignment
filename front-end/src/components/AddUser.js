import React,{useState} from 'react'
import axios from 'axios'

function AddUser() {

  const [data, setData] = useState({
      username:"",
       email:"",
      id : "",
      password : "",
      contact_number:""
  })
  
 function handle(e){
    const newdata = {...data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
 }

 function submit(e){
        
          axios.post('http://localhost:5000/addUser', {
            username : data.username,
            email : data.email,
            id : data.id,
            contact_number : data.contact_number,
            password : data.password

          })
            .then(response => {
                console.log(response)
            })
            .catch(err=>{
                console.log(err)
            })
        
      }
        return (
            <div>
                <div  className='addUserBackground'> 
                <form>
                        <div className='form'>

                        <label className="form-label"> Id : </label>
                        <input type="text" className="form-control"  onChange={(e)=>handle(e)} id="id" value={data.id}/> <br />

                        <label className="form-label"> Name : </label>
                        <input type="name" className="form-control"  onChange={(e)=>handle(e)} id="username" value={data.username} /> <br />


                        <label className="form-label">Email address :</label>
                        <input type="email" className="form-control"  onChange={(e)=>handle(e)} id="email" value={data.email} /> <br />
                    
                    
                        <label className="form-label">Password :</label>
                        <input type="password" className="form-control"  onChange={(e)=>handle(e)} id="password" value={data.password} /> <br />
                    
                   
                    
                        <label className="form-label">Contact :</label>
                        <input type="contact" className="form-control"  onChange={(e)=>handle(e)} id="contact_number" value={data.contact_number}/> <br />
                    
                        <input type="button" value="Submit" id="btnsubmit" onClick={(e)=> submit(e)} />
                        

                        </div>
                    
                </form>
                </div>
            </div>
        )
    }


export default AddUser