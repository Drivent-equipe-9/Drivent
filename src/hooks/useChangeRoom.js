import { useContext } from 'react';
import ChangeRoomContext from '../contexts/ChangeRoomContext';

export default function useChangeRoom() {
  return useContext(ChangeRoomContext);
}
