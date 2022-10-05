import axios from 'axios';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const login = async (e: FormEvent) => {
		e.preventDefault();
		if (email && password) {
			try {
				await axios(`${process.env.REACT_APP_API_URL}/users/login`, {
					method: 'POST',
					data: {
						email,
						password,
					},
				});
				// 성공 시 홈으로 이동
				// 액세스 토큰 -> 세션 스토리지
				// 리프레시 토큰 -> 로컬 스토리지

				// 실패 시 메세지와 함께 alert
			} catch (e) {
				console.log(e);
			}
		} else {
			alert('이메일과 비밀번호를 모두 입력해주세요.');
		}
	};

	return (
		<form className="flex flex-col max-w-lg p-12 mx-auto" onSubmit={login}>
			{/* 아이디 */}
			<fieldset>
				<label htmlFor="text">아이디</label>
				<input
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</fieldset>

			{/* 비밀번호 */}
			<fieldset>
				<label htmlFor="password">비밀번호</label>
				<input
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</fieldset>

			{/* 로그인 버튼 */}
			<button type="submit">로그인</button>

			{/* 아이디 저장 - 체크박스 */}
			<fieldset className="space-x-2">
				<input id="save-id" type="checkbox" />
				<label htmlFor="save-id">아이디 저장</label>
			</fieldset>

			{/* 자동 로그인 - 체크박스 */}
			<fieldset className="space-x-2">
				<input id="auto-login" type="checkbox" />
				<label htmlFor="auto-login">자동 로그인</label>
			</fieldset>

			{/* 아이디, 비밀번호 찾기 */}
			<button type="button">아이디/비밀번호 찾기</button>
			<button type="button" onClick={() => navigate('/signup')}>
				회원가입
			</button>
			<button type="button">구글</button>
			<button type="button">네이버</button>
		</form>
	);
};

export default Login;
