//Bootstrap
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//css
import './style.css';

const Tables = ({
  data,
  name,
  file,
  sex,
  position,
  kategori,
  handleFilter,
  filter,
  update,
  setModalShow,
  handleModalFilter,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container fluid className="tableContainer mt-3">
      <div className="promotedItems shadow">
        {handleFilter && (
          // Value och onChange måste nog länka till state i create
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 text-center">
              <Form.Control type="text" placeholder="Filtrera på titel" value={filter} onChange={handleFilter} />
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
              {update && <th>{update}</th>}
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
                {update && (
                  <td>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => {
                        setModalShow(true);
                        handleModalFilter(item._id);
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Tables;
