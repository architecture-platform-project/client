import Login from './Login';
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
];
