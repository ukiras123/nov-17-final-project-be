import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import { ImExit } from "react-icons/im";
import { TbLogin } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { apiLogoutUser } from "../../helper/axios";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.adminInfo);

  const handleOnLogout = () => {
    console.log("Loggin out")
    dispatch(apiLogoutUser())
  };
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand href="/">CTSD</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user?._id ? (
              <>
                <Link className="nav-link" to="/dashboard" title="Dashboard">
                  <AiFillDashboard /> Dash
                </Link>
                <Link
                  className="nav-link"
                  to="#!"
                  title="Logout"
                  onClick={handleOnLogout}
                >
                  <ImExit /> Logout
                </Link>
              </>
            ) : (
              <Link className="nav-link" to="/" title="Login">
                <TbLogin /> Login
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
