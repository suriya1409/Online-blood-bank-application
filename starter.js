import React, { useEffect, useState } from "react";
import './App.css'
import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from 'sweetalert2';
import { Card, CardText, CardTitle, Button, Table, Row, Col, CardBody, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import video from '../assets/video/blood.mp4';
import { Widget, addResponseMessage } from 'react-chat-widget';
import logo from '../assets/images/bb.png'
import 'react-chat-widget/lib/styles.css';

const Starter = () => {
  const [totalEmp, setTotalEmp] = useState('');
  const [area, setArea] = useState('');
  const [amount, setAmount] = useState('');
  const [data, setData] = useState([]);
  const [morning, setMoring] = useState();
  const [evening, setEvening] = useState();
  const [userData, setUserData] = useState(null);
  const [userNameCollected, setUserNameCollected] = useState(false);
  const [bloodGroup, setBloodGroup] = useState(''); // Added bloodGroup state
  const [modal, setModal] = useState(false); // State for modal visibility
  const [units, setUnits] = useState(1); // State for blood units
  const [selectedDonor, setSelectedDonor] = useState(null); // State for selected donor

  const toggleModal = () => setModal(!modal);

  const incrementUnits = () => setUnits(units + 1);
  const decrementUnits = () => {
    if (units > 1) setUnits(units - 1);
  }; 

  const loginData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await axios.get('/getDonar');
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getDetails();
  }, []);

  const filterData = (donar) => {
    if ((area === '' || donar.area === area) &&
      (amount === '' || donar.amount === amount) &&
      (bloodGroup === '' || donar.group === bloodGroup)) {
      return true;
    }
    return false;
  };

  const bookSlot = async (sno, id, email, contact, name, email2, donarcontact, donararea, donarlocation, units) => {
    try {
      const res = await axios.post('/bookSlot', {
        sno: sno,
        donaremail: email,
        receivercontact: contact,
        receivername: name,
        id: id,
        receivermail: email2,
        donarcontact: donarcontact,
        donararea: donararea,
        donarlocation: donarlocation,
        units: units
      });
      toast.success("Slot Confirmed");
      Swal.fire({
        icon: "success",
        title: "Booking Confirmed",
        imageUrl: logo,
        imageWidth: 200,
        imageHeight: 200, 
        text: "Slot has been booked in desired location !"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookClick = (donor) => {
    setSelectedDonor(donor);
    setUnits(1);
    toggleModal();
  };

  const handleConfirmBooking = () => {
    if (selectedDonor) {
      bookSlot(selectedDonor.sno, selectedDonor.id, selectedDonor.email, loginData.contact, loginData.name, loginData.email, selectedDonor.contact, selectedDonor.area, selectedDonor.location, units);
      toggleModal();
    }
  };

  const handleNewUserMessage = (newMessage) => {
    if (!userNameCollected) {
      setUserData(newMessage);
      setUserNameCollected(true);
      addResponseMessage(`Hi ${newMessage}, please enter your area.`);
    } else {
      setArea(newMessage);
      const donorsCount = data.filter(donor => donor.area === newMessage).length;
      addResponseMessage(`The number of donors in ${newMessage} is ${donorsCount}`);
    }
  };

  return (
    <div>
      <div className="bg-video-2">
        <video className="bg-video__content" autoPlay muted loop>
          <source src={video} type="video/mp4" />
          <source src="img/video.webm" type="video/webm" />
          Your browser is not supported!
        </video>
      </div>
      <Row>
        <h5 className="ms-1 mb-3 mt-3" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>User Name : {loginData.name}</h5>
        <Col md="6" lg="6" className="mb-4">
          <Card body>
            <CardTitle tag="h5" className="mb-3" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>Filter Donor</CardTitle>
            <div className=" d-flex justify-content-around ">
              <FormGroup className="mb-3" style={{ width: '100%' }}>
                <Label for="area" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Area</Label>
                <Input value={area} onChange={(e) => setArea(e.target.value)} id="area" name="area" type="select">
                  <option value="">Select</option>
                  <option>Ambattur</option>
                  <option>Avadi</option>
                  <option>Porur</option>
                  <option>Kundrathur</option>
                  <option>Ramapuram</option>
                  <option>Ennore</option>
                </Input>
              </FormGroup>
              <FormGroup className="mb-3 ms-3 " style={{ width: '100%' }}>
                <Label for="amount" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Amount</Label>
                <Input value={amount} onChange={(e) => setAmount(e.target.value)} id="amount" name="amount" type="select">
                  <option value="">Select</option>
                  <option>100</option>
                  <option>200</option>
                  <option>300</option>
                  <option>400</option>
                  <option>500</option>
                  <option>600</option>
                </Input>
              </FormGroup>
              <FormGroup className=" ms-3 " style={{ width: '100%' }}>
                <Label for="bloodGroup" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Blood Group</Label>
                <Input value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} id="bloodGroup" name="bloodGroup" type="select">
                  <option value="">Select</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>O+</option>
                  <option>O-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                </Input>
              </FormGroup>

            </div>
          </Card>
        </Col>
        <Col md="6" lg="4" className="mb-4">
          <Card body color="light-info">
            <CardTitle tag="h5" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>Available Donors</CardTitle>
            <CardText>
              {data.filter(filterData).length}
            </CardText>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg="12">
          <div style={{ height: "460px", overflowY: "auto" }}>
            <Card>
              <CardBody>
                <CardTitle tag="h5" className="m-2" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>Bookslots</CardTitle>
                <Table className="no-wrap mt-3 align-middle" responsive borderless striped>
                  <thead>
                    <tr>
                      <th>Donor ID</th>
                      <th>Name</th>
                      <th>Area</th>
                      <th>Available</th>
                      <th>Group</th>
                      <th>Amount</th>
                      <th>Location</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.filter(filterData).map((donor, index) => (
                      <tr key={index} className="border-top">
                        <td>{donor.id}</td>
                        <td>{donor.name}</td>
                        <td>{donor.area}</td>
                        <td>{donor.available}</td>
                        <td>{donor.group}</td>
                        <td>{donor.amount}</td>
                        <td><a href={donor.location} target="_blank" className="btn btn-success" color="light-success">Locate</a></td>
                        <td><Button color="primary" onClick={() => handleBookClick(donor)}>Book</Button></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </div>
        </Col>
      </Row>

      <Widget handleNewUserMessage={handleNewUserMessage} title="Donor Chat" subtitle={!userNameCollected ? "Please enter your name" : `Hi ${userData}, What is your area?`} />

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Select Number of Blood Units</ModalHeader>
        <ModalBody>
          <div className="d-flex justify-content-between align-items-center">
            <Button color="danger" onClick={decrementUnits}>-</Button>
            <span>{units}</span>
            <Button color="success" onClick={incrementUnits}>+</Button>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleConfirmBooking}>Book</Button>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Starter;