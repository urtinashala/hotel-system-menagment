import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import axios from "axios";

const AddHotel = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [hotel, setHotel] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHotel({ ...hotel, [name]: value });
    };

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }

    const addHotel = async (e) => {
        e.preventDefault();
      try {
        const response = await axios.post("https://localhost:44335/api/Hotel/", {
         ...hotel
        }, config);
        window.location.reload();
      } catch (err) {
        alert(err);
      }
    };

    return (
      <>
      <Button variant="primary" onClick={handleShow}>
        Add Hotel
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Hotel
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form onSubmit={addHotel}>
                <Form.Group controlId="EmpName">
                  <Form.Label>Hotel Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="hotelName"
                    onChange={handleChange}
                    required
                    placeholder="Hotel Name"
                    autoFocus
                  />
                </Form.Group>

                <Form.Group controlId="Contact Number">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="contactNumber"
                    onChange={handleChange}
                    required
                    placeholder="Contact Number"
                  />
                </Form.Group>

                <Form.Group controlId="emailAddress">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="emailAddress"
                    onChange={handleChange}
                    required
                    placeholder="Email Address"
                  />
                </Form.Group>

                <Form.Group controlId="numberOfFloors">
                  <Form.Label>Number Of Floors</Form.Label>
                  <Form.Control
                    type="text"
                    name="numberOfFloors"
                    onChange={handleChange}
                    required
                    placeholder="Number Of Floors"
                  />
                </Form.Group>

                <Form.Group controlId="numberOfRooms">
                  <Form.Label>Number Of Rooms</Form.Label>
                  <Form.Control
                    type="text"
                    name="numberOfRooms"
                    onChange={handleChange}
                    required
                    placeholder="Number Of Rooms"
                  />
                </Form.Group>

                <Form.Group controlId="EmpDoj">
                  <Form.Label>Address Id</Form.Label>
                  <Form.Control
                    type="text"
                    name="addressId"
                    onChange={handleChange}
                    required
                    placeholder="Address Id"
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Button variant="primary" type="submit">
                    Add Hotel
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> 
      </>
  );
}

export default AddHotel