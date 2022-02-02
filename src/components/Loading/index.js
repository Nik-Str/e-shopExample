//Bootstrap
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
  return (
    <div className="d-flex justify-content-center">
      <Spinner as="span" animation="border" size="lg" role="status" aria-hidden="true" />
    </div>
  );
};

export default Loading;
