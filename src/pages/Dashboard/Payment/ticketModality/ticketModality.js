import { Container, InfoText, Option } from './style';

export function TicketModality({ 
  formData,
  setFormData, 
  eventInfos, 
  selectedData, 
  setSelectedData,
  changeComponents,
  setChangeComponents
}) {
  function handlePresentialChange() {
    setSelectedData( {
      ...selectedData,
      isPresential: true,
      isPresentialActived: true,
      isOnline: false,
      isOnlineActived: false,
      withHotelActived: false, 
      noHotelActived: false 
    });

    setChangeComponents({
      ...changeComponents,
      withPresence: true, 
      onlineTicket: false,
      withHotel: false,
      noHotel: false  
    });

    setFormData({ ...formData, isOnline: false, totalPrice: eventInfos.presentialPrice });
  }

  function handleOnlineChange() {
    setSelectedData( {
      ...selectedData,
      isOnline: true,
      isOnlineActived: true,
      isPresential: false,
      isPresentialActived: false,
      withHotelActived: false, 
      noHotelActived: false 
    });

    setChangeComponents({
      ...changeComponents,
      onlineTicket: true,
      withPresence: false,
      withHotel: false,
      noHotel: false  
    });
    
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
