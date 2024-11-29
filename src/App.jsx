import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import "./App.css"

import AppLayout from "./pages/AppLayout"

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			index: true,
			element: <Navigate replace to="tasks" />,
		},
		{
			path: "tasks",
			Component: AppLayout,
			errorElement: <div>Error</div>,
			children: [
				{
					index: true,
					path: "tasks/:taskId",
					element: <h1>Display task with ID</h1>,
				},
				{
					path: "create",
					element: <h1>Create New</h1>,
				},
				{
					path: ":taskId",
					element: <h1>Display task with ID</h1>,
				},
				{
					path: ":taskId/destroy",
					element: <h1>destroy task with ID</h1>,
				},
				{
					path: ":taskId/edit",
					element: <h1>destroy task with ID</h1>,
				},
			],
		},
	])
	return <RouterProvider router={router} />
}

export default App
