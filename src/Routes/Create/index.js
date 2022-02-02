import axios from 'axios';
import { useState } from 'react/cjs/react.development';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Create = () => {
  //useState in this examples tracks the changes for the inputs.
  //This replaces document.querrySelector().value and makes it's easy to work the values from the input
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  //Get the browsers history and enebles several funcitons
  // navigate(-1) goes back on step in browser history
  // navigate('/') redirect the use to homepage
  const navigate = useNavigate();

  //Loading states
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    //Upload
    var imageFile = document.querySelector('#filePromotedInput');
    let formData = new FormData();
    formData.append('image', imageFile.files[0]);
    formData.append('title', title);
    formData.append('text', text);

    axios
      .post('http://localhost:8080/data', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response.status === 201) {
          setData(response.data.message);
          setIsError(null);
          setTimeout(() => {
            navigate('/');
          }, 1500);
        } else {
          setIsLoading(false);
          throw new Error('Unknown Error, update page and try again!');
        }
      })
      .catch((err) => {
        //If the error is not a abort error, update state
        setIsLoading(false);
        setIsError(err.message);
      });
  };

  //The onChange trigger the set.. function in the useState by using event.target.value and pass it
  return (
    <div className="create mt-5">
      <h2>Add a new blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Text:</label>
        <textarea required value={text} onChange={(e) => setText(e.target.value)}></textarea>

        <label>Image:</label>
        <input type="file" required id="filePromotedInput" />

        {!isLoading && !data && <button>Add blog</button>}
        {isLoading && !data && <button disabled>Adding blog...</button>}
        {data && <p>{data}</p>}
        {isError && <div>{isError}</div>}
      </form>
    </div>
  );
};

export default Create;
