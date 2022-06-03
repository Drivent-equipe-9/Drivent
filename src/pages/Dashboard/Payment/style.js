import styled from 'styled-components';

const ContainerEmptyInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

`;

const Container = styled.div`
  display: ${({ changeComponents }) => changeComponents ? 'none' : 'inherit'};
`;

const EmptyInfoText = styled.span`

  margin-top: 25%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;

  color: #8E8E8E;

`;

export {
  ContainerEmptyInfo,
  Container,
  EmptyInfoText
};
