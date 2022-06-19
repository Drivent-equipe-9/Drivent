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
    const promise = getReservation(token);
    promise
      .then((reservation) => {
        if (reservation && !changeRoom) {
          navigate('/dashboard/hotel/reservation');
          return;
        }
      });

    const promiseEnrollment = getPersonalInformations(token);
    promiseEnrollment
      .then((response) => {
        const enrollmentData = response.id;

        const promiseTicket = findTicket(token, enrollmentData);
        promiseTicket
          .then((response) => {
            if (response.withAccommodation) {
              setAccomodation(true);
            } else {
              setAccomodation(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(() => {
        setAccomodation(false);
      });

    const promisePayment = findPayment(token);
    promisePayment
      .then((response) => {
        if (response.isPaid) {
          setPaid(true);
        } else {
          setPaid(false);
        }
      })
      .catch(() => {
        setPaid(false);
      });

    renderHotel();
  }, []);

  async function renderHotel() {
    try {
      const promiseHotel = await getHotelInfo(token);

      let arrayHotel = promiseHotel;

      for (let i = 0; i < promiseHotel.length; i++) {
        let promise = await getTotalVacanciesByHotelId(promiseHotel[i].id, token);
        arrayHotel[i].vacanciesLeft = promise.vacanciesLeft;
        setHotels(arrayHotel);
      }
    } catch {
      toast('Não foi possível carregar as informações dos hoteis!');
    }

    setLoading(false);
  }

  return (
    <>
      <StyledTypography variant='h4'>Escolha de hotel e quarto</StyledTypography>
      {!isPaid ?
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
          isLoading ?
            <PuffLoading>Loading</PuffLoading>
            :
            <Hotels hotelInfo={hotels} setHotels={setHotels} setChangeRoom={setChangeRoom} />
      }
    </>
  );
}
