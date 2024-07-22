import axios, { AxiosRequestConfig } from 'axios';
import { useState, useEffect } from 'react';

export interface ApiHookProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  payload?: any;
}

interface ApiResponse {
  data: any;
  error: any;
  isLoading: boolean;
}

const useApi = ({
  method,
  endpoint,
  payload,
  baseUrl = 'http://localhost:3001/',
}: ApiHookProps & { baseUrl?: string }): ApiResponse => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method,
      url: `${baseUrl}${endpoint}`,
      data: payload,
    };

    setIsLoading(true);
    axios(config)
     .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
     .catch((error) => {
        setError({ message: error.message, status: error.status });
        setIsLoading(false);
      });
  }, [method, endpoint, payload, baseUrl]);

  return { data, error, isLoading };
};

export default useApi;