import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import axios from "axios";

const AddAddress = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [address, setAddress] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const addHotel = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:44335/api/Address/",
        {
          ...address,
        },
        config
      );
      window.location.reload();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Address
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Address
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form onSubmit={addHotel}>
                <Form.Group controlId="EmpName">
                  <Form.Label>Address Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="addressName"
                    onChange={handleChange}
                    required
                    placeholder="Address Name"
                    autoFocus
                  />
                </Form.Group>

                <Form.Group controlId="Contact Number">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    onChange={handleChange}
                    required
                    placeholder="City"
                  />
                </Form.Group>

                <Form.Group controlId="Room Name">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleChange}
                    required
                    placeholder="State"
                  />
                </Form.Group>

                <Form.Group controlId="emailAddress">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    onChange={handleChange}
                    required
                    placeholder="Country"
                  />
                </Form.Group>

                <Form.Group controlId="numberOfFloors">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    type="number"
                    name="zipCode"
                    onChange={handleChange}
                    required
                    placeholder="Zip Code"
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Button variant="primary" type="submit">
                    Add Address
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
};

export default AddAddress;
