import { useState } from 'react';
import { useEffect } from 'react';

import { TicketModality } from './ticketModality/ticketModality';
import { HostingModality } from './hostingModality/hostingModality';
import { StyledTypography } from '../../../components/PersonalInformationForm';
import { ContainerEmptyInfo, EmptyInfoText } from './style';

import { getPersonalInformations } from '../../../services/enrollmentApi';
import useToken from '../../../hooks/useToken';

export default function Payment() {
  const token = useToken();
  const [haveInfos, setHaveInfos] = useState();
  const [isActive, setIsActive] = useState(true);
  const [withPresence, setWithPresence] = useState(true);
  
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
      {haveInfos ? 
        <ContainerEmptyInfo>
          <EmptyInfoText>
            Você precisa completar sua inscrição antes <br/>
            de prosseguir pra escolha de ingresso
          </EmptyInfoText>
        </ContainerEmptyInfo>
        :
        <TicketModality isActive={isActive} withPresence={withPresence}/>
      } 
      {withPresence ?
        <HostingModality isActive={isActive}/>
        :
        ''
      }
    </>
  ); 
}
