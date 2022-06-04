/* eslint-disable space-before-function-paren */
import { useContext, useState } from 'react';
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
import UserContext from '../../../contexts/UserContext';

export default function Payment() {
  const token = useToken();
  const { userData } = useContext(UserContext);

  const [haveInfos, setHaveInfos] = useState();
  const [eventInfos, setEventInfos] = useState();
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
  const [paymentData, setPaymentData] = useState([]);
  const [paymentConfirm, SetPaymentConfirm] = useState(false);
  const [ticketData, setTicketData] = useState({});

  useEffect(async () => {
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
        if (error.status === 404) {
          setHaveInfos(false);
        }
      });

    const promisePayment = findPayment(token);
    promisePayment
      .then((responsePayment) => {
        setPaymentData(responsePayment);
      })
      .catch((error) => {
        toast('Occoreu um erro, tente novamente mais tarde.');
      });

    const promiseTicket = findTicket(token, formData.enrollmentId);
    promiseTicket
      .then((responseTicket) => {
        console.log(responseTicket);
        setTicketData(responseTicket);
      })
      .catch((error) => {
        console.log(error);
        toast('Occoreu um erro, tente novamente mais tarde.');
      });
  }, [paymentConfirm]);

  console.log(ticketData);

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
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
            eventInfos={eventInfos}
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
            eventInfos={eventInfos}
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
      <>
        {confirmedTicket &&
          <>
            <TicketSummary formData={formData} />
            <EmptyInfoText>Pagamento</EmptyInfoText>
            {paymentData.isPaid || paymentConfirm ?
              <PaymentConfirmed>
                <FaCheckCircle size={45} color={'#36B853'} />
                <PaidText>
                  <strong>Pagamento confirmado!</strong>
                  <span>Prossiga para escolha de hospedagem e atividades</span>
                </PaidText>
              </PaymentConfirmed>
              :
              <PaymentForm SetPaymentConfirm={SetPaymentConfirm} paymentConfirm={paymentConfirm} />
            }
          </>
        }
      </>
    </>
  );
}
