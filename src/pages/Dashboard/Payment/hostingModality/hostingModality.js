import { Container, ContainerOptions, InfoText, Option } from './style';

export function HostingModality({ isActive }) {
  return(
    <Container>
      <InfoText>
        Ótimo! Agora escolha sua modalidade de hospedagem
      </InfoText>
      
      <ContainerOptions>
        <Option isActive={isActive}>
          <p>Sem Hotel</p>
          <span>+ R$ 0</span>
        </Option>

        <Option>
          <p>Com Hotel</p>
          <span>+ R$ 350</span>
        </Option>
      </ContainerOptions>
    </Container>
  );
}
