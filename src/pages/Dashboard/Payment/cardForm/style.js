import styled from 'styled-components';

const Container = styled.div`
    width: 100%;

`;

const PaymentContainer = styled.div`
    width: 100%;
    
    display: grid;
    grid-template-columns: auto auto;
    justify-content: flex-start;
    align-items: center;

    gap: 2vw;
    
    position: relative;
`;

const Form = styled.form`
    width: 100%;
    
    display: flex;
    flex-direction: column;

    padding-top: 20px;
    
    gap: 12px;
`;

const ThirdLine = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 65% 30%;
  justify-content: space-between;

`;

const SubmitContainer = styled.div`
  margin-top: 80px !important;

  position: absolute;
  left: 0;
  top: 80%;

  > button {
    margin-top: 0 !important;
  }
`;

const PaymentConfirmed = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  margin-top: 17px;
`;

const PaidText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-size: 16px;
  line-height: 19px;

  color: #454545;

  margin-left: 14px;
`;

export {
  Container,
  Form,
  PaymentContainer,
  ThirdLine,
  SubmitContainer,
  PaymentConfirmed,
  PaidText
};
