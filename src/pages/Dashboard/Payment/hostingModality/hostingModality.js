import { Container, ContainerOptions, InfoText, Option } from './style';

export function HostingModality({ activedHostingModality, setActivedHostingModality, selectedHostingModality, setSelectedHostingModality, setWithPresence, setFormData, formData, eventInfos, setWithHotel, setNoHotel }) {
  function handleWithHotelChange() {
    setSelectedHostingModality({ isPresential: true, isOnline: false });
    setActivedHostingModality({ isActived: true });
    setWithHotel(true);
    setNoHotel(false);
    setFormData({ ...formData, withAccommodation: 'comHotel', totalPrice: eventInfos.presentialPrice + eventInfos.accommodationPrice });
    console.log(formData);
  }

  function handleNotHotelChange() {
    setSelectedHostingModality({ isPresential: false, isOnline: true });
    setActivedHostingModality({ isActived: false });
    setWithHotel(false);
    setNoHotel(true);
    setFormData({ ...formData, withAccommodation: 'semHotel', totalPrice: eventInfos.presentialPrice });
  }
  
  return(
    <Container>
      <InfoText>
        Ótimo! Agora escolha sua modalidade de hospedagem
      </InfoText>
      
      <ContainerOptions>
        <Option activedHostingModality={activedHostingModality.isActived} selectedHostingModality={selectedHostingModality} onClick={handleNotHotelChange}>
          <p>Sem Hotel</p>
          <span>+ R$ 0</span>
        </Option>

        <Option activedHostingModality={activedHostingModality.isActived} selectedHostingModality={selectedHostingModality} onClick={handleWithHotelChange}>
          <p>Com Hotel</p>
          <span>+ R$ 350</span>
        </Option>
      </ContainerOptions>
    </Container>
  );
}
