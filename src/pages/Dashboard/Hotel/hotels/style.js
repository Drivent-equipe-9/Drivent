import styled from 'styled-components';

const ContainerHotel = styled.div`
  display: flex;
  align-items: center;

  @media(max-width: 840px) {
    flex-direction: column;

    align-items: flex-start;

    margin-bottom: 10px;
  }
`;

const InfoText = styled.span`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;

  color: #8e8e8e;
`;

const Option = styled.button`
  width: 196px;
  height: 264px;
  padding: 16px 14px 22px 14px;

  background-color: ${({ isHotelSelected }) => (isHotelSelected ? '#FFEED2' : '#F1F1F1')};

  border-radius: 10px;
  border: none;

  margin: 20px 0 20px 20px;

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
    color: #3C3C3C;
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

  @media(max-width: 840px) {
    margin-left: 0;
  }
`;

const Container = styled.div`
  width: 100%;
`;

const ContainerRoom = styled.div`
  width:100%;

  margin-top: 30px;

  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media(max-width: 840px) {
    margin-top: 15px;
  }
`;

const Rooms = styled.button`
  width: 190px;
  height: 45px;

  border: 1px solid #CECECE;
  border-radius: 10px;
  background-color: ${({ isRoomSelected }) => (isRoomSelected ? '#FFEED2' : '#F1F1F1')};
  background-color: ${({ isRoomFull }) => (isRoomFull ? '#CECECE' : '')};
  padding: 0 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;

  span {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    //line-height: 20px;
    //text-align: center;

    color: #454545;
  }

  :disabled {
    cursor: not-allowed;
  }
`;

const Vacancies = styled.div`
  &> * {
    margin: 0;
  }
`;

export {
  ContainerHotel,
  Container,
  Option,
  InfoText,
  ContainerRoom,
  Rooms,
  Vacancies,
};
