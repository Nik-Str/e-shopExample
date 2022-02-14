//React
import { useEffect, useRef, useState, useReducer } from 'react';
//Custom hooks
import useGET from '../../hooks/useGET';
//Components
import ProductList from '../../components/ProductList';
import Loading from '../../components/Loading';
import FilterDiv from '../../components/Filter';
import Reducer from '../../hooks/useReducer';
//Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
//Icons
import FilterIcon from '@material-ui/icons/BallotOutlined';
//css
import './style.css';
//Api endpoints
const URL_PRODUCTS_FEMALE = 'http://localhost:8080/female';

const Home = () => {
  //Set product container top margin
  const conterinerRef = useRef(null);
  useEffect(() => {
    function getHeaderHight() {
      let headerHight = document.querySelector('header').offsetHeight;
      conterinerRef.current.style.marginTop = `${headerHight + 30}px`;
    }
    window.onresize = getHeaderHight;
    getHeaderHight();
  });

  //Get female clothes
  const { data: product, isLoading, isError, FetchGet } = useGET();
  //Get products on render
  useEffect(() => {
    FetchGet(URL_PRODUCTS_FEMALE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Offcanvas
  const [show, setShow] = useState(false);
  const [screen, setScreen] = useState(true);
  useEffect(() => {
    function getScreenSize() {
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

      if (width < 992) {
        if (screen) setScreen(false);
      } else {
        if (!screen) setScreen(true);
        if (show) setShow(false);
      }
    }
    window.onresize = getScreenSize;
    getScreenSize();
  });

  const [sort, setSort] = useState('Nyaste');
  const [filter, setFilter] = useState('');
  const [size, setSize] = useState('');

  const [productsFiltered, setproductFiltered] = useReducer(Reducer, {
    sort: sort,
    filter: filter,
    size: size,
    data: product,
  });

  useEffect(() => {
    if (product !== null) {
      setproductFiltered({ sort: sort, filter: filter, size: size, data: product.data });
    }
  }, [sort, filter, size, product]);

  //Denna kan jag ta bort när jag har utvecklat hela funktionen klart
  useEffect(() => {
    console.log(productsFiltered);
  }, [productsFiltered]);

  return (
    <div ref={conterinerRef}>
      <Container>
        <Row className="d-flex d-lg-none col-12 px-5">
          <Button variant="outline-dark" onClick={() => setShow(true)}>
            <FilterIcon />
            Filtrera
          </Button>{' '}
        </Row>
        <Row>
          {/* Filter on page LG-Screen */}
          <div className="d-none d-lg-block col-0 col-lg-2">
            {screen && (
              <FilterDiv
                sort={sort}
                setSort={setSort}
                filter={filter}
                setFilter={setFilter}
                size={size}
                setSize={setSize}
              />
            )}
          </div>

          {/* Filter on Offcanvas SM-Screen */}
          <Offcanvas show={show} onHide={() => setShow(false)} scroll={true} backdrop={false}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title className="border-bottom border-3 border-dark"></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {!screen && (
                <FilterDiv
                  sort={sort}
                  setSort={setSort}
                  filter={filter}
                  setFilter={setFilter}
                  size={size}
                  setSize={setSize}
                />
              )}
            </Offcanvas.Body>
          </Offcanvas>

          {/* poducts articles */}
          <div className="col-12 col-lg-10 mb-5">
            {isLoading && <Loading />}
            {isError && <div>{isError}</div>}
            {Array.isArray(productsFiltered.data) && <ProductList products={productsFiltered.data} />}
          </div>
        </Row>
      </Container>
    </div>
  );
};

//------------------Styles-------------------

export default Home;
