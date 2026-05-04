"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface DialUpState {
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
}

const DialUpContext = createContext<DialUpState | null>(null);

export function DialUpProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(() => setIsConnected(true), []);
  const disconnect = useCallback(() => setIsConnected(false), []);

  const value = useMemo(
    () => ({ isConnected, connect, disconnect }),
    [isConnected, connect, disconnect],
  );

  return (
    <DialUpContext.Provider value={value}>{children}</DialUpContext.Provider>
  );
}

export function useDialUp(): DialUpState {
  const ctx = useContext(DialUpContext);
  if (!ctx) {
    // Soft fallback so components can render outside the provider during dev.
    return {
      isConnected: false,
      connect: () => {},
      disconnect: () => {},
    };
  }
  return ctx;
}
