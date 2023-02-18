import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const EditAddress = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [ajdi] = useState(props.ajdi);


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

  useEffect(() => {
    axios
      .get(`https://localhost:44335/api/Address/${ajdi}`, config)
      .then((res) => {
        setAddress(res.data);
      });
  }, []);

  const editAddress = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://localhost:44335/api/Address/${ajdi}`,
        {
          ...address,
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
      {address && (
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
                Edit Address
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <Form onSubmit={editAddress}>
                    <Form.Group controlId="Room Name">
                      <Form.Label>Address Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="addressName"
                        value={address.addressName}
                        onChange={handleChange}
                        required
                        placeholder="Address Name"
                        autoFocus
                      />
                    </Form.Group>

                    <Form.Group controlId="Room Name">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={address.city}
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

                    <Form.Group controlId="description">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type="text"
                        name="country"
                        value={address.country}
                        onChange={handleChange}
                        required
                        placeholder="Country"
                      />
                    </Form.Group>

                    <Form.Group controlId="description">
                      <Form.Label>Zip Code</Form.Label>
                      <Form.Control
                        type="number"
                        name="zipCode"
                        value={address.zipCode}
                        onChange={handleChange}
                        required
                        placeholder="Zip Code"
                      />
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Button variant="primary" type="submit">
                        Edit Address
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

export default EditAddress;
