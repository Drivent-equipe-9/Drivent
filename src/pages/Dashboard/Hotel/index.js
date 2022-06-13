import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { StyledTypography } from '../../../components/PersonalInformationForm';
import { ContainerEmptyInfo, EmptyInfoText } from '../Payment/style';
import Room from './room/room';

import { getPersonalInformations } from '../../../services/enrollmentApi';
import { getHotelInfo, getTotalVacanciesByHotelId } from '../../../services/hotelApi';
import { findPayment, findTicket } from '../../../services/ticketApi';
import useToken from '../../../hooks/useToken';

import { HotelModality } from './hotelModality/hotelModality';

export default function Hotel() {
  const token = useToken();
  const [isPaid, setPaid] = useState(false);
  const [hasAccomodation, setAccomodation] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const [hotels, setHotels] = useState([]);

  useEffect(() => {
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
    
    const promiseHotel = getHotelInfo(token);
    promiseHotel
      .then((responseHotel) => {
        let arrayHotel = responseHotel;
        
        for (let i = 0; i < responseHotel.length; i++) {
          let promise = getTotalVacanciesByHotelId(responseHotel[i].id, token); 
          promise.then((vacancies) => {
            arrayHotel[i].vacanciesLeft = vacancies.vacanciesLeft;
            setHotels(arrayHotel);
          }).catch(() => {
            toast('Não foi possível carregar as vagas restantes!');
          });
        }
      })
      .catch(() => {
        toast('Não foi possível carregar as informações dos hoteis!');
      });
  }, []);

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
          <HotelModality hotelInfo={hotels} setIsSelected={setIsSelected} />
      }
      
    </>
  );
}
