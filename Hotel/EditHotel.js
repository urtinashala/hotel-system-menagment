import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";


const EditHotel = (props) => {
    const [ajdi] = useState(props.ajdi);

    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [hotel, setHotel] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHotel({ ...hotel, [name]: value });
    };
  
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  
  
    useEffect( () => {
         axios.get(`https://localhost:44335/api/Hotel/${ajdi}`, config)
          .then((res) =>{
            setHotel(res.data);
          })
      }, []);
  
    const editHotel = async (e) => {
        e.preventDefault();
      try {
        const response = await axios.put(
          `https://localhost:44335/api/Hotel/${ajdi}`,
          {
            ...hotel,
          }, config
        );
        window.location.reload();
      } catch (error) {
        console.log(error.response);
      }
    };
  
    return (
      <>
        
        {hotel && (
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
                  Edit Hotel
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row onSubmit={editHotel}> 
                  <Col>
                    <Form>
                    <Form.Group controlId="hotelId">
                        <Form.Label>Hotel Id</Form.Label>
                        <Form.Control
                          value={ajdi}
                          disabled
                          name="hotelId"
                          type="text"
                          placeholder="Hotel Id"
                      />
                      </Form.Group>
                      <Form.Group controlId="hotelName">
                        <Form.Label>Hotel Name</Form.Label>
                        <Form.Control
                          value={hotel.hotelName}
                          onChange={handleChange}
                          name="hotelName"
                          type="text"
                          placeholder="Hotel Name"
                      />
                      </Form.Group>
                      <Form.Group controlId="hotelName">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                          value={hotel.contactNumber}
                          onChange={handleChange}
                          name="contactNumber"
                          type="text"
                          placeholder="Contact Number"
                      />
                      </Form.Group>
                      <Form.Group controlId="hotelName">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          value={hotel.emailAddress}
                          onChange={handleChange}
                          name="emailAddress"
                          type="text"
                          placeholder="Email Address"
                      />
                      </Form.Group>
                      <Form.Group controlId="hotelName">
                        <Form.Label>Number Of Floors</Form.Label>
                        <Form.Control
                          value={hotel.numberOfFloors}
                          onChange={handleChange}
                          name="numberOfFloors"
                          type="text"
                          placeholder="Number Of Floors"
                      />
                      </Form.Group>
                      <Form.Group controlId="hotelName">
                        <Form.Label>Number Of Rooms</Form.Label>
                        <Form.Control
                          value={hotel.numberOfRooms}
                          onChange={handleChange}
                          name="numberOfRooms"
                          type="text"
                          placeholder="Number Of Rooms"
                      />
                      </Form.Group>
                      <Form.Group controlId="hotelName">
                        <Form.Label>Address Id</Form.Label>
                        <Form.Control
                          value={hotel.addressId}
                          onChange={handleChange}
                          name="addressId"
                          type="text"
                          placeholder="Address Id"
                      />
                      </Form.Group>
                      <Form.Group className="mt-3">
                        <Button
                          variant="primary"
                          type="submit"
                        >
                          Update Hotel
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

export default EditHotel