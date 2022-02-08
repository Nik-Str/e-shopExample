import { useState } from 'react';
import axios from 'axios';

function useFetchDelete() {
  const [dataDelete, setDataDelete] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isErrorDelete, setIsErrorDelete] = useState(null);

  const Fetchdelete = (url, data) => {
    setIsLoadingDelete(true);
    //Add abortController. Is used to abort Fetch if user goes to other page during fetch process. Otherwise fetch still runs in background and cath error
    const abortCont = new AbortController();

    //Notice the added 'signal' to the get request, it for the abortController
    axios
      .delete(url, { data: { remove: data } }, { signal: abortCont.signal })
      .then((response) => {
        if (response.status === 200) {
          setDataDelete(response.data.message);
          setIsLoadingDelete(false);
          setIsErrorDelete(null);
        } else {
          throw new Error('Unknown Error, update page and try again!');
        }
      })
      .catch((err) => {
        //If the error is not a abort error, update state
        if (err.message !== 'canceled') {
          setIsLoadingDelete(false);
          setIsErrorDelete(err.message);
        }
      });

    //Below return statment is bart of abortController
    return () => abortCont.abort();
  };

  return { dataDelete, isLoadingDelete, isErrorDelete, Fetchdelete };
}

export default useFetchDelete;
