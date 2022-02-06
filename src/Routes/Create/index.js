//React
import { useEffect, useRef, useState } from 'react';
//Custom hooks
import useGET from '../../hooks/useGET';
//Components
import PromotedInput from '../../admin/promoted';
import Promoted from '../../components/PromotedList';
import Loading from '../../components/Loading';
import Table from '../../components/Table';
import VideoInput from '../../admin/movie/index';
import VideoPreview from '../../components/videoPreview';
import ProductInput from '../../admin/products';
import ProductList from '../../components/ProductList';
//Bootstrap
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
//Css
import './style.css';
//Api endpoint for promoted items
const URL_PROMOTED = 'http://localhost:8080/promoted';
const URL_VIDEO = 'http://localhost:8080/video';
const URL_PRODUCTS = 'http://localhost:8080/product';

const Create = () => {
  //Set product container top margin
  const createRef = useRef(null);
  useEffect(() => {
    function getHeaderHight() {
      let headerHight = document.querySelector('header').offsetHeight;
      createRef.current.style.marginTop = `${headerHight + 30}px`;
    }
    window.onresize = getHeaderHight;
    getHeaderHight();
  });

  //Referens for switching between admin windows
  const [promotedShow, setPromotedShow] = useState(true);
  const [productShow, setProductShow] = useState(false);
  const [videoShow, setVideoShow] = useState(false);

  const handleSwitch = (e) => {
    if (e === 'promoted') {
      setPromotedShow(true);
      setProductShow(false);
      setVideoShow(false);
    }

    if (e === 'product') {
      setPromotedShow(false);
      setProductShow(true);
      setVideoShow(false);
    }

    if (e === 'video') {
      setPromotedShow(false);
      setProductShow(false);
      setVideoShow(true);
    }
  };

  //Get Promoted items
  const { data: promoted, isLoading, isError, FetchGet } = useGET();
  useEffect(() => {
    FetchGet(URL_PROMOTED);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleRefresh = () => {
    FetchGet(URL_PROMOTED);
  };

  //Get Video items
  const { data: video, isLoading: videoLoading, isError: videoError, FetchGet: videoFetch } = useGET();
  useEffect(() => {
    videoFetch(URL_VIDEO);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleRefreshVideo = () => {
    videoFetch(URL_VIDEO);
  };

  //Get Products items
  const { data: products, isLoading: productsLoading, isError: productsError, FetchGet: productsFetch } = useGET();
  useEffect(() => {
    productsFetch(URL_PRODUCTS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleRefreshProducts = () => {
    productsFetch(URL_PRODUCTS);
  };

  //filter on products
  const filter = (a) => {
    console.log(a);
  };

  return (
    <>
      <div ref={createRef}>
        <Container fluid className="adminSelectType">
          <h1 className="text-center">Administrera</h1>
          <div className="adminSelect">
            <Button variant="dark" onClick={() => handleSwitch('promoted')}>
              Promoted
            </Button>
            <Button variant="dark" onClick={() => handleSwitch('product')}>
              Produkter
            </Button>
            <Button variant="dark" onClick={() => handleSwitch('video')}>
              Video
            </Button>
          </div>
        </Container>
        <hr />
        {/* -----------------Promoted handlers-------------------- */}
        {promotedShow && (
          <div>
            <PromotedInput handleRefresh={handleRefresh} />
            {promoted && <Table data={promoted.data} name={'Titel'} file={'Filnamn'} position={1} />}
            <hr className="mb-0" />
            {/* Promoted preview */}
            {isLoading && <Loading />}
            {isError && <div>{isError}</div>}
            {promoted && <Promoted products={promoted.data} />}
          </div>
        )}
        {/* ------------------Products handlers------------------- */}
        {productShow && (
          <div>
            <ProductInput handleRefreshProducts={handleRefreshProducts} />
            {products && (
              <Table
                data={products.data}
                name={'Titel'}
                file={'Märke'}
                kategori={'Kategori'}
                sex={'Typ'}
                position={1}
                filter={filter}
              />
            )}
            <hr className="mb-0" />
            {/* Products preview */}
            {productsLoading && <Loading />}
            {productsError && <div>{isError}</div>}
            {products && <ProductList products={products.data} />}
          </div>
        )}

        {/* ------------------Video handlers------------------- */}
        {videoShow && (
          <div>
            <VideoInput handleRefreshVideo={handleRefreshVideo} />
            {video && <Table data={video.data} name={'Skärm typ'} file={'Filnamn'} position={1} />}
            <hr className="mb-0" />
            {/* Video preview */}
            {videoLoading && <Loading />}
            {videoError && <div>{videoError}</div>}
            {video && <VideoPreview video={video.data} />}
          </div>
        )}
      </div>
    </>
  );
};

export default Create;
