//React
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
//Icons
import Instagram from '@material-ui/icons/Instagram';
import Facebook from '@material-ui/icons/Facebook';
import Linkedin from '@material-ui/icons/LinkedIn';
import Youtube from '@material-ui/icons/YouTube';
//custom hooks
import usePOST from '../../hooks/usePOST';
//Css
import './style.css';
//Img
import payments from '../../img/home-payment-icons.png';
//Api subscribe
const URL_SUBSCRIBE = 'http://localhost:8080/subscribe';

const Footer = () => {
  const { data, isLoading, isError, FetchPost } = usePOST();
  const [email, setEmail] = useState('');
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('email', email);
    FetchPost(URL_SUBSCRIBE, formData);
    setEmail('');
  };

  useEffect(() => {
    if (data !== null) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [data]);

  return (
    <>
      <footer>
        <Container fluid className="bg-light">
          {/* -------------Nyhetsbrev------------- */}
          <Row className="d-flex justify-content-center text-center footer-form-row">
            <h3 className="mt-4 text-white">Prenumerera på vårt Nyhetsbrev</h3>
            <Form className="form-footer" onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Ange e-postadress"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!isLoading && !isError && (
                  <Button type="submit" variant="outline-light">
                    Få nyhetsbrev
                  </Button>
                )}
                {isLoading && !isError && (
                  <Button variant="outline-light" disabled>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    Loading...
                  </Button>
                )}
              </InputGroup>
            </Form>
            {show && (
              <div>
                <p className="text-white" style={{ fontSize: '1.2rem', textDecoration: '1px underline' }}>
                  {data}
                </p>
              </div>
            )}
            {isError && <div>{isError}</div>}
          </Row>
          {/* -------------Main Footer------------- */}
          <Row>
            <div className="col-12 col-md-4 text-center mt-4 mb-1 service-links">
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
            <div className="col-12 col-md-4 text-center mt-4 mb-1 service-links">
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
            <div className="col-12 col-md-4 text-center mt-4 mb-1">
              <h4>Följ oss</h4>
              <div>
                <a href="/">
                  <Instagram className="soc-icons instagram" />
                </a>
                <a href="/">
                  <Facebook className="soc-icons facebook" />
                </a>
                <a href="/">
                  <Linkedin className="soc-icons linkedin" />
                </a>
                <a href="/">
                  <Youtube className="soc-icons youtube" />
                </a>
              </div>
            </div>
          </Row>
          <Row>
            {/* -----------Img on payments options-------------- */}
            <div className="payments-img-div">
              <img className="img-fluid" src={payments} alt="payment options" />
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

export default Footer;
