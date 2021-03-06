import styled from 'styled-components';

const ContainerDate = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  background-color: white;

  margin-bottom: 60px;
  margin-top: 28px;

  @media (max-width: 840px) {
    flex-direction: column;
    align-items: flex-start;

    margin-bottom: 0;
  }
`;

const InfoText = styled.span`
  margin-top: 25%;

  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;

  color: #8e8e8e;

  ${({ isSelected }) => (isSelected && 'display: none')}
`;

const Option = styled.button`
  width: 131px;
  
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  
  background-color: ${({ isDateSelected }) => (isDateSelected ? '#FFD37D' : '#F1F1F1')};

  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);

  border-radius: 4px;
  border: none;

  margin: 20px 0 20px 20px;
  padding: 10px;

  :first-child {
    margin-left: 0;
  }

  cursor: pointer;

  img {
    width: 168px;
    height: 109px;
    border-radius: 5px;
    object-fit: cover;
  }

  h2 {
    font-family: 'Roboto';
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;

    color: #343434;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  h3 {
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: left;
    color: #3c3c3c;
    margin-top: 14px;
  }

  p {
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: left;

    margin-top: 3px;
    color: #454545;
  }

  span {
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    text-align: center;

    color: #898989;
  }

  @media (max-width: 840px) {
    margin-left: 0;
    margin-top: 0;
  }
`;

const Container = styled.div`
  width: 100%;

  background-color: white;

  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 840px) {
    flex-direction: column;
  }
`;

const ContainerActivitiesLeft = styled.div`
  width: 100%;
  min-width: 300px;
  height: 350px;

  border-top: 1px solid #d7d7d7;
  border-bottom: 1px solid #d7d7d7;
  border-left: 1px solid #d7d7d7;
  
  display: flex;
  flex-direction: column;
  flex-flow: column;

  overflow: auto;
  ::-webkit-scrollbar {
    width: 1px;
    height: 0;
  }
  ::-webkit-scrollbar-thumb {
    background: gray;
  }

  @media (max-width: 840px) {
    width: 90%;

    border-right: 1px solid #d7d7d7;
  }

`;
const ContainerActivitiesRight = styled.div`
  width: 100%;
  min-width: 300px;
  height: 350px;

  border-top: 1px solid #d7d7d7;
  border-bottom: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;

  display: flex;
  flex-direction: column;
  flex-flow: column;

  overflow: auto;
  ::-webkit-scrollbar {
    width: 1px;
    height: 0;
  }
  ::-webkit-scrollbar-thumb {
    background: gray;
  }

  @media (max-width: 840px) {
    width: 93%;

    border-left: 1px solid #d7d7d7;
  }
`;
const ContainerActivitiesCenter = styled.div`
  width: 100%;
  min-width: 300px;
  height: 350px;

  border: 1px solid #d7d7d7;

  display: flex;
  flex-direction: column;
  flex-flow: column;

  overflow: auto ;
  ::-webkit-scrollbar {
    width: 1px;
    height: 0;
  }
  ::-webkit-scrollbar-thumb {
    background: gray;
  }

  @media (max-width: 840px) {
    width: 92%;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Separation = styled.div`
  border-right: ${({ arrayRegister }) => arrayRegister === 1 ? '1px solid #99E8A1' : '1px solid #cfcfcf'};
`;

const InfoButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ arrayRegister }) => arrayRegister === 1 ? '#D0FFDB' : 'none'};
  border: none;

  h4 {
    color: #078632;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 15px;
    text-align: center;
    margin-left: 6px;
  }

  h5 {
    color: #CC6666;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 15px;
    text-align: center;
  }
`;

const Activity = styled.div`
  width: 265px;
  margin-left: 12px;
  margin-right: 12px;
  border: 1px solid #cecece;
  border-radius: 5px;
  background-color: #f1f1f1;

  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  span {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;

    color: #454545;
  }

  :disabled {
    cursor: not-allowed;
  }
`;

const Vacancies = styled.div`
  & > * {
    margin: 0;
  }
`;

const BoxDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  :last-child{
    margin-right: 10px;
  }

  h1 {
    color: #7b7b7b;
    margin-bottom: 13px;
  }

  @media (max-width: 840px) {
    h1 {
      margin-top: 20px;
    }

    align-items: flex-start;
  }
`;

export {
  ContainerDate,
  Container,
  Option,
  InfoText,
  ContainerActivitiesRight,
  ContainerActivitiesLeft,
  Activity,
  Vacancies,
  ContainerActivitiesCenter,
  Info,
  InfoButton,
  BoxDiv,
  Separation
};
