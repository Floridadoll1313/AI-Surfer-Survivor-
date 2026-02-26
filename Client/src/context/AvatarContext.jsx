import React, { createContext, useContext, useState, useEffect } from 'react';

type AvatarContextType = {
  selectedAvatar: string;
  setAvatar: (id: string) => void;
};

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export const AvatarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(
    localStorage.getItem('survivor_avatar') || 'ghost'
  );

  const setAvatar = (id: string) => {
    setSelectedAvatar(id);
    localStorage.setItem('survivor_avatar', id);
  };

  return (
    <AvatarContext.Provider value={{ selectedAvatar, setAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => {
  const context = useContext(AvatarContext);
  if (!context) throw new Error('useAvatar must be used within an AvatarProvider');
  return context;
};
