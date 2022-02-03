//React
import { useEffect, useState, useRef } from 'react/cjs/react.development';
//Bootstrap
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
//Dep
import axios from 'axios';
//custom hooks
import useFetchPost from '../../hooks/useFetchPOST';
//Components
import Toast from 'react-bootstrap/Toast';
//Css
import './style.css';

const Promoted = ({ handleRefresh }) => {
  //useState in this examples tracks the changes for the inputs.
  //This replaces document.querrySelector().value and makes it's easy to work the values from the input
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const fileRef = useRef(null);

  //Display och not display toast
  const [isShow, setIsShow] = useState(false);

  //Containers / refs for switching between add and delete forms
  const addRef = useRef(null);
  const deleteRef = useRef(null);

  //States for add
  const { data, isLoading, isError, FetchPost } = useFetchPost();

  const handleAddSubmit = (e) => {
    e.preventDefault();

    //Upload
    let imageFile = fileRef.current;
    let formData = new FormData();
    formData.append('image', imageFile.files[0]);
    formData.append('title', title);
    formData.append('text', text);

    FetchPost('http://localhost:8080/data/promoted/add', formData);
  };
  useEffect(() => {
    handleRefresh();
    setTitle('');
    setText('');
    fileRef.current.value = null;
    if (data !== null) {
      setIsShow(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  //Change Between add and upload window
  const [promotedWindow, setPromotedWindow] = useState(true);
  const editPromotedWindow = (e) => {
    setPromotedWindow(e);
  };
  useEffect(() => {
    if (promotedWindow === true) {
      addRef.current.style.display = 'block';
      deleteRef.current.style.display = 'none';
    } else {
      addRef.current.style.display = 'none';
      deleteRef.current.style.display = 'block';
    }
  }, [promotedWindow]);

  //States for delete
  const [remove, setRemove] = useState('');
  const [removeLoading, setRemoveLoading] = useState(false);
  const [removeError, setRemoveError] = useState(null);
  const [removeMessage, setRemoveMessage] = useState(null);

  const handleDelete = (e) => {
    e.preventDefault();
    setRemoveLoading(true);
    axios
      .delete('http://localhost:8080/data/promoted/delete', { data: { remove: remove } })
      .then((response) => {
        if (response.status === 200) {
          setRemoveMessage(response.data.message);
          setRemove('');
          setRemoveError(null);
          setRemoveLoading(false);
          setTimeout(() => {
            setRemoveMessage(null);
            handleRefresh();
          }, 2000);
        } else {
          setRemoveLoading(false);
          throw new Error('Unknown Error, update page and try again...');
        }
      })
      .catch((err) => {
        setRemoveLoading(false);
        setRemoveError(err.message);
      });
  };

  //The onChange trigger the set.. function in the useState by using event.target.value and pass it
  return (
    <Container fluid className="createPromotedInputContainer">
      {/* ---------------Toast message up--------------- */}
      <Toast
        show={isShow}
        delay={3000}
        autohide
        onClose={() => setIsShow(false)}
        className="toastMessage bg-dark text-white"
      >
        <Toast.Body>{data}</Toast.Body>
      </Toast>
      {/* ----------------Admin promoted------------------- */}
      <div id="adminPromoted" className="mt-4 shadow">
        <h2 className="text-center mb-4 adminUnderHeader">Promoted</h2>
        <div className="d-flex justify-content-center">
          <p className="editLinks mx-3 mb-0" onClick={() => editPromotedWindow(true)}>
            <strong>Lägg till</strong>
          </p>
          <p className="editLinks mx-3 mb-0" onClick={() => editPromotedWindow(false)}>
            <strong>Ta borts</strong>
          </p>
        </div>

        {/* -----------------------Add Form field------------------------ */}
        <Form onSubmit={handleAddSubmit} ref={addRef}>
          <Form.Group className="mb-3">
            <Form.Label>Titel</Form.Label>
            <Form.Control type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control as="textarea" rows={3} required value={text} onChange={(e) => setText(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Bild</Form.Label>
            <Form.Control type="file" required ref={fileRef} />
          </Form.Group>
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

        {/* ----------------------------Delete Form field -----------------------*/}
        <Form ref={deleteRef} onSubmit={handleDelete}>
          <Form.Group className="mb-3">
            <Form.Label>Ange titel för borttagning</Form.Label>
            <Form.Control type="text" required value={remove} onChange={(e) => setRemove(e.target.value)} />
          </Form.Group>

          <div className="d-flex justify-content-center">
            {!removeLoading && !removeMessage && !removeError && (
              <Button type="submit" variant="outline-dark">
                Ta bort
              </Button>
            )}
            {removeLoading && !remove && (
              <Button variant="outline-dark">
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                Loading...
              </Button>
            )}
            {removeMessage && <p>{removeMessage}</p>}
            {removeError && <div>{removeError}</div>}
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Promoted;
