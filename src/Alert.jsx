import { useEffect } from 'react';

const Alert = ({ removeAlert, alert }) => {
  const { show, type, msg } = alert;
  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => {
        removeAlert();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [alert]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
