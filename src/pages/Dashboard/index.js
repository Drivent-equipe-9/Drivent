import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import EventInfoContext from '../../contexts/EventInfoContext';

import NavigationBar from '../../components/Dashboard/NavigationBar';

import DashboardLayout from '../../layouts/Dashboard';

export default function Dashboard() {
  const { eventInfo } = useContext(EventInfoContext);

  return (
    <DashboardLayout background={eventInfo.backgroundImageUrl}>
      <NavigationBar />

      <Container>
        <Outlet />
      </Container>
    </DashboardLayout>
  );
}

const Container = styled.div`
  padding: 30px 20px 30px 20px ;
  height: 100%;
  width: 100%;
  overflow-y: auto;

  margin-right: -15px;

  @media (max-width: 600px) {
    height: calc(100vh - 80px);
    padding: 20px;
  }
`;
