import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import axios from "axios";

const AddDepartment = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [department, setDepartment] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const addDepartment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:44335/api/departament/",
        {
          ...department,
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
        Add Department
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Department
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form onSubmit={addDepartment}>
                <Form.Group controlId="Room Name">
                  <Form.Label>Departament Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="depName"
                    onChange={handleChange}
                    required
                    placeholder="Departament Name"
                    autoFocus
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Button variant="primary" type="submit">
                    Add Departament
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

export default AddDepartment;
