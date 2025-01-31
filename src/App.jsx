import { Route, Navigate, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'

import AppLayout from './pages/AppLayout'
import TasksProvider from './contexts/tasks/Provider'
import CreateTask from './pages/CreateTask'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Navigate replace to="tasks" />} />
				<Route
					path="tasks"
					element={
						<TasksProvider>
							<AppLayout />
						</TasksProvider>
					}
				>
					<Route path="create" element={<CreateTask />} />
					<Route path=":taskId/edit" element={<CreateTask />} />
					{/* <Route path=":taskId" element={<TaskItem />} /> */}
				</Route>
				<Route path="*" element={<div>Error</div>} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
