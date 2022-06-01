import { Container, InfoText, Option } from './style';

export function TicketModality({ isActive, withPresence }) {
  return(
    <>
      <InfoText>
        Primeiro, escolha sua modalidade de ingresso
      </InfoText>
      
      <Container>
        <Option  withPresence={withPresence} isActive={isActive}>
          <p>Presencial</p>
          <span>R$ 250</span>
        </Option>

        <Option>
          <p>Online</p>
          <span>R$ 100</span>
        </Option>
      </Container>
    </>
  );
}
