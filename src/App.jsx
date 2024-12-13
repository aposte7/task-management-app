import { Route, Navigate, BrowserRouter, Routes } from "react-router-dom"
import "./App.css"

import AppLayout from "./pages/AppLayout"
import TasksProvider from "./contexts/TasksContext"
import CreateTask from "./pages/CreateTask"

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

					<Route
						path=":taskId"
						element={<h1>Display Task with ID</h1>}
					/>
				</Route>
				<Route
					path=":taskId/edit"
					element={<h1>Edit Task with ID</h1>}
				/>
				<Route
					path=":taskId/destroy"
					element={<h1>Destroy Task with ID</h1>}
				/>
				<Route path="*" element={<div>Error</div>} />
			</Routes>
		</BrowserRouter>
	)
}

export default App

// import {
// 	BrowserRouter as Router,
// 	Route,
// 	Routes,
// 	Navigate,
// } from "react-router-dom"
// import TasksProvider from "./TasksProvider"
// import AppLayout from "./AppLayout"
// import Home from "./Home"
// import CreateTask from "./CreateTask"
// import TaskDetails from "./TaskDetails"
// import EditTask from "./EditTask"
// import DestroyTask from "./DestroyTask"
// import ErrorPage from "./ErrorPage"

// function App() {
// 	return (
// 		<TasksProvider>
// 			<Router>
// 				<Routes>
// 					<Route path="/" element={<AppLayout />}>
// 						<Route
// 							index
// 							element={<Navigate replace to="/home" />}
// 						/>
// 						<Route path="home" element={<Home />} />
// 						<Route
// 							path="tasks"
// 							element={<h1>Display All Tasks</h1>}
// 						/>{" "}
// 						{/* Replace with actual component */}
// 						<Route path="tasks/create" element={<CreateTask />} />
// 						<Route path="tasks/:taskId" element={<TaskDetails />} />
// 						<Route
// 							path="tasks/:taskId/edit"
// 							element={<EditTask />}
// 						/>
// 						<Route
// 							path="tasks/:taskId/destroy"
// 							element={<DestroyTask />}
// 						/>
// 						<Route path="*" element={<ErrorPage />} />
// 					</Route>
// 				</Routes>
// 			</Router>
// 		</TasksProvider>
// 	)
// }

// export default App
