import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import axios from "axios";

const AddEmployee = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [emp, setEmp] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmp({ ...emp, [name]: value });
  };

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const AddEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:44335/api/employee/",
        {
          ...emp,
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
        Add Employee
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form onSubmit={AddEmployee}>
              <Form.Group controlId="Room Name">
                      <Form.Label>Employee Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="empName"
                        onChange={handleChange}
                        required
                        placeholder="Employee Name"
                        autoFocus
                      />
                    </Form.Group>

                    <Form.Group controlId="Room Name">
                      <Form.Label>Employee Contact</Form.Label>
                      <Form.Control
                        type="text"
                        name="empContact"
                        onChange={handleChange}
                        required
                        placeholder="Employee Contact"
                      />
                    </Form.Group>

                    <Form.Group controlId="Room Name">
                      <Form.Label>Hotel Id</Form.Label>
                      <Form.Control
                        type="number"
                        name="hotelId"
                        onChange={handleChange}
                        required
                        placeholder="Hotel Id"
                      />
                    </Form.Group>

                    <Form.Group controlId="description">
                      <Form.Label>Department Id</Form.Label>
                      <Form.Control
                        type="number"
                        name="depId"
                        onChange={handleChange}
                        required
                        placeholder="Department Id"
                      />
                    </Form.Group>

                <Form.Group className="mt-3">
                  <Button variant="primary" type="submit">
                    Add Employee
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

export default AddEmployee;
