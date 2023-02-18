import React, { useEffect, useState } from "react";
import Navigation from "../Navbar/Navbar";
import axios from "axios";
import {
  Table,
  ButtonToolbar,
  Button,
} from "react-bootstrap";
import EditHotel from "./EditHotel";
import AddHotel from "./AddHotel";

const Hotel = () => {
  const [items, setItems] = useState();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    axios.get("https://localhost:44335/api/Hotel/", config).then((res) => {
      setItems(res.data);
    });
  }, []);

  const deleteCategory = (id) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete("https://localhost:44335/api/Hotel/" + id, config)
        .then(() => window.location.reload());
    }
  };

  return (
    <>
      <Navigation />

      <div className="container col-sm-7 mt-4">
        <>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Hotel ID</th>
                <th>Hotel Name</th>
                <th>Contact Number</th>
                <th>Email Address</th>
                <th>Number Of Floors</th>
                <th>Number Of Rooms</th>
                <th>Address Name</th>
                <th className="col-sm-3">Options</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, index) => (
                <tr key={index}>
                  <td>{item.hotelId}</td>
                  <td>{item.hotelName}</td>
                  <td>{item.contactNumber}</td>
                  <td>{item.emailAddress}</td>
                  <td>{item.numberOfFloors}</td>
                  <td>{item.numberOfRooms}</td>
                  <td>{item.address.addressName}</td>
                  <td>
                    <ButtonToolbar>
                      <EditHotel ajdi={item.hotelId}/>

                      <Button
                        className="ml-3"
                        variant="danger"
                        onClick={() => deleteCategory(item.hotelId)}
                      >
                        Delete
                      </Button>
                    </ButtonToolbar>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ButtonToolbar>
            <AddHotel />
          </ButtonToolbar>
        </>
      </div>
    </>
  );
};

export default Hotel;
