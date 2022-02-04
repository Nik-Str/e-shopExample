//Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
//css
import './style.css';

const VideoPreview = ({ video }) => {
  return (
    <Container fluid>
      <Row>
        {video.map((item) => (
          <div key={item._id} className="col-12 col-lg-6 text-center p-3 bg-light">
            <h4>{item.size}</h4>
            <video autoPlay muted loop className="previewVideo">
              <source src={item.video} type="video/mp4" />
            </video>
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default VideoPreview;
