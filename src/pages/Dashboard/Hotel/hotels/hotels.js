import { Container, InfoText, Option } from './style';
import { saveHotel } from '../../../../services/hotelApi';
import { toast } from 'react-toastify';
import useToken from '../../../../hooks/useToken';
import { getRooms } from '../../../../services/hotelApi';
import { useState } from 'react';
import { EmptyInfoText } from '../../Payment/style';
import { ContainerRoom, Rooms, Vacancies } from './style';

import { IoPersonOutline, IoPerson } from 'react-icons/io5';

export function Hotels({ hotelInfo }) {
  const token = useToken();
  const [rooms, setRooms] = useState([]);
  const [isHotelSelected, setHotelSelected] = useState(false);
  const [isRoomSelected, setRoomSelected] = useState(false);
  const [formReservationData, setFormReservationData] = useState({
    roomId: '',
    hotelId: '',
  });

  function handleHotelChange(h) {
    renderHotel(h);
    setFormReservationData({ ...formReservationData, hotelId: h.id });
    const promiseRoom = getRooms(h.id, token);
    promiseRoom
      .then((response) => {
        for (let i = 0; i < response.length; i++) {
          response[i].isSelected = false;
          setRoomSelected(false);
        }
        setRooms(response);
      })
      .catch(() => {
        toast('Algo deu errado, tente novamente.');
      });
  }

  function renderHotel(hotels) {
    for (let i = 0; i < hotelInfo.length; i++) {
      if (i === hotels.id - 1) {
        hotelInfo[i].isSelected = true;
        setHotelSelected(true);
      } else {
        hotelInfo[i].isSelected = false;
        setHotelSelected(false);
      }
    }

    return hotels;
  }

  function handleRoomSelection(room) {
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].number === room.number) {
        setRoomSelected(true);
        rooms[i].isSelected = true;
      } else {
        setRoomSelected(false);
        rooms[i].isSelected = false;
      }
    }

    setRooms([...rooms]);
  }

  return (
    <>
      <InfoText>Primeiro, escolha seu hotel</InfoText>

      <Container>
        {hotelInfo?.map((h) => (
          <Option key={h.id} id={h.id} name={h.name} onClick={() => handleHotelChange(h)} isHotelSelected={h.isSelected}>
            <img src={h.imageUrl} alt={h.name}></img>
            <h2>{h.name}</h2>
            <h3>Tipos de acomodação:</h3>
            <p>{h.accomodationType}</p>
            <h3>Vagas disponíveis:</h3>
            {!h?.vacanciesLeft ?
              <p>0</p>
              :
              <p>{h.vacanciesLeft}</p>
            }
          </Option>
        ))}
      </Container>
      <>
        <EmptyInfoText>Ótima pedida! Agora escolha seu quarto:</EmptyInfoText>
        <ContainerRoom>
          {rooms.map(room => (
            <Rooms key={room.id} id={room.id} onClick={() => handleRoomSelection(room)} isRoomSelected={room.isSelected}>
              <span>{room?.number}</span>
              {
                room.accomodationType === 'Single' || room.accomodationType === 'Simple' ?
                  <Vacancies>
                    <IoPersonOutline size={22} />
                  </Vacancies>
                  :
                  room.accomodationType === 'Double' ?
                    <Vacancies>
                      <IoPersonOutline size={22} />
                      <IoPersonOutline size={22} />
                    </Vacancies>
                    :
                    room.accomodationType === 'Triple' &&
                    <Vacancies>
                      <IoPersonOutline size={22} />
                      <IoPersonOutline size={22} />
                      <IoPersonOutline size={22} />
                    </Vacancies>
              }
            </Rooms>
          ))}
        </ContainerRoom>
      </>
    </>
  );
}
