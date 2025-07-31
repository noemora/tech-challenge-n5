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

const Title = styled.h2`
  text-align: center;
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 40px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 30px;
  }
`;

const StyledCardList = styled.div`
  display: flex;
  gap: 32px;
  max-width: 100vw;
  margin: 0 auto;
  padding: 32px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);

  /* Horizontal scroll styling */
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 10px;
    border: 2px solid rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(90deg, #7c94eb, #8555b3);
  }

  /* Firefox scrollbar */
  scrollbar-width: thin;
  scrollbar-color: #667eea rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    gap: 24px;
    padding: 20px;
    margin: 0 10px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    gap: 28px;
  }
`;

const MessageContainer = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #ffffff;
  font-size: 1.2rem;
`;

const ScrollHint = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &::before,
  &::after {
    content: '←';
    font-size: 1.2rem;
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
      transform: translateX(5px);
    }
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

// Component responsible only for rendering the list of cards
export default function CardList() {
  const { actors, loading, error } = useActors(MOVIE_IDS.DEFAULT);

  if (loading) {
    return (
      <Container>
        <Title>{UI_MESSAGES.CARD_LIST_TITLE}</Title>
        <MessageContainer>
          <LoadingMessage message={UI_MESSAGES.LOADING_ACTORS} />
        </MessageContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Title>{UI_MESSAGES.CARD_LIST_TITLE}</Title>
        <MessageContainer>
          <ErrorMessage error={error} />
        </MessageContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Title>{UI_MESSAGES.CARD_LIST_TITLE}</Title>
      <ScrollHint>Desliza horizontalmente para ver más actores</ScrollHint>
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
