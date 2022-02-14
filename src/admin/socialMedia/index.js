//React
import { useEffect, useState, useRef } from 'react/cjs/react.development';
//Bootstrap
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
//custom hooks
import usePOST from '../../hooks/usePOST';
import useDELETE from '../../hooks/useDELETE';
//Css
import '../style/admin.css';
//Api endpoint for promoted items
const URL_SOCIAL_MEDIA = 'http://localhost:8080/socialmedia';

const Promoted = ({ handleRefreshSocialMedia }) => {
  //useState in this examples tracks the changes for the inputs.
  const fileRef = useRef(null);

  //Display och not display toast
  const [isShow, setIsShow] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  //Containers / refs for switching between add and delete forms
  const addRef = useRef(null);
  const deleteRef = useRef(null);

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

  //States for add
  const { data, isLoading, isError, FetchPost } = usePOST();

  const handleAddSubmit = (e) => {
    e.preventDefault();

    //Upload
    let imageFile = fileRef.current;
    let formData = new FormData();
    formData.append('image', imageFile.files[0]);

    FetchPost(URL_SOCIAL_MEDIA, formData);
  };
  useEffect(() => {
    handleRefreshSocialMedia();
    fileRef.current.value = null;
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
    Fetchdelete(URL_SOCIAL_MEDIA, remove);
  };
  useEffect(() => {
    handleRefreshSocialMedia();
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

      {/* ----------------Admin promoted------------------- */}
      <div className="shadow adminMainDiv">
        <h2 className="text-center mb-4 adminUnderHeader">Instagram</h2>
        <div className="d-flex justify-content-center">
          <p className="editLinks mx-3 mb-0" onClick={() => editPromotedWindow(true)}>
            <strong>Lägg till</strong>
          </p>
          <p className="editLinks mx-3 mb-0" onClick={() => editPromotedWindow(false)}>
            <strong>Ta bort</strong>
          </p>
        </div>

        {/* -----------------------Add Form field------------------------ */}
        <Form onSubmit={handleAddSubmit} ref={addRef}>
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
      </div>
    </Container>
  );
};

export default Promoted;
