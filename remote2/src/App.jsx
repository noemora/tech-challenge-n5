import styled from 'styled-components';
import Button from './components/Button.jsx';
import CardList from './components/CardList.jsx';
import { useAppStore } from './stores/appStore.js';
import { MOVIE_IDS, UI_MESSAGES } from './constants/app.js';
import { useLanguageStore } from 'host/LanguageStore';

const App = styled.div`
  height: auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App__Title = styled.h1`
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

const App__Subtitle = styled.h1`
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

const App__ButtonContainer = styled.div`
  margin-bottom: 20px;
`;

function AppComponent() {
  const showActors = useAppStore((state) => state.showActors);
  const loadActors = useAppStore((state) => state.loadActors);
  const { t } = useLanguageStore();

  const handleLoadActors = () => {
    loadActors();
  };

  return (
    <App>
      <App__Title>{t('welcomeRemote2')}</App__Title>
      <App__Subtitle>
        {t('movie')}: {MOVIE_IDS.FEATURED_MOVIE_TITLE}
      </App__Subtitle>

      <App__ButtonContainer>
        <Button onClick={handleLoadActors}>{t('loadActors')}</Button>
      </App__ButtonContainer>

      {showActors && <CardList />}
    </App>
  );
}

export default AppComponent;
