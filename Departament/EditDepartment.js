import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const EditDepartment = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [ajdi] = useState(props.ajdi);


  const [departament, setDepartament] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartament({ ...departament, [name]: value });
  };

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    axios
      .get(`https://localhost:44335/api/departament/${ajdi}`, config)
      .then((res) => {
        setDepartament(res.data);
      });
  }, []);

  const editDepartment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://localhost:44335/api/departament/${ajdi}`,
        {
          ...departament,
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
      {departament && (
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
                Edit Departament
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <Form onSubmit={editDepartment}>

                    <Form.Group controlId="Room Name">
                      <Form.Label>Departament Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="depName"
                        value={departament.depName}
                        onChange={handleChange}
                        required
                        placeholder="Departament Name"
                        autoFocus
                      />
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Button variant="primary" type="submit">
                        Edit Departament
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

export default EditDepartment;
