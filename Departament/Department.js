import React, { useEffect, useState } from "react";
import Navigation from "../Navbar/Navbar";
import axios from "axios";
import {
  Table,
  ButtonToolbar,
  Button,
} from "react-bootstrap";
import AddDepartment from "./AddDepartment";
import EditDepartment from "./EditDepartment";



const Department = () => {
  const [items, setItems] = useState();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    axios.get("https://localhost:44335/api/Departament/", config).then((res) => {
      setItems(res.data);
    });
  }, []);

  const deleteDepartament = (id) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete("https://localhost:44335/api/Departament/" + id, config)
        .then(() => window.location.reload());
    }
  };

  return (
    <>
      <Navigation />

      <div className="container col-sm-5 mt-4">
        <>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Departament ID</th>
                <th>Departament Name</th>
                <th className="col-sm-3">Options</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, index) => (
                <tr key={index}>
                  <td>{item.depId}</td>
                  <td>{item.depName}</td>
                  <td>
                    <ButtonToolbar>
                      <EditDepartment ajdi={item.depId} />
                      <Button
                        className="ml-3"
                        variant="danger"
                        onClick={() => deleteDepartament(item.depId)}
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
                <AddDepartment />
          </ButtonToolbar>
        </>
      </div>
    </>
  );
};

export default Department;