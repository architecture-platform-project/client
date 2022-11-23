export const DefaultButton = ({ type, text, onClick }: any) => {
	return (
		<button type={type} onClick={onClick}>
			{text}
		</button>
	);
};
