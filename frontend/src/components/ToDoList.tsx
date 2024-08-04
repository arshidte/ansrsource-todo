import { useEffect, useState } from "react";
import { Button, Card, Form, InputGroup, ListGroup } from "react-bootstrap";
import { apiCall } from "../services/apiCall";

const ToDoList = () => {
  const [loader, setLoader] = useState(false);
  const [todos, setTodos] = useState([]);
  const [editTodoId, setEditTodoId] = useState<string | null>(null);
  const [newTodoText, setNewTodoText] = useState("");

  // Fetch all todos
  const fetchToDos = async () => {
    setLoader(true);

    let response;

    response = await apiCall(`/api/todo`, "get");

    if (response?.status === 200) {
      setTodos(response?.data.allTodos);

      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  // Update a todo item status
  const updateTodoStatus = async (
    todoId: string,
    todoItemId: string,
    todoStatus: boolean
  ) => {
    setLoader(true);

    let response;
    response = await apiCall(
      `/api/todo/update/${todoId}/${todoItemId}`,
      "put",
      { todoStatus }
    );
    console.log(response);

    if (response?.status === 200) {
      setLoader(false);
    } else {
      setLoader(false);
    }
  };
  // Update a todo item text
  const updateTodoText = async (
    todoId: string,
    todoItemId: string,
    todoText: string
  ) => {
    setLoader(true);
    console.log(todoText);

    let response;
    response = await apiCall(
      `/api/todo/update/${todoId}/${todoItemId}`,
      "put",
      { todoText }
    );

    if (response?.status === 200) {
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  // Delete a to-do item
  const deleteTodoItem = async (todoId: string, todoItemId: string) => {
    setLoader(true);

    let response;
    response = await apiCall(
      `/api/todo/remove/${todoId}/${todoItemId}`,
      "delete"
    );

    if (response?.status === 200) {
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  // Edit todo item
  const handleEditClick = (todoId: string, todoText: string) => {
    setNewTodoText(todoText);
    setEditTodoId((prevId) => (prevId === todoId ? null : todoId));
  };

  // Delete to-do
  const deleteTodoHandler = async (todoId: string) => {
    
    setLoader(true);

    let response;
    response = await apiCall(`/api/todo/delete/${todoId}`, "delete");

    if (response?.status === 200) {
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchToDos();
  }, [loader]);

  return (
    <>
      {todos ? (
        <>
          {todos &&
            todos.map((todo: any) => (
              <Card key={todo._id} className="my-2">
                <Card.Body>
                  <Card.Title>{todo.todoName}</Card.Title>
                  {todo &&
                    todo.todos.map((eachTodo: any) => (
                      <ListGroup variant="flush" key={eachTodo._id}>
                        <ListGroup.Item className="d-flex align-items-center justify-content-between">
                          <div>
                            {eachTodo.todoText}
                            <Button
                              size="sm"
                              onClick={() =>
                                handleEditClick(eachTodo._id, eachTodo.todoText)
                              }
                            >
                              Edit
                            </Button>
                            <br />
                            {editTodoId === eachTodo._id && (
                              <>
                                <Form>
                                  <InputGroup size="sm" className="mb-3">
                                    <Form.Control
                                      aria-label="Small"
                                      aria-describedby="inputGroup-sizing-sm"
                                      value={newTodoText}
                                      onChange={(e: any) =>
                                        setNewTodoText(e.target.value)
                                      }
                                    />
                                  </InputGroup>
                                  <Button
                                    onClick={() =>
                                      updateTodoText(
                                        todo._id,
                                        eachTodo._id,
                                        newTodoText
                                      )
                                    }
                                  >
                                    Submit
                                  </Button>
                                </Form>
                              </>
                            )}
                          </div>
                          <div>
                            {eachTodo.todoStatus ? (
                              <Button
                                variant="warning"
                                className="me-2"
                                onClick={() =>
                                  updateTodoStatus(
                                    todo._id,
                                    eachTodo._id,
                                    !eachTodo.todoStatus
                                  )
                                }
                              >
                                Mark as unfinished
                              </Button>
                            ) : (
                              <Button
                                variant="success"
                                className="me-2"
                                onClick={() =>
                                  updateTodoStatus(
                                    todo._id,
                                    eachTodo._id,
                                    !eachTodo.todoStatus
                                  )
                                }
                              >
                                Mark as finished
                              </Button>
                            )}
                            <Button
                              variant="danger"
                              onClick={() =>
                                deleteTodoItem(todo._id, eachTodo._id)
                              }
                            >
                              Delete
                            </Button>{" "}
                          </div>
                        </ListGroup.Item>
                      </ListGroup>
                    ))}
                  <Card.Link onClick={() => deleteTodoHandler(todo._id)}>
                    Delete Todo
                  </Card.Link>
                </Card.Body>
              </Card>
            ))}
        </>
      ) : loader ? (
        <>Loading...</>
      ) : (
        <></>
      )}
    </>
  );
};
export default ToDoList;
