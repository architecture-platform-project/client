import axios from 'axios';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iconZium from 'assets/svg/logo.svg';
import { DefaultInput } from 'components/Inputs';
import { DefaultButton } from 'components/Buttons';

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
		<div>
			<img src={iconZium} />
			<form onSubmit={login}>
				<div>
					{/* 이메일 */}
					<DefaultInput
						label="이메일"
						id="email"
						type="email"
						value={email}
						placeholder="이메일을 입력하세요"
						onChange={(e: any) => setEmail(e.target.value)}
					/>

					{/* 비밀번호 */}
					<DefaultInput
						label="비밀번호"
						id="password"
						type="password"
						value={password}
						placeholder="비밀번호를 입력하세요"
						onChange={(e: any) => setPassword(e.target.value)}
					/>
				</div>

				{/* 로그인 버튼 */}
				<div>
					<DefaultButton
						type="submit"
						text="로그인"
						onClick={() => console.log('login')}
					/>

					{/* 회원가입 버튼 */}
					<DefaultButton
						type="button"
						text="회원가입"
						onClick={() => navigate('/signup')}
					/>
				</div>

				<div>비밀번호를 잊으셨나요?</div>
			</form>
		</div>
	);
};

export default Login;
