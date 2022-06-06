/* eslint-disable space-before-function-paren */
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
import PaymentForm from './cardForm/cardForm';
import { FaCheckCircle } from 'react-icons/fa';
import { PaidText, PaymentConfirmed } from './cardForm/style';
import { findPayment, findTicket } from '../../../services/ticketApi';

export default function Payment() {
  const token = useToken();

  const [haveInfos, setHaveInfos] = useState();
  const [eventData, setEventData] = useState();
  const [paymentData, setPaymentData] = useState([]);
  const [ticketData, setTicketData] = useState({});

  const [formData, setFormData] = useState({
    eventId: '',
    enrollmentId: '',
    isOnline: '',
    withAccommodation: false,
    totalPrice: ''
  });

  const [selectedData, setSelectedData] = useState({
    isPresential: false, isOnline: false,
    isPresentialActived: false, isOnlineActived: false,
    withHotel: false, noHotel: false,
    withHotelActived: false, noHotelActived: false
  });

  const [changeComponents, setChangeComponents] = useState({
    withPresence: false,
    onlineTicket: false,
    withHotel: false,
    noHotel: false,
  });

  const [confirmedTicket, setConfirmedTicket] = useState(false);
  const [confirmPayment, setConfirmPayment] = useState(false);

  useEffect(() => {
    const promise = getPersonalInformations(token);
    promise
      .then((response) => {
        setHaveInfos(true);

        const promiseEvent = getEventInfo();
        promiseEvent
          .then((responseEvent) => {
            setEventData(responseEvent);
            setFormData({ ...formData, eventId: responseEvent.id, enrollmentId: response.id });
          })
          .catch(() => {
            toast('Não foi possível carregar as informações do evento!');
          });

        const promiseTicket = findTicket(token, response.id);
        promiseTicket
          .then((responseTicket) => {
            setTicketData(responseTicket);
          })
          .catch(() => {
            toast('Não foi possível carregar as informações do ticket!');
          });
      })
      .catch(() => {
        return;
      });
     
    const promisePayment = findPayment(token);
    promisePayment
      .then((responsePayment) => {
        setPaymentData(responsePayment);
      })
      .catch(() => {
        toast('Não foi possível carregar as informações do pagamento!');
      });
  }, [confirmedTicket, confirmPayment]);

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>

      {!ticketData || !haveInfos ? 
        <Container confirmedTicket={confirmedTicket}>
          {!haveInfos ?
            <ContainerEmptyInfo>
              <EmptyInfoText>
                Você precisa completar sua inscrição antes <br />
                de prosseguir pra escolha de ingresso
              </EmptyInfoText>
            </ContainerEmptyInfo>
            :
            <TicketModality
              selectedData={selectedData}
              setSelectedData={setSelectedData}
              setFormData={setFormData}
              formData={formData}
              eventInfos={eventData}
              changeComponents={changeComponents}
              setChangeComponents={setChangeComponents}
            />
          }
          {changeComponents.onlineTicket ?
            <ConfirmationTicket
              formData={formData}
              setConfirmedTicket={setConfirmedTicket}
            />
            :
            ''
          }
          {changeComponents.withPresence ?
            <HostingModality
              selectedData={selectedData}
              setSelectedData={setSelectedData}
              setFormData={setFormData}
              formData={formData}
              eventInfos={eventData}
              changeComponents={changeComponents}
              setChangeComponents={setChangeComponents}
            />
            :
            ''
          }
          {changeComponents.withHotel ?
            <ConfirmationTicket
              formData={formData}
              setConfirmedTicket={setConfirmedTicket}
            />
            :
            ''
          }
          {changeComponents.noHotel ?
            <ConfirmationTicket
              formData={formData}
              setConfirmedTicket={setConfirmedTicket}
            />
            :
            ''
          }
        </Container>
        :
        <>
          <TicketSummary ticketData={ticketData} />
          <EmptyInfoText>Pagamento</EmptyInfoText>
          {paymentData.isPaid ?
            <PaymentConfirmed>
              <FaCheckCircle size={45} color={'#36B853'} />
              <PaidText>
                <strong>Pagamento confirmado!</strong>
                <span>Prossiga para escolha de hospedagem e atividades</span>
              </PaidText>
            </PaymentConfirmed>
            :
            <PaymentForm setConfirmPayment={setConfirmPayment}/>
          }
        </>
      }
    </>
  );
}
