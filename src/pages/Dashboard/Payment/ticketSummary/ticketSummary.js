import { Container, InfoText, Summary } from './style';

export function TicketSummary({ ticketData }) {
  let ticketType = '';

  if (ticketData.isOnline === false && ticketData.withAccommodation === true) {
    ticketType = 'Presencial + Com Hotel';
  }
  if (ticketData.isOnline === false && ticketData.withAccommodation === false) {
    ticketType = 'Presencial + Sem Hotel';
  }
  if (ticketData.isOnline === true) {
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
          <span>{`R$ ${ticketData.totalPrice}`}</span>
        </Summary>
      </Container>
    </>
  );
}
