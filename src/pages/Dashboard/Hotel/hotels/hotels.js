import { Container, ContainerHotel, ContainerRoom, InfoText, LoadingContainer, Option, PuffLoading, Rooms, Vacancies } from './style';
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
import Puff from '../../../../assets/images/puff_loading.svg';
import { LoadingButton } from '@mui/lab';

export function Hotels({ hotelInfo }) {
  const token = useToken();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [isHotelSelected, setHotelSelected] = useState(false);
  const [isRoomSelected, setRoomSelected] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isButtonLoading, setButtonLoading] = useState(false);
  const [formReservationData, setFormReservationData] = useState({
    roomId: '',
    hotelId: '',
  });

  async function handleHotelChange(h) {
    setLoading(true);

    renderHotel(h);

    setFormReservationData({ ...formReservationData, hotelId: h.id });

    try {
      const promiseRooms = await getRooms(h.id, token);
      for (let i = 0; i < promiseRooms.length; i++) {
        promiseRooms[i].isSelected = false;
        setRoomSelected(false);
      }

      if (!h.vacanciesLeft) {
        toast.error('Não há vagas!');
      }

      promiseRooms.sort(function compare(a, b) {
        if (a.number > b.number) return 1;
        if (a.number < b.number) return -1;
        return 0;
      });

      setRooms(promiseRooms);
      setLoading(false);
    } catch {
      setLoading(false);
      toast.error('Aconteceu algo de errado. Tente novamente mais tarde.');
    }
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
    if (!room.vacanciesLeft) {
      toast.error('Não há vagas neste quarto');
      return;
    }

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

  async function handleSubmit() {
    setButtonLoading(true);
    try {
      await createReservation(formReservationData, token);

      setButtonLoading(false);

      toast.success('Reserva criada com sucesso!');
      navigate('/dashboard/hotel/reservation');
    } catch {
      setButtonLoading(false);
      return;
    }
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
              <p>{h?.vacanciesLeft}</p>
            }
          </Option>
        ))}
      </ContainerHotel>
      {isHotelSelected &&
        <Container >
          <EmptyInfoText>Ótima pedida! Agora escolha seu quarto:</EmptyInfoText>
          <ContainerRoom>
            {isLoading ?
              <LoadingContainer>
                <PuffLoading src={Puff} />
              </LoadingContainer>
              :
              rooms.map(room => (
                <Rooms key={room.id} id={room.id} disabled={!room.vacanciesLeft} onClick={() => handleRoomSelection(room)} isRoomFull={!room.vacanciesLeft} isRoomSelected={room.isSelected}>
                  <span>{room?.number}</span>
                  {room.accomodationType === 'Single' ?
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
                        <IoPerson color={'#8C8C8C'} size={22} />
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
                          <IoPerson color={'#8C8C8C'} size={22} />
                          <IoPerson color={'#8C8C8C'} size={22} />
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
                          <IoPerson color={'#8C8C8C'} size={22} />
                          <IoPerson color={'#8C8C8C'} size={22} />
                          <IoPerson color={'#8C8C8C'} size={22} />
                        </Vacancies>
                  }
                </Rooms>
              ))}
          </ContainerRoom>
          {isRoomSelected &&
            <SubmitContainer>
              {!isButtonLoading ?
                <Button onClick={() => handleSubmit()}>
                  RESERVAR QUARTO
                </Button>
                :
                <LoadingButton sx={{ width: '162.5px' }} variant='contained' loading loadingPosition="start">
                  Reservando
                </LoadingButton>
              }
            </SubmitContainer>
          }
        </Container>
      }
    </>
  );
}
