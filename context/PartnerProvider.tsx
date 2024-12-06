'use client';

import { Merchant } from '@/apiClient/apiRequests';
import { validateLogin } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useReducer, useCallback } from 'react';

export enum ActionType {
  SET_PARTNER_ID = 'SET_PARTNER_ID',
  SET_TOKEN_ID = 'SET_TOKEN_ID',
  SET_PARTNER_NAME = 'SET_PARTNER_NAME',
  SET_PARTNER_DATA = 'SET_PARTNER_DATA'
}

type PartnerAction = {
  type: ActionType;
  payload: any;
}

interface PartnerState {
  partnerId: string;
  tokenId: string;
  partnerName: string;
  partnerData: Merchant[];
}

interface PartnerContextType {
  state: PartnerState;
  actions: {
    setPartnerId: (value: string) => void;
    handleLogin: (e: React.FormEvent) => void;
    setTokenId: (value: string) => void;
    setPartnerName: (value: string) => void;
    setPartnerData: (value: Merchant[]) => void;
  };
  getters: {
    partnerId: string;
    tokenId: string;
    partnerName: string;
    partnerData: Merchant[];
  };
}

const initialState: PartnerState = {
  partnerId: '',
  tokenId: '',
  partnerName: '',
  partnerData: []
};

function partnerReducer(state: PartnerState, action: PartnerAction): PartnerState {
  switch (action.type) {
    case ActionType.SET_PARTNER_ID:
      return { ...state, partnerId: action.payload };
    case ActionType.SET_TOKEN_ID:
      return { ...state, tokenId: action.payload };  // Changed from action.tokenId to action.payload
    case ActionType.SET_PARTNER_NAME:
      return { ...state, partnerName: action.payload };
    case ActionType.SET_PARTNER_DATA:
      return { ...state, partnerData: action.payload };
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

  const handleSetTokenId = useCallback((value: string) => {
    dispatch({ type: ActionType.SET_TOKEN_ID, payload: value });
  }, []);

  const handleSetPartnerName = useCallback((value: string) => {
    dispatch({ type: ActionType.SET_PARTNER_NAME, payload: value });
  }, []);

  const handleSetPartnerData = useCallback((value: Merchant[]) => {
    dispatch({ type: ActionType.SET_PARTNER_DATA, payload: value });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid: any = await validateLogin(state.partnerName, state.partnerId);
    if (isValid) {
      router.push("/dashboard");
    }
  };

  const actions = {
    setPartnerId: handleSetPartnerId,
    handleLogin: handleLogin, 
    setTokenId: handleSetTokenId,
    setPartnerName: handleSetPartnerName,
    setPartnerData: handleSetPartnerData
  };

  const getters = {
    partnerId: state.partnerId,
    tokenId: state.tokenId,
    partnerName: state.partnerName,
    partnerData: state.partnerData
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