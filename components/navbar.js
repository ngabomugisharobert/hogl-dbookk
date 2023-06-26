import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavScroll({ activeNav }) {

    // function for logging out a user
    const logout = () => {
        // remove the token from the local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        localStorage.removeItem('email');
        // redirect the user to the login page
        window.location.href = '/';
    }


    return (
        <Navbar bg="light" expand="lg" className='border-bottom border-info'>
            <Container fluid>
                <Navbar.Brand href="#">DBooKK.</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/visitor" active={activeNav === 'visitors'}>visitors</Nav.Link>
                        <Nav.Link href="/guard" active={activeNav === 'guards'}>Guards</Nav.Link>
                        <Nav.Link href="/movement" active={activeNav === 'movements'}>Movements</Nav.Link>
                        <Nav.Link href="/group" active={activeNav === 'groups'}>Groups</Nav.Link>
                        <Nav.Link href="/group-movement" active={activeNav === 'groupMovements'}>GroupMovements</Nav.Link>
                    </Nav>
                    {/* add a logout button for logging out a user */}
                    <Button variant="outline-info" onClick={logout}>Logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavScroll;