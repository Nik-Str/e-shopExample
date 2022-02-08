//React
import { useEffect, useState, useRef } from 'react/cjs/react.development';
//Bootstrap
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import Accordion from 'react-bootstrap/Accordion';
//custom hooks
import usePOST from '../../hooks/usePOST';
import useDELETE from '../../hooks/useDELETE';
//Css
import '../style/admin.css';

//Api endpoint for promoted items
const URL_PRODUCT = 'http://localhost:8080/product';

const Products = ({ handleRefreshProducts }) => {
  //Display och not display toast
  const [isShow, setIsShow] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  //Change Between add and delete window
  const [productWindow, setProductWindow] = useState(true);

  //States and refs for add
  const [category, setCategory] = useState('Byxor');
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [sex, setSex] = useState('Herr');
  const [xsmall, setXsmall] = useState(false);
  const [small, setSmall] = useState(false);
  const [medium, setMedium] = useState(false);
  const [large, setLarge] = useState(false);
  const [xlarge, setXlarge] = useState(false);

  const fileOneRef = useRef(null);
  const fileTwoRef = useRef(null);
  const fileThreeRef = useRef(null);
  const { data, isLoading, isError, FetchPost } = usePOST();

  const handlePost = (e) => {
    e.preventDefault();
    //Files
    let formData = new FormData();
    formData.append('imageOne', fileOneRef.current.files[0]);
    if (fileTwoRef) {
      formData.append('imageTwo', fileTwoRef.current.files[0]);
    }
    if (fileThreeRef) {
      formData.append('imageThree', fileThreeRef.current.files[0]);
    }
    //Text
    formData.append('category', category);
    formData.append('name', name);
    formData.append('brand', brand);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('sex', sex);
    //Sizes
    formData.append('xsmall', xsmall);
    formData.append('small', small);
    formData.append('medium', medium);
    formData.append('large', large);
    formData.append('xlarge', xlarge);
    FetchPost(URL_PRODUCT, formData);
  };

  useEffect(() => {
    handleRefreshProducts();
    setName('');
    setBrand('');
    setPrice('');
    setDescription('');
    fileOneRef.current.value = null;
    fileTwoRef.current.value = null;
    fileThreeRef.current.value = null;
    if (data !== null) {
      setIsShow(true);
      setToastMessage(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  //States for delete
  const [remove, setRemove] = useState('');
  const { dataDelete, isLoadingDelete, isErrorDelete, Fetchdelete } = useDELETE();

  const handleDelete = (e) => {
    e.preventDefault();
    Fetchdelete(URL_PRODUCT, remove);
  };
  useEffect(() => {
    handleRefreshProducts();
    setRemove('');
    if (dataDelete !== null) {
      setToastMessage(dataDelete);
      setIsShow(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDelete]);

  //The onChange trigger the set.. function in the useState by using event.target.value and pass it
  return (
    <Container fluid className="createInputContainer">
      {/* ---------------Toast message up--------------- */}
      <Toast
        show={isShow}
        delay={3000}
        autohide
        onClose={() => setIsShow(false)}
        className="toastMessage bg-dark text-white"
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>

      {/* ----------------Admin Video------------------- */}
      <div className="mt-4 shadow adminMainDiv">
        <h2 className="text-center mb-4 adminUnderHeader">Produkter</h2>
        <div className="d-flex justify-content-center">
          <p className="editLinks mx-3 mb-0" onClick={() => setProductWindow(true)}>
            <strong>Lägg till</strong>
          </p>
          <p className="editLinks mx-3 mb-0" onClick={() => setProductWindow(false)}>
            <strong>Ta bort</strong>
          </p>
        </div>

        {/* -----------------------Add Form field------------------------ */}
        {productWindow && (
          <Form onSubmit={handlePost}>
            <Accordion defaultActiveKey={['0']} flush alwaysOpen className="mt-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Info:</Accordion.Header>
                <Accordion.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Titel</Form.Label>
                    <Form.Control type="text" required value={name} onChange={(e) => setName(e.target.value)} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Märke</Form.Label>
                    <Form.Control type="text" required value={brand} onChange={(e) => setBrand(e.target.value)} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Pris. (kr)</Form.Label>
                    <Form.Control type="number" required value={price} onChange={(e) => setPrice(e.target.value)} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Beskrivning</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Storlekar & Typ:</Accordion.Header>
                <Accordion.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Kategori</Form.Label>
                    <Form.Select required value={category} onChange={(e) => setCategory(e.target.value)}>
                      <option>Byxor</option>
                      <option>Jackor</option>
                      <option>Långärmat</option>
                      <option>Shorts</option>
                      <option>T-shirts</option>
                      <option>Tights</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>För</Form.Label>
                    <Form.Select required value={sex} onChange={(e) => setSex(e.target.value)}>
                      <option>Dam</option>
                      <option>Herr</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="d-flex">Storlekar</Form.Label>
                    <Form.Check inline label="Xsmall" onChange={() => setXsmall(!xsmall)} />
                    <Form.Check inline label="Small" onChange={() => setSmall(!small)} />
                    <Form.Check inline label="Medium" onChange={() => setMedium(!medium)} />
                    <Form.Check inline label="Large" onChange={() => setLarge(!large)} />
                    <Form.Check inline label="Xlarge" onChange={() => setXlarge(!xlarge)} />
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Bilder:</Accordion.Header>
                <Accordion.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Bild 1</Form.Label>
                    <Form.Control type="file" required ref={fileOneRef} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Bild 2</Form.Label>
                    <Form.Control type="file" ref={fileTwoRef} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Bild 3</Form.Label>
                    <Form.Control type="file" ref={fileThreeRef} />
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            {/* --------------------Loading message and button---------- */}
            <div className="d-flex justify-content-center">
              {!isLoading && !isError && (
                <Button type="submit" variant="outline-dark">
                  Lägg till
                </Button>
              )}
              {isLoading && !isError && (
                <Button variant="outline-dark" disabled>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  Loading...
                </Button>
              )}
              {isError && <div>{isError}</div>}
            </div>
          </Form>
        )}

        {/* ----------------------------Delete Form field -----------------------*/}
        {!productWindow && (
          <Form onSubmit={handleDelete}>
            <Form.Group className="mb-3">
              <Form.Label>Ange filnamn för borttagning</Form.Label>
              <Form.Control type="text" required value={remove} onChange={(e) => setRemove(e.target.value)} />
            </Form.Group>

            <div className="d-flex justify-content-center">
              {!isLoadingDelete && !isErrorDelete && (
                <Button type="submit" variant="outline-dark">
                  Ta bort
                </Button>
              )}
              {isLoadingDelete && !isErrorDelete && (
                <Button variant="outline-dark">
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  Loading...
                </Button>
              )}
              {isErrorDelete && <div>{isErrorDelete}</div>}
            </div>
          </Form>
        )}
      </div>
    </Container>
  );
};

export default Products;
