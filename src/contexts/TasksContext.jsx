import PropTypes from "prop-types"
import { createContext, useEffect, useReducer } from "react"

const TasksContext = createContext()

const initialState = {
	tasks: {},
	status: {
		value: "initial",
		message: "",
	},
}

const BASE_URl = "http://localhost:9000"

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
		default:
			throw new Error("Unknown Action")
	}
}

TasksProvider.propTypes = {
	children: PropTypes.node,
}
function TasksProvider({ children }) {
	const [{ tasks, status }, dispatch] = useReducer(reducer, initialState)

	useEffect(function () {
		const fetchTasks = async (options = {}) => {
			dispatch({ type: "loading" })
			try {
				const response = await fetch(`${BASE_URl}/tasks`, {
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
			} finally {
				// dispatch({ type: "initial" })
			}
		}
		fetchTasks()
	}, [])

	return (
		<TasksContext.Provider value={{ tasks, status }}>
			{children}
		</TasksContext.Provider>
	)
}

export { TasksProvider, TasksContext }
