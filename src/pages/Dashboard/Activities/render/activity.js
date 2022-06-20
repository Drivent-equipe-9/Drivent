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
import { getActivitiesByDate, register } from '../../../../services/activitiesApi';
import { toast } from 'react-toastify';
import useToken from '../../../../hooks/useToken';

import { useState } from 'react';

import { Box } from '@material-ui/core';
import { IoLogInOutline, IoCloseCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';

export function Activity({ dateInfo }) {
  const token = useToken();

  const [isDateSelected, setDateSelected] = useState(false);
  const [registeredActivities, setRegisteredActivities] = useState();
  const [arrayPrincipal, setArrayPrincipal] = useState([]);
  const [arrayLateral, setArrayLateral] = useState([]);
  const [arrayWorkshop, setArrayWorkshop] = useState([]);
  const [allActivities, setAllActivities] = useState([]);
  const [dateData, setDateData] = useState();

  function handleDateChange(d) {
    setDateData(d);
    renderDate(d);

    let newPrincipal = [];
    let newLateral = [];
    let newWorkshop = [];

    const promiseActivity = getActivitiesByDate(d.originalDate, token);
    promiseActivity
      .then((response) => {
        let activitiesUser = response.filter((act) => act.ActivityUser.length > 0 );
        setRegisteredActivities(activitiesUser);

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

  async function handleClickActivity(id, thisActivity) {
    if(thisActivity.ActivityUser?.length === 1) {
      toast('Você já está inscrito nesta atividade.');
      return;
    } 

    if(thisActivity.vacancies === 0) {
      toast.error('Não há vagas.');
      return;
    }
    verifyTimeConflict(thisActivity, id);
  }

  async function verifyTimeConflict(activity, id) {
    if( registeredActivities.length === 0 ) {
      registerActivity(id, activity);
      return;
    } else {
      for( let i = 0; i < registeredActivities.length; i++ ) {
        let initDateRegistered = registeredActivities[i].startsAt;
        let endDateRegistered = registeredActivities[i].endsAt;

        let initDateThisActivity = activity.startsAt;
        let endDateThisActivity = activity.endsAt;
        
        if (initDateThisActivity === initDateRegistered ||
            (initDateThisActivity > initDateRegistered && initDateThisActivity < endDateRegistered) ||
            (endDateThisActivity > initDateRegistered && endDateThisActivity < endDateRegistered) ||
            endDateThisActivity === endDateRegistered) {
          toast('Você já possui uma atividade nesse horário.');
          return;
        }
      }
    }
    
    registerActivity(id, activity);
  }

  function registerActivity(id, activity) {
    const promise = register(id, token);
    promise
      .then(() => {
        handleDateChange(dateData);
        toast('Inscrito com sucesso!');
      })
      .catch((error) => {
        toast('Falha ao se inscrever. Tente novamente.');
      });
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
                  isActivityFull={!a.vacancies}
                  isRoomSelected={a.isSelected}
                  sx={{
                    marginTop: `${a.margin}px`,
                    height: `${a.size}px`,
                    width: '275px',
                    marginLeft: '12px',
                    marginRight: '12px',
                    marginBottom: '12px',
                    borderRadius: '5px',
                    backgroundColor: a.ActivityUser.length === 1 ? '#D0FFDB' : '#f1f1f1',
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
                      {a.startsAt}:00 - {a.endsAt}:00
                    </h3>
                  </Info>
                  <Separation arrayRegister={a.ActivityUser.length} />
                  <InfoButton arrayRegister={a.ActivityUser.length} onClick={() => handleClickActivity(a.id, a)}> 
                    {a.vacancies === 0 ? 
                      <>
                        <IoCloseCircleOutline color='#CC6666' size={30}/>
                        <h5>Esgotado</h5> 
                      </>
                      : 
                      a.ActivityUser.length === 1 ?
                        <>
                          <IoCheckmarkCircleOutline color='#078632' size={30}/>
                          <h4>inscrito</h4>
                        </>
                        :
                        <>
                          <IoLogInOutline color='#078632' size={30}/>
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
                  isActivityFull={!a.vacancies}
                  isRoomSelected={a.isSelected}
                  sx={{
                    marginTop: `${a.margin}px`,
                    height: `${a.size}px`,
                    width: '280px',
                    marginLeft: '12px',
                    marginRight: '12px',
                    marginBottom: '12px',
                    borderRadius: '5px',
                    backgroundColor: a.ActivityUser.length === 1 ? '#D0FFDB' : '#f1f1f1',
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
                      {a.startsAt}:00 - {a.endsAt}:00
                    </h3>
                  </Info>
                  <Separation arrayRegister={a.ActivityUser.length} />
                  <InfoButton arrayRegister={a.ActivityUser.length} onClick={() => handleClickActivity(a.id, a)}>
                    {a.vacancies === 0 ? 
                      <>
                        <IoCloseCircleOutline color='#CC6666' size={30}/>
                        <h5>Esgotado</h5> 
                      </>
                      : 
                      a.ActivityUser.length === 1 ?
                        <>
                          <IoCheckmarkCircleOutline color='#078632' size={30}/>
                          <h4>inscrito</h4>
                        </>
                        :
                        <>
                          <IoLogInOutline color='#078632' size={30}/>
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
                  isActivityFull={!a.vacancies}
                  isRoomSelected={a.isSelected}
                  sx={{
                    marginTop: `${a.margin}px`,
                    height: `${a.size}px`,
                    width: '285px',
                    marginLeft: '12px',
                    marginRight: '12px',
                    marginBottom: '12px',
                    borderRadius: '5px',
                    backgroundColor: a.ActivityUser.length === 1 ? '#D0FFDB' : '#f1f1f1',
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
                      {a.startsAt}:00 - {a.endsAt}:00
                    </h3>
                  </Info>
                  <Separation arrayRegister={a.ActivityUser.length} />
                  <InfoButton arrayRegister={a.ActivityUser.length} onClick={() => handleClickActivity(a.id, a)}>
                    {a.vacancies === 0 ? 
                      <>
                        <IoCloseCircleOutline color='#CC6666' size={30}/>
                        <h5>Esgotado</h5> 
                      </>
                      : 
                      a.ActivityUser.length === 1 ?
                        <>
                          <IoCheckmarkCircleOutline color='#078632' size={30}/>
                          <h4>inscrito</h4>
                        </>
                        :
                        <>
                          <IoLogInOutline color='#078632' size={30}/>
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
