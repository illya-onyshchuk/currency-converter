import { useEffect, useState } from "react";
import CurrHeader from "./components/CurrHeader/CurrHeader";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter";
import { getCurrencyRates } from "./services/api";

const currencyList = ["USD", "EUR"];

function App() {
  const [currency, setCurrency] = useState([]);
  const [isCurrencyLoading, setIsCurrencyLoading] = useState(false);
  const [fetchCurrencyError, setFetchCurrencyError] = useState("");

  useEffect(() => {
    const fetchCurrencyRates = async () => {
      try {
        setIsCurrencyLoading(true);
        const response = await getCurrencyRates();
        const normalizeData = [
          { cc: "UAH", rate: 1 },
          ...response.data.filter((el) => currencyList.includes(el.cc)),
        ];
        setIsCurrencyLoading(false);
        setCurrency(normalizeData);
      } catch (e) {
        setIsCurrencyLoading(false);
        setFetchCurrencyError("Fetching currency error!");
      }
    };

    fetchCurrencyRates();
  }, []);

  return (
    <>
      <CurrHeader
        currencyRates={currency}
        isCurrencyLoading={isCurrencyLoading}
        fetchCurrencyError={fetchCurrencyError}
      />
      <div className="container">
        <CurrencyConverter
          currencyRates={currency}
          fetchCurrencyError={fetchCurrencyError}
        />
      </div>
    </>
  );
}

export default App;
