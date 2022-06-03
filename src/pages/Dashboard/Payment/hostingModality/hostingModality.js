import { Container, ContainerOptions, InfoText, Option } from './style';

export function HostingModality({ 
  setFormData, 
  formData, 
  eventInfos, 
  selectedData, 
  setSelectedData,
  changeComponents,
  setChangeComponents
}) {
  function handleWithHotelChange() {
    setSelectedData( {
      ...selectedData,
      noHotel: false,
      withHotel: true,
      withHotelActived: true, 
      noHotelActived: false
    });

    setChangeComponents({
      ...changeComponents,
      WithHotel: true,
      setNoHotel: false,
      withHotel: true,
      noHotel: false,
      onlineTicket: false
    }); 

    setFormData({ ...formData, withAccommodation: true, totalPrice: eventInfos.presentialPrice + eventInfos.accommodationPrice });
  }

  function handleNotHotelChange() {
    setSelectedData({
      ...selectedData,
      noHotel: true,
      withHotel: false,
      withHotelActived: false, 
      noHotelActived: true
    });

    setChangeComponents({
      ...changeComponents,
      WithHotel: false,
      NoHotel: false,
      withHotel: false,
      noHotel: true,
      onlineTicket: false
    });

    setFormData({ ...formData, withAccommodation: false, totalPrice: eventInfos.presentialPrice });
  }
  
  return(
    <Container>
      <InfoText>
        Ótimo! Agora escolha sua modalidade de hospedagem
      </InfoText>
      
      <ContainerOptions>
        <Option selectedData={selectedData.noHotelActived} onClick={handleNotHotelChange}>
          <p>Sem Hotel</p>
          <span>+ R$ 0</span>
        </Option>

        <Option selectedData={selectedData.withHotelActived} onClick={handleWithHotelChange}>
          <p>Com Hotel</p>
          <span>+ R$ 350</span>
        </Option>
      </ContainerOptions>
    </Container>
  );
}
