import React from "react";
import style from "./CurrencyRow.module.css";

const CurrencyRow = (props) => {
  const {
    amount,
    selectedCurrency,
    onChangeAmount,
    onChangeCurrency,
    currencyRates,
    keyword,
  } = props;

  const isCurrency = currencyRates?.length;

  return (
    <div className={style.input__container}>
      <input
        disabled={!isCurrency}
        type="number"
        placeholder="Enter amount"
        className={style.currency__input}
        value={amount}
        onChange={(e) => onChangeAmount(e.target.value, keyword)}
      />
      <select
        disabled={!isCurrency}
        value={selectedCurrency}
        onChange={(e) => onChangeCurrency(e.target.value, keyword)}
      >
        {isCurrency &&
          currencyRates.map((rate) => (
            <option key={rate.cc} value={rate.cc}>
              {rate.cc}
            </option>
          ))}
      </select>
    </div>
  );
};

export default CurrencyRow;
