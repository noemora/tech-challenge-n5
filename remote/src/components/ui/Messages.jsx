import styled, { keyframes } from 'styled-components';
import { useLanguageStore } from 'host/LanguageStore';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  animation: ${slideIn} 0.6s ease-out;
`;

const Message__Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(40, 167, 69, 0.2);
  border-left: 5px solid #28a745;
  border-radius: 50%;
  animation: ${bounce} 1.5s infinite;
`;

const Message__Text = styled.p`
  color: #28a745;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  font-family: 'Arial', sans-serif;
`;

const Message_Error = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  padding: 30px;
  background: rgba(220, 53, 69, 0.15);
  border: 2px solid rgba(220, 53, 69, 0.4);
  border-radius: 8px;
  backdrop-filter: blur(8px);
  animation: ${slideIn} 0.6s ease-out;
`;

const Message__Text_Error = styled.p`
  color: #dc3545;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  font-family: 'Arial', sans-serif;
`;

const Message__Icon_Error = styled.div`
  font-size: 2.5rem;
  color: #dc3545;
  animation: ${bounce} 2s infinite;
`;

export const LoadingMessage = ({ message = 'Loading...' }) => (
  <Message>
    <Message__Spinner />
    <Message__Text>{message}</Message__Text>
  </Message>
);

export const ErrorMessage = ({ error, fallbackMessage }) => {
  const { t } = useLanguageStore();
  const defaultMessage = fallbackMessage || t('somethingWentWrong');

  return (
    <Message_Error>
      <Message__Icon_Error>❌</Message__Icon_Error>
      <Message__Text_Error>{error || defaultMessage}</Message__Text_Error>
    </Message_Error>
  );
};
