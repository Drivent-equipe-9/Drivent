import styled from 'styled-components';

const ContainerDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
  width: 100%;
  margin-bottom: 60px;
  margin-top: 28px;

  @media (max-width: 840px) {
    flex-direction: column;
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
    font-family: Roboto;
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
    font-family: Roboto;
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: left;
    color: #3c3c3c;
    margin-top: 14px;
  }

  p {
    font-family: Roboto;
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
  }
`;

const Container = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ContainerActivitiesLeft = styled.div`
  width: 100%;
  height: 795px;
  border-top: 1px solid #d7d7d7;
  border-bottom: 1px solid #d7d7d7;
  border-left: 1px solid #d7d7d7;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;
const ContainerActivitiesRight = styled.div`
  width: 100%;
  height: 795px;
  min-width: 300px;
  border-top: 1px solid #d7d7d7;
  border-bottom: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;

  flex-direction: column;
  display: flex;
  flex-wrap: wrap;
`;
const ContainerActivitiesCenter = styled.div`
  width: 100%;
  min-width: 300px;
  height: 795px;
  border: 1px solid #d7d7d7;

  flex-direction: column;
  display: flex;
  flex-wrap: wrap;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const InfoButton = styled.button`
  display: flex;
  flex-direction: column;
  border: none;
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
  h1 {
    color: #7b7b7b;
    margin-bottom: 13px;
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
};
