import { Container, ContainerOptions, InfoText, Option } from './style';

export function HostingModality({ 
  setFormData, 
  formData, 
  eventInfos, 
  setWithHotel, 
  setNoHotel,
  selectedData, 
  setSelectedData
}) {
  function handleWithHotelChange() {
    setSelectedData( {
      ...selectedData,
      noHotel: false,
      withHotel: true,
      withHotelActived: true, 
      noHotelActived: false
    });

    setWithHotel(true);
    setNoHotel(false);
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

    setWithHotel(false);
    setNoHotel(true);
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
