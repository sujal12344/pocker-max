import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
  background: ${(props) => props.theme.colors.playingCardBg};
  border: 1px solid ${(props) => props.theme.colors.borderColor || '#e0e0e0'};
  border-radius: ${(props) => props.theme.other.stdBorderRadius};
  padding: 1.5rem;
  box-shadow: ${(props) => props.theme.other.cardDropShadow};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 200px;

  @media screen and (max-width: 624px) {
    padding: 1rem;
    min-width: 100%;
  }
`;

const Label = styled.span`
  font-size: 0.875rem;
  color: #888;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Value = styled.span`
  font-size: 2rem;
  font-weight: bold;
  color: ${(props) => props.positive ? '#4caf50' : props.negative ? '#f44336' : '#333'};
`;

const SubValue = styled.span`
  font-size: 0.875rem;
  color: #666;
  margin-top: 0.25rem;
`;

const GameStatsCard = ({ label, value, subValue, positive, negative }) => {
  return (
    <CardWrapper>
      <Label>{label}</Label>
      <Value positive={positive} negative={negative}>{value}</Value>
      {subValue && <SubValue>{subValue}</SubValue>}
    </CardWrapper>
  );
};

export default GameStatsCard;
