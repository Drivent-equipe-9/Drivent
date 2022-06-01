import { Container, InfoText, Option } from './style';

export function ConfirmationPresential({ formData, setFormData, eventInfos }) {
  function submit() {
    setFormData({ ...formData, withAccommodation: 'comHotel', totalPrice: eventInfos.presentialPrice + eventInfos.accommodationPrice });
    console.log(formData);
  }
  console.log(formData);

  return (
    <Container>
      <InfoText>
       Fechado! O total ficou em R$ 600. Agora é só confirmar:
      </InfoText>
      
      <Option formData={formData} onClick={submit}>
       Reservar Imgresso
      </Option>
    </Container>
  );
}
