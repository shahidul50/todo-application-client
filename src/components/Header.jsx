import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/userApiSlice';
import { todoApiSlice } from "../slices/todoApiSlice";
function Header() {
  const {userInfo} = useSelector((state)=> state.auth)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(todoApiSlice.util.resetApiState())
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <header>
        <Navbar  bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
            <LinkContainer to='/'>
                <Navbar.Brand>Todo App</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav className="ms-auto">
                  {userInfo ? (
                     <> 
                      <NavDropdown title={userInfo.name} id='username'>
                        <LinkContainer to='/profile'>
                          <NavDropdown.Item>
                            Profile
                          </NavDropdown.Item>
                        </LinkContainer>
                          <NavDropdown.Item onClick={logoutHandler}>
                            Logout
                          </NavDropdown.Item>
                      </NavDropdown>
                     </>
                  ) : (
                    <>
                    <LinkContainer to='/login'>
                      <Nav.Link><FaSignInAlt/> Sign In</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                       <Nav.Link><FaSignOutAlt/> Sign Up</Nav.Link>
                  </LinkContainer>
                    </>
                  )}
              </Nav> 
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </header>
  )
}

export default Header

