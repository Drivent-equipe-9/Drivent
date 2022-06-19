import {
  Container,
  ContainerDate,
  ContainerActivitiesRight,
  ContainerActivitiesCenter,
  ContainerActivitiesLeft,
  InfoText,
  Option,
  Info,
  InfoButton,
  BoxDiv,
  Separation
} from './style';
import { getActivitiesByDate } from '../../../../services/activitiesApi';
import { toast } from 'react-toastify';
import useToken from '../../../../hooks/useToken';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box } from '@material-ui/core';
import { IoLogInOutline, IoCloseCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';

export function Activity({ dateInfo }) {
  const token = useToken();
  const navigate = useNavigate();

  const [isregister, setIsRegister] = useState(false);
  const [isDateSelected, setDateSelected] = useState(false);
  const [arrayPrincipal, setArrayPrincipal] = useState([]);
  const [arrayLateral, setArrayLateral] = useState([]);
  const [arrayWorkshop, setArrayWorkshop] = useState([]);
  const [allActivities, setAllActivities] = useState([]);

  function handleDateChange(d) {
    renderDate(d);

    let newPrincipal = [];
    let newLateral = [];
    let newWorkshop = [];

    const promiseActivity = getActivitiesByDate(d.originalDate, token);
    promiseActivity
      .then((response) => {
        setAllActivities(response);
        for (let i = 0; i < response.length; i++) {
          response[i].isSelected = false;

          if (response[i].location === 'Auditório Principal' && response[i].date === d.originalDate) {
            newPrincipal.push(response[i]);
          }
          if (response[i].location === 'Auditório Lateral' && response[i].date === d.originalDate) {
            newLateral.push(response[i]);
          }
          if (response[i].location === 'Sala de Workshop' && response[i].date === d.originalDate) {
            newWorkshop.push(response[i]);
          }
        }

        checkBoxSizeLateral(newLateral);
        checkBoxSizePrincipal(newPrincipal);
        checkBoxSizeWorkshop(newWorkshop);
      })
      .catch(() => {
        toast('Algo deu errado, tente novamente.');
      });
  }

  function renderDate(dates) {
    for (let i = 0; i < dateInfo.length; i++) {
      if (i === dates.id - 1) {
        dateInfo[i].isSelected = true;
        setDateSelected(true);
      } else {
        dateInfo[i].isSelected = false;
        setDateSelected(true);
      }
    }

    return dates;
  }

  function checkBoxSizePrincipal(a) {
    let margin = 0;
    let size = 0;
    let newArray = [];
    let firstHour = 9;
    for (let i = 0; i < a.length; i++) {
      if (i === 0) {
        let diff = parseInt(a[i].startsAt) - firstHour;

        let duration = parseInt(a[i].endsAt) - parseInt(a[i].startsAt);
        size = duration * 80 + (duration - 1) * 10;

        if (diff === 0) {
          margin = 10;
        } else {
          margin = 80 * diff + 10 * diff + 10;
        }
      } else {
        let diff = parseInt(a[i].startsAt) - parseInt(a[i - 1].endsAt);

        let duration = parseInt(a[i].endsAt) - parseInt(a[i].startsAt);
        size = duration * 80 + (duration - 1) * 10;

        if (diff === 0) {
          margin = 10;
        } else {
          margin = 80 * diff + 10 * diff;
        }
      }
      newArray.push({ ...a[i], margin, size });
    }
    setArrayPrincipal(newArray);
  }

  function checkBoxSizeLateral(a) {
    let margin = 0;
    let size = 0;
    let newArray = [];
    let firstHour = 9;
    for (let i = 0; i < a.length; i++) {
      if (i === 0) {
        let diff = parseInt(a[i].startsAt) - firstHour;

        let duration = parseInt(a[i].endsAt) - parseInt(a[i].startsAt);

        size = duration * 80 + (duration - 1) * 10;

        if (diff === 0) {
          margin = 10;
        } else {
          margin = 80 * diff + 10 * diff + 10;
        }
      } else {
        let diff = parseInt(a[i].startsAt) - parseInt(a[i - 1].endsAt);

        let duration = parseInt(a[i].endsAt) - parseInt(a[i].startsAt);
        size = duration * 80 + (duration - 1) * 10;
        if (diff === 0) {
          margin = 10;
        } else {
          margin = 80 * diff + 10 * diff;
        }
      }
      newArray.push({ ...a[i], margin, size });
    }
    setArrayLateral(newArray);
  }

  function checkBoxSizeWorkshop(a, b) {
    let margin = 0;
    let size = 0;
    let newArray = [];
    let firstHour = 9;
    for (let i = 0; i < a.length; i++) {
      if (i === 0) {
        let diff = parseInt(a[i].startsAt) - firstHour;

        let duration = parseInt(a[i].endsAt) - parseInt(a[i].startsAt);
        size = duration * 80 + (duration - 1) * 10;

        if (diff === 0) {
          margin = 10;
        } else {
          margin = 80 * diff + 10 * diff + 10;
        }
      } else {
        let diff = parseInt(a[i].startsAt) - parseInt(a[i - 1].endsAt);

        let duration = parseInt(a[i].endsAt) - parseInt(a[i].startsAt);
        size = duration * 80 + (duration - 1) * 10;
        if (diff === 0) {
          margin = 10;
        } else {
          margin = 80 * diff + 10 * diff;
        }
      }
      newArray.push({ ...a[i], margin, size });
    }
    setArrayWorkshop(newArray);
  }

  function handleActivitySelection(a) { }

  function register() {
    setIsRegister(true);
  }

  return (
    <>
      <InfoText isSelected={isDateSelected}>Primeiro, filtre pelo dia do evento: </InfoText>
      <ContainerDate>
        {dateInfo?.map((d) => (
          <Option key={d.id} onClick={() => handleDateChange(d)} isDateSelected={d.isSelected}>
            {d.date}
          </Option>
        ))}
      </ContainerDate>
      {isDateSelected && (
        <Container>
          <BoxDiv>
            <h1>Auditório Principal</h1>
            <ContainerActivitiesLeft>
              {arrayPrincipal.map((a) => (
                <Box
                  key={a.id}
                  id={a.id}
                  disabled={!a.vacancies}
                  onClick={() => handleActivitySelection(a)}
                  isActivityFull={!a.vacancies}
                  isRoomSelected={a.isSelected}
                  sx={{
                    marginTop: `${a.margin}px`,
                    height: `${a.size}px`,
                    width: '275px',
                    marginLeft: '12px',
                    marginRight: '12px',
                    marginBottom: '12px',
                    border: '1px solid #cecece',
                    borderRadius: '5px',
                    backgroundColor: '#f1f1f1',
                    flexDirection: 'row',
                    display: 'flex',
                    padding: '12px',
                    justifyContent: 'space-around',
                    flexShrink: 0,
                    color: 'black',
                  }}
                >
                  <Info>
                    <h2>{a.name}</h2>
                    <h3>
                      {a.startsAt} - {a.endsAt}
                    </h3>
                  </Info>
                  <Separation />
                  <InfoButton onClick={register}> 
                    {a.vacancies === 0 ? 
                      <>
                        <IoCloseCircleOutline color='red' size={30}/>
                        <h5>Esgotado</h5> 
                      </>
                      : 
                      isregister ?
                        <>
                          <IoCheckmarkCircleOutline color='green' size={30}/>
                          <h4>inscrito</h4>
                        </>
                        :
                        <>
                          <IoLogInOutline color='green' size={30}/>
                          <h4>{a.vacancies} vagas</h4>
                        </>
                    }
                  </InfoButton>
                </Box>
              ))}
            </ContainerActivitiesLeft>
          </BoxDiv>
          <BoxDiv>
            <h1>Auditório Lateral</h1>
            <ContainerActivitiesCenter>
              {arrayLateral.map((a) => (
                <Box
                  key={a.id}
                  id={a.id}
                  disabled={!a.vacancies}
                  onClick={() => handleActivitySelection(a)}
                  isActivityFull={!a.vacancies}
                  isRoomSelected={a.isSelected}
                  sx={{
                    marginTop: `${a.margin}px`,
                    height: `${a.size}px`,
                    width: '280px',
                    marginLeft: '12px',
                    marginRight: '12px',
                    marginBottom: '12px',
                    border: '1px solid #cecece',
                    borderRadius: '5px',
                    backgroundColor: '#f1f1f1',
                    flexDirection: 'row',
                    display: 'flex',
                    padding: '12px',
                    justifyContent: 'space-around',
                    flexShrink: 0,
                    color: 'black',
                  }}
                >
                  <Info>
                    <h2>{a.name}</h2>
                    <h3>
                      {a.startsAt} - {a.endsAt}
                    </h3>
                  </Info>
                  <Separation />
                  <InfoButton onClick={register}>
                    {a.vacancies === 0 ? 
                      <>
                        <IoCloseCircleOutline color='red' size={30}/>
                        <h5>Esgotado</h5> 
                      </>
                      : 
                      isregister ?
                        <>
                          <IoCheckmarkCircleOutline color='green' size={30}/>
                          <h4>inscrito</h4>
                        </>
                        :
                        <>
                          <IoLogInOutline color='green' size={30}/>
                          <h4>{a.vacancies} vagas</h4>
                        </>
                    }
                  </InfoButton>
                </Box>
              ))}
            </ContainerActivitiesCenter>
          </BoxDiv>
          <BoxDiv>
            <h1>Sala de Workshop</h1>
            <ContainerActivitiesRight>
              {arrayWorkshop.map((a) => (
                <Box
                  key={a.id}
                  id={a.id}
                  disabled={!a.vacancies}
                  onClick={() => handleActivitySelection(a)}
                  isActivityFull={!a.vacancies}
                  isRoomSelected={a.isSelected}
                  sx={{
                    marginTop: `${a.margin}px`,
                    height: `${a.size}px`,
                    width: '285px',
                    marginLeft: '12px',
                    marginRight: '12px',
                    marginBottom: '12px',
                    border: '1px solid #cecece',
                    borderRadius: '5px',
                    backgroundColor: '#f1f1f1',
                    flexDirection: 'row',
                    display: 'flex',
                    padding: '12px',
                    justifyContent: 'space-around',
                    flexShrink: 0,
                    color: 'black',
                  }}
                >
                  <Info>
                    <h2>{a.name}</h2>
                    <h3>
                      {a.startsAt} - {a.endsAt}
                    </h3>
                  </Info>
                  <Separation />
                  <InfoButton onClick={register}>
                    {a.vacancies === 0 ? 
                      <>
                        <IoCloseCircleOutline color='red' size={30}/>
                        <h5>Esgotado</h5> 
                      </>
                      : 
                      isregister ?
                        <>
                          <IoCheckmarkCircleOutline color='green' size={30}/>
                          <h4>inscrito</h4>
                        </>
                        :
                        <>
                          <IoLogInOutline color='green' size={30}/>
                          <h4>{a.vacancies} vagas</h4>
                        </>
                    }
                  </InfoButton>
                </Box>
              ))}
            </ContainerActivitiesRight>
          </BoxDiv>
        </Container>
      )}
    </>
  );
}
