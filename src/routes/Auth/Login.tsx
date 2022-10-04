import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const login = (e: FormEvent) => {
		e.preventDefault();
		console.log('login');
	};

	return (
		<form className="flex flex-col max-w-lg p-12 mx-auto" onSubmit={login}>
			{/* 아이디 */}
			<fieldset>
				<label htmlFor="text">아이디</label>
				<input
					id="username"
					type="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
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
			<button type="button">아이디 찾기</button>
			<button type="button">비밀번호 찾기</button>
			<button type="button" onClick={() => navigate('/signup')}>
				회원가입
			</button>
			<button type="button">구글</button>
			<button type="button">네이버</button>
		</form>
	);
};

export default Login;
