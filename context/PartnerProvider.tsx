'use client';

import { validatePartnerId } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useReducer, useCallback } from 'react';

export enum ActionType {
  SET_PARTNER_ID = 'SET_PARTNER_ID',
}

type PartnerAction = {
  type: ActionType.SET_PARTNER_ID;
  payload: string;

}

interface PartnerState {
  partnerId: string;
}

interface PartnerContextType {
  state: PartnerState;
  actions: {
    setPartnerId: (value: string) => void;
    handleLogin: (e: React.FormEvent) => void;
  };
  getters: {
    partnerId: string;
  };
}

const initialState: PartnerState = {
  partnerId: ''
};

function partnerReducer(state: PartnerState, action: PartnerAction): PartnerState {
  switch (action.type) {
    case ActionType.SET_PARTNER_ID:
      return { ...state, partnerId: action.payload };
    default:
      return state;
  }
}

const PartnerContext = createContext<PartnerContextType | undefined>(undefined);

export function PartnerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(partnerReducer, initialState);
  const router = useRouter()
  const handleSetPartnerId = useCallback((value: string) => {
    dispatch({ type: ActionType.SET_PARTNER_ID, payload: value });
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validatePartnerId(state.partnerId);
    if (isValid) {
      router.push("/dashboard");
    }
  };

  const actions = {
    setPartnerId: handleSetPartnerId,
    handleLogin: handleLogin
  };

  const getters = {
    partnerId: state.partnerId
  };

  return (
    <PartnerContext.Provider value={{ state, actions, getters }}>
      {children}
    </PartnerContext.Provider>
  );
}

export function usePartnerContext() {
  const context = useContext(PartnerContext);
  if (context === undefined) {
    throw new Error('usePartnerContext must be used within a PartnerProvider');
  }
  return context;
}