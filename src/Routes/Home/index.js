//React
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
//Custom hook
import useGET from '../../hooks/useGET';
//Bootstrap
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
//Components
import Promoted from '../../components/PromotedList';
import Loading from '../../components/Loading';
//Img
import payments from '../../img/home-payment-icons.png';
//Css
import './style.css';
//Api endpoint for promoted items
const URL_PROMOTED = 'http://localhost:8080/promoted';

const video_LG_URL = 'http://localhost:8080/video/large.mp4';
const video_SM_URL = 'http://localhost:8080/video/small.mp4';

const Home = () => {
  // Position the welcometext
  const welcomeRef = useRef(null);
  const videBgRef = useRef(null);
  const videoSmRef = useRef(null);
  useEffect(() => {
    function getVideoHight() {
      let videoHight;
      if (window.innerWidth > 768) {
        videoHight = videBgRef.current.offsetHeight;
      } else {
        videoHight = videoSmRef.current.offsetHeight;
      }
      welcomeRef.current.style.top = `${videoHight - videoHight / 3}px`;
    }
    window.onresize = getVideoHight;
    getVideoHight();
  });

  //Get Promoted items
  const { data: promoted, isLoading, isError, FetchGet } = useGET();

  useEffect(() => {
    FetchGet(URL_PROMOTED);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container fluid className="home-container bg-light">
      {/* -----------Video BG large screeens-------------- */}
      <video autoPlay muted loop className="videoBg home-bg-lg" ref={videBgRef}>
        <source src={video_LG_URL} type="video/mp4" />
      </video>
      {/* -----------Video BG smale screeens-------------- */}
      <video autoPlay muted loop className="videoBg home-bg-sm" ref={videoSmRef}>
        <source src={video_SM_URL} type="video/mp4" />
      </video>
      {/* -----------Link to shopping / welcome text-------------- */}
      <div ref={welcomeRef} className="home-welcome-div">
        <h1>Hållbara produkter på dina vilkor</h1>
        <Button variant="outline-light" className="rounded-pill p-2">
          <Link to="/producs">Shoppa nu</Link>
        </Button>
      </div>

      {/* ------------Highlighted products */}
      {isLoading && <Loading />}
      {isError && <div>{isError}</div>}
      {promoted && <Promoted products={promoted.data} />}

      {/* -----------Img on payments options-------------- */}
      <div className="home-img-div">
        <img className="img-fluid" src={payments} alt="payment options" />
      </div>
    </Container>
  );
};

export default Home;
