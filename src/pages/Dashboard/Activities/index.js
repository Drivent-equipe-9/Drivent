import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import { StyledTypography } from '../../../components/PersonalInformationForm';
import { ContainerEmptyInfo, EmptyInfoText } from '../Payment/style';
import { Activity } from './render/activity';

import PuffLoading from '../../../components/PuffLoading';

import { getPersonalInformations } from '../../../services/enrollmentApi';
import { findPayment, findTicket } from '../../../services/ticketApi';
import { getDatesInfo } from '../../../services/activitiesApi';

import useToken from '../../../hooks/useToken';

export default function Activities() {
  const token = useToken();

  const [dates, setDates] = useState();
  const [isOnline, setOnline] = useState(false);
  const [isPaid, setPaid] = useState(false);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    handleDatabaseCalls();
  }, []);

  async function handleDatabaseCalls() {
    try {
      const promisePayment = await findPayment(token);
      if (promisePayment.isPaid) setPaid(true);
      if (!promisePayment.isPaid) setPaid(false);

      const promiseEnrollment = await getPersonalInformations(token);
      const enrollmentData = promiseEnrollment.id;

      const promiseTicket = await findTicket(token, enrollmentData);
      if (promiseTicket.isOnline) setOnline(true);
      if (!promiseTicket.isOnline) setOnline(false);

      const promiseActivity = await getDatesInfo(token);
      setDates(promiseActivity);

      setLoading(false);
    } catch {
      setLoading(false);
      setPaid(false);
      setOnline(false);
    }
  }

  return (
    <>
      <StyledTypography variant='h4'>Escolha de atividades</StyledTypography>
      {isLoading ?
        <PuffLoading>Loading</PuffLoading>
        :
        !isPaid ?
          <ContainerEmptyInfo>
            <EmptyInfoText>
              Você precisa ter confirmado pagamento antes <br />
              de fazer a escolha de hospedagem
            </EmptyInfoText>
          </ContainerEmptyInfo>
          :
          isOnline ?
            <ContainerEmptyInfo>
              <EmptyInfoText>
                Sua modalidade de ingresso não necessita escolher <br />
                atividade. Você terá acesso a todas as atividades.
              </EmptyInfoText>
            </ContainerEmptyInfo>
            :
            <Activity dateInfo={dates} setDates={setDates} />
      }
    </>
  );
}
