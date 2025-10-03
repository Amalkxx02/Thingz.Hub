import { useState } from "react";

const useApiSubmission = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const execute = async (apiCall, userData) => {
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const response = await apiCall(userData);
      setSuccess(response);
    } catch (error) {
      setError(error);
    } finally {
        setLoading(false);
    }
  };
  return { loading, success, error, execute };
};
export default useApiSubmission;
