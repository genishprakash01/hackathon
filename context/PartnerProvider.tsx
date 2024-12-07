'use client';

import { Merchant } from '@/apiClient/apiRequests';
import { validateLogin } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useReducer, useCallback } from 'react';

export enum ActionType {
  SET_PARTNER_ID = 'SET_PARTNER_ID',
  SET_TOKEN_ID = 'SET_TOKEN_ID',
  SET_PARTNER_NAME = 'SET_PARTNER_NAME',
  SET_PARTNER_DATA = 'SET_PARTNER_DATA',
  SET_TOTAL_COMMISSIONS = 'SET_TOTAL_COMMISSIONS',
  SET_IS_LOADING = 'SET_IS_LOADING'
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
  totalCommissions: number;
  isLoading: boolean;
}

interface PartnerContextType {
  state: PartnerState;
  actions: {
    setPartnerId: (value: string) => void;
    handleLogin: (e: React.FormEvent) => void;
    setTokenId: (value: string) => void;
    setPartnerName: (value: string) => void;
    setPartnerData: (value: Merchant[]) => void;
    setTotalCommissions: (value: number) => void;
    setIsLoading: (value: boolean) => void;
  };
  getters: {
    partnerId: string;
    tokenId: string;
    partnerName: string;
    partnerData: Merchant[];
    totalCommissions: number;
    isLoading: boolean;
  };
}

const initialState: PartnerState = {
  partnerId: '',
  tokenId: '',
  partnerName: '',
  partnerData: [],
  totalCommissions: 0,
  isLoading: false
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
    case ActionType.SET_TOTAL_COMMISSIONS:
      return { ...state, totalCommissions: action.payload };
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

  const handleSetTotalCommissions = useCallback((value: number) => {
    dispatch({ type: ActionType.SET_TOTAL_COMMISSIONS, payload: value });
  }, []);

  const handleSetIsLoading = useCallback((value: boolean) => {
    dispatch({ type: ActionType.SET_IS_LOADING, payload: value });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    handleSetIsLoading(true);
    const isValid: any = await validateLogin(state.partnerName, state.partnerId);
    if (isValid) {
      router.push("/dashboard");
    }
    handleSetIsLoading(false);
  };

  const actions = {
    setPartnerId: handleSetPartnerId,
    handleLogin: handleLogin, 
    setTokenId: handleSetTokenId,
    setPartnerName: handleSetPartnerName,
    setPartnerData: handleSetPartnerData,
    setTotalCommissions: handleSetTotalCommissions,
    setIsLoading: handleSetIsLoading
  };

  const getters = {
    partnerId: state.partnerId,
    tokenId: state.tokenId,
    partnerName: state.partnerName,
    partnerData: state.partnerData,
    totalCommissions: state.totalCommissions,
    isLoading: state.isLoading
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