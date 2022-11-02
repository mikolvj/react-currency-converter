import classes from './App.module.scss';
import CurrencyInput from './CurrencyInput';

function App() {
	return (
		<div className={classes.wrapper}>
			<h1>Converter</h1>
			<CurrencyInput />
			<p>=</p>
			<CurrencyInput />
		</div>
	);
}

export default App;
