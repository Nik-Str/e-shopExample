//React
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
//Bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
//Icons
import Logo from '../../img/logo.jpg';
import Coin from '@material-ui/icons/MonetizationOnOutlined';
import Truck from '@material-ui/icons/LocalShippingOutlined';
import Reply from '@material-ui/icons/ReplayOutlined';
import Change from '@material-ui/icons/SettingsOutlined';
import Cart from '@material-ui/icons/ShoppingCart';
//Css
import './style.css';

const NavbarHead = ({ setNavHeight }) => {
  const [expanded, setExpanded] = useState(false);

  //Get the height of the header
  const ref = useRef(null);
  useEffect(() => {
    setNavHeight(ref.current.clientHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <header ref={ref}>
        {/* -------------------Over Nav content-------------------- */}
        <Container fluid className="navbar-container">
          <Row className="d-flex align-items-center">
            <div className="col-md-4 col-xl-2 d-none d-md-block text-center">
              <div className="icons d-inline">
                <Reply className="nav-icons" />
              </div>
              <div className="nav-icons-text d-inline"> Fri frakt över 500kr</div>
            </div>
            <div className="col-2 d-none d-xl-block text-center">
              <div className="d-inline">
                <Truck className="nav-icons" />
              </div>
              <div className="nav-icons-text d-inline"> Snabb leverans</div>
            </div>
            <div className="col-2 d-none d-xl-block text-center">
              <div className=" d-inline">
                <Coin className="nav-icons" />
              </div>
              <div className="nav-icons-text d-inline"> Flexibla betalningsmetoder</div>
            </div>
            <div className="col-md-4 col-xl-3 d-none d-md-block text-center">
              <div className=" d-inline">
                <Change className="nav-icons" />
              </div>
              <div className="nav-icons-text d-inline"> Fria byten & 14 dagars öppet köp </div>
            </div>
            <div className="col-12 col-md-4 col-xl-3 text-end loginLinks">
              <Link to="/" className="me-3 login">
                Logga in
              </Link>{' '}
              <Link to="/" className="me-3">
                Bli medlem
              </Link>
            </div>
          </Row>
        </Container>

        {/* ---------------Navbar---------------------- */}
        <Navbar className="bg-white shadow" expand="lg" expanded={expanded}>
          <Container>
            <Navbar.Brand>
              <Link to="/" onClick={() => setExpanded(false)}>
                <img alt="Logo" src={Logo} className="d-inline-block align-top img-fluid mx-sm-5" />
              </Link>
            </Navbar.Brand>

            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              onClick={() => setExpanded(expanded ? false : 'expanded')}
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Form className="d-flex formField mt-3 mt-lg-0">
                <Form.Control type="search" placeholder="Search" className="me-2" />
              </Form>
              <Nav className="ms-auto">
                <Link className="nav-link" to="/female" onClick={() => setExpanded(false)}>
                  <strong>Dam</strong>
                </Link>
                <Link className="nav-link" to="/male" onClick={() => setExpanded(false)}>
                  <strong>Herr</strong>
                </Link>
                <Link className="nav-link" to="/create" onClick={() => setExpanded(false)}>
                  <Cart className="nav-chart-icon" />
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid"></div>
</nav>;

//<Link to="/">Home</Link>
//<Link to="/create">New Blog</Link>

export default NavbarHead;
