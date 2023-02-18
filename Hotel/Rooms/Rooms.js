import React, { useEffect, useState } from "react";
import Navigation from "../../Navbar/Navbar";
import axios from "axios";
import {
  Table,
  ButtonToolbar,
  Button,
} from "react-bootstrap";
import AddRooms from "./AddRooms";
import EditRooms from "./EditRooms";



const Rooms = () => {
  const [items, setItems] = useState();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    axios.get("https://localhost:44335/api/Room/", config).then((res) => {
      setItems(res.data);
    });
  }, []);

  const deleteRoom = (id) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete("https://localhost:44335/api/Room/" + id, config)
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
                <th>Room ID</th>
                <th>Room Number</th>
                <th>Description</th>
                <th>Room Type Name</th>
                <th className="col-sm-3">Options</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, index) => (
                <tr key={index}>
                  <td>{item.roomId}</td>
                  <td>{item.roomNumber}</td>
                  <td>{item.roomDescription}</td>
                  <td>{item.room_Type.room_TypeName}</td>
                  <td>
                    <ButtonToolbar>
                      <EditRooms ajdi={item.roomId} />
                      <Button
                        className="ml-3"
                        variant="danger"
                        onClick={() => deleteRoom(item.roomId)}
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
                <AddRooms />
          </ButtonToolbar>
        </>
      </div>
    </>
  );
};

export default Rooms;