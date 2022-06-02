import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const InfoText = styled.span`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;

  color: #8E8E8E;
`;

const Summary = styled.div`
  width: 290px;
  height: 108px;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  background: #FFEED2;
  border-radius: 20px;

  margin-top: 20px;

  cursor: pointer;

  p {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    text-align: center;

    color: #454545;
  }

  span {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    text-align: center;

    color: #898989;
  }
`;

export {
  Container,
  InfoText,
  Summary
};
