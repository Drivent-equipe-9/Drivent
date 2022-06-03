import styled from 'styled-components';

const ContainerOptions = styled.div`
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoText = styled.span`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;

  color: #8E8E8E;

  margin-top: 50px;
`;

const Option = styled.button`
  width: 145px;
  height: 145px;

  background-color: ${({ selectedData }) => selectedData ? '#FFEED2' : '#ffffff'};

  border-radius: 20px;
  border: ${({ selectedData }) => selectedData ? 'none' : '1px solid #CECECE'};

  margin-top: 20px;

  :last-child{
    margin-left: 20px;
  }

  cursor: pointer;

  p {
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    text-align: center;

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
`;

export {
  Container,
  ContainerOptions,
  Option,
  InfoText,
};
