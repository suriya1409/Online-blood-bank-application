
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardText, CardTitle, Button, Row, Col, CardBody, Form, FormGroup, Label, Input, FormText, } from "reactstrap";
import axios from 'axios';
import { toast } from "react-hot-toast";
import Swal from 'sweetalert2';
import Header from '../layouts/Header';
import logo from '../assets/images/bb.png'


const Donar = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        contact: '',
        location: '',
        available: '',
        group: '',
        area: '',
        amount: ''
    })
    console.log(data);

    const [uniqueMessage, setUniqueMessage] = useState('');
    const navigate = useNavigate();

    const addEmp = async () => {
        const { name, email, contact, location, available, group, area, amount } = data;
        console.log(name,"vv");
        if (!name || !email || !contact || !location || !available || !group || !area || !amount ) {
            toast.error("Kindly enter all the fields");
        } else {
            try {
                const res = await axios.post('/addDonar', {
                    name, email, contact, location, available, group, area, amount
                })
                toast.success("Donar Added");
                Swal.fire({
                    icon: "success",
                    title: "Donar Added",
                    imageUrl: logo,
                    imageWidth: 200,
                    imageHeight: 200, 
                    text: "Donar has been added in Database !"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  });
            } catch (error) {
                console.log(error);
            }
        }
    }
    console.log(data);
return (
    <>
        <Row>
            <Col >
                <Card className="rounded-4 mt-4">
                    <CardTitle tag="h5" style={{ fontFamily: 'Poppins', fontWeight: 600 }} className="border-bottom p-3 mb-0">
                        Add Donar
                    </CardTitle>
                    <CardBody className="m-1 ">
                        <Form>
                            <FormGroup>
                                <Label for="name" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Enter Name"
                                    type="text"
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    type="text"
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="conatact" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Contact</Label>
                                <Input
                                    id="conatact"
                                    name="conatact"
                                    placeholder="Enter Contact Number"
                                    type="text"
                                    onChange={(e) => setData({ ...data, contact: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Location</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Enter Location"
                                    type="text"
                                    onChange={(e) => setData({ ...data, location: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Available</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Enter Available Quatity"
                                    type="text"
                                    onChange={(e) => setData({ ...data, available: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Group</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Enter Blood Group"
                                    type="text"
                                    onChange={(e) => setData({ ...data, group: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="salary" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Area</Label>
                                <Input
                                    id="salary"
                                    name="salary"
                                    placeholder="Enter Area"
                                    type="text"
                                    onChange={(e) => setData({ ...data, area: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="salary" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Amount</Label>
                                <Input
                                    id="salary"
                                    name="salary"
                                    placeholder="Enter Amount"
                                    type="text"
                                    onChange={(e) => setData({ ...data, amount: e.target.value })}
                                />
                            </FormGroup>
                            <Button color="primary" onClick={addEmp}>Submit</Button>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </>
);

}

export default Donar;
