import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { StyledTypography } from '../../../components/PersonalInformationForm';
import { ContainerEmptyInfo, EmptyInfoText } from '../Payment/style';

import { getPersonalInformations } from '../../../services/enrollmentApi';
import { getHotelInfo, getTotalVacanciesByHotelId } from '../../../services/hotelApi';
import { findPayment, findTicket } from '../../../services/ticketApi';
import useToken from '../../../hooks/useToken';

import { Hotels } from './hotels/hotels';
import { useNavigate } from 'react-router-dom';
import useChangeRoom from '../../../hooks/useChangeRoom';
import { getReservation } from '../../../services/reservationApi';
import PuffLoading from '../../../components/PuffLoading';

export default function Hotel() {
  const token = useToken();
  const navigate = useNavigate();

  const { changeRoom, setChangeRoom } = useChangeRoom();
  const [hasAccomodation, setAccomodation] = useState(false);
  const [isPaid, setPaid] = useState(false);
  const [hotels, setHotels] = useState([]);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    handleDatabaseCalls();
  }, []);

  async function handleDatabaseCalls() {
    try {
      const promiseReserve = await getReservation(token);
      if (promiseReserve && !changeRoom) {
        navigate('/dashboard/hotel/reservation');
      }
    } catch {

    }

    try {
      const promiseEnroll = await getPersonalInformations(token);

      const promiseTicket = await findTicket(token, promiseEnroll.id);
      if (promiseTicket.withAccommodation) {
        setAccomodation(true);
      } else {
        setAccomodation(false);
      }

      const promisePayment = await findPayment(token);
      if (promisePayment.isPaid) {
        setPaid(true);
      } else {
        setPaid(false);
      }

      const promiseHotel = await getHotelInfo(token);
      let hotelArray = promiseHotel;
      for (let i = 0; i < promiseHotel.length; i++) {
        let promiseVacancies = await getTotalVacanciesByHotelId(promiseHotel[i].id, token);
        hotelArray[i].vacanciesLeft = promiseVacancies.vacanciesLeft;
        setHotels(hotelArray);
      }

      setLoading(false);
    } catch {
      setAccomodation(false);
      setPaid(false);
      setLoading(false);

      toast.error('Não foi possível carregar algumas informações. Por favor, tente novamente mais tarde.');
    }
  }

  return (
    <>
      <StyledTypography variant='h4'>Escolha de hotel e quarto</StyledTypography>
      {isLoading ?
        <PuffLoading />
        :
        !isPaid ?
          <ContainerEmptyInfo>
            <EmptyInfoText>
              Você precisa ter confirmado pagamento antes <br />
              de fazer a escolha de hospedagem
            </EmptyInfoText>
          </ContainerEmptyInfo>
          : !hasAccomodation ?
            <ContainerEmptyInfo>
              <EmptyInfoText>
                Sua modalidade de ingresso não inclui hospedagem <br />
                Prossiga para a escolha de atividades
              </EmptyInfoText>
            </ContainerEmptyInfo>
            :
            <Hotels hotelInfo={hotels} setHotels={setHotels} setChangeRoom={setChangeRoom} />
      }
    </>
  );
}
