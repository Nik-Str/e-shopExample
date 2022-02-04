//React
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
//Custom hooks
import useGET from '../../hooks/useGET';
//Css
import './style.css';

const ProductDetails = () => {
  //Enebles to grab the Params id in the url
  const { id } = useParams();
  //Fetching product data from server
  const { data: product, isLoading, isError } = useGET('http://localhost:8080/product/' + id);
  //Set product container top margin
  useEffect(() => {
    function getHeaderHight() {
      let headerHight = document.querySelector('header').offsetHeight;
      document.querySelector('.product-container').style.marginTop = `${headerHight + 10}px`;
    }
    window.onresize = getHeaderHight;
    getHeaderHight();
  });

  return (
    <div className="blog-details product-container">
      {isLoading && <div>Loading...</div>}
      {isError && <div>{isError}</div>}
      {product && (
        <article>
          <h2>{product.data.title}</h2>
          <p>Written by {product.data.author}</p>
          <div>{product.data.body}</div>
        </article>
      )}
    </div>
  );
};

export default ProductDetails;
