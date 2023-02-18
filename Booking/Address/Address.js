import React, { useEffect, useState } from "react";
import Navigation from "../Navbar/Navbar";
import axios from "axios";
import {
  Table,
  ButtonToolbar,
  Button,
} from "react-bootstrap";
import EditAddress from "./EditAddress";
import AddAddress from "./AddAddress";


const Address = () => {
  const [items, setItems] = useState();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    axios.get("https://localhost:44335/api/Address/", config).then((res) => {
      setItems(res.data);
    });
  }, []);

  const deleteAddress = (id) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete("https://localhost:44335/api/Address/" + id, config)
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
                <th>Address ID</th>
                <th>Address Name</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>Zip Code</th>
                <th className="col-sm-3">Options</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, index) => (
                <tr key={index}>
                  <td>{item.addressId}</td>
                  <td>{item.addressName}</td>
                  <td>{item.city}</td>
                  <td>{item.state }</td>
                  <td>{item.country}</td>
                  <td>{item.zipCode}</td>
                  <td>
                    <ButtonToolbar>
                      <EditAddress ajdi={item.addressId} />
                      <Button
                        className="ml-3"
                        variant="danger"
                        onClick={() => deleteAddress(item.addressId)}
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
               <AddAddress />
          </ButtonToolbar>
        </>
      </div>
    </>
  );
};

export default Address;