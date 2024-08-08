import React, { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';
import { HereWallet } from '@here-wallet/core';

interface HotUser {
  accounts: {
    near: string;
    solana: string;
    evm: string;
    ton: string;
  };
  hotBalance: number;
}

interface HotContextProps {
  login: () => void;
  logout: () => void;
  here: HereWallet | null;
  user: HotUser | null;
}

interface HotWalletProviderProps {
  children: ReactNode;
}

const HotContext = createContext<HotContextProps>({
  login: () => { },
  logout: () => { },
  here: null,
  user: null,
});

export const useHotWallet = () => {
  return useContext(HotContext);
};

export const HotWalletProvider: React.FC<HotWalletProviderProps> = ({ children }) => {
  const [here, setHere] = useState<HereWallet | null>(null);
  const [user, setUser] = useState<HotUser | null>(null);

  useEffect(() => {
    const init = async () => {
      const here = await HereWallet.connect({
        walletId: 'herewalletbot/app',
        botId: `${process.env.REDIRECT_BOT_ID}`,
      });

      setHere(here);

      const isSigned = await here.isSignedIn();
      if (isSigned) {
        const near = await here.getAccountId();
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/user/` + near, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
        const hotBalance = await getHotBalance(near);
        setUser({ accounts: { near, solana: '', evm: '', ton: '' }, hotBalance });
      }
    };

    init();
  }, []);

  const login = useCallback(() => {
    here?.authenticate();
  }, [here]);

  const logout = useCallback(() => {
    here?.signOut();
    setUser(null);
  }, [here]);

  const getHotBalance = async (accountId: string): Promise<number> => {
    return 10;
  };

  return (
    <HotContext.Provider value={{ login, logout, here, user }}>
      {children}
    </HotContext.Provider>
  );
};
