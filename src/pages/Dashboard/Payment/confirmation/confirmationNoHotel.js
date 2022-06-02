import { Container, InfoText, Option } from './style';

export function ConfirmationNoHotel({ formData, eventInfos }) {
  function submit() {
    console.log(formData);
  }

  return (
    <Container>
      <InfoText>
        {`Fechado! O total ficou em R$ ${eventInfos.presentialPrice}. Agora é só confirmar:`}
      </InfoText>
      
      <Option formData={formData} onClick={submit}>
       Reservar Imgresso
      </Option>

    </Container>
  );
}
