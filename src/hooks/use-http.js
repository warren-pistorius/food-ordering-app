import axios from "axios";
import { useCallback, useState } from "react";

const useHttp = () => {
 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState({ data: [] });

  const get = useCallback(async (url) => {
    let response = null;
    try {
      setIsLoading(true);
      response = await axios.get(url);
      setData(response);
      setError('');
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);

    return response;
  }, []);

  const post = useCallback(async (url, data) => {
    let response = null;
    try {
      setIsLoading(true);
      response = await axios.post(url, data);
      setData(response);
      setError('');
    } catch (error) {
      setError(error);
      response = error;
    }
    setIsLoading(false);

    return response;
  }, []);

  return {
    isLoading,
    error,
    data,
    get,
    post
  };
};

export default useHttp;
