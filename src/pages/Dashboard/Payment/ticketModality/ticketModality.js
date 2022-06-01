import { useState } from 'react';
import { Container, InfoText, Option } from './style';

export function TicketModality({ formData, activedData, setActivedData, selectedData, setSelectedData, setWithPresence, setFormData, eventInfos }) {
  function handlePresentialChange() {
    setSelectedData({ isPresential: true, isOnline: false });
    setActivedData({ isPresentialActived: true, isOnlineActived: false });
    setWithPresence(true);
    setFormData({ ...formData, isOnline: false, totalPrice: eventInfos.presentialPrice });
  }

  function handleOnlineChange() {
    setSelectedData({ isPresential: false, isOnline: true });
    setActivedData({ isPresentialActived: false, isOnlineActived: true });
    setWithPresence(false);
    setFormData({ ...formData, isOnline: true, totalPrice: eventInfos.onlinePrice });
  }

  return(
    <>
      <InfoText>
        Primeiro, escolha sua modalidade de ingresso
      </InfoText>
      
      <Container>
        <Option activedData={activedData.isPresentialActived} selectedData={selectedData} onClick={handlePresentialChange}>
          <p>Presencial</p>
          <span>R$ 250</span>
        </Option>

        <Option activedData={activedData.isOnlineActived} selectedData={selectedData} onClick={handleOnlineChange}>
          <p>Online</p>
          <span>R$ 100</span>
        </Option>
      </Container>
    </>
  );
}
