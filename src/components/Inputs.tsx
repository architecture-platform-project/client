export const DefaultInput = ({
	label,
	id,
	type,
	placeholder,
	value,
	onChange,
}: any) => {
	return (
		<fieldset>
			<label htmlFor={id}>{label}</label>
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</fieldset>
	);
};
