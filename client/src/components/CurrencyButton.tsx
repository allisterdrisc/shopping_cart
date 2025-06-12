import { useContext } from "react";
import { CurrencyContext } from "../CurrencyContext";

export const CurrencyButton = () => {
  const currencyContext = useContext(CurrencyContext);
  const { currency, toggleCurrency} = currencyContext;

  return (
    <button onClick={toggleCurrency}>Switch to {currency === 'USD' ? 'EUR' : 'USD'}</button>
  )
}