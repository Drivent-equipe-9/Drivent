import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { toast } from 'react-toastify'; import Button from '@mui/material/Button';
import useToken from '../../../../hooks/useToken';
import { saveTicket } from '../../../../services/ticketApi';
import { Container, InfoText, Option } from './style';

export function ConfirmationTicket({ formData, setConfirmedTicket }) {
  const token = useToken();
  const [isLoading, setLoading] = useState(false);

  async function submit() {
    try {
      setLoading(true);
      console.log(formData);
      await saveTicket(token, formData);
      setLoading(false);
      toast.success('Ticket reservado com sucesso!');
      setConfirmedTicket(true);
    } catch {
      setConfirmedTicket(false);
      setLoading(false);
      toast.error('Algo deu errado, tente novamente.');
    }
  }

  return (
    <Container>
      <InfoText>
        {`Fechado! O total ficou em R$ ${formData.totalPrice}. Agora é só confirmar:`}
      </InfoText>
      {!isLoading ?
        <Option onClick={submit}>
          Reservar Ingresso
        </Option>
        :
        <LoadingButton sx={{ width: '162px' }} variant='contained' loading loadingPosition="start">
          Reservando
        </LoadingButton>
      }

    </Container>
  );
}
