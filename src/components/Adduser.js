import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { Button } from "react-bootstrap";
function Adduser() {
    const [fname, SetFname] = useState('');
    const [lname, SetLname] = useState('');
    const [age, SetAge] = useState('');
    const [number, SetNumber] = useState('');

    const navigate=useNavigate()

    function Savedata(e) {
        //================ for post request ====================
        let data={fname,lname,age,number}
        e.preventDefault();
            fetch('http://localhost:3000/students',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-type':'application/json'
                },
                body:JSON.stringify(data)
            }).then((res)=>{
                res.json().then((result)=>{
                   console.log(result);
                   navigate("/")
               })
           }).catch((err)=>{
               console.log(err)
           })
    }
    return (
        <div className="container">
            <h1 className=" text-center">Add User</h1>
            <form className="mt-5" onSubmit={Savedata}>
                <div className="d-flex justify-content-between mx-5">
                    <input placeholder="Enter First Name" value={fname} onChange={(e) => SetFname(e.target.value)} />
                    <input className="ms-3" placeholder="Enter Last Name" value={lname} onChange={(e) => SetLname(e.target.value)} />
                </div>
                <div className="d-flex justify-content-between mt-3 mx-5">
                    <input placeholder="Enter Age" value={age} onChange={(e) => SetAge(e.target.value)} />
                    <input className="ms-3" placeholder="Enter Number" value={number} onChange={(e) => SetNumber(e.target.value)} />
                </div>
               <div className="mt-3">
               <Button className="ms-5" type="submit">Submit</Button>
               </div>


            </form>
        </div>
    )
}

export default Adduser