import { createContext, useState } from 'react';

const ChangeRoomContext = createContext();

export function ChangeRoomProvider({ children }) {
  const [changeRoom, setChangeRoom] = useState(false);

  return (
    <ChangeRoomContext.Provider value={{ changeRoom, setChangeRoom }}>
      {children}
    </ChangeRoomContext.Provider>
  );
}

export default ChangeRoomContext;
