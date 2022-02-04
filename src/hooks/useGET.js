import { useState } from 'react';
import axios from 'axios';

const useFetchGET = () => {
  //Data, loading and error states
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  //runs initialy and on every dom render if nothing is added,
  //useEffect runs only once [] initialy,
  //if a useState[] or other variable is added then it runs first initialy and on every state/variable change
  const FetchGet = (url) => {
    //Add abortController. Is used to abort Fetch if user goes to other page during fetch process. Otherwise fetch still runs in background and cath error
    const abortCont = new AbortController();

    //Notice the added 'signal' to the get request, it for the abortController
    axios
      .get(url, { signal: abortCont.signal })
      .then((response) => {
        if (response.status === 201) {
          setData(response.data);
          setIsLoading(false);
          setIsError(null);
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

  return { data, isLoading, isError, FetchGet };
};

export default useFetchGET;
