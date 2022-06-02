import { Container, InfoText, Option } from './style';

export function ConfirmationWithHotel({ formData }) {
  function submit() {
    console.log(formData);
  }

  return (
    <Container>
      <InfoText>
        {`Fechado! O total ficou em R$ ${formData.totalPrice}. Agora é só confirmar:`}
      </InfoText>
      
      <Option formData={formData} onClick={submit}>
       Reservar Imgresso
      </Option>

    </Container>
  );
}
