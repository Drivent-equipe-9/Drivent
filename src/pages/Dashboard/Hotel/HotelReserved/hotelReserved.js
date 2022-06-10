import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { StyledTypography } from '../../../../components/PersonalInformationForm';
import useToken from '../../../../hooks/useToken';
import { getReservation } from '../../../../services/reservationApi';
import { EmptyInfoText } from '../../Payment/style';
import { Option, Container } from '../hotelModality/style';

export default function HotelReserved() {
  const token = useToken();
  const [reservation, setReservation] = useState();
  const [people, setPeople] = useState();

  useEffect(() => {
    const promise = getReservation(token);
    promise
      .then((resume) => {
        setReservation(resume);
        if (resume.Room.accomodationType === 'Single') {
          setPeople('Só você');
        }
        if (resume.Room.accomodationType === 'Double' && resume.Room.vacanciesLeft === 1) {
          setPeople('Só você');
        }
        if (resume.Room.accomodationType === 'Double' && resume.Room.vacanciesLeft === 0) {
          setPeople('Você e mais 1');
        }
        if (resume.Room.accomodationType === 'Triple' && resume.Room.vacanciesLeft === 2) {
          setPeople('Só você');
        }
        if (resume.Room.accomodationType === 'Triple' && resume.Room.vacanciesLeft === 1) {
          setPeople('Você e mais 1');
        }
        if (resume.Room.accomodationType === 'Triple' && resume.Room.vacanciesLeft === 0) {
          setPeople('Você e mais 2');
        }
      })
      .catch(() => {
        toast('Não foi possível carregar as vagas restantes!');
      });
  }, []);

  return (
    <>
      <StyledTypography variant='h4'>Escolha de hotel e quarto</StyledTypography>
      <EmptyInfoText>
        Você já escolheu seu quarto:
      </EmptyInfoText>
      <Container>
        <Option isSelected={true}>
          <img src={reservation?.Hotel.imageUrl} alt={reservation?.Hotel.name}></img>
          <h2>{reservation?.Hotel.name}</h2>
          <h3>Quarto reservado</h3>
          <p>{reservation?.Room.number} ({reservation?.Room.accomodationType})</p>
          <h3>Pessoas no seu quarto</h3>
          <p>{people}</p>
        </Option>
      </Container>
    </>
  );
};
