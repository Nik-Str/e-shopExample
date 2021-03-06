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
const URL_VIDEO = 'http://localhost:8080/video';

const Promoted = ({ handleRefreshVideo }) => {
  //Display och not display toast
  const [isShow, setIsShow] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  //Change Between add and delete window
  const [videoWindow, setVideoWindow] = useState(true);

  //States and refs for add
  const [screenSize, setScreenSize] = useState('Stor video');
  const fileRef = useRef(null);
  const { data, isLoading, isError, FetchPost } = usePOST();

  const handlePost = (e) => {
    e.preventDefault();
    //Upload
    let videoFile = fileRef.current;
    let formData = new FormData();
    formData.append('video', videoFile.files[0]);
    formData.append('screenSize', screenSize);

    FetchPost(URL_VIDEO, formData);
  };

  useEffect(() => {
    handleRefreshVideo();
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
    Fetchdelete(URL_VIDEO, remove);
  };
  useEffect(() => {
    handleRefreshVideo();
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
      <div className="shadow adminMainDiv bg-light bg-opacity-75 border">
        <h2 className="text-center mb-4 adminUnderHeader">Video</h2>
        <div className="d-flex justify-content-center">
          <p className="editLinks mx-3 mb-0" onClick={() => setVideoWindow(true)}>
            <strong>L??gg till</strong>
          </p>
          <p className="editLinks mx-3 mb-0" onClick={() => setVideoWindow(false)}>
            <strong>Ta bort</strong>
          </p>
        </div>

        {/* -----------------------Add Form field------------------------ */}
        {videoWindow && (
          <Form onSubmit={handlePost}>
            <Form.Group className="mb-3">
              <Form.Label>Sk??rm typ</Form.Label>
              <Form.Select required value={screenSize} onChange={(e) => setScreenSize(e.target.value)}>
                <option>Stor video</option>
                <option>Liten video</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Video</Form.Label>
              <Form.Control type="file" required ref={fileRef} />
            </Form.Group>
            {/* --------------------Loading message and button---------- */}
            <div className="d-flex justify-content-center">
              {!isLoading && !isError && (
                <Button type="submit" variant="outline-dark">
                  L??gg till
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
            <div style={{ fontSize: '0.8rem' }}>
              <p className="m-0">
                <strong>Stor Video: </strong>rek* 1920x1080
              </p>
              <p className="m-0">
                <strong>Liten Video: </strong>rek* 1080x1920
              </p>
            </div>
          </Form>
        )}

        {/* ----------------------------Delete Form field -----------------------*/}
        {!videoWindow && (
          <Form onSubmit={handleDelete}>
            <Form.Group className="mb-3">
              <Form.Label>Ange filnamn f??r borttagning</Form.Label>
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

export default Promoted;
