//React
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import useFetch from '../../hooks/useFetchGET';
//Bootstrap
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
//video
import videoLg from '../../video/home-video.mp4';
import videoSm from '../../video/home-video-sm.mp4';
//Components
import Promoted from '../../components/Promoted';
//Img
import payments from '../../img/home-payment-icons.png';
//Css
import './style.css';

const Home = () => {
  // Position the welcometext
  useEffect(() => {
    function getVideoHight() {
      let videoHight;
      if (window.innerWidth > 768) {
        videoHight = document.querySelector('#home-bg-lg').offsetHeight;
      } else {
        videoHight = document.querySelector('#home-bg-sm').offsetHeight;
      }
      document.querySelector('.home-welcome-div').style.top = `${videoHight - videoHight / 3}px`;
    }
    window.onresize = getVideoHight;
    getVideoHight();
  });

  //Get Promoted items
  const { data: products, isLoading, isError } = useFetch('http://localhost:8080/');
  return (
    <Container fluid className="home-container bg-light">
      {/* -----------Video BG large screeens-------------- */}
      <video autoPlay muted loop className="videoBg" id="home-bg-lg">
        <source src={videoLg} type="video/mp4" />
      </video>
      {/* -----------Video BG smale screeens-------------- */}
      <video autoPlay muted loop className="videoBg" id="home-bg-sm">
        <source src={videoSm} type="video/mp4" />
      </video>
      {/* -----------Link to shopping / welcome text-------------- */}
      <div className="home-welcome-div">
        <h1>Hållbara produkter på dina vilkor</h1>
        <Button variant="outline-light" className="rounded-pill p-2">
          <Link to="/producs">Shoppa nu</Link>
        </Button>
      </div>

      {/* ------------Highlighted products */}
      {isLoading && <div>Loading...</div>}
      {isError && <div>{isError}</div>}
      {products && <Promoted products={products.data} />}

      {/* -----------Img on payments options-------------- */}
      <div className="home-img-div">
        <img className="img-fluid" src={payments} alt="payment options" />
      </div>
    </Container>
  );
};

export default Home;
