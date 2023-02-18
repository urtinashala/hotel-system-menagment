import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import axios from "axios";

function AddFood() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [drinks, setDrinks] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDrinks({ ...drinks, [name]: value });
  };

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const addDrinks = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:44335/api/Drinks/",
        {
          ...drinks,
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
        Add Drinks
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Drinks
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form onSubmit={addDrinks}>
                <Form.Group>
                  <Form.Label>Drinks Name</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    name="drinkName"
                    type="text"
                    placeholder="Drink Name"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Drink Price</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    name="drinkPrice"
                    type="number"
                    placeholder="Drink Price"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Drinks Description</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    name="description"
                    type="text"
                    placeholder="Drinks Description"
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Button variant="primary" type="submit">
                    Add Drink
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
