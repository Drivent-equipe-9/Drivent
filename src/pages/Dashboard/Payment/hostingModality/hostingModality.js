import { Container, ContainerOptions, InfoText, Option } from './style';

export function HostingModality({ activedHostingModality, setActivedHostingModality, selectedHostingModality, setSelectedHostingModality, setWithPresence, setFormData, formData, eventInfos, setWithHotel, setNoHotel }) {
  function handleWithHotelChange() {
    setSelectedHostingModality({ isPresential: true, isOnline: false });
    setActivedHostingModality({ withHotel: true, noHotel: false });
    setWithHotel(true);
    setNoHotel(false);
    setFormData({ ...formData, withAccommodation: true, totalPrice: eventInfos.presentialPrice + eventInfos.accommodationPrice });
  }

  function handleNotHotelChange() {
    setSelectedHostingModality({ isPresential: false, isOnline: true });
    setActivedHostingModality({ withHotel: false, noHotel: true });
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
        <Option activedHostingModality={activedHostingModality.noHotel} selectedHostingModality={selectedHostingModality} onClick={handleNotHotelChange}>
          <p>Sem Hotel</p>
          <span>+ R$ 0</span>
        </Option>

        <Option activedHostingModality={activedHostingModality.withHotel} selectedHostingModality={selectedHostingModality} onClick={handleWithHotelChange}>
          <p>Com Hotel</p>
          <span>+ R$ 350</span>
        </Option>
      </ContainerOptions>
    </Container>
  );
}
