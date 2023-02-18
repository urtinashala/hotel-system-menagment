import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const EditBooking = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [ajdi] = useState(props.ajdi);


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

  useEffect(() => {
    axios
      .get(`https://localhost:44335/api/Booking/${ajdi}`, config)
      .then((res) => {
        setBooking(res.data);
      });
  }, []);

  const editBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://localhost:44335/api/Booking/${ajdi}`,
        {
          ...booking,
        },
        config
      );
      window.location.reload();
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      {booking && (
        <>
          <Button variant="primary" onClick={handleShow}>
            Edit
          </Button>

          <Modal
            show={show}
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                Edit Booking
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <Form onSubmit={editBooking}>
                    <Form.Group controlId="Room Name">
                      <Form.Label>Booking Date</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        name="bookingDate"
                        value={booking.bookingDate}
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
                        value={booking.stayDuration}
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
                        value={booking.totalRooms}
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
                        value={booking.roomId}
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
                        value={booking.guestId}
                        onChange={handleChange}
                        required
                        placeholder="Guest Id"
                      />
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Button variant="primary" type="submit">
                        Edit Booking
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
      )}
    </>
  );
};

export default EditBooking;
