import { useState, useEffect } from "react";
import { InputBox } from "./Components/Index";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("inr");
  const [to, setTo] = useState("inr"); 
  const [convertedAmount, setConvertedAmount] = useState(0);

  // Fetch currency info dynamically
  const currencyInfo = useCurrencyInfo(from);

  // Ensure currency options always have defaults
  const defaultCurrencyOptions = ["inr", "usd"];
  const currencyOption = Object.keys(currencyInfo).length
    ? Object.keys(currencyInfo)
    : defaultCurrencyOptions;

  // Avoid resetting 'to' unnecessarily
  useEffect(() => {
    if (!currencyOption.includes(to)) {
      // Only update 'to' if it's invalid and not already 'usd'
      setTo(currencyOption.find((cur) => cur !== from) || "usd");
    }
  }, [currencyOption, from, to]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const convert = () => {
    setConvertedAmount(amount * (currencyInfo[to] || 0));
  };

  const BackgroundImage =
    "https://static.theprint.in/wp-content/uploads/2019/01/indian-currency-696x392.jpg?compress=true&quality=80&w=768&dpr=1.3";

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url('${BackgroundImage}')` }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                type="text"
                amount={amount}
                currencyOption={currencyOption}
                onCurrencyChange={(currency) => {
                  if (currency !== to) setFrom(currency);
                }}
                onAmountChange={(amount) => setAmount(amount)}
                selectCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOption={currencyOption}
                selectCurrency={to}
                onCurrencyChange={(currency) => {
                  if (currency !== from) setTo(currency);
                }}
                amountDisable
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
