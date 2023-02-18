import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const EditEmployee = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [ajdi] = useState(props.ajdi);


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

  useEffect(() => {
    axios
      .get(`https://localhost:44335/api/employee/${ajdi}`, config)
      .then((res) => {
        setEmp(res.data);
      });
  }, []);

  const editEmp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://localhost:44335/api/employee/${ajdi}`,
        {
          ...emp,
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
      {emp && (
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
                Edit Employee
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <Form onSubmit={editEmp}>
                    <Form.Group controlId="Room Name">
                      <Form.Label>Employee Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="empName"
                        value={emp.empName}
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
                        value={emp.empContact}
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
                        value={emp.hotelId}
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
                        value={emp.depId}
                        onChange={handleChange}
                        required
                        placeholder="Department Id"
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

export default EditEmployee;
