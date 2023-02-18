import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const EditRooms = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [ajdi] = useState(props.ajdi);


  const [room, setRoom] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    axios
      .get(`https://localhost:44335/api/Room/${ajdi}`, config)
      .then((res) => {
        setRoom(res.data);
      });
  }, []);

  const editRoom = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://localhost:44335/api/Room/${ajdi}`,
        {
          ...room,
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
      {room && (
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
                Edit Room
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <Form onSubmit={editRoom}>
                    <Form.Group controlId="Room Name">
                      <Form.Label>Room Number</Form.Label>
                      <Form.Control
                        type="number"
                        name="roomNumber"
                        value={room.roomNumber}
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
                        value={room.roomDescription}
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
                        value={room.room_TypeId}
                        onChange={handleChange}
                        required
                        placeholder="Room Type Id"
                      />
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Button variant="primary" type="submit">
                        Edit Room
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

export default EditRooms;
