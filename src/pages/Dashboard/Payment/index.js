import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { StyledTypography } from '../../../components/PersonalInformationForm';
import useToken from '../../../hooks/useToken';
import { getPersonalInformations } from '../../../services/enrollmentApi';

export default function Payment() {
  const token = useToken();
  const [haveInfos, setHaveInfos] = useState();
  
  useEffect(() => {
    const promise = getPersonalInformations(token);
    promise
      .then((response) => {
        setHaveInfos(true);
      })
      .catch((error) => {
        if(error.status === 404) {
          setHaveInfos(false);
        }
      });
  });

  return(
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography> 
      {!haveInfos ? 
        <ContainerEmptyInfo>
          <EmptyInfoText>
            Você precisa completar sua inscrição antes
            de prosseguir pra escolha de ingresso
          </EmptyInfoText>
        </ContainerEmptyInfo>
        :
        ''} 
    </>
  ); 
}

const ContainerEmptyInfo = styled.div`

  display: flex;
  justify-content: 'center';
  align-items: 'center';

  background-color: red;

`;

const EmptyInfoText = styled.div`

  display: flex;
  justify-content: 'center';
  align-items: 'center';

`;
