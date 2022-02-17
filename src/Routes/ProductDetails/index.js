//React
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState, useContext } from 'react';
//Custom hooks
import useGET from '../../hooks/useGET';
//Import UserContext from App.js
import { NavHeightContext } from '../../App';
//Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Carousel from 'react-bootstrap/Carousel';
//Components
import Loading from '../../components/Loading';
//Icons
import Bag from '@material-ui/icons/WorkOutlineOutlined';
//Css
import './style.css';
//API Endpoints
const URL_PRODUCT = 'http://localhost:8080/product/';

const ProductDetails = () => {
  //Set product container top margin
  const conterinerRef = useRef(null);
  const { navHeight } = useContext(NavHeightContext);
  useEffect(() => {
    if (navHeight !== 0) {
      conterinerRef.current.style.marginTop = `${navHeight + 30}px`;
    }
  }, [navHeight]);

  //Enebles to grab the Params id in the url
  const { id } = useParams();
  //Fetching product data from server
  const { data: product, isLoading, isError, FetchGet } = useGET();

  useEffect(() => {
    FetchGet(URL_PRODUCT + id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Add to cart
  const [size, setSize] = useState('');
  const optionRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (size !== '') {
      optionRef.current.style.border = '1px solid #ced4da';
      let cart = [];

      let storage = localStorage.getItem('Eshop');
      if (storage !== null) {
        cart = JSON.parse(storage);
      }
      cart.push({ id: product.data._id, size: size });
      localStorage.setItem('Eshop', JSON.stringify(cart));
      console.log(localStorage.getItem('Eshop'));
    } else {
      optionRef.current.style.border = '3px solid #FFA9A9';
    }
  };

  return (
    <div ref={conterinerRef}>
      <Container id="idContainer d-flex">
        {product && (
          <Row>
            <div className="col-12 col-lg-7 mb-4 d-flex justify-content-end">
              <Carousel fade className="carouselProduct" variant="dark">
                {product.data.imageOne && (
                  <Carousel.Item>
                    <img className="img-fluid" src={product.data.imageOne} alt="Clothes" />
                  </Carousel.Item>
                )}

                {product.data.imageTwo && (
                  <Carousel.Item>
                    <img className="img-fluid" src={product.data.imageTwo} alt="Clothes" />
                  </Carousel.Item>
                )}

                {product.data.imageThree && (
                  <Carousel.Item>
                    <img className="img-fluid" src={product.data.imageThree} alt="Clothes" />
                  </Carousel.Item>
                )}
              </Carousel>
            </div>
            <div className="col-12 col-lg-5 mb-4">
              <p className="text-secondary mb-0" style={{ fontSize: '0.9rem' }}>
                {product.data.brand}
              </p>
              <h4>{product.data.name}</h4>
              <p>{product.data.price} kr</p>
              <Form onSubmit={handleSubmit}>
                <Form.Select className="mb-2 shadow-none" onChange={(e) => setSize(e.target.value)} ref={optionRef}>
                  <option value="">Välj storlek</option>
                  {product.data.xsmall && <option value="xsmall">X-Small</option>}
                  {product.data.small && <option value="small">Small</option>}
                  {product.data.medium && <option value="medium">Medium</option>}
                  {product.data.large && <option value="large">Large</option>}
                  {product.data.xlarge && <option value="large">X-Large</option>}
                </Form.Select>
                <Button variant="dark" className="d-flex w-100" type="submit">
                  <div className="position-relative top-50 start-50 translate-middle-x">Lägg i varukorg </div>
                  <div className="ms-auto">
                    <Bag />
                  </div>
                </Button>
              </Form>
              <article className="my-4">
                <h4>Beskrivning</h4>
                <p>{product.data.description}</p>
                <h4>Material</h4>
                <p>{product.data.material}</p>
                <h4>Färg</h4>
                <img className="img-fluid colorIMG" src={product.data.color} alt="color" />
              </article>
              <div>
                <h4 className="text-secondary">Recensioner</h4>
                <article></article>
                <hr />
              </div>
            </div>
          </Row>
        )}

        {isLoading && (
          <div id="idLoading">
            <Loading />
          </div>
        )}
        {isError && <div>{isError}</div>}
      </Container>
    </div>
  );
};

export default ProductDetails;
