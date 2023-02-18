import React, { useEffect, useState } from "react";
import Navigation from "../../Navbar/Navbar";
import axios from "axios";
import {
  Table,
  ButtonToolbar,
  Button,
} from "react-bootstrap";
import EditGuests from "./EditGuests";
import AddGuests from "./AddGuests";

const Guests = () => {
  const [items, setItems] = useState();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    axios.get("https://localhost:44335/api/Guests/", config).then((res) => {
      setItems(res.data);
    });
  }, []);

  const deleteGuest = (id) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete("https://localhost:44335/api/Guests/" + id, config)
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
                <th>Guest ID</th>
                <th>Guest Name</th>
                <th>Guest Contact</th>
                <th>Guest Address</th>
                <th className="col-sm-3">Options</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, index) => (
                <tr key={index}>
                  <td>{item.guestId}</td>
                  <td>{item.guestName}</td>
                  <td>{item.guestContact}</td>
                  <td>{item.address.addressName}</td>
                  <td>
                    <ButtonToolbar>
                      <EditGuests ajdi={item.guestId}/>
                      <Button
                        className="ml-3"
                        variant="danger"
                        onClick={() => deleteGuest(item.guestId)}
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
                <AddGuests />
          </ButtonToolbar>
        </>
      </div>
    </>
  );
};

export default Guests;