import { Container, InfoText, Summary } from './style';

export function TicketSummary({ formData }) {
  let ticketType = '';

  if (formData.totalPrice === 600) {
    ticketType = 'Presencial + Com Hotel';
  }
  if (formData.totalPrice === 100) {
    ticketType = 'Online';
  }
  if (formData.totalPrice === 250) {
    ticketType = 'Presencial + Sem Hotel';
  }

  return(
    <>
      <InfoText>
       Ingresso escolhido
      </InfoText>

      <Container>
        <Summary >
          <p>{ticketType}</p>
          <span>{`R$ ${formData.totalPrice}`}</span>
        </Summary>
      </Container>
    </>
  );
}
