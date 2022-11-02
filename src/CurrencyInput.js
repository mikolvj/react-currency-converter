import classes from './CurrencyInput.module.scss';

const CurrencyInput = () => {
	return (
		<div className={classes.wrapper}>
			<input type='number' />
			<select>
				<option value='EUR'>EUR</option>
			</select>
		</div>
	);
};

export default CurrencyInput;
