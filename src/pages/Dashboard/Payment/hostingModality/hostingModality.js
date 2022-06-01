import { Container, ContainerOptions, InfoText, Option } from './style';

export function HostingModality({ activedData, setActivedData, selectedData, setSelectedData, setWithPresence, setFormData, formData, eventInfos }) {
  function handleWithHotelChange() {
    setSelectedData({ isPresential: true, isOnline: false });
    setActivedData({ isPresentialActived: true, isOnlineActived: false });
    setWithPresence(true);
    setFormData({ ...formData, withAccommodation: true, totalPrice: eventInfos.presentialPrice + eventInfos.accommodationPrice });
  }

  function handleNotHotelChange() {
    setSelectedData({ isPresential: false, isOnline: true });
    setActivedData({ isPresentialActived: false, isOnlineActived: true });
    setWithPresence(false);
    setFormData({ ...formData, withAccommodation: false, totalPrice: eventInfos.presentialPrice });
  }
  
  return(
    <Container>
      <InfoText>
        Ótimo! Agora escolha sua modalidade de hospedagem
      </InfoText>
      
      <ContainerOptions>
        <Option activedData={activedData.isPresentialActived} selectedData={selectedData} onClick={handleNotHotelChange}>
          <p>Sem Hotel</p>
          <span>+ R$ 0</span>
        </Option>

        <Option activedData={activedData.isPresentialActived} selectedData={selectedData} onClick={handleWithHotelChange}>
          <p>Com Hotel</p>
          <span>+ R$ 350</span>
        </Option>
      </ContainerOptions>
    </Container>
  );
}
