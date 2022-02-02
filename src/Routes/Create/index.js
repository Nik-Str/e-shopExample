//React
import { useEffect, useRef } from 'react';
//Custom hooks
import useFetch from '../../hooks/useFetchGET';
//Components
import PromotedInput from '../../admin/promoted';
import Promoted from '../../components/PromotedList';
import Loading from '../../components/Loading';
//Bootstrap
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
//Css
import './style.css';

const Create = () => {
  //Set product container top margin
  useEffect(() => {
    function getHeaderHight() {
      let headerHight = document.querySelector('header').offsetHeight;
      createRef.current.style.marginTop = `${headerHight + 30}px`;
    }
    window.onresize = getHeaderHight;
    getHeaderHight();
  });

  const createRef = useRef(null);

  //Get Promoted items
  const { data: promoted, isLoading, isError } = useFetch('http://localhost:8080/promoted');

  return (
    <>
      <div ref={createRef}>
        <Container fluid className="adminSelectType">
          <h1 className="text-center">Administrera</h1>
          <div className="adminSelect">
            <Button variant="dark">Promoted</Button>
            <Button variant="dark">Produkter</Button>
            <Button variant="dark">Video</Button>
          </div>
        </Container>
        <hr />
        {/* -----------------Promoted handlers-------------------- */}
        <div id="promotedDisplay">
          <PromotedInput />
          <hr className="mb-0" />
          {/* Highlighted products preview */}
          {isLoading && <Loading />}
          {isError && <div>{isError}</div>}
          {promoted && <Promoted products={promoted.data} />}
        </div>

        {/* ------------------Products handlers------------------- */}
        <div id="productsDisplay">
          <h3>Form fields for products</h3>
        </div>
      </div>
    </>
  );
};

export default Create;
