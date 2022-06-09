import { Container, InfoText, Option } from './style';
import { saveHotel } from '../../../../services/hotelApi';
import { toast } from 'react-toastify';
import useToken from '../../../../hooks/useToken';
import { getRooms } from '../../../../services/hotelApi';
import { useState } from 'react';

export function HotelModality({ hotelInfo }) {
  const token = useToken();
  const [selectedHotel, setSelectedHotel] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [formReservationData, setFormReservationData] = useState({
    roomId: '',
    hotelId: '',
  });
  
  function handleHotelChange(e, h) {
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
      } else {
        hotelInfo[i].isSelected = false;
      }
    }

    return hotels;
  }

  return (
    <>
      <InfoText>Primeiro, escolha seu hotel</InfoText>

      <Container>
        {hotelInfo?.map((h) => (
          <Option key={h.id} id={h.id} name={h.name} onClick={(e) => handleHotelChange(e, h)} isSelected={h.isSelected}>
            <img src={h.imageUrl} alt={h.name}></img>
            <h2>{h.name}</h2>
            <h3>Tipos de acomodação:</h3>
            <p>{h.accomodationType}</p>
            <h3>Vagas disponíveis:</h3>
            <p>0</p>
          </Option>
        ))}
      </Container>
    </>
  );
}
