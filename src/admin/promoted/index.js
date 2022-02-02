//React
import { useEffect, useState, useRef } from 'react/cjs/react.development';
//Bootstrap
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
//Dep
import axios from 'axios';
//Css
import './style.css';

const Promoted = () => {
  //useState in this examples tracks the changes for the inputs.
  //This replaces document.querrySelector().value and makes it's easy to work the values from the input
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const fileRef = useRef(null);

  //States for add
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  //Containers / refs for switching between add and delete forms
  const addRef = useRef(null);
  const deleteRef = useRef(null);

  const handleAddSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    //Upload
    var imageFile = fileRef.current;
    let formData = new FormData();
    formData.append('image', imageFile.files[0]);
    formData.append('title', title);
    formData.append('text', text);
    axios
      .post('http://localhost:8080/data/promoted/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response.status === 201) {
          setData(response.data.message);
          setIsError(null);
          setTimeout(() => {
            setData(null);
            setIsLoading(false);
            setTitle('');
            setText('');
            fileRef.current.value = null;
          }, 2000);
        } else {
          setIsLoading(false);
          throw new Error('Unknown Error, update page and try again...');
        }
      })
      .catch((err) => {
        //If the error is not a abort error, update state
        setIsLoading(false);
        setIsError(err.message);
      });
  };

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
      {/* ----------------Admin promoted------------------- */}
      <div id="adminPromoted" className="mt-4">
        <h2 className="text-center mb-4 text-decoration-underline">Promoted</h2>
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
            {!isLoading && !data && (
              <Button type="submit" variant="outline-dark">
                Lägg till
              </Button>
            )}
            {isLoading && !data && (
              <Button variant="outline-dark" disabled>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                Loading...
              </Button>
            )}
            {data && <p>{data}</p>}
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
