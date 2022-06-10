import { Container, InfoText, Option } from './style';
import { saveHotel } from '../../../../services/hotelApi';
import { toast } from 'react-toastify';
import useToken from '../../../../hooks/useToken';
import { getRooms } from '../../../../services/hotelApi';
import { useState } from 'react';

export function HotelModality({ hotelInfo, setIsSelected }) {
  const token = useToken();
  const [rooms, setRooms] = useState([]);
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
        setRooms(response);
      })
      .catch(() => {
        toast('Algo deu errado, tente novamente.');
      });
  }

  function renderHotel(hotels) {
    for (let i = 0; i < hotelInfo.length; i++) {
      if( i === hotels.id - 1) {
        hotelInfo[i].isSelected = true;
        setIsSelected(true);
      } else {
        hotelInfo[i].isSelected = false;
        setIsSelected(true);
      }
    }

    return hotels;
  }

  return (
    <>
      <InfoText>Primeiro, escolha seu hotel</InfoText>

      <Container>
        {hotelInfo?.map((h) => (
          <Option key={h.id} id={h.id} name={h.name} onClick={() => handleHotelChange(h)} isSelected={h.isSelected}>
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
    </>
  );
}
