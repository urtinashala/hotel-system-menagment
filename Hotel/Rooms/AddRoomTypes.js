import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import axios from "axios";

const AddRoomTypes = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [roomTypes, setRoomTypes] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomTypes({ ...roomTypes, [name]: value });
    };

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }

    const addRoomTypes = async (e) => {
        e.preventDefault();
      try {
        const response = await axios.post("https://localhost:44335/api/Room_Type/", {
         ...roomTypes
        }, config);
        window.location.reload();
      } catch (err) {
        alert(err);
      }
    };

    return (
      <>
      <Button variant="primary" onClick={handleShow}>
        Add Room Types
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Room Types
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form onSubmit={addRoomTypes}>
                <Form.Group controlId="Room Type Name">
                  <Form.Label>Room Types Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="room_TypeName"
                    onChange={handleChange}
                    required
                    placeholder="Room Types Name"
                    autoFocus
                  />
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="room_TypeDescription"
                    onChange={handleChange}
                    required
                    placeholder="Description"
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Button variant="primary" type="submit">
                    Add Room Type
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

export default AddRoomTypes