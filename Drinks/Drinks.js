import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, ButtonToolbar, Button, Pagination } from "react-bootstrap";
import Navigation from "../Navbar/Navbar";
import EditDrinks from "./EditDrinks";
import AddDrinks from "./AddDrinks";

const Drinks = () => {
  const [items, setItems] = useState();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    axios
      .get("https://localhost:44335/api/Drinks/", config)
      .then((res) => {
        setItems(res.data);
      });
  }, []);

  const deleteDrink = (drinkid) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete("https://localhost:44335/api/Drinks/" + drinkid, config)
        .then(() => window.location.reload());
    }
  };

  return (
    <>
      <Navigation />

      <div className="container col-sm-7 mt-4">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Drink Id</th>
              <th>Drink Name</th>
              <th>Drink Price</th>
              <th>Drink Description</th> 
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item, index) => (
              <tr key={index}>
                <td>{item.drinkId}</td>
                <td>{item.drinkName}</td>
                <td>{item.drinkPrice}</td>
                <td>{item.description}</td>      
                <td>
                  <ButtonToolbar>
                    <EditDrinks ajdi={item.drinkId} />

                    <Button
                      className="ml-2"
                      variant="danger"
                      onClick={() => deleteDrink(item.drinkId)}
                    >
                      Delete
                    </Button>
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ButtonToolbar><AddDrinks /></ButtonToolbar>
      </div>
    </>
  );
};

export default Drinks;
