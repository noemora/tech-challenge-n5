import styled from 'styled-components';
import Card from './Card.jsx';
import { useActors } from '../hooks/useActors.js';
import { LoadingMessage, ErrorMessage } from './ui/Messages.jsx';
import { MOVIE_IDS, UI_MESSAGES } from '../constants/app.js';

const Container = styled.div`
  width: 100%;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

const StyledCardList = styled.div`
  display: flex;
  gap: 25px;
  max-width: 100vw;
  margin: 0 auto;
  padding: 25px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  border: 2px solid rgba(255, 107, 53, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);

  /* Horizontal scroll styling */
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 107, 53, 0.1);
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(90deg, #ff6b35, #f7931e);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(90deg, #ff7849, #ff9f40);
  }

  /* Firefox scrollbar */
  scrollbar-width: thin;
  scrollbar-color: #ff6b35 rgba(255, 107, 53, 0.1);

  @media (max-width: 768px) {
    gap: 20px;
    padding: 18px;
    margin: 0 8px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    gap: 22px;
  }
`;

const MessageContainer = styled.div`
  text-align: center;
  padding: 50px 20px;
  color: #ff6b35;
  font-size: 1.2rem;
`;

const ScrollHint = styled.div`
  text-align: center;
  color: rgba(255, 107, 53, 0.8);
  font-size: 0.9rem;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;

  &::before,
  &::after {
    content: '←';
    font-size: 1.1rem;
    animation: slideHint 2s ease-in-out infinite;
  }

  &::after {
    content: '→';
    animation-delay: 1s;
  }

  @keyframes slideHint {
    0%,
    100% {
      opacity: 0.5;
      transform: translateX(0);
    }
    50% {
      opacity: 1;
      transform: translateX(3px);
    }
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

// Component responsible only for rendering the list of cards
export default function CardList() {
  const {
    data: actors = [],
    isLoading,
    error,
  } = useActors(MOVIE_IDS.DEFAULT, 10);

  if (isLoading) {
    return (
      <Container>
        <MessageContainer>
          <LoadingMessage message={UI_MESSAGES.LOADING_ACTORS} />
        </MessageContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <MessageContainer>
          <ErrorMessage error={error.message} />
        </MessageContainer>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollHint>{UI_MESSAGES.SCROLL}</ScrollHint>
      <StyledCardList>
        {actors.map((actor) => (
          <Card
            key={actor.id}
            image={actor.image}
            title={actor.name}
            content={actor.description}
          />
        ))}
      </StyledCardList>
    </Container>
  );
}
