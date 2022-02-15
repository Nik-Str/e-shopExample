//React
import { useEffect, useRef, useState, useContext } from 'react';
import * as React from 'react';
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
import Modal from '../../components/Modal';
import SocialMedia from '../../admin/socialMedia';
import Instagram from '../../components/Instagram';
//Bootstrap
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
//Import UserContext from App.js
import { NavHeightContext } from '../../App';
//Css
import './style.css';

//Api endpoints
const URL_PROMOTED = 'http://localhost:8080/promoted';
const URL_VIDEO = 'http://localhost:8080/video';
const URL_PRODUCTS = 'http://localhost:8080/product';
const URL_SOCIAL_MEDIA = 'http://localhost:8080/socialmedia';

const Create = () => {
  //Set product container top margin
  const createRef = useRef(null);
  const { navHeight } = useContext(NavHeightContext);
  useEffect(() => {
    if (navHeight !== 0) {
      createRef.current.style.marginTop = `${navHeight + 30}px`;
    }
  }, [navHeight]);

  //Referens for switching between admin windows
  const [promotedShow, setPromotedShow] = useState(true);
  const [productShow, setProductShow] = useState(false);
  const [videoShow, setVideoShow] = useState(false);
  const [instaShow, setInstaShow] = useState(false);

  const handleSwitch = (e) => {
    if (e === 'promoted') {
      setPromotedShow(true);
      setProductShow(false);
      setVideoShow(false);
      setInstaShow(false);
    }

    if (e === 'product') {
      setPromotedShow(false);
      setProductShow(true);
      setVideoShow(false);
      setInstaShow(false);
    }

    if (e === 'video') {
      setPromotedShow(false);
      setProductShow(false);
      setVideoShow(true);
      setInstaShow(false);
    }

    if (e === 'instagram') {
      setInstaShow(true);
      setPromotedShow(false);
      setProductShow(false);
      setVideoShow(false);
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
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState([]);

  useEffect(() => {
    productsFetch(URL_PRODUCTS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleRefreshProducts = () => {
    productsFetch(URL_PRODUCTS);
  };

  //filter on products
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    if (products !== null) {
      setSearch(products.data);
    }
  }, [products]);

  const searchFiltered = search.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()));
  const searchFilteredPreview = searchFiltered.slice(-4);

  //Modal and update
  const [modalShow, setModalShow] = useState(false);

  const [modalData, setModalData] = useState('');

  const handleModalFilter = (itemId) => {
    setModalData(products.data.filter((item) => item._id === itemId));
  };

  const handleDisplayModal = () => {
    setModalShow(false);
  };

  //Get Social media items
  const { data: insta, isLoading: instaIsLoading, isError: instaIsError, FetchGet: getInsta } = useGET();
  useEffect(() => {
    getInsta(URL_SOCIAL_MEDIA);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleRefreshSocialMedia = () => {
    getInsta(URL_SOCIAL_MEDIA);
  };

  return (
    <>
      <div ref={createRef}>
        <Container fluid className="adminSelectType">
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
            <Button variant="dark" onClick={() => handleSwitch('instagram')}>
              Instagram
            </Button>
          </div>
        </Container>
        <hr className="mb-0" />
        <div className="div-create">
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
                  data={searchFiltered}
                  name={'Titel'}
                  file={'Märke'}
                  kategori={'Kategori'}
                  sex={'Typ'}
                  position={1}
                  handleFilter={handleFilter}
                  filter={filter}
                  update={'Editera'}
                  setModalShow={(e) => setModalShow(e)}
                  handleModalFilter={(e) => handleModalFilter(e)}
                />
              )}
              <hr className="mb-0" />
              {/* Products preview */}
              {productsLoading && <Loading />}
              {productsError && <div>{isError}</div>}
              {products && <ProductList products={searchFilteredPreview} />}
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

          {/* ----------------Instagram pictures handler-------------- */}
          {instaShow && (
            <div>
              <SocialMedia handleRefreshSocialMedia={handleRefreshSocialMedia} />
              {insta && <Table data={insta.data} file={'Filnamn'} position={1} />}
              <hr className="mb-0" />
              {/* Instagram preview */}
              {instaIsLoading && <Loading />}
              {instaIsError && <div>{instaIsError}</div>}
              {insta && <Instagram data={insta.data} />}
            </div>
          )}
        </div>
        {/* -----------------Modal for Updates----------------- */}
        {modalData && (
          <Modal
            data={modalData[0]}
            show={modalShow}
            onHide={() => setModalShow(false)}
            handleDisplayModal={handleDisplayModal}
            handleRefreshProducts={handleRefreshProducts}
          />
        )}
      </div>
    </>
  );
};

export default Create;
