import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import HomeTable from '../Components/HomeTable'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../Components/LoadingSpinner'
import {deleteContext, editContext, registerContext } from '../Components/ContextShare'
import { getusersapi, removeUser } from '../services/allApis'






function Home() {
// get editContext using useContext
const {editdata,seteditdata} = useContext(editContext)

    // get deleteContext using useContext
    const {deleteData,setdeleteData} = useContext(deleteContext)

    // state to hold the name of employees
    const [searchKey,setsearchKey] = useState("")
    // console.log(searchKey);
    
    // state to hold all users
    const [ allusers,setallusers] = useState([])

    // define delete user
    const deleteUser = async (id) =>{
        console.log('Inside delete function: '+id);
        // make api call to services
        const res =await removeUser(id)
        console.log(res);
        if(res.status===200){

            // data successfully removed
            // pass response data to context
            setdeleteData(res.data)
            // call getuser api
            getusersDetails()
        }
        else{
            console.log("Error");
        }
    }

    // define a function to call getallusers api
    const getusersDetails = async ()=>{
        const serverResponse = await getusersapi(searchKey)
        // console.log(serverResponse);
        setallusers(serverResponse.data)

    }
    // console.log(allusers);
    // get register context using useContext
    const {registerData,setregisterData} = useContext(registerContext)


    // create state to display spinner
    const [showSpin, setshowSpin] = useState(true)

    //navigate to another page-useNavigate
    const navigate = useNavigate()

    // to redirect to register page when add btn clicked
    const addUser = () => {
        // navigate to register
        navigate('/register')
    };


useEffect(()=>{

// call getusersapi
getusersDetails()
// set showspin as false after 2 sec
    setTimeout(()=>{
        setshowSpin(false)
    },2000)
},[searchKey])

    return (
       <>
       {
        registerData?<Alert className='bg-success' variant="success" onClose={()=>setregisterData("")} dismissible>{registerData.fname.toUpperCase()} Successfully Registered...</Alert> :""
       }

       {
         
            editdata?<Alert className='bg-success' variant="success" onClose={()=>seteditdata("")} dismissible>{editdata.fname.toUpperCase()} Successfully Updated.....</Alert> :""
           
       }

     {
        deleteData?<Alert className='bg-danger' variant="danger" onClose={()=>setdeleteData("")} dismissible>{deleteData.fname.toUpperCase()} Successfully Deleted!!!</Alert> :""
       }

            <div className='container mt-5'>
                <div className="first_div">
                    {/* search, add button */}
    
                    <div className="search_add d-flex justify-content-between">
                        {/* search */}
                        <div className="search col-md-4">
                            <Form className='d-flex'>
                                <Form.Control required type="text" placeholder='Search employee name Here' onChange={e=>setsearchKey(e.target.value)} />
                                <Button className='ms-2' variant="success">Search</Button>
                            </Form>
                        </div>
                        {/* add btn */}
                        <div className="add">
                            <button onClick={addUser} className='btn btn-info'><i className="fa-solid fa-user-plus fa-fade me-2"></i>Add</button>
                        </div>
                    </div>
                </div>
                <div className="second_div mt-3 mb-3">
    
    
                    {
                        showSpin ?
                            <div>
                                <LoadingSpinner />
                            </div> :
    
                            <div>
                                <h2>List Of Employees</h2>
                                {/* table */}
                                <HomeTable displayData={allusers} handleDelete = {deleteUser} />
                                
                            </div>
                    }
                
                </div>
            </div>
       </>
    );
}

export default Home