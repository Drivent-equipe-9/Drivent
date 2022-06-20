import * as React from 'react';
import { Container, InfoText, Summary } from './style';
import { Container as MUIContainer, Skeleton } from '@mui/material';

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

  return (
    <>
      <InfoText>
        Ingresso escolhido
      </InfoText>

      <Container>
        <Summary >
          {ticketData.totalPrice === undefined ?
            <MUIContainer sx={{ width: '60%' }}>
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </MUIContainer>
            :
            <>
              <p>{ticketType}</p>
              <span>{`R$ ${ticketData.totalPrice}`}</span>
            </>
          }
        </Summary>
      </Container>
    </>
  );
}
