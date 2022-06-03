import { Container, InfoText, Option } from './style';

export function TicketModality({ 
  formData, 
  setWithPresence, 
  setFormData, 
  eventInfos, 
  setOnlineTicket, 
  setNoHotel, 
  setWithHotel,
  selectedData, 
  setSelectedData
}) {
  function handlePresentialChange() {
    setSelectedData( {
      ...selectedData,
      isPresential: true,
      isPresentialActived: true,
      isOnline: false,
      isOnlineActived: false,
    });

    setWithPresence(true);
    setOnlineTicket(false);
    setWithHotel(false);
    setNoHotel(false);
    setFormData({ ...formData, isOnline: false, totalPrice: eventInfos.presentialPrice });
  }

  function handleOnlineChange() {
    setSelectedData( {
      ...selectedData,
      isOnline: true,
      isOnlineActived: true,
      isPresential: false,
      isPresentialActived: false
    });

    setOnlineTicket(true);
    setWithPresence(false);
    setWithHotel(false);
    setNoHotel(false);
    setFormData({ ...formData, isOnline: true, totalPrice: eventInfos.onlinePrice });
  }

  return(
    <>
      <InfoText>
        Primeiro, escolha sua modalidade de ingresso
      </InfoText>
      
      <Container>
        <Option selectedData={selectedData.isPresentialActived} onClick={handlePresentialChange}>
          <p>Presencial</p>
          <span>R$ 250</span>
        </Option>

        <Option selectedData={selectedData.isOnlineActived} onClick={handleOnlineChange}>
          <p>Online</p>
          <span>R$ 100</span>
        </Option>
      </Container>
    </>
  );
}
