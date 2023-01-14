import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavScroll({ activeNav }) {
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
                    <Button variant="outline-success">Logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavScroll;