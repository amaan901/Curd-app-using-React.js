import { useState, useEffect } from "react";
import {  useParams ,useNavigate} from 'react-router-dom'
import { Button } from "react-bootstrap";

export default function Edituser() {

    const [fname, SetFname] = useState('');
    const [lname, SetLname] = useState('');
    const [age, SetAge] = useState('');
    const [number, SetNumber] = useState('');

    const {userid}=useParams();
    useEffect(() => {
        fetch('http://localhost:3000/students/' + userid).then((res) => {
            res.json().then((result) => {
               SetFname(result.fname);
               SetLname(result.lname);
               SetAge(result.age);
               SetNumber(result.number)
            })
        }).catch((err) => {
            console.log(err)
        })
    }, []);


    const navigate=useNavigate();
    function Savedata(e) {
        e.preventDefault();
            let data={fname,lname,age,number}
            e.preventDefault();
                fetch('http://localhost:3000/students/'+userid,{
                    method:'PUT',
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

    //============== for navigate to home page ====================================

    function cancle(){
        navigate('/')
    }

    return (
        <div className="container">
            <h1 className=" text-center">Edit User</h1>
            <form className="mt-5" onSubmit={Savedata}>
                <div className="d-flex justify-content-between mx-5">
                  <div className="w-100">
                    <label className="ps-1">Enter First Name</label>
                  <input placeholder="Enter First Name" value={fname} onChange={(e) => SetFname(e.target.value)} />
                  </div>
                   <div className="w-100">
                    <label className="ps-3">Enter Last Name</label>
                   <input className="ms-3" placeholder="Enter Last Name" value={lname} onChange={(e) => SetLname(e.target.value)} />
                   </div>
                </div>
                <div className="d-flex justify-content-between mt-3 mx-5">
                    <div className="w-100">
                    <label className="ps-1">Enter Age</label><br/>
                    <input placeholder="Enter Age" value={age} onChange={(e) => SetAge(e.target.value)} />
                    </div>
            
                   <div className="w-100">
                    <label className="ps-3">Enter Number</label>
                   <input className="ms-3" placeholder="Enter Number" value={number} onChange={(e) => SetNumber(e.target.value)} />
                   </div>
                </div>
               <div className="mt-3">
               <Button className="ms-5" variant="success" onClick={()=>cancle()}>Cancel</Button>
               <Button className="ms-2" type="submit">Submit</Button>
               </div>


            </form>
        </div>
    )

}
