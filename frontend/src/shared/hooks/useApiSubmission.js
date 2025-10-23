import { useState } from "react";

export default function useApiSubmission() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const execute = async (apiCall, data, userId) => {
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const response = await apiCall(data, userId);
      setSuccess(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, success, error, execute };
}
