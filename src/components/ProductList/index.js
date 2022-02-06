//React
import { Link } from 'react-router-dom';
//Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
//Css
import './style.css';

const ProductList = ({ products }) => {
  return (
    <Container fluid>
      <Row>
        {products.map((item) => (
          <div key={item._id} className="col-12 col-lg-3  p-3 bg-light productsPreview">
            <Link to={`/product/${item._id}`}>
              <img className="img-fluid" src={item.imageOne} alt="" />
              <p>{item.name}</p>
              <p>
                <strong>{item.price} kr</strong>
              </p>
            </Link>
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
