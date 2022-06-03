import { Container, InfoText, Summary } from './style';

export function TicketSummary({ formData }) {
  let ticketType = '';

  if (formData.isOnline === false && formData.withAccommodation === true) {
    ticketType = 'Presencial + Com Hotel';
  }
  if (formData.isOnline === false && formData.withAccommodation === false) {
    ticketType = 'Presencial + Sem Hotel';
  }
  if (formData.isOnline === true) {
    ticketType = 'Online';
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
