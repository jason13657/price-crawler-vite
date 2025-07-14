import { useState } from "react";

export function usePassword(correctPassword: string) {
  const [input, setInput] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const submit = () => {
    if (input === correctPassword) {
      setAuthenticated(true);
      setError("");
    } else {
      setAuthenticated(false);
      setError("Incorrect password");
    }
  };

  const reset = () => {
    setInput("");
    setAuthenticated(false);
    setError("");
  };

  return {
    input,
    setInput,
    submit,
    reset,
    authenticated,
    error,
  };
}
