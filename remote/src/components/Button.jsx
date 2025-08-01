import styled from 'styled-components';

const Button = styled.button`
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 3px 10px rgba(255, 107, 53, 0.4), 0 1px 5px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  text-transform: uppercase;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 5px 15px rgba(255, 107, 53, 0.5),
      0 2px 8px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, #ff7849, #ff9f40);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 8px rgba(255, 107, 53, 0.4), 0 1px 4px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export default function ButtonComponent({
  onClick,
  children = 'Load Actors',
  disabled = false,
}) {
  return (
    <Button onClick={onClick} disabled={disabled}>
      {children}
    </Button>
  );
}
