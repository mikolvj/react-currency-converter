import classes from './CurrencyInput.module.scss';

const CurrencyInput = ({
	currenciesList,
	selectedCurrency,
	onChangeCurrency,
	onChangeAmount,
	amount
}) => {
	const sortedCurrenciesList = currenciesList.sort();
	return (
		<div className={classes.wrapper}>
			<input type='number' min="0" value={amount || ''} onChange={onChangeAmount} />
			<select value={selectedCurrency} onChange={onChangeCurrency}>
				{sortedCurrenciesList.map((item) => (
					<option key={item} value={item}>
						{item}
					</option>
				))}
			</select>
		</div>
	);
};

export default CurrencyInput;
