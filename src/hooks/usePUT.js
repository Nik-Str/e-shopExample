import { useState } from 'react';
import axios from 'axios';

function useFetchPut() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const FetchPut = (url, data) => {
    setIsLoading(true);
    //Add abortController. Is used to abort Fetch if user goes to other page during fetch process. Otherwise fetch still runs in background and cath error
    const abortCont = new AbortController();

    //Notice the added 'signal' to the get request, it for the abortController
    axios
      .put(
        url,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
        { signal: abortCont.signal }
      )
      .then((response) => {
        if (response.status === 201) {
          setData(response.data.message);
          setIsLoading(false);
          setIsError(null);
          //Reset data value o null så that Toaster can trigger on new update
          setTimeout(() => {
            setData(null);
          }, 3500);
        } else {
          throw new Error('Unknown Error, update page and try again!');
        }
      })
      .catch((err) => {
        //If the error is not a abort error, update state
        if (err.message !== 'canceled') {
          setIsLoading(false);
          setIsError(err.message);
        }
      });

    //Below return statment is bart of abortController
    return () => abortCont.abort();
  };

  return { data, isLoading, isError, FetchPut };
}

export default useFetchPut;
