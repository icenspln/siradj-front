import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getEmployees } from './core/_requests';
import { Employee } from './core/_models';

interface EmployeeContextType {
  employees: Employee[];
  isLoading: boolean;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['getEmployees'],
    queryFn: getEmployees,
  });

  console.log('Fetched data:', data);


  const employees = data || [];

  return (
    <EmployeeContext.Provider value={{ employees, isLoading }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployeeContext must be used within an EmployeeProvider');
  }
  return context;
};