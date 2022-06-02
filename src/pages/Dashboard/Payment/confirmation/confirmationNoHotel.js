import { Container, InfoText, Option } from './style';

export function ConfirmationNoHotel({ formData, setFormData, eventInfos }) {
  function submit() {
    setFormData({ ...formData, withAccommodation: 'comHotel', totalPrice: eventInfos.presentialPrice });
    console.log(formData);
  }
  console.log(formData);

  return (
    <Container>
      <InfoText>
        {`Fechado! O total ficou em R$ ${eventInfos.presentialPrice}. Agora é só confirmar:(sem hotel)`}
      </InfoText>
      
      <Option formData={formData} onClick={submit}>
       Reservar Imgresso
      </Option>

    </Container>
  );
}
