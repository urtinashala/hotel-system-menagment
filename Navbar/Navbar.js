import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { BiPowerOff } from 'react-icons/bi'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navigation() {

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload()
  }


  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Dashboard</Nav.Link>
            
            <NavDropdown title="Hotel" id="basic-nav-dropdown">
              <NavDropdown.Item href="/hotel">Hotel</NavDropdown.Item>
              <NavDropdown.Item href="/room-types">
                Room Types
              </NavDropdown.Item>
			  <NavDropdown.Item href="/rooms">
                Rooms 
              </NavDropdown.Item>
			  <NavDropdown.Item href="/guests">
                Guests 
              </NavDropdown.Item>
            </NavDropdown>
			<Nav.Link href="/address">Address</Nav.Link>
            <Nav.Link href="/booking">Booking</Nav.Link>
			<NavDropdown title="Department" id="basic-nav-dropdown">
				<NavDropdown.Item href="/department">
					Departament
				</NavDropdown.Item>
				<NavDropdown.Item href="/employee">
					Employee
				</NavDropdown.Item>
			</NavDropdown>
            <Nav.Link href="/food">Food</Nav.Link>
            <Nav.Link href="/drinks">Drinks</Nav.Link>
            <Nav.Link onClick={logOut}><BiPowerOff className='logOutBtn'/>Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;