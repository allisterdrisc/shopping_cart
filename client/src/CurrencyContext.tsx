import { createContext, useEffect, useState, type ReactNode } from "react";
import { getCurrencyRates } from "./services";

interface CurrencyRates {
  [key: string]: number;
}

interface CurrencyContextType {
  currency: string;
  toggleCurrency: () => void;
  rates: CurrencyRates;
}

export const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'USD',
  toggleCurrency: () => {},
  rates: {USD: 1}
});

export const CurrencyProvider = ({ children }: {children: ReactNode}) => {
  const [currency, setCurrency] = useState('USD');
  const [rates, setRates] = useState<CurrencyRates>({ USD: 1, EUR: 0.87 });

  useEffect(() => {
    const fetchRates = async () => {
      const data = await getCurrencyRates();
      setRates(data);
    }

    fetchRates();
  }, [currency]);

  const toggleCurrency = async () => {
    setCurrency(prev => (prev === 'USD') ? 'EUR' : 'USD');
  };

  return (
    <CurrencyContext value={{currency, toggleCurrency, rates}}>
      {children}
    </CurrencyContext>
  );
};

