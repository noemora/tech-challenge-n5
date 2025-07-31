import { useState } from 'react';

const Button = () => {
  const [state, setState] = useState(0);
  return (
    <button
      className="shared-button"
      onClick={() => setState((prev) => prev + 1)}
    >
      Click me from remote 1: {state}
    </button>
  );
};

export default Button;
