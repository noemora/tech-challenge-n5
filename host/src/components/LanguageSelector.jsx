import styled from 'styled-components';
import { useLanguageStore } from '../stores/languageStore';

const LanguageSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LanguageSelector__Label = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
  margin-right: 5px;
`;

const LanguageSelector__Select = styled.select`
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

const LanguageSelector__FlagIcon = styled.span`
  font-size: 18px;
  margin-right: 8px;
`;

export default function LanguageSelectorComponent() {
  const { language, setLanguage, t } = useLanguageStore();

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <LanguageSelector>
      <LanguageSelector__Label>{t('language')}:</LanguageSelector__Label>
      <LanguageSelector__Select
        value={language}
        onChange={handleLanguageChange}
      >
        <option value="es">🇪🇸 Español</option>
        <option value="en">🇺🇸 English</option>
      </LanguageSelector__Select>
    </LanguageSelector>
  );
}
