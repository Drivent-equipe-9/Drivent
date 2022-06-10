import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Countdown from './pages/Countdown';
import Enroll from './pages/Enroll';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import FillSubscription from './pages/Dashboard/FillSubscription';
import Payment from './pages/Dashboard/Payment';
import Hotel from './pages/Dashboard/Hotel';
import Activities from './pages/Dashboard/Activities';
import Certificate from './pages/Dashboard/Certificate';

import { EventInfoProvider } from './contexts/EventInfoContext';
import { UserProvider } from './contexts/UserContext';

import useToken from './hooks/useToken';
import { useState } from 'react';
import HotelReserved from './pages/Dashboard/Hotel/HotelReserved/hotelReserved';

export default function App() {
  const [hasHotel, setHasHotel ] = useState(false);

  return (
    <>
      <ToastContainer />
      <EventInfoProvider>
        <UserProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Countdown />} />
              <Route path="/enroll" element={<Enroll />} />
              <Route path="/sign-in" element={<SignIn />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRouteGuard>
                    <Dashboard />
                  </ProtectedRouteGuard>
                }
              >
                <Route path="subscription" element={<FillSubscription />} />
                <Route path="payment" element={<Payment setHasHotel={setHasHotel} />} />
                <Route path="hotel" element={<Hotel hasHotel={hasHotel} />} />
                <Route path="hotel/reservation" element={<HotelReserved />} />
                <Route path="activities" element={<Activities />} />
                <Route path="certificate" element={<Certificate />} />
                <Route index path="*" element={<Navigate to="/dashboard/subscription" />} />
              </Route>
            </Routes>
          </Router>
        </UserProvider>
      </EventInfoProvider>
    </>
  );
}

function ProtectedRouteGuard({ children }) {
  const token = useToken();

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return <>
    {children}
  </>;
}
