import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import { ImExit } from "react-icons/im";
import { TbLogin } from "react-icons/tb";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../pages/registration-login/userSlice";
const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.adminInfo);

  const handleOnLogout = () => {
    signOut(auth).then(() => {
      console.log("you have been loged out");
      // reset user state
      dispatch(setUser({}));
    });
  };
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand href="/">CTS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user?.uid ? (
              <>
                <Link className="nav-link" to="/dashboard" title="Dashboard">
                  <AiFillDashboard />
                </Link>
                <Link
                  className="nav-link"
                  to="#!"
                  title="Logout"
                  onClick={handleOnLogout}
                >
                  <ImExit />
                </Link>
              </>
            ) : (
              <Link className="nav-link" to="/" title="Login">
                <TbLogin />
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
