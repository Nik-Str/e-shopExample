//React
import { Link } from 'react-router-dom';
//Bootstrap
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
//css
import './style.css';

const Carosel = ({ data }) => {
  return (
    <Container fluid className="bg-dark">
      <Row>
        {/* Female Clothes */}
        <div className="col-12 col-lg-6 caroselDiv my-lg-5 mt-5 mb-5 p-3 p-lg-0">
          <Carousel fade>
            {data[0].map((item) => (
              <Carousel.Item key={item._id} className="d-flex justify-content-center">
                <Link to={`/product/${item._id}`}>
                  <img className="img-fluid" src={item.imageOne} alt="" />
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="text-white text-center mt-3 caroselTextDiv">
            <h2>NYHETER DAM</h2>
            <p>
              <i>Kollektion från ICIW, ADIDAS, NIKE...</i>
            </p>
            <Link to="/female">
              <Button variant="secondary" className="rounded-pill">
                Shoppa nu
              </Button>{' '}
            </Link>
          </div>
        </div>
        {/* Male Clothes */}
        <div className="col-12 col-lg-6 caroselDiv my-lg-5 mb-5 p-3 p-lg-0">
          <Carousel fade>
            {data[1].map((item) => (
              <Carousel.Item key={item._id} className="d-flex justify-content-center">
                <Link to={`/product/${item._id}`}>
                  <img className="img-fluid" src={item.imageOne} alt="" />
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="text-white text-center mt-3 caroselTextDiv">
            <h2>NYHETER HERR</h2>
            <p>
              <i>Kollektion från ICIW, ADIDAS, NIKE...</i>
            </p>
            <Link to="/male">
              <Button variant="secondary" className="rounded-pill">
                Shoppa nu
              </Button>{' '}
            </Link>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Carosel;
