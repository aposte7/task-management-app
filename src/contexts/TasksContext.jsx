import PropTypes from "prop-types"
import { createContext, useEffect, useReducer } from "react"

export const TasksContext = createContext()

const initialState = {
	tasks: {},
	status: {
		value: "initial",
		message: "",
	},
}

const BASE_URL = "http://localhost:9000"

function reducer(state, action) {
	switch (action.type) {
		case "loading":
			return {
				...state,
				status: {
					...state.status,
					value: "loading",
				},
			}
		case "error":
			return {
				...state,
				status: {
					value: "error",
					message: action.payload,
				},
			}
		case "tasks/loaded":
			return {
				...state,
				tasks: action.payload,
				status: {
					...state.status,
					value: "ready",
				},
			}
		case "initial":
			return {
				...state,
				status: { ...initialState.status },
			}
		case "task/deleted":
			return {
				...state,
				tasks: state.tasks.filter((task) => task.id !== action.payload),
				status: {
					...state.status,
					value: "ready",
				},
			}
		case "task/create":
			return {
				...state,
				tasks: [...state.tasks, action.payload],
				status: {
					...state.status,
					value: "ready",
				},
			}
		case "task/completed":
			return {
				...state,
				tasks: state.tasks.map((task) => {
					if (task.id === action.payload)
						return { ...task, isCompleted: true }
					return task
				}),
				status: {
					...state.status,
					value: "ready",
				},
			}
		default:
			throw new Error("Unknown Action Type")
	}
}

TasksProvider.propTypes = {
	children: PropTypes.node,
}

function TasksProvider({ children }) {
	const [{ tasks, status }, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		const fetchTasks = async (options = {}) => {
			dispatch({ type: "loading" })
			try {
				const response = await fetch(`${BASE_URL}/tasks`, {
					headers: {
						"Content-Type": "application/json",
						...options.headers, // Allow custom headers
					},
					...options, // Merge any other custom options
				})

				if (!response.ok) {
					throw new Error(
						`Error ${response.status}: ${response.statusText}`
					)
				}
				const data = await response.json()
				console.log("data fetched ", data)

				dispatch({ type: "tasks/loaded", payload: data })
			} catch (error) {
				console.error(`Failed to fetch data from `, error)

				dispatch({ type: "error", payload: error.message })
			}
		}
		fetchTasks()
	}, [])

	async function deleteTask(taskId) {
		dispatch({ type: "loading" })
		try {
			const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
				method: "DELETE",
			})
			if (!response.ok) throw new Error("Failed to delete the task")
			dispatch({ type: "task/deleted", payload: taskId })
		} catch (error) {
			dispatch({ type: "error", payload: error.message })
		}
	}

	async function completeTask(task, option = {}) {
		const data = { ...task, isCompleted: true }

		dispatch({ type: "loading" })
		try {
			const response = await fetch(`${BASE_URL}/tasks/${task.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					...option?.header,
				},
				body: JSON.stringify(data),
			})
			if (!response.ok) throw new Error("Failed to delete the task")
			dispatch({ type: "task/completed", payload: task.id })
		} catch (error) {
			dispatch({ type: "error", payload: error.message })
		}
	}
	async function createTask(newTask) {
		dispatch({ type: "loading" })
		try {
			const response = await fetch(`${BASE_URL}/tasks`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newTask),
			})

			if (!response.ok) throw new Error("Failed to create the task")

			const createdTask = await response.json()

			console.log(`you have created ${createdTask} task`)
			dispatch({
				type: "tasks/loaded",
				payload: createdTask,
			}) // Add the new task
		} catch (error) {
			dispatch({ type: "error", payload: error.message })
		}
	}

	return (
		<TasksContext.Provider
			value={{ tasks, status, deleteTask, completeTask, createTask }}
		>
			{children}
		</TasksContext.Provider>
	)
}

export default TasksProvider
