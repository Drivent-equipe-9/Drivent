import { Container, ContainerHotel, ContainerRoom, InfoText, Option, Rooms, Vacancies } from './style';
import { saveHotel } from '../../../../services/hotelApi';
import { toast } from 'react-toastify';
import useToken from '../../../../hooks/useToken';
import { getRooms } from '../../../../services/hotelApi';
import { useEffect, useState } from 'react';
import { EmptyInfoText } from '../../Payment/style';

import { IoPersonOutline, IoPerson } from 'react-icons/io5';
import { SubmitContainer } from '../../../../components/PersonalInformationForm';
import Button from '../../../../components/Form/Button';
import { createReservation } from '../../../../services/reservationApi';
import { useNavigate } from 'react-router-dom';

export function Hotels({ hotelInfo }) {
  const token = useToken();
  const navigate = useNavigate();
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

        response.sort(function compare(a, b) {
          if (a.number > b.number) return 1;
          if (a.number < b.number) return -1;
          return 0;
        });

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
        setHotelSelected(true);
      }
    }
    
    return hotels;
  }

  function handleRoomSelection(room) {
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].number === room.number) {
        setRoomSelected(true);
        rooms[i].isSelected = true;
        setFormReservationData({ ...formReservationData, roomId: room.id });
      } else {
        setRoomSelected(true);
        rooms[i].isSelected = false;
      }
    }

    rooms.sort(function compare(a, b) {
      if (a.number > b.number) return 1;
      if (a.number < b.number) return -1;
      return 0;
    });

    setRooms([...rooms]);
  }

  useEffect(() => {
    if (isRoomSelected) {
      toast('Deslize para baixo para finalizar a reserva!');
    }
  }, [isRoomSelected]);
  
  function handleSubmit() {
    const promise = createReservation(formReservationData, token);
    promise
      .then((response) => {
        toast('Reserva criada com sucesso!');
        navigate('/dashboard/hotel/reservation');
      })
      .catch(() => {

      });
  }

  return (
    <>
      <InfoText>Primeiro, escolha seu hotel</InfoText>
      <ContainerHotel>
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
      </ContainerHotel>
      {isHotelSelected &&
        <Container >
          <EmptyInfoText>Ótima pedida! Agora escolha seu quarto:</EmptyInfoText>
          <ContainerRoom>
            {rooms.map(room => (
              <Rooms key={room.id} id={room.id} disabled={!room.vacanciesLeft} onClick={() => handleRoomSelection(room)} isRoomFull={!room.vacanciesLeft} isRoomSelected={room.isSelected}>
                <span>{room?.number}</span>
                {
                  room.accomodationType === 'Single' ?
                    room.vacanciesLeft ?
                      <Vacancies>
                        {
                          room.isSelected ?
                            <IoPerson color={room.isSelected ? '#FF4791' : ''} size={22} />
                            :
                            <IoPersonOutline size={22} />
                        }
                      </Vacancies>
                      :
                      <Vacancies>
                        <IoPerson color={!room.vacanciesLeft ? '#8C8C8C' : ''} size={22} />
                      </Vacancies>
                    :
                    room.accomodationType === 'Double' ?
                      room.vacanciesLeft ?
                        room.vacanciesLeft === 1 ?
                          <Vacancies>
                            {
                              room.isSelected ?
                                <IoPerson color={room.isSelected && '#FF4791'} size={22} />
                                :
                                <IoPersonOutline size={22} />
                            }
                            <IoPerson color='#000' size={22} />
                          </Vacancies>
                          :
                          room.isSelected ?
                            <Vacancies>
                              <IoPersonOutline size={22} />
                              <IoPerson color={room.isSelected && '#FF4791'} size={22} />
                            </Vacancies>
                            :
                            <Vacancies>
                              <IoPersonOutline size={22} />
                              <IoPersonOutline size={22} />
                            </Vacancies>
                        :
                        <Vacancies>
                          <IoPerson color={!room.vacanciesLeft ? '#8C8C8C' : ''} size={22} />
                          <IoPerson color={!room.vacanciesLeft ? '#8C8C8C' : ''} size={22} />
                        </Vacancies>
                      :
                      room.accomodationType === 'Triple' &&
                        room.vacanciesLeft ?
                        room.vacanciesLeft === 1 ?
                          <Vacancies>
                            {
                              room.isSelected ?
                                <IoPerson color={room.isSelected && '#FF4791'} size={22} />
                                :
                                <IoPersonOutline size={22} />
                            }
                            <IoPerson color='#000' size={22} />
                            <IoPerson color='#000' size={22} />
                          </Vacancies>
                          :
                          room.vacanciesLeft === 2 ?
                            <Vacancies>
                              <IoPersonOutline size={22} />
                              {
                                room.isSelected ?
                                  <IoPerson color={room.isSelected && '#FF4791'} size={22} />
                                  :
                                  <IoPersonOutline size={22} />
                              }
                              <IoPerson color='#000' size={22} />
                            </Vacancies>
                            :
                            room.isSelected ?
                              <Vacancies>
                                <IoPersonOutline size={22} />
                                <IoPersonOutline size={22} />
                                <IoPerson color={room.isSelected && '#FF4791'} size={22} />
                              </Vacancies>
                              :
                              <Vacancies>
                                <IoPersonOutline size={22} />
                                <IoPersonOutline size={22} />
                                <IoPersonOutline size={22} />
                              </Vacancies>
                        :
                        <Vacancies>
                          <IoPerson color={!room.vacanciesLeft ? '#8C8C8C' : ''} size={22} />
                          <IoPerson color={!room.vacanciesLeft ? '#8C8C8C' : ''} size={22} />
                          <IoPerson color={!room.vacanciesLeft ? '#8C8C8C' : ''} size={22} />
                        </Vacancies>
                }
              </Rooms>
            ))}
          </ContainerRoom>
          {isRoomSelected &&
            <SubmitContainer>
              <Button onClick={() => handleSubmit()}>
                RESERVAR QUARTO
              </Button>
            </SubmitContainer>
          }
        </Container>
      }
    </>
  );
}
