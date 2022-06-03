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

    margin-top: 20px;

    gap: 2vw;
`;

const Form = styled.form`
    width: 100%;
    
    display: flex;
    flex-direction: column;
    
    gap: 12px;
`;

const ThirdLine = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 65% 30%;
  justify-content: space-between;

`;

export {
  Container,
  Form,
  PaymentContainer,
  ThirdLine
};
