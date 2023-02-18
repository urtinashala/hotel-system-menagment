import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import axios from "axios";

function EditFood(props) {
  const [ajdi] = useState(props.ajdi);

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

  useEffect(() => {
    axios
      .get(`https://localhost:44335/api/Food/${ajdi}`, config)
      .then((response) => {
        setFood(response.data);
      });
  }, []);

  const editFood = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://localhost:44335/api/Food/${ajdi}`,
        {
          ...food,
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
      {food && (
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
                Edit Food
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <Form onSubmit={editFood}>
                    <Form.Group>
                      <Form.Label>Food Id</Form.Label>
                      <Form.Control
                        value={ajdi}
                        disabled
                        name="name"
                        type="text"
                        placeholder="Food Id"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Food Name</Form.Label>
                      <Form.Control
                        value={food.foodName}
                        onChange={handleChange}
                        name="foodName"
                        type="text"
                        placeholder="Food Name"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Food Price</Form.Label>
                      <Form.Control
                        value={food.foodPrice}
                        onChange={handleChange}
                        name="foodPrice"
                        type="number"
                        placeholder="Food Price"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Food Description</Form.Label>
                      <Form.Control
                        value={food.description}
                        onChange={handleChange}
                        name="description"
                        type="text"
                        placeholder="Food Description"
                      />
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Button variant="primary" type="submit">
                        Update Food
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
}

export default EditFood;
