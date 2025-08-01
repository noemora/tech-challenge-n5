import styled from 'styled-components';

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  min-width: 280px; /* Prevent shrinking in flex container */
  flex-shrink: 0; /* Prevent shrinking */
  min-height: 400px;
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1), 0 1px 5px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  border: 2px solid rgba(255, 107, 53, 0.2);

  &:hover {
    transform: translateY(-3px) scale(1.01);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1);
    border-color: rgba(255, 107, 53, 0.4);
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
  background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease;

  ${StyledCard}:hover & {
    transform: scale(1.03);
  }
`;

const ContentContainer = styled.div`
  padding: 18px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #ffffff, #f8f8f8);
`;

const Title = styled.h3`
  color: #333333;
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 10px 0;
  line-height: 1.4;
  text-align: center;
  letter-spacing: 0.3px;
`;

const Description = styled.p`
  color: #666666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  text-align: center;
  font-weight: 500;
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
