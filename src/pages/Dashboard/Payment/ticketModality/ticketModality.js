import { Container, InfoText, Option } from './style';

export function TicketModality({ formData, activedTicketModality, setActivedTicketModality, selectedTicketModality, setSelectedTicketModality, setWithPresence, setFormData, eventInfos }) {
  function handlePresentialChange() {
    setSelectedTicketModality({ isPresential: true, isOnline: false });
    setActivedTicketModality({ isPresentialActived: true, isOnlineActived: false });
    setWithPresence(true);
    setFormData({ ...formData, isOnline: false, totalPrice: eventInfos.presentialPrice });
  }

  function handleOnlineChange() {
    setSelectedTicketModality({ isPresential: false, isOnline: true });
    setActivedTicketModality({ isPresentialActived: false, isOnlineActived: true });
    setWithPresence(false);
    setFormData({ ...formData, isOnline: true, totalPrice: eventInfos.onlinePrice });
  }

  return(
    <>
      <InfoText>
        Primeiro, escolha sua modalidade de ingresso
      </InfoText>
      
      <Container>
        <Option activedTicketModality={activedTicketModality.isPresentialActived} selectedTicketModality={selectedTicketModality} onClick={handlePresentialChange}>
          <p>Presencial</p>
          <span>R$ 250</span>
        </Option>

        <Option activedTicketModality={activedTicketModality.isOnlineActived} selectedTicketModality={selectedTicketModality} onClick={handleOnlineChange}>
          <p>Online</p>
          <span>R$ 100</span>
        </Option>
      </Container>
    </>
  );
}
