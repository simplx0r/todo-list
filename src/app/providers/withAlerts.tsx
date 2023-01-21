/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-restricted-globals */
import React, {
  createContext, PropsWithChildren, useContext, useMemo, useState,
} from 'react';
import { Alert, AlertColor } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Alerts {
    alertStatus: AlertColor | undefined;
    alertText: string;
    success:(text: string, timeout?: number) => void;
    error:(text: string, timeout?: number)=>void;
    clear: ()=> void;
}
const AlertContext = createContext<Alerts>({} as Alerts);

const useAlert = () => ({ ...useContext(AlertContext) });

const AlertProvider = ({ children }: PropsWithChildren) => {
  const [alertStatus, setAlertStatus] = useState<AlertColor | undefined>(undefined);
  const [alertText, setAlertText] = useState<string>('');
  const value = useMemo(() => ({
    alertStatus,
    alertText,
    success: (text: string, timeout: number) => {
      setAlertText(text);
      setAlertStatus('success');
      setTimeout(() => {
        setAlertStatus(undefined);
      }, timeout * 1000 || 10000);
    },
    error: (text: string, timeout: number) => {
      setAlertText(text);
      setAlertStatus('error');
      setTimeout(() => {
        setAlertStatus(undefined);
      }, timeout * 1000 || 10000);
    },
    clear: () => setAlertStatus(undefined),
  }), [alertStatus, alertText]);
  const TodoAlert = styled(Alert)({
    position: 'absolute',
    width: 'fit-content',
    height: 'fit-content',
    bottom: '0',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  });

  return (
    <AlertContext.Provider value={value}>
      {alertText ? (
        <TodoAlert severity={value.alertStatus}>
          {alertText}
        </TodoAlert>
      ) : null}
      {children}
    </AlertContext.Provider>
  );
};
const withAlerts = (component: ()=> React.ReactNode) => () => (
  <AlertProvider>
    {component()}
  </AlertProvider>
);
export { withAlerts, useAlert };
