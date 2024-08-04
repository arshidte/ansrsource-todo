import { Badge, Button, Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";
import { logout } from "../slices/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userInfo = localStorage.getItem("userInfo");
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : {};

  const signoutHandler = (e: any) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">My To-Do</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {parsedUserInfo.userName ? (
            <Navbar.Text>
              Signed in as:{" "}
              <Badge pill bg="primary">
                {parsedUserInfo.userName}
              </Badge>
              <Button size="sm" onClick={signoutHandler} className="ms-2">
                Logout
              </Button>
            </Navbar.Text>
          ) : (
            <>
              <Link to={"/signin"}>
                <Button variant="outline-primary" className="me-2">
                  Login
                </Button>
              </Link>
              <Link to={"/register"}>
                <Button variant="outline-primary" className="me-2">
                  Signup
                </Button>
              </Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
