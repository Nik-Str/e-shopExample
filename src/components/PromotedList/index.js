//Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
//css
import './style.css';

const Promoted = ({ products }) => {
  return (
    <Container fluid className="bg-light">
      <Row className="d-flex justify-content-center">
        {products.map((item) => (
          <div key={item._id} className="col-12 col-lg-3 text-center p-3">
            <img className="img-fluid promoted-img mt-3 mb-3" src={item.url} alt="Promoted service" />
            <h2>{item.title}</h2>
            <p>
              <i>{item.text}</i>
            </p>
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default Promoted;
