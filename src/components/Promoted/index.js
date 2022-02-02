//css
import './style.css';

const Promoted = ({ products }) => {
  return (
    <div className="row blog-list">
      {products.map((item) => (
        <div key={item._id} className="col-12 col-lg-4 text-center mt-3 bg-light">
          <img
            className="img-fluid promoted-img mt-3 mb-3"
            src={`http://localhost:8080${item.image}`}
            alt="Promoted service"
          />
          <h2>{item.title}</h2>
          <p>
            <i>{item.text}</i>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Promoted;
