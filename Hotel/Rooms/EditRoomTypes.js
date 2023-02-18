import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";


const EditRoomTypes = (props) => {
    const [ajdi] = useState(props.ajdi);

    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [roomTypes, setRoomTypes] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomTypes({ ...roomTypes, [name]: value });
    };
  
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  
  
    useEffect( () => {
         axios.get(`https://localhost:44335/api/Room_Type/${ajdi}`, config)
          .then((res) =>{
            setRoomTypes(res.data);
          })
      }, []);
  
    const editRoomTypes = async (e) => {
        e.preventDefault();
      try {
        const response = await axios.put(
          `https://localhost:44335/api/Room_Type/${ajdi}`,
          {
            ...roomTypes,
          }, config
        );
        window.location.reload();
      } catch (error) {
        console.log(error.response);
      }
    };
  
    return (
      <>
        
        {roomTypes && (
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
                  Edit Room Type
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row > 
                  <Col>
                    <Form onSubmit={editRoomTypes}>
                    <Form.Group controlId="Room Type Name">
                  <Form.Label>Room Types Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="room_TypeName"
                    value={roomTypes.room_TypeName}
                    onChange={handleChange}
                    required
                    placeholder="Room Types Name"
                    autoFocus
                  />
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="room_TypeDescription"
                    value={roomTypes.room_TypeDescription}
                    onChange={handleChange}
                    required
                    placeholder="Description"
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Button variant="primary" type="submit">
                    Add Room Type
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

export default EditRoomTypes