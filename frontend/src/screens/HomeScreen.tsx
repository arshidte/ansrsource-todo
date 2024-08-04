import React, { useEffect, useState } from "react";
import { Form, Col, Container, Row, Button, InputGroup } from "react-bootstrap";
import { useAppDispatch } from "../store";
import { postTodo } from "../slices/todoSlice";
import ToDoList from "../components/ToDoList";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [todos, setTodos] = useState([{ todoText: "" }]);

  const [todoName, setTodoName] = useState("");

  // Function to add a new field
  const handleAddField = () => {
    setTodos([...todos, { todoText: "" }]);
  };

  // Function to remove a field by index
  const handleRemoveField = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // Function to handle change in input todos
  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTodos = [...todos];
    newTodos[index].todoText = event.target.value;
    setTodos(newTodos);
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(postTodo({ todoName, todos }));
  };

  const userInfo = localStorage.getItem("userInfo");

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
  }, [userInfo]);

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <h4>Add you To-Do</h4>
          <Form>
            <Form.Group controlId="heading" className="my-3">
              <Form.Control
                size="lg"
                type="text"
                placeholder="To-Do Heading"
                onChange={(e) => setTodoName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {todos.map((_, index) => (
              <Form.Group controlId={`todoItem-${index}`} key={index}>
                <InputGroup className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Your To-Do"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(index, event)
                    }
                  />
                  {todos.length - 1 == index && (
                    <Button
                      variant="outline-danger"
                      onClick={() => handleRemoveField(index)}
                    >
                      Delete
                    </Button>
                  )}
                </InputGroup>
              </Form.Group>
            ))}
            <Button
              variant="secondary"
              className="my-2 me-1"
              onClick={handleAddField}
            >
              Add new To-Do
            </Button>
            <Button className="my-2" onClick={submitHandler}>
              Submit To-Do
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <ToDoList />
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
