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
import useChangeRoom from '../../../hooks/useChangeRoom';
import PuffLoading from '../../../components/PuffLoading';

export default function Payment() {
  const token = useToken();
  const { setChangeRoom } = useChangeRoom();

  const [haveInfos, setHaveInfos] = useState(false);
  const [eventData, setEventData] = useState();
  const [paymentData, setPaymentData] = useState([]);
  const [ticketData, setTicketData] = useState({});

  const [isLoading, setLoading] = useState(true);

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
    setChangeRoom(false);
    handleDatabaseCalls();
  }, [confirmedTicket, confirmPayment, haveInfos]);

  async function handleDatabaseCalls() {
    setLoading(true);
    try {
      const promiseUser = await getPersonalInformations(token);
      setHaveInfos(true);

      const promiseEvent = await getEventInfo();
      setEventData(promiseEvent);
      setFormData({ ...formData, eventId: promiseEvent.id, enrollmentId: promiseUser.id });

      const promiseTicket = await findTicket(token, promiseUser.id);
      setTicketData(promiseTicket);

      const promisePayment = await findPayment(token);
      setPaymentData(promisePayment);

      setLoading(false);
    } catch {
      toast.error('Não foi possível carregar algumas informações. Por favor, tente novamente mais tarde.');
      return;
    }
  }

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>

      {isLoading ?
        <PuffLoading />
        :
        !ticketData || !haveInfos ?
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
            <TicketSummary ticketData={ticketData} isLoading={isLoading} />
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
              <PaymentForm setConfirmPayment={setConfirmPayment} />
            }
          </>
      }
    </>
  );
}
