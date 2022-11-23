import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';

const SignUp = () => {
	const [bizMode, setBizMode] = useState(false);

	// 이메일
	const [email, setEmail] = useState('');
	// 이메일 정규표현식
	const emailReg =
		/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

	// 비밀번호
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	// 사용자 이름
	const [name, setName] = useState('');

	// 연락처
	const [phoneNumber, setPhoneNumber] = useState({
		first: '010',
		middle: '',
		last: '',
	});
	// 연락처 정규표현식
	const phoneNumberReg = /\d{3}-\d{3,4}-\d{4}$/;

	// 성별
	const [gender, setGender] = useState('');

	// 생년월일
	const [birthDate, setBirthDate] = useState({
		year: '연도',
		month: '월',
		date: '일',
	});
	// 생년월일 정규표현식
	const birthReg = /^\d{8}$/;

	const applyOnlyNumber = (e: ChangeEvent<HTMLInputElement>) => {
		const result = e.target.value.replace(/\D/g, '');
		setPhoneNumber((prev) => ({
			...prev,
			[e.target.name]: result,
		}));
	};

	// 생년월일 셀렉트박스
	const today = new Date();
	const years = [];
	const months = [];
	const dates = [];

	const date = new Date(
		Number(birthDate.year),
		Number(birthDate.month),
		0
	).getDate();

	for (let y = today.getFullYear(); y >= 1930; y--) {
		years.push(y.toString());
	}

	for (let m = 1; m <= 12; m++) {
		months.push(m < 10 ? `0${m.toString()}` : `${m.toString()}`);
	}

	for (let d = 1; d <= (date || 31); d++) {
		dates.push(d < 10 ? `0${d.toString()}` : `${d.toString()}`);
	}

	// 회원 가입 api 연동
	const signUp = async (e: FormEvent) => {
		e.preventDefault();
		const age = `${birthDate.year}${birthDate.month}${birthDate.date}`;
		const phone_number = `${phoneNumber.first}${phoneNumber.middle}${phoneNumber.last}`;

		// 개인 회원가입 필수사항 사전 점검
		if (name.trim().length === 0) {
			alert('이름을 입력해주세요.');
			return;
		} else if (!emailReg.test(email)) {
			alert('이메일을 올바르게 입력해주세요.');
			return;
		} else if (password !== passwordConfirm) {
			alert('비밀번호를 다시 확인해주세요.');
			return;
		} else if (!birthReg.test(age)) {
			alert('생년월일을 올바르게 입력해주세요.');
			return;
		} else if (!phoneNumberReg.test(phone_number)) {
			alert('휴대폰 번호를 올바르게 입력해주세요.');
			return;
		}

		try {
			if (!bizMode) {
				// 개인 회원가입
				await axios(`${process.env.REACT_APP_API_URL}/users/signup`, {
					method: 'POST',
					data: {
						user_name: name.trim(),
						email,
						password1: password,
						password2: passwordConfirm,
						age,
						phone_number,
						gender,
					},
				});
			} else {
				// 법인 회원가입
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<form onSubmit={signUp}>
				{/* 이메일 */}
				<fieldset>
					<label htmlFor="email">이메일</label>
					<input
						id="email"
						type="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<button type="button">중복 확인</button>
				</fieldset>

				{/* 비밀번호 */}
				<fieldset>
					<label htmlFor="password">비밀번호</label>
					<input
						id="password"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</fieldset>
				<fieldset>
					<label htmlFor="passwordConfirm">비밀번호 확인</label>
					<input
						id="passwordConfirm"
						type="password"
						onChange={(e) => setPasswordConfirm(e.target.value)}
					/>
					{password !== passwordConfirm && <span>비밀번호가 다릅니다</span>}
				</fieldset>

				{/* 이름 */}
				<fieldset>
					<label htmlFor="text">이름</label>
					<input
						id="text"
						type="username"
						onChange={(e) => setName(e.target.value)}
					/>
				</fieldset>

				{/* 연락처 */}
				<fieldset>
					<label htmlFor="phone">연락처</label>
					<select
						name="first"
						id="phone1"
						value={phoneNumber.first}
						onChange={(e) =>
							setPhoneNumber((prev) => ({
								...prev,
								[e.target.name]: e.target.value,
							}))
						}
					>
						{['010', '011', '016', '017', '018'].map((num, index) => (
							<option key={index} value={num}>
								{num}
							</option>
						))}
					</select>
					-
					<input
						name="middle"
						type="tel"
						minLength={phoneNumber.first === '010' ? 4 : 3}
						maxLength={4}
						pattern="[0-9]{3,4}"
						value={phoneNumber.middle}
						onChange={applyOnlyNumber}
					/>
					-
					<input
						name="last"
						type="tel"
						minLength={4}
						maxLength={4}
						pattern="[0-9]{4}"
						value={phoneNumber.last}
						onChange={applyOnlyNumber}
					/>
				</fieldset>

				{/* 성별 */}
				<fieldset>
					<label>성별</label>
					<input
						id="male"
						type="radio"
						name="gender"
						value="m"
						onChange={() => setGender('m')}
					/>
					<label htmlFor="male">남성</label>
					<input
						id="female"
						type="radio"
						name="gender"
						value="f"
						onChange={() => setGender('f')}
					/>
					<label htmlFor="female">여성</label>
				</fieldset>

				{/* 생년월일 */}
				<fieldset>
					<label>생년월일</label>
					<select
						name="year"
						value={birthDate.year}
						onChange={(e) =>
							setBirthDate((prev) => ({
								...prev,
								year: e.target.value,
							}))
						}
					>
						<option value="연도">연도</option>
						{years.map((year, index) => (
							<option value={year} key={index}>
								{year}년
							</option>
						))}
					</select>
					<select
						name="month"
						value={birthDate.month}
						onChange={(e) =>
							setBirthDate((prev) => ({
								...prev,
								month: e.target.value,
							}))
						}
					>
						<option value="월">월</option>
						{months.map((month, index) => (
							<option value={month} key={index}>
								{month}월
							</option>
						))}
					</select>
					<select
						name="date"
						value={birthDate.date}
						onChange={(e) =>
							setBirthDate((prev) => ({
								...prev,
								date: e.target.value,
							}))
						}
					>
						<option value="일">일</option>
						{dates.map((day, index) => (
							<option value={day} key={index}>
								{day}일
							</option>
						))}
					</select>
				</fieldset>

				<button type="submit">회원가입</button>
			</form>
			<div onClick={() => setBizMode((prev) => !prev)}>
				{bizMode ? '개인' : '법인'}
			</div>
		</>
	);
};

export default SignUp;
