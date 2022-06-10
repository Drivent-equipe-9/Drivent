import styled from 'styled-components';

const ContainerRoom = styled.div`
  width:100%;

  margin-top: 30px;

  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Rooms = styled.button`
  width: 190px;
  height: 45px;

  border: 1px solid #CECECE;
  border-radius: 10px;

  background-color: #ffffff;

  padding: 0 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  
  span {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    //line-height: 20px;
    //text-align: center;

    color: #454545;
  }
`;

const Vacancies = styled.div`
  &> * {
    margin: 0;
  }
`;

export {
  ContainerRoom,
  Rooms,
  Vacancies
};
