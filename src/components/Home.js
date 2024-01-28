import React, { useEffect, useState } from 'react';
import { Table, Button, Navbar, Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';


export default function Home() {
    //============== for get request =========================
    const [studata, setstu] = useState();
    useEffect(() => {
        getdata()
    }, []);
    function getdata(){
        fetch('http://localhost:3000/students').then((res) => {
            res.json().then((result) => {
                console.log(result)
                setstu(result)
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    //=============== for navigate from home page to edit page  =================
    const navigate = useNavigate()
    const editdata = (id) => {
        navigate('/edituser/' + id)
    }


    //============== for delete request =========================

    function deleteuser(id) {
        fetch(`http://localhost:3000/students/${id}`, {
            method: 'DELETE'
        }).then((res) => {
            res.json().then((result) => {
                console.log(result)
                getdata()
            })
        })
    }

    return (
        <div className='container'>
            <div className='row'>
                <div>
                    <Container>
                        <Navbar expand="lg" className="bg-body-tertiary d-flex justify-content-between">
                            <h2 className='ms-3'>Curd App</h2>
                            <NavLink to='/adduser'>
                                <Button className='me-4'>Add User</Button>
                            </NavLink>
                        </Navbar>
                    </Container>
                    <div className='card'>
                        <div className='card-body'>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <td>ID</td>
                                        <td>First Name</td>
                                        <td>Last Name</td>
                                        <td>Age</td>
                                        <td>Number</td>
                                        <td>Action</td>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        studata && studata.map((item, i) => {
                                            return <tr key={i}>
                                                <td>{item.id}</td>
                                                <td>{item.fname}</td>
                                                <td>{item.lname}</td>
                                                <td>{item.age}</td>
                                                <td>{item.number}</td>
                                                <td>
                                                    <button className='btn btn-primary' onClick={() => editdata(item.id)}>Edit</button>
                                                    <button className='btn btn-danger ms-3' onClick={() => deleteuser(item.id)}>Delete</button>

                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
