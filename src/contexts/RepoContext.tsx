import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

export interface RepoContextType {
  repo: any[],
  setRepo: Dispatch<SetStateAction<any[]>>
}

interface RepoContextProviderProps {
  children: ReactNode
}

export const RepoContext = createContext({} as RepoContextType)

export const RepoContextProvider = ({ children }: RepoContextProviderProps) => {

  const [repo, setRepo] = useState<any[]>([])

  return (
    <RepoContext.Provider value={{ repo, setRepo }}>
      {children}
    </RepoContext.Provider>
  )
}