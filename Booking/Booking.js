import React, { useEffect, useState } from "react";
import Navigation from "../Navbar/Navbar";
import axios from "axios";
import {
  Table,
  ButtonToolbar,
  Button,
} from "react-bootstrap";
import EditBooking from "./EditBooking";
import AddBooking from "./AddBooking";



const Booking = () => {
  const [items, setItems] = useState();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    axios.get("https://localhost:44335/api/Booking/", config).then((res) => {
      setItems(res.data);
    });
  }, []);

  const deleteBooking = (id) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete("https://localhost:44335/api/Booking/" + id, config)
        .then(() => window.location.reload());
    }
  };

  return (
    <>
      <Navigation />

      <div className="container col-sm-8 mt-4">
        <>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Booking Date</th>
                <th>Stay Duration</th>
                <th>Total Rooms</th>
                <th>Room Number</th>
                <th>Guest Name</th>
                <th className="col-sm-2">Options</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, index) => (
                <tr key={index}>
                  <td>{item.bookingId}</td>
                  <td>{item.bookingDate}</td>
                  <td>{item.stayDuration}</td>
                  <td>{item.totalRooms }</td>
                  <td>{item.room.roomNumber}</td>
                  <td>{item.guest.guestName}</td>
                  <td>
                    <ButtonToolbar>
                      <EditBooking ajdi={item.bookingId} />
                      <Button
                        className="ml-3"
                        variant="danger"
                        onClick={() => deleteBooking(item.bookingId)}
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
                <AddBooking />
          </ButtonToolbar>
        </>
      </div>
    </>
  );
};

export default Booking;