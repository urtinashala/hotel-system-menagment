import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import axios from "axios";

function AddFood() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [food, setFood] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood({ ...food, [name]: value });
  };

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const addFood = async (e) => {
      e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:44335/api/Food/",
        {
          ...food,
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
        Add Food
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Add Food</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form onSubmit={addFood}>
                <Form.Group controlId="FoodName">
                  <Form.Label>Food Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="FoodName"
                    onChange={handleChange}
                    required
                    placeholder="Food Name"
                    autoFocus
                  />
                </Form.Group>

                <Form.Group controlId="FoodPrice">
                  <Form.Label>Food Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="FoodPrice"
                    onChange={handleChange}
                    required
                    placeholder="Food Price"
                  />
                </Form.Group>

                <Form.Group controlId="FoodDescription">
                  <Form.Label>Food Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    onChange={handleChange}
                    required
                    placeholder="Food Description"
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Button variant="primary" type="submit">
                    Add Food
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
export default AddFood;
