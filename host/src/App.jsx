import styled from 'styled-components';
import './App.css';
import RemoteApp1 from 'remote/App';
import RemoteApp2 from 'remote2/App';
import { useLanguageStore } from './stores/languageStore';
import LanguageSelector from './components/LanguageSelector';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #f093fb 50%, #f5576c 100%);
  padding: 20px;
`;

const Header = styled.header`
  margin-bottom: 30px;
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const Title = styled.h1`
  color: #2d3748;
  font-size: 3rem;
  font-weight: 800;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: 2px;
  background: #222224ff;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const MicrofrontendsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

function App() {
  const { t } = useLanguageStore();

  return (
    <AppContainer>
      <Header>
        <HeaderContent>
          <Title>{t('welcome')}</Title>
          <LanguageSelector />
        </HeaderContent>
      </Header>
      <MicrofrontendsContainer>
        <RemoteApp1 />
        <RemoteApp2 />
      </MicrofrontendsContainer>
    </AppContainer>
  );
}

export default App;
