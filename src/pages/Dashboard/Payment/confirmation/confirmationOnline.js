import { Container, InfoText, Option } from './style';

export function ConfirmationOnline({ formData, eventInfos, }) {
  function submit() {
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
