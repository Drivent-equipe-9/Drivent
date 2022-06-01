import { useState } from 'react';
import { useEffect } from 'react';

import { TicketModality } from './ticketModality/ticketModality';
import { HostingModality } from './hostingModality/hostingModality';
import { StyledTypography } from '../../../components/PersonalInformationForm';
import { ContainerEmptyInfo, EmptyInfoText } from './style';

import { getPersonalInformations } from '../../../services/enrollmentApi';
import useToken from '../../../hooks/useToken';
import { getEventInfo } from '../../../services/eventApi';

export default function Payment() {
  const token = useToken();
  const [haveInfos, setHaveInfos] = useState();
  const [eventInfos, setEventInfos] = useState();
  /* const [isPresentialActive, setIsPresentialActive] = useState(false);
  const [isOnlineActive, setIsOnlineActive] = useState(false); */
  const [formData, setFormData] = useState({
    eventId: '',
    enrollmentId: '',
    isOnline: '',
    withAccommodation: '',
    totalPrice: ''
  });
  const [ selectedData, setSelectedData ] = useState({ isPresential: false, isOnline: false });
  const [ activedData, setActivedData ] = useState({ isPresentialActived: false, isOnlineActived: false });
  const [ withPresence, setWithPresence ] = useState(false);
  
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
    const promiseEvent = getEventInfo();
    promiseEvent
      .then((response) => {
        setEventInfos(response);
      })
      .catch((error) => {
          
      });
  }, []);

  console.log(formData);

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
        <TicketModality 
          activedData={activedData} 
          setActivedData={setActivedData} 
          selectedData={selectedData} 
          setSelectedData={setSelectedData} 
          setWithPresence={setWithPresence}
          setFormData={setFormData}
          formData={formData}
          eventInfos={eventInfos}
        />
      } 
      {withPresence ?
        <HostingModality 
          activedData={activedData}
          setActivedData={setActivedData}
          selectedData={selectedData}
          setSelectedData={setSelectedData}
          setWithPresence={setWithPresence}
          setFormData={setFormData}
          formData={formData}
          eventInfos={eventInfos}
          /* isActive={isPresentialActive} *//>
        :
        <p>ALo alo</p>
      }
    </>
  ); 
}
