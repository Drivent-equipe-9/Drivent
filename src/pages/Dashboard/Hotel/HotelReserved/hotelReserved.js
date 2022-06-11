import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { StyledTypography } from '../../../../components/PersonalInformationForm';
import useToken from '../../../../hooks/useToken';
import { getReservation } from '../../../../services/reservationApi';
import { EmptyInfoText } from '../../Payment/style';
import { Option, Container } from '../hotels/style';
import Button from '../../../../components/Form/Button';
import useChangeRoom from '../../../../hooks/useChangeRoom';
import { useNavigate } from 'react-router-dom';

export default function HotelReserved() {
  const token = useToken();
  const navigate = useNavigate();
  const { setChangeRoom } = useChangeRoom();
  const [reservation, setReservation] = useState();
  const [people, setPeople] = useState();

  useEffect(() => {
    setChangeRoom(false);
    const promise = getReservation(token);
    promise
      .then((resume) => {
        setReservation(resume);
        if (resume.Room.accomodationType === 'Single') {
          setPeople('Somente você');
        }
        if (resume.Room.accomodationType === 'Double' && resume.Room.vacanciesLeft === 1) {
          setPeople('Somente você');
        }
        if (resume.Room.accomodationType === 'Double' && resume.Room.vacanciesLeft === 0) {
          setPeople('Você e mais 1');
        }
        if (resume.Room.accomodationType === 'Triple' && resume.Room.vacanciesLeft === 2) {
          setPeople('Somente você');
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

  function handleRoomChange() {
    setChangeRoom(true);
    navigate('/dashboard/hotel');
  }

  return (
    <>
      <StyledTypography variant='h4'>Escolha de hotel e quarto</StyledTypography>
      <EmptyInfoText>
        Você já escolheu seu quarto:
      </EmptyInfoText>
      <Container>
        <Option isHotelSelected={true}>
          <img src={reservation?.Hotel.imageUrl} alt={reservation?.Hotel.name}></img>
          <h2>{reservation?.Hotel.name}</h2>
          <h3>Quarto reservado</h3>
          <p>{reservation?.Room.number} ({reservation?.Room.accomodationType})</p>
          <h3>Pessoas no seu quarto</h3>
          <p>{people}</p>
        </Option>
      </Container>
      <Button onClick={handleRoomChange}>
        TROCAR DE QUARTO
      </Button>
    </>
  );
};
