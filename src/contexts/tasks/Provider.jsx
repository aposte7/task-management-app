import PropTypes from 'prop-types'
import { useEffect, useReducer } from 'react'
import TasksContext from './Context'

const initialState = {
	tasks: [],
	status: {
		value: 'initial',
		message: '',
	},
	searchQuery: '',
	selectedCategories: [],
	priority: '',
}

const BASE_URL = 'https://todo-api-vl53.onrender.com'

function reducer(state, action) {
	switch (action.type) {
		case 'loading':
			return {
				...state,
				status: {
					...state.status,
					value: 'loading',
				},
			}
		case 'error':
			return {
				...state,
				status: {
					value: 'error',
					message: action.payload,
				},
			}
		case 'tasks/loaded':
			return {
				...state,
				tasks: action.payload,
				status: {
					...state.status,
					value: 'ready',
				},
			}
		case 'tasks/updated':
			return {
				...state,
				tasks: state.tasks.map((task) =>
					task.id === action.payload.id ? action.payload : task
				),
				status: {
					...state.status,
					value: 'ready',
				},
			}
		case 'initial':
			return {
				...state,
				status: { ...initialState.status },
			}
		case 'task/deleted':
			return {
				...state,
				tasks: state.tasks.filter((task) => task.id !== action.payload),
				status: {
					...state.status,
					value: 'ready',
				},
			}
		case 'task/create':
			return {
				...state,
				tasks: [...state.tasks, action.payload],
				status: {
					...state.status,
					value: 'ready',
				},
			}
		case 'task/completed':
			return {
				...state,
				tasks: state.tasks.map((task) => {
					if (task.id === action.payload)
						return { ...task, isCompleted: !task.isCompleted }
					return task
				}),
				status: {
					...state.status,
					value: 'ready',
				},
			}
		case 'search':
			return {
				...state,
				searchQuery: action.payload,
			}
		case 'category/filter/add':
			return {
				...state,
				selectedCategories: [
					...state.selectedCategories,
					action.payload,
				],
			}
		case 'category/filter/remove':
			return {
				...state,
				selectedCategories: state.selectedCategories.filter(
					(cat) => cat != action.payload
				),
			}
		case 'priority/filter/add':
			return {
				...state,
				priority: action.payload,
			}
		case 'priority/filter/remove':
			return {
				...state,
				priority: '',
			}
		default:
			throw new Error('Unknown Action Type')
	}
}

TasksProvider.propTypes = {
	children: PropTypes.node,
}

function TasksProvider({ children }) {
	const [
		{ tasks, status, searchQuery, selectedCategories, priority },
		dispatch,
	] = useReducer(reducer, initialState)

	useEffect(() => {
		const fetchTasks = async (options = {}) => {
			dispatch({ type: 'loading' })
			try {
				const response = await fetch(`${BASE_URL}/tasks`, {
					headers: {
						'Content-Type': 'application/json',
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
				console.log('data fetched ', data)

				dispatch({ type: 'tasks/loaded', payload: data })
			} catch (error) {
				console.error(`Failed to fetch data from `, error)

				dispatch({ type: 'error', payload: error.message })
			}
		}
		fetchTasks()
	}, [])

	async function deleteTask(taskId) {
		dispatch({ type: 'loading' })
		try {
			const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
				method: 'DELETE',
			})
			if (!response.ok) throw new Error('Failed to delete the task')
			dispatch({ type: 'task/deleted', payload: taskId })
		} catch (error) {
			dispatch({ type: 'error', payload: error.message })
		}
	}

	async function completeTask(task, option = {}) {
		const data = { ...task, isCompleted: true }

		dispatch({ type: 'loading' })
		try {
			const response = await fetch(`${BASE_URL}/tasks/${task.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					...option?.header,
				},
				body: JSON.stringify(data),
			})
			if (!response.ok) throw new Error('Failed to delete the task')
			dispatch({ type: 'task/completed', payload: task.id })
		} catch (error) {
			dispatch({ type: 'error', payload: error.message })
		}
	}
	async function createTask(newTask) {
		dispatch({ type: 'loading' })
		try {
			const response = await fetch(`${BASE_URL}/tasks`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newTask),
			})

			if (!response.ok) throw new Error('Failed to create the task')

			const createdTask = await response.json()

			console.log(`you have created ${createdTask} task`)
			dispatch({
				type: 'tasks/loaded',
				payload: createdTask,
			}) // Add the new task
		} catch (error) {
			dispatch({ type: 'error', payload: error.message })
		}
	}
	async function updateTask(updatedTask) {
		dispatch({ type: 'loading' })
		try {
			const response = await fetch(
				`${BASE_URL}/tasks/${updatedTask.id}`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(updatedTask),
				}
			)

			if (!response.ok) throw new Error('Failed to update the task')

			const updatedTaskData = await response.json()

			dispatch({ type: 'tasks/updated', payload: updatedTaskData })
		} catch (error) {
			dispatch({ type: 'error', payload: error.message })
		}
	}
	const handleSearch = (query) => {
		dispatch({ type: 'search', payload: query })
	}
	const handleCategory = (category, isRemove) => {
		if (isRemove)
			dispatch({ type: 'category/filter/remove', payload: category })
		else dispatch({ type: 'category/filter/add', payload: category })
	}
	const handlePriority = (priorityType, isRemove) => {
		if (isRemove) dispatch({ type: 'priority/filter/remove' })
		else dispatch({ type: 'priority/filter/add', payload: priorityType })
	}

	const filteredTasks = tasks
		.filter((task) => {
			const matchesQuery = searchQuery
				? task.title.toLowerCase().includes(searchQuery.toLowerCase())
				: true
			const matchesPriority = priority
				? task.priority.toLowerCase() === priority.toLowerCase()
				: true
			const matchesCategories =
				selectedCategories.length > 0
					? selectedCategories.every((selectedCategory) =>
							task.category.some(
								(cat) =>
									cat.toLowerCase() ===
									selectedCategory.toLowerCase()
							)
					  )
					: true
			return matchesQuery && matchesCategories && matchesPriority
		})
		.sort((a, b) => {
			const query = searchQuery.toLowerCase()
			const aStartsWith = a.title.toLowerCase().startsWith(query)
			const bStartsWith = b.title.toLowerCase().startsWith(query)

			if (aStartsWith && !bStartsWith) return -1
			if (!aStartsWith && bStartsWith) return 1
			return 0
		})

	return (
		<TasksContext.Provider
			value={{
				tasks: filteredTasks,
				status,
				priority,
				deleteTask,
				completeTask,
				createTask,
				updateTask,
				handleSearch,
				handleCategory,
				handlePriority,
			}}
		>
			{children}
		</TasksContext.Provider>
	)
}

export default TasksProvider
