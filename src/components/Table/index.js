//Bootstrap
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
//css
import './style.css';

const Tables = ({ data, name, idDB, position }) => {
  return (
    <Container fluid className="tableContainer mt-3">
      <div className="promotedItems shadow">
        <Table striped hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>{name}</th>
              <th>{idDB}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <th>{position++}</th>
                {item.title && <td>{item.title}</td>}
                {item.size && <td>{item.size}</td>}
                <td>{item._id}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Tables;
