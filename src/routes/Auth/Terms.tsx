import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type TermsType = {
	[key: string]: boolean;
};

const Terms = () => {
	const navigate = useNavigate();
	const [terms, setTerms] = useState<TermsType>({
		condition1: false,
		condition2: false,
		condition3: false,
	});

	const checkAllTerms = () => {
		setTerms({
			condition1: true,
			condition2: true,
			condition3: true,
		});
	};

	const onChangeTerms = (termId: string) => {
		setTerms((prev) => ({
			...prev,
			[termId]: !prev[termId],
		}));
	};

	const moveToNextStep = (e: FormEvent) => {
		e.preventDefault();
		if (terms.condition1 && terms.condition2) {
			navigate('/signup/form');
		} else {
			return;
		}
	};

	return (
		<form onSubmit={moveToNextStep}>
			<p>이용 약관</p>
			<input
				id="condition1"
				type="checkbox"
				checked={terms.condition1}
				onChange={(e) => onChangeTerms(e.currentTarget.id)}
			/>
			<label htmlFor="condition1">이용 약관 동의(필수)</label>
			<input
				id="condition2"
				type="checkbox"
				checked={terms.condition2}
				onChange={(e) => onChangeTerms(e.currentTarget.id)}
			/>
			<label htmlFor="condition2">개인정보 수집 및 이용 동의(필수)</label>
			<input
				id="condition3"
				type="checkbox"
				checked={terms.condition3}
				onChange={(e) => onChangeTerms(e.currentTarget.id)}
			/>
			<label htmlFor="condition3">개인정보 제3자 제공 동의(선택)</label>
			<button type="button" onClick={checkAllTerms}>
				전체 동의
			</button>
			<button type="submit">다음 단계</button>
		</form>
	);
};

export default Terms;
