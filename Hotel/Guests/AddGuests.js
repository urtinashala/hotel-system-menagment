import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import axios from "axios";

const AddGuests = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [guests, setGuests] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuests({ ...guests, [name]: value });
  };

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const addGuest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:44335/api/Guests/",
        {
          ...guests,
        },
        config
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Guest
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Guest
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form onSubmit={addGuest}>
                <Form.Group controlId="Room Name">
                  <Form.Label>Guest Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="guestName"
                    onChange={handleChange}
                    required
                    placeholder="Guest Name"
                    autoFocus
                  />
                </Form.Group>

                <Form.Group controlId="Room Name">
                  <Form.Label>Guest Contact</Form.Label>
                  <Form.Control
                    type="text"
                    name="guestContact"
                    onChange={handleChange}
                    required
                    placeholder="Guest Contact"
                  />
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>Address Id</Form.Label>
                  <Form.Control
                    type="number"
                    name="addressId"
                    onChange={handleChange}
                    required
                    placeholder="Address Id"
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Button variant="primary" type="submit">
                    Add Guest
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

export default AddGuests;
