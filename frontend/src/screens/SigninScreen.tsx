import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../slices/userSlice";
import { useAppDispatch, useAppSelector } from "../store";

const SigninScreen = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  //   const navigate = useNavigate();
  const { status, error } = useAppSelector(
    (state: any) => state.fetchUserReducer
  );

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const userInfo = localStorage.getItem("userInfo");
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  return (
    <FormContainer>
      <h1>Sign in</h1>
      <>
        <Form onSubmit={submitHandler}>
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
          {status === "loading" ? (
            <Button className="mt-2" type="submit" variant="primary" disabled>
              Loading...
            </Button>
          ) : (
            <Button className="mt-2" type="submit" variant="primary">
              Sign in
            </Button>
          )}
          {status === "failed" && (
            <div className="text-danger">{error.message}</div>
          )}
        </Form>

        <Row className="py-3">
          <Col>
            New customer? <Link to={`/register`}>Register</Link>
          </Col>
        </Row>
      </>
    </FormContainer>
  );
};

export default SigninScreen;
