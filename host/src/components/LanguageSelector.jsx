import styled from 'styled-components';
import { useLanguageStore } from '../stores/languageStore';

const SelectorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
  margin-right: 5px;
`;

const Select = styled.select`
  padding: 8px 12px;
  font-size: 14px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background-color: #ffffff;
  color: #2d3748;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: none;
  min-width: 120px;

  &:hover {
    border-color: #007acc;
    box-shadow: 0 0 0 3px rgba(0, 122, 204, 0.1);
  }

  &:focus {
    border-color: #007acc;
    box-shadow: 0 0 0 3px rgba(0, 122, 204, 0.2);
  }

  option {
    padding: 8px;
    background-color: #ffffff;
    color: #2d3748;
  }
`;

const FlagIcon = styled.span`
  font-size: 18px;
  margin-right: 8px;
`;

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguageStore();

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <SelectorContainer>
      <Label>{t('language')}:</Label>
      <Select value={language} onChange={handleLanguageChange}>
        <option value="es">🇪🇸 Español</option>
        <option value="en">🇺🇸 English</option>
      </Select>
    </SelectorContainer>
  );
}
