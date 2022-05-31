import { Container, InfoText, Option } from './style';

export function Modality() {
  return(
    <>
      <InfoText>
        Primeiro, escolha sua modalidade de ingresso
      </InfoText>
      <Container>
        <Option>
          <p>Presencial</p>
          <span>R$ 250</span>
        </Option>

        <Option>
          <p>Online</p>
          <span>R$ 100</span>
        </Option>
      </Container>
    </>
  );
}
