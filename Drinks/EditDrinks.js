import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import axios from "axios";

function EditDrinks(props) {
  const [ajdi] = useState(props.ajdi);

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

  useEffect(() => {
    axios
      .get(`https://localhost:44335/api/Drinks/${ajdi}`, config)
      .then((response) => {
        setDrinks(response.data);
      });
  }, []);

  const editDrinks = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://localhost:44335/api/Drinks/${ajdi}`,
        {
          ...drinks,
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
      {drinks && (
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
                Edit Drinks
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <Form onSubmit={editDrinks}>
                    <Form.Group>
                      <Form.Label>Drink Id</Form.Label>
                      <Form.Control
                        value={ajdi}
                        disabled
                        name="name"
                        type="text"
                        placeholder="Food Id"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Drinks Name</Form.Label>
                      <Form.Control
                        value={drinks.drinkName}
                        onChange={handleChange}
                        name="drinkName"
                        type="text"
                        placeholder="Drink Name"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Drink Price</Form.Label>
                      <Form.Control
                        value={drinks.drinkPrice}
                        onChange={handleChange}
                        name="drinkPrice"
                        type="number"
                        placeholder="Drink Price"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Drinks Description</Form.Label>
                      <Form.Control
                        value={drinks.description}
                        onChange={handleChange}
                        name="description"
                        type="text"
                        placeholder="Drinks Description"
                      />
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Button variant="primary" type="submit">
                        Update Drink
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

export default EditDrinks;
