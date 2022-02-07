import { useEffect, useRef, useState } from 'react';
//Bootstrap
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
//Custom hooks
import usePUT from '../../hooks/usePUT';
//css
import './style.css';
//Api endpoint for promoted items
const URL_PRODUCT = 'http://localhost:8080/product';

const Modals = ({ data, show, onHide, handleDisplayModal }) => {
  //States and refs for add
  const [category, setCategory] = useState('Byxor');
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [sex, setSex] = useState('Herr');
  const [xsmall, setXsmall] = useState(null);
  const [small, setSmall] = useState(null);
  const [medium, setMedium] = useState(null);
  const [large, setLarge] = useState(null);
  const [xlarge, setXlarge] = useState(null);

  useEffect(() => {
    setCategory(data.category);
    setName(data.name);
    setBrand(data.brand);
    setPrice(data.price);
    setDescription(data.description);
    setSex(data.sex);
    setXsmall(data.xsmall);
    setSmall(data.small);
    setMedium(data.medium);
    setLarge(data.large);
    setXlarge(data.xlarge);
  }, [data]);

  const { data: update, isLoading, isError, FetchPost } = usePUT();
  const handleUpdate = (e) => {
    e.preventDefault();

    let dataUpdate = {
      category: category,
      name: name,
      brand: brand,
      price: price,
      description: description,
      sex: sex,
      xsmall: xsmall,
      small: small,
      medium: medium,
      large: large,
      xlarge: xlarge,
    };

    FetchPost(URL_PRODUCT, dataUpdate);
  };

  useEffect(() => {
    if (update !== null) {
      handleDisplayModal(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  return (
    //{...props} means copy the propeties show and onHide passed from 'create'
    <Modal
      show={show}
      onHide={() => {
        onHide();
        setName('');
        setBrand('');
        setPrice('');
        setDescription('');
        setXsmall(null);
        setSmall(null);
        setMedium(null);
        setLarge(null);
        setXlarge(null);
      }}
      size="lg"
    >
      <Modal.Header className="bg-dark text-white" closeButton>
        <Modal.Title>Uppdatera:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {data && (
          <Form onSubmit={handleUpdate}>
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

            <Form.Group className="mb-3">
              <Form.Label>För</Form.Label>
              <Form.Select required value={sex} onChange={(e) => setSex(e.target.value)}>
                <option>Dam</option>
                <option>Herr</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="d-flex">Storlekar</Form.Label>
              <Form.Check inline label="Xsmall" defaultChecked={xsmall} onChange={() => setXsmall(!xsmall)} />
              <Form.Check inline label="Small" defaultChecked={small} onChange={() => setSmall(!small)} />
              <Form.Check inline label="Medium" defaultChecked={medium} onChange={() => setMedium(!medium)} />
              <Form.Check inline label="Large" defaultChecked={large} onChange={() => setLarge(!large)} />
              <Form.Check inline label="Xlarge" defaultChecked={xlarge} onChange={() => setXlarge(!xlarge)} />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        {/* --------------------Loading message and button---------- */}
        <div className="m-auto">
          {!isLoading && !isError && (
            <Button type="submit" variant="outline-dark">
              Update
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
      </Modal.Footer>
    </Modal>
  );
};

export default Modals;
