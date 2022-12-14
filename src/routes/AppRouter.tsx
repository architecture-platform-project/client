import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './Routes';

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				{/* 홈 (랜딩, 메인 등) */}
				{routes.home.map(
					(route, index) =>
						route && (
							<Route
								key={index}
								path={route.path}
								element={<route.element />}
							/>
						)
				)}
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
