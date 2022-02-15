//Bootstrap
import Form from 'react-bootstrap/Form';

const Filter = ({ sort, setSort, filter, setFilter, size, setSize, sex }) => {
  return (
    <div>
      <h3>
        <strong>{sex}</strong>
      </h3>
      <p>
        <strong>Sortera artiklar</strong>
      </p>
      <Form className="mb-3" onChange={(e) => setSort(e.target.value)}>
        {sort === 'Nyaste' ? (
          <Form.Check type="radio" value="Nyaste" label="Nyaste" name="g1" defaultChecked />
        ) : (
          <Form.Check type="radio" value="Nyaste" label="Nyaste" name="g1" />
        )}

        {sort === 'Namn A-Ö' ? (
          <Form.Check type="radio" value="Namn A-Ö" label="Namn A-Ö" name="g1" defaultChecked />
        ) : (
          <Form.Check type="radio" value="Namn A-Ö" label="Namn A-Ö" name="g1" />
        )}

        {sort === 'Namn Ö-A' ? (
          <Form.Check type="radio" value="Namn Ö-A" label="Namn Ö-A" name="g1" defaultChecked />
        ) : (
          <Form.Check type="radio" value="Namn Ö-A" label="Namn Ö-A" name="g1" />
        )}

        {sort === 'Lägst pris' ? (
          <Form.Check type="radio" value="Lägst pris" label="Lägst pris" name="g1" defaultChecked />
        ) : (
          <Form.Check type="radio" value="Lägst pris" label="Lägst pris" name="g1" />
        )}

        {sort === 'Högst pris' ? (
          <Form.Check type="radio" value="Högst pris" label="Högst pris" name="g1" defaultChecked />
        ) : (
          <Form.Check type="radio" value="Högst pris" label="Högst pris" name="g1" />
        )}
      </Form>

      <p>
        <strong>Filtrera artiklar</strong>
      </p>
      <Form className="mb-3" onChange={(e) => setFilter(e.target.value)}>
        {filter === '' ? (
          <Form.Check type="radio" value="" label="Alla" name="g2" defaultChecked />
        ) : (
          <Form.Check type="radio" value="" label="Alla" name="g2" />
        )}

        {filter === 'Byxor' ? (
          <Form.Check type="radio" value="Byxor" label="Byxor" name="g2" defaultChecked />
        ) : (
          <Form.Check type="radio" value="Byxor" label="Byxor" name="g2" />
        )}

        {filter === 'Jackor' ? (
          <Form.Check type="radio" value="Jackor" label="Jackor" name="g2" defaultChecked />
        ) : (
          <Form.Check type="radio" value="Jackor" label="Jackor" name="g2" />
        )}

        {filter === 'Långärmat' ? (
          <Form.Check type="radio" value="Långärmat" label="Långärmat" name="g2" defaultChecked />
        ) : (
          <Form.Check type="radio" value="Långärmat" label="Långärmat" name="g2" />
        )}

        {filter === 'Shorts' ? (
          <Form.Check type="radio" value="Shorts" label="Shorts" name="g2" defaultChecked />
        ) : (
          <Form.Check type="radio" value="Shorts" label="Shorts" name="g2" />
        )}

        {filter === 'T-Shirt' ? (
          <Form.Check type="radio" value="T-Shirts" label="T-Shirts" name="g2" defaultChecked />
        ) : (
          <Form.Check type="radio" value="T-Shirts" label="T-Shirts" name="g2" />
        )}

        {filter === 'Tights' ? (
          <Form.Check type="radio" value="Tights" label="Tights" name="g2" defaultChecked />
        ) : (
          <Form.Check type="radio" value="Tights" label="Tights" name="g2" />
        )}
      </Form>

      <p>
        <strong>Välj storlek</strong>
      </p>
      <Form className="mb-3" onChange={(e) => setSize(e.target.value)}>
        {size === '' ? (
          <Form.Check type="radio" value="" label="Alla" name="g3" defaultChecked />
        ) : (
          <Form.Check type="radio" value="" label="Alla" name="g3" />
        )}

        {size === 'X-Small' ? (
          <Form.Check type="radio" value="X-Small" label="X-Small" name="g3" defaultChecked />
        ) : (
          <Form.Check type="radio" value="X-Small" label="X-Small" name="g3" />
        )}

        {size === 'Small' ? (
          <Form.Check type="radio" value="Small" label="Small" name="g3" defaultChecked />
        ) : (
          <Form.Check type="radio" value="Small" label="Small" name="g3" />
        )}

        {size === 'Medium' ? (
          <Form.Check type="radio" value="Medium" label="Medium" name="g3" defaultChecked />
        ) : (
          <Form.Check type="radio" value="Medium" label="Medium" name="g3" />
        )}

        {size === 'Large' ? (
          <Form.Check type="radio" value="Large" label="Large" name="g3" defaultChecked />
        ) : (
          <Form.Check type="radio" value="Large" label="Large" name="g3" />
        )}

        {size === 'X-Large' ? (
          <Form.Check type="radio" value="X-Large" label="X-Large" name="g3" defaultChecked />
        ) : (
          <Form.Check type="radio" value="X-Large" label="X-Large" name="g3" />
        )}
      </Form>
    </div>
  );
};

export default Filter;
