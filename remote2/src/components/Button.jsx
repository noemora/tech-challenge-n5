import { useState } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #0056b3;
  }
`;

export default function Button() {
  const [state, setState] = useState(0);
  return (
    <StyledButton onClick={() => setState((prev) => prev + 1)}>
      Click me from remote 2: {state}
    </StyledButton>
  );
}
