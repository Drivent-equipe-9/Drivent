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
import { Skeleton } from '@mui/material';
import { Box } from '@material-ui/core';

export default function HotelReserved() {
  const token = useToken();
  const navigate = useNavigate();
  const { setChangeRoom } = useChangeRoom();
  const [reservation, setReservation] = useState();
  const [people, setPeople] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setChangeRoom(false);
    findReservation();
  }, []);

  async function findReservation() {
    setLoading(true);

    try {
      const promiseReserve = await getReservation(token);
      setReservation(promiseReserve);

      if (promiseReserve.Room.accomodationType === 'Single') setPeople('Somente você');
      if (promiseReserve.Room.accomodationType === 'Double' && promiseReserve.Room.vacanciesLeft === 1) setPeople('Somente você');
      if (promiseReserve.Room.accomodationType === 'Double' && promiseReserve.Room.vacanciesLeft === 0) setPeople('Você e mais 1');
      if (promiseReserve.Room.accomodationType === 'Triple' && promiseReserve.Room.vacanciesLeft === 2) setPeople('Somente você');
      if (promiseReserve.Room.accomodationType === 'Triple' && promiseReserve.Room.vacanciesLeft === 1) setPeople('Você e mais 1');
      if (promiseReserve.Room.accomodationType === 'Triple' && promiseReserve.Room.vacanciesLeft === 0) setPeople('Você e mais 2');

      setLoading(false);
    } catch {
      setLoading(false);
      toast.error('Não foi possível carregar as vagas restantes.');
    }
  }

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
          {!isLoading ?
            <img src={reservation?.Hotel.imageUrl} alt={reservation?.Hotel.name}></img>
            :
            <Skeleton animation="wave" variant='rectangular' width={168} height={109} borderRadius={5} />
          }
          {!isLoading ?
            <h2>{reservation?.Hotel.name}</h2>
            :
            <Box sx={{ width: '100%', mt: '10px', mb: '10px', borderRadius: 5 }}>
              <Skeleton animation="wave" variant='rectangular' width='100%' height={23} margin />
            </Box>
          }
          {!isLoading ?
            <h3>Quarto reservado</h3>
            :
            <Box sx={{ width: '100%', mt: '14px', borderRadius: 5 }}>
              <Skeleton animation="wave" variant='rectangular' width='100%' height={14} margin />
            </Box>
          }
          {!isLoading ?
            <p>{reservation?.Room.number} ({reservation?.Room.accomodationType})</p>
            :
            <Box sx={{ width: '100%', mt: '3px', borderRadius: 5 }}>
              <Skeleton animation="wave" variant='rectangular' width='100%' height={14} margin />
            </Box>
          }
          {!isLoading ?
            <h3>Pessoas no seu quarto</h3>
            :
            <Box sx={{ width: '100%', mt: '14px', borderRadius: 5 }}>
              <Skeleton animation="wave" variant='rectangular' width='100%' height={14} margin />
            </Box>
          }
          {!isLoading ?
            <p>{people}</p>
            :
            <Box sx={{ width: '100%', mt: '3px', borderRadius: '5px' }}>
              <Skeleton animation="wave" variant='rectangular' width='100%' height={14} margin />
            </Box>
          }
        </Option>
      </Container>
      <Button onClick={handleRoomChange}>
        TROCAR DE QUARTO
      </Button>
    </>
  );
};
