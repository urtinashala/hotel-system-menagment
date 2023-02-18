import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import axios from "axios";

const AddRooms = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [room, setRoom] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoom({ ...room, [name]: value });
    };

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }

    const addRoom = async (e) => {
        e.preventDefault();
      try {
        const response = await axios.post("https://localhost:44335/api/Room/", {
         ...room
        }, config);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <>
      <Button variant="primary" onClick={handleShow}>
        Add Room 
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Room 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form onSubmit={addRoom}>

              <Form.Group controlId="Room Name">
                  <Form.Label>Room Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="roomNumber"
                    onChange={handleChange}
                    required
                    placeholder="Room Number"
                    autoFocus
                  />
                </Form.Group>

                <Form.Group controlId="Room Name">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="roomDescription"
                    onChange={handleChange}
                    required
                    placeholder="Description"
                  />
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>Room Type Id</Form.Label>
                  <Form.Control
                    type="number"
                    name="room_TypeId"
                    onChange={handleChange}
                    required
                    placeholder="Room Type Id"
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Button variant="primary" type="submit">
                    Add Room
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

export default AddRooms