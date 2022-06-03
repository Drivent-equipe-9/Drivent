import { toast } from 'react-toastify';
import useToken from '../../../../hooks/useToken';
import { saveTicket } from '../../../../services/ticketApi';
import { Container, InfoText, Option } from './style';

export function ConfirmationTicket({ formData, setConfirmedTicket }) {
  const token = useToken();

  function submit() {
    const promise = saveTicket(token, formData);
    promise
      .then(() => {
        toast('Ticket reservado com sucesso!');
        setConfirmedTicket(true);
      })
      .catch((error) => {
        setConfirmedTicket(false); 
        
        if(error.response.status === 409) {
          toast('Você já possui um ticket.');
          return;
        } 
        toast('Algo deu errado, tente novamente.');
      });
  }

  return (
    <Container>
      <InfoText>
        {`Fechado! O total ficou em R$ ${formData.totalPrice}. Agora é só confirmar:`}
      </InfoText>
      
      <Option formData={formData} onClick={submit}>
       Reservar Ingresso
      </Option>

    </Container>
  );
}
