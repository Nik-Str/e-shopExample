//Bootstrap
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
//css
import './style.css';

const Tables = ({ data, name, file, sex, position, kategori, filter }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container fluid className="tableContainer mt-3">
      <div className="promotedItems shadow">
        {filter && (
          // Vlue och onChange måste nog länka till state i create
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 text-center">
              <Form.Control type="text" placeholder="Filter" />
            </Form.Group>
          </Form>
        )}
        <Table striped hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>{name}</th>
              <th>{file}</th>
              {kategori && <th>{kategori}</th>}
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
                {item.category && <td>{item.category}</td>}
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
