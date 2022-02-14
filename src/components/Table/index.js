//React
import * as React from 'react';
//Bootstrap
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//css
import './style.css';

//memo api is used here to prevent initial unnecessary re-rendering
const Tables = React.memo(
  ({ data, name, file, sex, position, kategori, handleFilter, filter, update, handleModalFilter, setModalShow }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
    };

    return (
      <Container fluid className="tableContainer mt-3">
        <div className="tableItems shadow">
          {handleFilter && (
            // Value och onChange måste nog länka till state i create
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3 text-center">
                <Form.Control type="text" placeholder="Filtrera på titel" value={filter} onChange={handleFilter} />
              </Form.Group>
            </Form>
          )}
          <Table striped hover size="sm tableDiv">
            <thead>
              <tr>
                <th>#</th>
                {name && <th>{name}</th>}
                <th>{file}</th>
                {kategori && <th className="d-none d-md-table-cell">{kategori}</th>}
                {sex && <th className="d-none d-md-table-cell">{sex}</th>}
                {update && <th>{update}</th>}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <th>{position++}</th>
                  {item.title && <td>{item.title}</td>}
                  {item.screen && <td>{item.screen}</td>}
                  {item.name && <td>{item.name}</td>}
                  {item.brand && <td>{item.brand}</td>}
                  {item.category && <td className="d-none d-md-table-cell">{item.category}</td>}
                  {item.sex && <td className="d-none d-md-table-cell">{item.sex}</td>}

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
  }
);

export default Tables;
