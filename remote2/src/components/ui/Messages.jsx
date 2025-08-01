import styled, { keyframes } from 'styled-components';
import { useLanguageStore } from 'host/LanguageStore';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  animation: ${fadeIn} 0.5s ease-out;
`;

const Message__Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #ffffff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Message__Text = styled.p`
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const Message_Error = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.3);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 0.5s ease-out;
`;

const Message__Text_Error = styled.p`
  color: #ff6b7a;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const Message__Icon_Error = styled.div`
  font-size: 2rem;
  color: #ff6b7a;
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
      <Message__Icon_Error>⚠️</Message__Icon_Error>
      <Message__Text_Error>{error || defaultMessage}</Message__Text_Error>
    </Message_Error>
  );
};
