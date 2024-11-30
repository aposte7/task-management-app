import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import "./App.css"

import AppLayout from "./pages/AppLayout"
import { TasksProvider } from "./contexts/TasksContext"

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			index: true,
			element: <Navigate replace to="tasks" />,
		},
		{
			path: "tasks",
			element: <AppLayout />,
			errorElement: <div>Error</div>,
			children: [
				{
					path: "create", // Specific paths come before dynamic ones
					element: <h1>Create New Task</h1>,
				},
				{
					path: ":taskId", // Display task by ID
					element: <h1>Display Task with ID</h1>,
				},
				{
					path: ":taskId/edit", // Edit task
					element: <h1>Edit Task with ID</h1>,
				},
				{
					path: ":taskId/destroy", // Destroy task
					element: <h1>Destroy Task with ID</h1>,
				},
			],
		},
	])

	return (
		<TasksProvider>
			<RouterProvider router={router} />
		</TasksProvider>
	)
}

export default App
