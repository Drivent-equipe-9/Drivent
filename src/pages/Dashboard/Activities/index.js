import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import { StyledTypography } from '../../../components/PersonalInformationForm';
import { ContainerEmptyInfo, EmptyInfoText } from '../Payment/style';
import { Activity } from './activity/activity';

import PuffLoading from '../../../components/PuffLoading';

import { getPersonalInformations } from '../../../services/enrollmentApi';
import { findPayment, findTicket } from '../../../services/ticketApi';
import { getDatesInfo } from '../../../services/activitiesApi';

import useToken from '../../../hooks/useToken';

export default function Activities() {
  const token = useToken();

  const [dates, setDates] = useState([]);
  const [isOnline, setOnline] = useState(false);
  const [isPaid, setPaid] = useState(false);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const promisePayment = findPayment(token);
    promisePayment
      .then((response) => {
        if (response.isPaid) {
          setPaid(true);
        } else {
          setPaid(false);
        }
        setLoading(false);
      })
      .catch(() => {
        setPaid(false);
        setLoading(false);
      });

    const promiseEnrollment = getPersonalInformations(token);
    promiseEnrollment
      .then((response) => {
        const enrollmentData = response.id;

        const promiseTicket = findTicket(token, enrollmentData);
        promiseTicket
          .then((response) => {
            if (response.isOnline) {
              setOnline(true);
            } else {
              setOnline(false);
            }
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      })
      .catch(() => {
        setOnline(false);
        setLoading(false);
      });

    const promiseActivity = getDatesInfo(token);
    promiseActivity
      .then((responseActivity) => {
        setDates(responseActivity);
      })
      .catch(() => {
        toast('Não foi possível carregar as informações das atividades!');
      });
  }, []);

  return (
    <>
      <StyledTypography variant='h4'>Escolha de atividades</StyledTypography>
      {!isPaid ?
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
          isLoading ?
            <PuffLoading>Loading</PuffLoading>
            :
            <Activity dateInfo={dates} setDates={setDates} />
      }
    </>
  );
}
