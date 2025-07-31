import styled from 'styled-components';
import './App.css';
import Button from './components/Button.jsx';
import CardList from './components/CardList.jsx';
import { useAppStore } from './stores/appStore.js';

const AppContainer = styled.div`
  min-height: 85vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 20px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled.h1`
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 20px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const ButtonContainer = styled.div`
  margin-bottom: 40px;
`;

function App() {
  const showActors = useAppStore((state) => state.showActors);
  const loadActors = useAppStore((state) => state.loadActors);

  const handleLoadActors = () => {
    loadActors();
  };

  return (
    <AppContainer>
      <Title>Welcome to the Remote2 MFE</Title>
      <Subtitle>Movie: Click</Subtitle>

      <ButtonContainer>
        <Button onClick={handleLoadActors}>Load Actors</Button>
      </ButtonContainer>

      {showActors && <CardList />}
    </AppContainer>
  );
}

export default App;
