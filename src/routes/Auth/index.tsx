import Login from './Login';
import SignUp from './SignUp';
import Terms from './Terms';

export const authRoutes = [
	{
		path: '/login',
		element: Login,
	},
	{
		path: '/signup/terms',
		element: Terms,
	},
	{
		path: '/signup/form',
		element: SignUp,
	},
];
