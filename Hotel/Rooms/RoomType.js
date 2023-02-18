import React, { useEffect, useState } from "react";
import Navigation from "../../Navbar/Navbar";
import axios from "axios";
import {
  Table,
  ButtonToolbar,
  Button,
} from "react-bootstrap";
import AddRoomTypes from "./AddRoomTypes";
import EditRoomTypes from "./EditRoomTypes";


const RoomType = () => {
  const [items, setItems] = useState();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    axios.get("https://localhost:44335/api/Room_Type/", config).then((res) => {
      setItems(res.data);
    });
  }, []);

  const deleteRoomType = (id) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete("https://localhost:44335/api/Room_Type/" + id, config)
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
                <th>Room Type ID</th>
                <th>Room Type Name</th>
                <th>Description</th>
                <th className="col-sm-3">Options</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, index) => (
                <tr key={index}>
                  <td>{item.room_TypeId}</td>
                  <td>{item.room_TypeName}</td>
                  <td>{item.room_TypeDescription}</td>
                  <td>
                    <ButtonToolbar>
                      <EditRoomTypes ajdi={item.room_TypeId} />
                      <Button
                        className="ml-3"
                        variant="danger"
                        onClick={() => deleteRoomType(item.room_TypeId)}
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
            <AddRoomTypes />
          </ButtonToolbar>
        </>
      </div>
    </>
  );
};

export default RoomType