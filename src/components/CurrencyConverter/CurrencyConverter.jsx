import React, { useMemo, useState } from "react";
import CurrencyRow from "../CurrencyRow/CurrencyRow";

import style from "./CurrencyConverter.module.css";
import arrowConverter from "../../assets/arrow_converter.png";

const CurrencyConverter = ({ currencyRates }) => {
  const [amountFrom, setAmountFrom] = useState("");
  const [amountTo, setAmountTo] = useState("");
  const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState("USD");
  const [selectedCurrencyTo, setSelectedCurrencyTo] = useState("UAH");

  const currencyRatesMap = useMemo(() => {
    return currencyRates.reduce((rates, rate) => {
      if (rates[rate.cc]) return rates;

      return {
        [rate.cc]: rate,
        ...rates,
      };
    }, {});
  }, [currencyRates]);

  const handleAmountChange = (value, field) => {
    if (value === "") {
      setAmountFrom("");
      setAmountTo("");
      return;
    }

    const test = value.replace(/[^\d,.]/g, "").trim();
    const amount = parseFloat(test);

    if (field === "from") {
      setAmountFrom(test);
      const converted = (
        (amount * currencyRatesMap[selectedCurrencyFrom].rate) /
        currencyRatesMap[selectedCurrencyTo].rate
      ).toFixed(2);
      setAmountTo(converted);
    }

    if (field === "to") {
      setAmountTo(value);
      const converted = (
        (amount * currencyRatesMap[selectedCurrencyTo].rate) /
        currencyRatesMap[selectedCurrencyFrom].rate
      ).toFixed(2);
      setAmountFrom(converted);
    }
  };

  const handleCurrencyChange = (value, field) => {
    if (field === "from") {
      setSelectedCurrencyFrom(value);
    } else if (field === "to") {
      setSelectedCurrencyTo(value);
    }
    setAmountFrom("");
    setAmountTo("");
  };

  const handleClick = () => {
    setAmountFrom(amountTo);
    setAmountTo(amountFrom);
    setSelectedCurrencyFrom(selectedCurrencyTo);
    setSelectedCurrencyTo(selectedCurrencyFrom);
  };

  return (
    <div className={style.converter__container}>
      <CurrencyRow
        amount={amountFrom}
        selectedCurrency={selectedCurrencyFrom}
        onChangeAmount={handleAmountChange}
        onChangeCurrency={handleCurrencyChange}
        currencyRates={currencyRates}
        keyword={"from"}
      />

      <button className={style.convert__button} onClick={handleClick}>
        <img src={arrowConverter} alt="arrow Converter" />
      </button>

      <CurrencyRow
        amount={amountTo}
        selectedCurrency={selectedCurrencyTo}
        onChangeAmount={handleAmountChange}
        onChangeCurrency={handleCurrencyChange}
        currencyRates={currencyRates}
        keyword={"to"}
      />
    </div>
  );
};

export default CurrencyConverter;
