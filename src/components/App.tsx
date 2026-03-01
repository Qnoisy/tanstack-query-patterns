import { Outlet } from 'react-router';
import { Header } from './Header';
import { Suspense } from 'react';

function App() {
	return (
		<div>
			<Header />
			<div className='w-full max-w-4xl mx-auto p-8'>
				{/* Глобальный fallback */}
				<Suspense fallback={<div>Loading...</div>}>
					<Outlet />
				</Suspense>
			</div>
		</div>
	);
}

export default App;
