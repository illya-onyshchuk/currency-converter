import Logo from "../../assets/curryLogo.png";
import Loader from "../Loader/Loader";
import style from "./CurrHeader.module.css";

const CurrHeader = ({
  currencyRates,
  isCurrencyLoading,
  fetchCurrencyError,
}) => {
  return (
    <header>
      <div className={style.logo__container}>
        <img className={style.logo} src={Logo} alt="logo" />
        <h5>Currency converter</h5>
      </div>
      <div className={style.currency__container}>
        {isCurrencyLoading && <Loader />}
        {fetchCurrencyError && (
          <span className={style.currency__error}>{fetchCurrencyError}</span>
        )}
        {currencyRates.map(
          (item) =>
            item.cc !== "UAH" && (
              <div key={item.cc}>{`1 ${item.cc} / ${item.rate.toFixed(
                2
              )} UAH`}</div>
            )
        )}
      </div>
    </header>
  );
};

export default CurrHeader;
