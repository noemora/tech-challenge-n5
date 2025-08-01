import styled from 'styled-components';
import './App.css';
import Button from './components/Button.jsx';
import CardList from './components/CardList.jsx';
import { useAppStore } from './stores/appStore.js';
import { SERIES_IDS, UI_MESSAGES } from './constants/app.js';

const AppContainer = styled.div`
  min-height: 85vh;
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
  padding: 30px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2.8rem;
  font-weight: 800;
  margin: 0 0 15px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: 2px;
  text-align: center;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.h2`
  color: #34495e;
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0 0 25px 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  letter-spacing: 1px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ButtonContainer = styled.div`
  margin-bottom: 25px;
`;

function App() {
  const showActors = useAppStore((state) => state.showActors);
  const loadActors = useAppStore((state) => state.loadActors);

  const handleLoadActors = () => {
    loadActors();
  };

  return (
    <AppContainer>
      <Title>Welcome to the Remote MFE</Title>
      <Subtitle>Series: {SERIES_IDS.FEATURED_SERIES_TITLE}</Subtitle>

      <ButtonContainer>
        <Button onClick={handleLoadActors}>{UI_MESSAGES.LOAD_ACTORS}</Button>
      </ButtonContainer>

      {showActors && <CardList />}
    </AppContainer>
  );
}

export default App;
