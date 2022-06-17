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
} from './style';
import { getActivitiesByDate } from '../../../../services/activitiesApi';
import { toast } from 'react-toastify';
import useToken from '../../../../hooks/useToken';
import Box from '@mui/material/Box';

import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
  
export function Activity({ dateInfo }) {
  const token = useToken();
  const navigate = useNavigate();
  const [isDateSelected, setDateSelected] = useState(false);
  const [arrayPrincipal, setArrayPrincipal] = useState([]);
  const [arrayLateral, setArrayLateral] = useState([]);
  const [allActivities, setAllActivities] = useState([]);
  const [arrayWorkshop, setArrayWorkshop] = useState([]);
  
  function handleDateChange(d) {
    renderDate(d);

    let newPrincipal = [];
    let newLateral = [];
    let newWorkshop = [];

    const promiseActivity = getActivitiesByDate(d, token);
    promiseActivity
      .then((response) => {
        setAllActivities(response);
        for (let i = 0; i < response.length; i++) {
          response[i].isSelected = false;
          setDateSelected(false);

          if (response[i].location === 'Auditório Principal' && response[i].date === d) {
            newPrincipal.push(response[i]);
          }
          if (response[i].location === 'Auditório Lateral' && response[i].date === d) {
            newLateral.push(response[i]);
          }

          if (response[i].location === 'Sala de Workshop' && response[i].date === d) {
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
      console.log({ ...a[i], margin, size });
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

      console.log({ ...a[i], margin, size });
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

  function handleActivitySelection(a) {}

  return (
    <>
      <InfoText>Primeiro, filtre pelo dia do evento: </InfoText>
      <ContainerDate>
        {dateInfo?.map((d) => (
          <Option name={d} onClick={() => handleDateChange(d)} isDateSelected={d.isSelected}>
            <h1>{d}</h1>
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
                    width: '265px',
                    marginLeft: '12px',
                    marginRight: '12px',
                    border: '1px solid #cecece',
                    borderRadius: '5px',
                    backgroundColor: '#f1f1f1',
                    flexDirection: 'row',
                    display: 'flex',
                    padding: '12px',
                    justifyContent: 'space-between',
                    color: 'black',
                  }}
                >
                  <Info>
                    <h2>{a.name}</h2>
                    <h3>
                      {a.startsAt} - {a.endsAt}
                    </h3>
                  </Info>
                  <InfoButton>{a.vacancies === '0' ? <h4>Esgotado</h4> : <h4>{a.vacancies} vagas</h4>}</InfoButton>
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
                    width: '265px',
                    marginLeft: '12px',
                    marginRight: '12px',
                    border: '1px solid #cecece',
                    borderRadius: '5px',
                    backgroundColor: '#f1f1f1',
                    flexDirection: 'row',
                    display: 'flex',
                    padding: '12px',
                    justifyContent: 'space-between',
                    color: 'black',
                  }}
                >
                  <Info>
                    <h2>{a.name}</h2>
                    <h3>
                      {a.startsAt} - {a.endsAt}
                    </h3>
                  </Info>
                  <InfoButton>{a.vacancies === '0' ? <h4>Esgotado</h4> : <h4>{a.vacancies} vagas</h4>}</InfoButton>
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
                    width: '265px',
                    marginLeft: '12px',
                    marginRight: '12px',
                    border: '1px solid #cecece',
                    borderRadius: '5px',
                    backgroundColor: '#f1f1f1',
                    flexDirection: 'row',
                    display: 'flex',
                    padding: '12px',
                    justifyContent: 'space-between',
                    color: 'black',
                  }}
                >
                  <Info>
                    <h2>{a.name}</h2>
                    <h3>
                      {a.startsAt} - {a.endsAt}
                    </h3>
                  </Info>
                  <InfoButton>{a.vacancies === '0' ? <h4>Esgotado</h4> : <h4>{a.vacancies} vagas</h4>}</InfoButton>
                </Box>
              ))}
            </ContainerActivitiesRight>
          </BoxDiv>
        </Container>
      )}
    </>
  );
}
