//Bootstrap
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
//css
import './style.css';
//Icons
import Linkedin from '@material-ui/icons/LinkedIn';

const Instagram = ({ data }) => {
  return (
    <Container fluid className="socialMediaDiv">
      <Row>
        <div className="col-12 col-lg-4 text-center mt-5 mt-lg-0 mb-5 mb-lg-0">
          <div>
            <div className="d-block mb-3">
              <a href="/">
                <Linkedin className="soc-icons" />
              </a>
            </div>
            <div className="d-block">
              <p>
                Letar du inspiration?
                <br />
                <i>
                  Besök vår Instagram, vi postar dagligen inlägg
                  <br />
                  fyllda med inspiration till nya outfits!
                </i>
              </p>
              <a href="/">
                <Button variant="outline-light" className="rounded-pill p-2">
                  Följ oss
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-8 instaImageDiv mb-5 mb-lg-0">
          <Row>
            {/* Här ska map rendera ut bilder från server 8st */}
            {data.map((item) => (
              <div className="col-6 col-lg-3 p-2" key={item._id}>
                <img className="img-fluid" src={item.url} alt="" />
              </div>
            ))}
          </Row>
        </div>
      </Row>
    </Container>
  );
};

export default Instagram;
