import React, { useEffect, useState } from "react";
import Navigation from "../Navbar/Navbar";
import axios from "axios";
import {
  Table,
  ButtonToolbar,
  Button,
} from "react-bootstrap";
import EditEmployee from "./EditEmployee";
import AddEmployee from "./AddEmployee";


const Employee = () => {
  const [items, setItems] = useState();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    axios.get("https://localhost:44335/api/Employee/", config).then((res) => {
      setItems(res.data);
    });
  }, []);

  const deleteEmp = (id) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete("https://localhost:44335/api/Employee/" + id, config)
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
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Employee Contact</th>
                <th>Hotel Name</th>
                <th>Department Name</th>
                <th className="col-sm-2">Options</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, index) => (
                <tr key={index}>
                  <td>{item.empId}</td>
                  <td>{item.empName}</td>
                  <td>{item.empContact}</td>
                  <td>{item.hotel.hotelName }</td>
                  <td>{item.dep.depName}</td>
                  <td>
                    <ButtonToolbar>
                      <EditEmployee ajdi={item.empId} />
                      <Button
                        className="ml-3"
                        variant="danger"
                        onClick={() => deleteEmp(item.empId)}
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
                <AddEmployee />
          </ButtonToolbar>
        </>
      </div>
    </>
  );
};

export default Employee;