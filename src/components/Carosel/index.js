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
      <Row className="caroselRow">
        {/* Female Clothes */}
        <div className="col-12 col-lg-4 caroselDiv my-lg-5 mb-5 p-3 p-lg-1">
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
        <div className="col-12 col-lg-4 caroselDiv my-lg-5 mb-3 p-3 p-lg-1">
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
        {/* --------------- Text------------------ */}
        <div className="col-12 col-lg-4 my-lg-auto mt-3 mb-2 p-3 p-lg-1 text-white text-center">
          <h3>Nordisk kvalitet</h3>
          <p>
            <i>
              "E-Shop är stolt återförsäljare av de ledande märkerna <br className="d-none d-lg-block" />
              inom fitness och hälsa. Vi tror på kvalitet före <br className="d-none d-lg-block" />
              kvantitet och handplockar utvalda produkter <br className="d-none d-lg-block" />
              med garanterad lång hållbarhet."
            </i>
            <br />
            <strong className="ceoQuote">Ida J. CEO</strong>
          </p>
          <a href="/" className="text-decoration-none text-secondary">
            <h5>
              <strong>#E-SHOP</strong>
            </h5>
          </a>
        </div>
      </Row>
    </Container>
  );
};

export default Carosel;
