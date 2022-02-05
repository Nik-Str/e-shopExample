//Bootstrap
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
//css
import './style.css';

const Tables = ({ data, name, file, sex, position }) => {
  return (
    <Container fluid className="tableContainer mt-3">
      <div className="promotedItems shadow">
        <Table striped hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>{name}</th>
              <th>{file}</th>
              {sex && <th>{sex}</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <th>{position++}</th>
                {item.title && <td>{item.title}</td>}
                {item.screen && <td>{item.screen}</td>}
                <td>{item.name}</td>
                {item.brand && <td>{item.brand}</td>}
                {item.sex && <td>{item.sex}</td>}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Tables;
