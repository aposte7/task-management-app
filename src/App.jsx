import {
	RouterProvider,
	createRoutesFromElements,
	Route,
	createBrowserRouter,
	Navigate,
} from "react-router-dom"
import "./App.css"

import AppLayout from "./pages/AppLayout"
import TasksProvider from "./contexts/TasksContext"

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route
				path="/"
				element={
					<TasksProvider>
						<AppLayout />
					</TasksProvider>
				}
			>
				<Route index element={<Navigate replace to="tasks" />} />
				<Route path="tasks">
					<Route path="create" element={<h1>Create New Task</h1>} />
					<Route
						path=":taskId"
						element={<h1>Display Task with ID</h1>}
					/>
					<Route
						path=":taskId/edit"
						element={<h1>Edit Task with ID</h1>}
					/>
					<Route
						path=":taskId/destroy"
						element={<h1>Destroy Task with ID</h1>}
					/>
				</Route>
				<Route path="*" element={<div>Error</div>} />
			</Route>
		)
	)

	return <RouterProvider router={router} />
}

export default App
