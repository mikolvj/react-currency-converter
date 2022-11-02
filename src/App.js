import { useEffect, useState } from 'react';
import classes from './App.module.scss';
import CurrencyInput from './CurrencyInput';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ec0ffd287bmsh5987d6c045af909p16fb41jsn20b0d2d48342',
		'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com',
	},
};

function App() {
	const [currenciesList, setCurrenciesList] = useState([]);
	const [fromCurrency, setFromCurrency] = useState('EUR');
	const [toCurrency, setToCurrency] = useState('USD');
	const [amount, setAmount] = useState(1);
	const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
	const [exchangeRate, setExchangeRate] = useState();

	let fromAmount, toAmount;

	if (amountInFromCurrency) {
		fromAmount = amount;
		toAmount = Math.round(amount * exchangeRate * 100) / 100;
	} else {
		toAmount = amount;
		fromAmount = Math.round((amount / exchangeRate) * 100) / 100;
	}

	useEffect(() => {
		fetch('https://currency-converter5.p.rapidapi.com/currency/list', options)
			.then((response) => response.json())
			.then((data) => setCurrenciesList([...Object.keys(data.currencies)]))
			.catch((err) => console.error(err));
	}, []);

	useEffect(() => {
		fetch(
			`https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=${fromCurrency}&to=${toCurrency}`,
			options
		)
			.then((response) => response.json())
			.then((data) => setExchangeRate(data.rates[toCurrency].rate))
			.catch((err) => console.error(err));
	}, [fromCurrency, toCurrency]);

	const fromCurrencyChangeHandler = (e) => {
		setAmount(e.target.value);
		setAmountInFromCurrency(true);
	};
	const toCurrencyChangeHandler = (e) => {
		setAmount(e.target.value);
		setAmountInFromCurrency(false);
	};

	return (
		<div className={classes.wrapper}>
			<h1>Converter</h1>
			<CurrencyInput
				currenciesList={currenciesList}
				selectedCurrency={fromCurrency}
				onChangeCurrency={(e) => setFromCurrency(e.target.value)}
				onChangeAmount={fromCurrencyChangeHandler}
				amount={fromAmount}
			/>
			<CurrencyInput
				currenciesList={currenciesList}
				selectedCurrency={toCurrency}
				onChangeCurrency={(e) => setToCurrency(e.target.value)}
				onChangeAmount={toCurrencyChangeHandler}
				amount={toAmount}
			/>
		</div>
	);
}

export default App;
