//React
import { Link } from 'react-router-dom';
//Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
//Icons
import Instagram from '@material-ui/icons/Instagram';
import Facebook from '@material-ui/icons/Facebook';
import Linkedin from '@material-ui/icons/LinkedIn';
import Youtube from '@material-ui/icons/YouTube';
//Css
import './style.css';

const footer = () => {
  return (
    <>
      <footer>
        <Container fluid>
          {/* -------------Nyhetsbrev------------- */}
          <Row className="d-flex justify-content-center text-center footer-form-row">
            <h3 className="mt-4 text-white">Prenumerera på vårt Nyhetsbrev</h3>
            <Form className="form-footer">
              <InputGroup className="mb-3">
                <Form.Control placeholder="Ange e-postadress" />
                <Button variant="outline-light">Få nyhetsbrev</Button>
              </InputGroup>
            </Form>
          </Row>
          {/* -------------Main Footer------------- */}
          <Row>
            <div className="col-12 col-md-4 text-center mt-4 mb-3 service-links">
              <h4>Information</h4>
              <div>
                <Link to="/">Om oss</Link>
              </div>
              <div>
                <Link to="/">Jobba hos oss</Link>
              </div>
              <div>
                <Link to="/">Press</Link>
              </div>
            </div>
            <div className="col-12 col-md-4 text-center mt-4 mb-3 service-links">
              <h4>Kundtjänst</h4>
              <div>
                <Link to="/">Kontakta oss</Link>
              </div>
              <div>
                <Link to="/">Vanliga frågor</Link>
              </div>
              <div>
                <Link to="/">Cookiepolicy</Link>
              </div>
            </div>
            <div className="col-12 col-md-4 text-center mt-4 mb-3">
              <h4>Följ oss</h4>
              <div>
                <a href="/">
                  <Instagram className="soc-icons" />
                </a>
                <a href="/">
                  <Facebook className="soc-icons" />
                </a>
                <a href="/">
                  <Linkedin className="soc-icons" />
                </a>
                <a href="/">
                  <Youtube className="soc-icons" />
                </a>
              </div>
            </div>
          </Row>
          <Row className="footer-end-row">
            <div className="col-12 d-flex justify-content-center mt-1 mb-1">
              © 2022 E-Shop AB | All rights reserved.
            </div>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default footer;
