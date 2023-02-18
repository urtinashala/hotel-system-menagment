import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const EditGuests = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [ajdi] = useState(props.ajdi);


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

  useEffect(() => {
    axios
      .get(`https://localhost:44335/api/Guests/${ajdi}`, config)
      .then((res) => {
        setGuests(res.data);
      });
  }, []);

  const editGuests = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://localhost:44335/api/Guests/${ajdi}`,
        {
          ...guests,
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
      {guests && (
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
                Edit Guests
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <Form onSubmit={editGuests}>
                    <Form.Group controlId="Room Name">
                      <Form.Label>Guest Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="guestName"
                        value={guests.guestName}
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
                        value={guests.guestContact}
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
                        value={guests.addressId}
                        onChange={handleChange}
                        required
                        placeholder="Address Id"
                      />
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Button variant="primary" type="submit">
                        Edit Guest
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

export default EditGuests;
