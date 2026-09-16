import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const currencies = {
  SAR: { code: 'SAR', name: 'ريال سعودي', symbol: 'ر.س', rate: 1.0 },
  USD: { code: 'USD', name: 'دولار أمريكي', symbol: '$', rate: 0.266 },
  YER: { code: 'YER', name: 'ريال يمني', symbol: 'ر.ي', rate: 420.0 },
  AED: { code: 'AED', name: 'درهم إماراتي', symbol: 'د.إ', rate: 0.98 }
};

export const CurrencyProvider = ({ children }) => {
  const [currentCurrency, setCurrentCurrency] = useState(() => {
    const saved = localStorage.getItem('wahbeen_currency');
    return saved && currencies[saved] ? saved : 'SAR';
  });

  useEffect(() => {
    localStorage.setItem('wahbeen_currency', currentCurrency);
  }, [currentCurrency]);

  // Convert an amount given in SAR (base currency) to the selected currency
  const convertPrice = (amountSAR) => {
    if (!amountSAR || isNaN(amountSAR)) return 0;
    const rate = currencies[currentCurrency]?.rate || 1.0;
    return Math.round(amountSAR * rate);
  };

  const formatPrice = (amountSAR, showSymbol = true) => {
    if (amountSAR === undefined || amountSAR === null || isNaN(amountSAR)) return '';
    const converted = convertPrice(amountSAR);
    const formattedNumber = converted.toLocaleString('en-US');
    if (!showSymbol) return formattedNumber;
    const sym = currencies[currentCurrency]?.symbol || 'ر.س';
    return `${formattedNumber} ${sym}`;
  };

  return (
    <CurrencyContext.Provider value={{
      currentCurrency,
      setCurrentCurrency,
      currencies,
      convertPrice,
      formatPrice,
      currencyInfo: currencies[currentCurrency]
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
