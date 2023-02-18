import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import axios from "axios";

const AddBooking = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [booking, setBooking] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
  };

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const addBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:44335/api/booking/",
        {
          ...booking,
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
        Add Booking
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Booking
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form onSubmit={addBooking}>
              <Form.Group controlId="Room Name">
                      <Form.Label>Booking Date</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        name="bookingDate"
                        onChange={handleChange}
                        required
                        placeholder="Booking Date"
                        autoFocus
                      />
                    </Form.Group>

                    <Form.Group controlId="Room Name">
                      <Form.Label>Stay Duration</Form.Label>
                      <Form.Control
                        type="number"
                        name="stayDuration"
                        onChange={handleChange}
                        required
                        placeholder="Stay Duration"
                      />
                    </Form.Group>

                    <Form.Group controlId="Room Name">
                      <Form.Label>Total Rooms</Form.Label>
                      <Form.Control
                        type="number"
                        name="totalRooms"
                        onChange={handleChange}
                        required
                        placeholder="Total Rooms"
                      />
                    </Form.Group>

                    <Form.Group controlId="description">
                      <Form.Label>Room Id</Form.Label>
                      <Form.Control
                        type="number"
                        name="roomId"
                        onChange={handleChange}
                        required
                        placeholder="Room Id"
                      />
                    </Form.Group>

                    <Form.Group controlId="description">
                      <Form.Label>Guest Id</Form.Label>
                      <Form.Control
                        type="number"
                        name="guestId"
                        onChange={handleChange}
                        required
                        placeholder="Guest Id"
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

export default AddBooking;
