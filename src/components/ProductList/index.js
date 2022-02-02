import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
  return (
    <div className="blog-list">
      {products.map((item) => (
        <div className="blog-preview" key={item._id}>
          <Link to={`/product/${item._id}`}>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </Link>
          <img src={`http://localhost:8080${item.image}`} alt="" />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
