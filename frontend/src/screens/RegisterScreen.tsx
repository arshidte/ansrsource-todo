import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { registerUser } from "../slices/userSlice";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const {
    status,
    data: userData,
    error,
  } = useAppSelector((state: any) => state.fetchUserReducer);

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(registerUser({ userName, email, password }));
  };

  const userInfo = localStorage.getItem("userInfo");
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  return (
    <FormContainer>
      <h1>Register</h1>
      <>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="username">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            className="mt-2"
            type="submit"
            variant="primary"
            onClick={submitHandler}
          >
            Register
          </Button>
        </Form>
        <h6>{userData && <>Successfully registered</>}</h6>
        <h6>{status === "failed" && <>{error.message}</>}</h6>

        <Row className="py-3">
          <Col>
            Already registered? <Link to={`/signin`}>Sign in</Link>
          </Col>
        </Row>
      </>
    </FormContainer>
  );
};

export default RegisterScreen;
