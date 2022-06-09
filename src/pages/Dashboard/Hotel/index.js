import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { StyledTypography } from '../../../components/PersonalInformationForm';
import useToken from '../../../hooks/useToken';
import { getPersonalInformations } from '../../../services/enrollmentApi';
import { findPayment, findTicket } from '../../../services/ticketApi';
import { ContainerEmptyInfo, EmptyInfoText } from '../Payment/style';

export default function Hotel() {
  const token = useToken();
  const [isPaid, setPaid] = useState(false);
  const [hasAccomodation, setAccomodation] = useState(false);

  useEffect(() => {
    const promiseEnrollment = getPersonalInformations(token);
    promiseEnrollment
      .then((response) => {
        const enrollmentData = response.id;

        const promiseTicket = findTicket(token, enrollmentData);
        promiseTicket
          .then((response) => {
            if (response.withAccommodation) {
              setAccomodation(true);
            } else {
              setAccomodation(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(() => {
        setAccomodation(false);
      });

    const promisePayment = findPayment(token);
    promisePayment
      .then((response) => {
        if (response.isPaid) {
          setPaid(true);
        } else {
          setPaid(false);
        }
      })
      .catch(() => {
        setPaid(false);
      });
  }, []);

  return (
    <>
      <StyledTypography variant='h4'>Escolha de hotel e quarto</StyledTypography>
      {!isPaid ?
        <ContainerEmptyInfo>
          <EmptyInfoText>
            Você precisa ter confirmado pagamento antes <br />
            de fazer a escolha de hospedagem
          </EmptyInfoText>
        </ContainerEmptyInfo>
        : !hasAccomodation ?
          <ContainerEmptyInfo>
            <EmptyInfoText>
              Sua modalidade de ingresso não inclui hospedagem <br />
              Prossiga para a escolha de atividades
            </EmptyInfoText>
          </ContainerEmptyInfo>
          :
          ''
      }
    </>
  );
}
