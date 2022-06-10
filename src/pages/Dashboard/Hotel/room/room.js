import { EmptyInfoText } from '../../Payment/style';
import { ContainerRoom, Rooms, Vacancies } from './style';

import  { IoPersonOutline } from 'react-icons/io5';

export default function Room() {
  const rooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return(
    <>
      <EmptyInfoText>Ótima pedida! Agora escolha seu quarto:</EmptyInfoText>
      <ContainerRoom>
        {rooms.map(room => (
          <Rooms>
            <span>101</span>

            <Vacancies>
              <IoPersonOutline size={22} />
              <IoPersonOutline size={22} />
              <IoPersonOutline size={22} />
            </Vacancies>
          </Rooms>
        ))}
      </ContainerRoom>
    </>
  );
}
