import styled from 'styled-components';

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  min-width: 280px; /* Prevent shrinking in flex container */
  flex-shrink: 0; /* Prevent shrinking */
  min-height: 400px;
  background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    width: 260px;
    min-width: 260px;
    min-height: 420px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  background: linear-gradient(45deg, #333, #555);
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${StyledCard}:hover & {
    transform: scale(1.05);
  }
`;

const ContentContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #2a2a2a, #1f1f1f);
`;

const Title = styled.h3`
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 12px 0;
  line-height: 1.3;
  text-align: center;
  letter-spacing: 0.5px;
`;

const Description = styled.p`
  color: #b8b8b8;
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
  text-align: center;
  font-weight: 400;
`;

export default function Card({ image, title, content }) {
  return (
    <StyledCard>
      <ImageContainer>
        <StyledImage src={image} alt={title} />
      </ImageContainer>
      <ContentContainer>
        <Title>{title}</Title>
        <Description>{content}</Description>
      </ContentContainer>
    </StyledCard>
  );
}
