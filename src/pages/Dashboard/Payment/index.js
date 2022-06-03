import { useState } from 'react';
import { useEffect } from 'react';

import { toast } from 'react-toastify';

import { TicketModality } from './ticketModality/ticketModality';
import { HostingModality } from './hostingModality/hostingModality';

import { ConfirmationTicket } from './confirmation/confirmationTicket';

import { TicketSummary } from './ticketSummary/ticketSummary';

import { StyledTypography } from '../../../components/PersonalInformationForm';
import { ContainerEmptyInfo, EmptyInfoText, Container } from './style';

import { getPersonalInformations } from '../../../services/enrollmentApi';
import useToken from '../../../hooks/useToken';
import { getEventInfo } from '../../../services/eventApi';

export default function Payment() {
  const token = useToken();
  const [haveInfos, setHaveInfos] = useState();
  const [eventInfos, setEventInfos] = useState();
  const [formData, setFormData] = useState({
    eventId: '',
    enrollmentId: '',
    isOnline: '',
    withAccommodation: false,
    totalPrice: ''
  });
  
  const [ selectedData, setSelectedData] = useState({ 
    isPresential: false, isOnline: false, 
    isPresentialActived: false, isOnlineActived: false,  
    withHotel: false, noHotel: false,
    withHotelActived: false, noHotelActived: false 
  });
  
  const [ withPresence, setWithPresence ] = useState(false);
  const [ onlineTicket, setOnlineTicket ] = useState(false);
  const [ withHotel, setWithHotel ] = useState(false);
  const [ noHotel, setNoHotel ] = useState(false);
  const [ confirmedTicket, setConfirmedTicket] = useState(false);
  
  useEffect(() => {
    const promise = getPersonalInformations(token);
    promise
      .then((response) => {
        setHaveInfos(true);

        const promiseEvent = getEventInfo();
        promiseEvent
          .then((responseEvent) => {
            setEventInfos(responseEvent);
            setFormData({ ...formData, eventId: responseEvent.id, enrollmentId: response.id });
          })
          .catch(() => {
            toast('Não foi possível carregar as informações do evento!');
          });
      })
      .catch((error) => {
        if(error.status === 404) {
          setHaveInfos(false);
        }
      });
  }, []);

  return(
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography> 
      <Container confirmedTicket={confirmedTicket}>
        {!haveInfos ? 
          <ContainerEmptyInfo>
            <EmptyInfoText>
              Você precisa completar sua inscrição antes <br/>
              de prosseguir pra escolha de ingresso
            </EmptyInfoText>
          </ContainerEmptyInfo>
          :
          <TicketModality 
            selectedData={selectedData}
            setSelectedData={setSelectedData}
            setWithPresence={setWithPresence}
            setOnlineTicket={setOnlineTicket}
            setFormData={setFormData}
            formData={formData}
            eventInfos={eventInfos}
            setWithHotel={setWithHotel}
            setNoHotel={setNoHotel}
          />
        }
        {onlineTicket ?
          <ConfirmationTicket
            eventInfos={eventInfos}
            formData={formData}
            setConfirmedTicket={setConfirmedTicket}
          />
          :
          ''
        }
        {withPresence ?
          <HostingModality 
            selectedData={selectedData}
            setSelectedData={setSelectedData}
            setFormData={setFormData}
            formData={formData}
            eventInfos={eventInfos}
            setWithHotel={setWithHotel}
            setNoHotel={setNoHotel}
          />
          :
          ''
        }
        {withHotel ? 
          <ConfirmationTicket
            setFormData={setFormData}
            formData={formData}
            eventInfos={eventInfos}
            setConfirmedTicket={setConfirmedTicket}
          />
          :
          ''
        }
        {noHotel ?
          <ConfirmationTicket
            setFormData={setFormData}
            formData={formData}
            eventInfos={eventInfos}
            setConfirmedTicket={setConfirmedTicket}
          />
          :
          ''
        }
      </Container>
      <>
        {confirmedTicket ?
          <TicketSummary formData={formData}/>
          :
          ''
        }
      </>
    </>
  ); 
}
