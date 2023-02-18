import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, ButtonToolbar, Button, Pagination } from "react-bootstrap";
import Navigation from "../Navbar/Navbar";
import AddFood from "./AddFood";
import EditFood from "./EditFood";

const Food = () => {
  const [items, setItems] = useState();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    axios.get("https://localhost:44335/api/Food/", config).then((res) => {
      setItems(res.data);
    });
  }, []);

  const deleteFood = (foodid) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete("https://localhost:44335/api/Food/" + foodid, config)
        .then(() => window.location.reload());
    }
  };

  return (
    <>
      <Navigation />
      <div className="container col-sm-5 mt-4">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Food Id</th>
              <th>Food Name</th>
              <th>Food Price</th>
              <th>Food Description</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item, index) => (
              <tr key={index}>
                <td>{item.foodId}</td>
                <td>{item.foodName}</td>
                <td>{item.foodPrice}</td>
                <td>{item.description}</td>
                <td>
                  <ButtonToolbar>
                    <EditFood ajdi={item.foodId} />

                    <Button
                      className="ml-2"
                      variant="danger"
                      onClick={() => deleteFood(item.foodId)}
                    >
                      Delete
                    </Button>
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ButtonToolbar><AddFood /></ButtonToolbar>
      </div>
    </>
  );
};

export default Food;
