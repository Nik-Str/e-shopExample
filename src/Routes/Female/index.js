//React
import useFetch from '../../hooks/useFetchGET';
import { useEffect } from 'react';
//Components
import ProductList from '../../components/ProductList';
//css
import './style.css';

const Home = () => {
  //Set product container top margin
  useEffect(() => {
    function getHeaderHight() {
      let headerHight = document.querySelector('header').offsetHeight;
      document.querySelector('.product-container').style.marginTop = `${headerHight + 10}px`;
    }
    window.onresize = getHeaderHight;
    getHeaderHight();
  });

  //Destructs the 3 useState in useFetch hook. 'data: blogs' means we change its name to blogs
  const { data: products, isLoading, isError } = useFetch('http://localhost:8080/');

  return (
    <div className="product-container">
      {/* Isloading is showing 'Loading...' during fetch. When fetch is done, 
      the state of isLoading is sett to false, and removed from dom */}
      {isLoading && <div>Loading...</div>}

      {/* If isError is not null due to fetch error, then err.message is printed to dom */}
      {isError && <div>{isError}</div>}

      {/* Only renders is 'blogs' has a value */}
      {products && <ProductList products={products.data} />}
    </div>
  );
};

//------------------Styles-------------------

export default Home;
