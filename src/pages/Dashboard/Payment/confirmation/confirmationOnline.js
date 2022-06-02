import { Container, InfoText, Option } from './style';

export function ConfirmationOnline({ formData, setFormData, eventInfos, }) {
  function submit() {
    setFormData({ ...formData, withAccommodation: 'comHotel', totalPrice: eventInfos.onlinePrice });
    console.log(formData);
  }

  return (
    <Container>
      <InfoText>
        {`Fechado! O total ficou em R$ ${eventInfos.onlinePrice}. Agora é só confirmar:`}
      </InfoText>
      
      <Option formData={formData} onClick={submit}>
       Reservar Ingresso
      </Option>
    </Container>
  );
}
