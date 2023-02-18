import { useRef, useState, useEffect, useContext } from "react";
import { Button, Col, Form } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://localhost:44335/api/Authenticate/login/",
        {
          username,
          password,
        }
      );

      const token = res?.data?.token;
      localStorage.setItem("token", token);
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <div className="container d-flex justify-content-center align-items-center loginContainer">
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              type="submit"
              id="loginBtn"
              className="btn btn-primary btn-block loginBtn"
            >
              Login
            </Button>
          </Form>
          <div className="d-flex flex-column align-items-center mt-4">
            <span style={{ fontSize: "14px", color: "#61605d" }}>
              Don't have an account?
            </span>
            <a href="/register" className="registerLink">
              Register
            </a>
          </div>
        </Col>
      </div>
    </>
  );
};
export default Login;
