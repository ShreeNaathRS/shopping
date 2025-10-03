import { useEffect, useState } from 'react';

export const SafeRender = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const errorHandler = (event) => {
      setHasError(true);
      setErrorMsg(event.message);
      alert("Global error caught:", event.message);
    };

    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', errorHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', errorHandler);
    };
  }, []);

  if (hasError) {
    return <div style={{ padding: '2rem', color: 'red' }}>Error: {errorMsg}</div>;
  }

  return children;
};