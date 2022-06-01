import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: 30px 0;
`;

const InfoText = styled.span`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;

  margin-bottom: 15px;

  color: #8E8E8E;
`;

const Option = styled.button`
  width: 162px;
  height: 37px;

  background: #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  text-transform: uppercase;

  border: none;

  cursor: pointer;

  color: #000000;
`;

export {
  Container,
  Option,
  InfoText,
};
