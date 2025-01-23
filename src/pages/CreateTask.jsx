import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import { useEffect, useRef, useState } from 'react'
import { useTasks } from '../hooks/useTasks'

function CreateTask() {
	const cat = ['Project', 'sport', 'Class', 'Spiritual']
	const navigate = useNavigate()
	const elementRef = useRef(null)
	const { createTask, updateTask } = useTasks()
	const [isOpen, setIsOpen] = useState(false)

	const [inputMessage, setInputMessage] = useState(null)
	const [filteredCategories, setFilteredCategories] = useState(cat)
	const [customCategory, setCustomCategory] = useState('')
	const categoryInputElem = useRef(null)
	const dropdownElem = useRef(null)
	const { taskId } = useParams('taskId')
	const { tasks } = useTasks()
	const currTask = taskId
		? tasks.filter((value) => value.id === taskId)[0]
		: null
	const [selectedCategories, setSelectedCategories] = useState(
		currTask?.category ?? []
	)

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const handleCategoryInput = (e) => {
		e.preventDefault()

		setIsOpen(true)
		const inputValue = e.target.value.trim()
		if (inputValue === '') {
			setFilteredCategories(cat)
			setCustomCategory('')
		} else {
			setCustomCategory(inputValue)

			const currentCategory = cat.filter((value) =>
				value.toLowerCase().includes(inputValue.toLowerCase())
			)
			setFilteredCategories(currentCategory)
		}
	}

	const handleFocus = () => {
		if (!isOpen) setIsOpen(true)
	}

	const handleCategorySelected = (value, event) => {
		event.stopPropagation()
		const category = value.toLowerCase()
		if (!selectedCategories.includes(value)) {
			setSelectedCategories((prevCategories) => [
				...prevCategories,
				category,
			])
		}
		setCustomCategory('')
		categoryInputElem.current.value = ''
		setIsOpen(false)
		setFilteredCategories(cat)
	}
	const handleRemoveSelectedCategory = (cat, event) => {
		event.stopPropagation()
		event.preventDefault()
		setSelectedCategories((prevCategories) =>
			prevCategories.filter((category) => category !== cat)
		)
	}
	const handleClickOutside = (event) => {
		if (elementRef.current && !elementRef.current.contains(event.target)) {
			navigate(-1)
		}
		if (
			categoryInputElem.current &&
			!categoryInputElem.current.contains(event.target)
		) {
			setIsOpen(false)
		}
	}

	async function handleCreateTask(e) {
		e.preventDefault()
		const formData = new FormData(e.target)
		let newTask = Object.fromEntries(formData)
		let updatedTask = {}

		if (newTask.title.trim() === '') {
			setInputMessage('title is required')
			return
		}

		const now = new Date()

		const createdAt = now.toISOString()

		newTask = {
			...newTask,
			category: selectedCategories,
			isCompleted: false,
			createdAt,
			updatedAt: createdAt,
		}
		if (currTask)
			updatedTask = {
				...currTask,
				category: newTask.category,
				priority: newTask.priority,
				updatedAt: createdAt,
				title: newTask.title,
				description: newTask.description,
			}

		try {
			if (!taskId) {
				await createTask(newTask)
				alert('Task created successfully!')
				navigate(-1)
			} else {
				await updateTask(updatedTask)
				alert('Task updated successfully!')
				navigate(-1)
			}
		} catch (error) {
			console.error('Error creating task:', error)
			alert('Failed to create task. Please try again.')
		} finally {
			setInputMessage(null)
		}
	}

	function convertDate(data) {
		const date = new Date(data)
		if (isNaN(date.getTime())) {
			// Handle invalid date
			return ''
		}
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')
		return `${year}-${month}-${day}`
	}
	return (
		<div className="createFormBody">
			<div className="bg"></div>
			<div className="formContainer" ref={elementRef}>
				<form className="form" onSubmit={handleCreateTask}>
					<div className="formItem">
						<label htmlFor="title" className="label">
							Title
							<span className="inputError">
								{inputMessage && inputMessage}
							</span>
						</label>
						<input
							type="text"
							name="title"
							placeholder="eg. workout"
							id="title"
							defaultValue={currTask?.title ?? ''}
						/>
					</div>
					<div className="formItem">
						<label htmlFor="dueDate" className="label">
							Due Date
						</label>
						<input
							type="date"
							name="dueDate"
							id="dueDate"
							defaultValue={
								currTask?.dueDate
									? convertDate(currTask.dueDate)
									: ''
							}
						/>
					</div>
					<div className="formItem">
						<label htmlFor="priority" className="label">
							priority
						</label>
						<div className="customSelect">
							<select
								className="priorityInput"
								id="priority"
								name="priority"
								defaultValue={
									currTask?.priority.toLowerCase() || 'normal'
								}
							>
								<option value="normal">Normal</option>
								<option value="high">High</option>
								<option value="medium">Medium</option>
								<option value="low">Low</option>
							</select>
						</div>
					</div>
					<div className="formItem">
						<div
							className="categoryContainer"
							ref={categoryInputElem}
						>
							<label htmlFor="categoryInput">Category</label>
							<input
								onFocus={handleFocus}
								onChange={handleCategoryInput}
								type="text"
								id="categoryInput"
								name="category"
								placeholder="other"
								autoComplete="off"
							/>
							{isOpen && (
								<ul id="category" ref={dropdownElem}>
									{filteredCategories.map((value, index) => (
										<li
											key={index + 1}
											onClick={(e) => {
												handleCategorySelected(value, e)
											}}
											className="categoryList"
											aria-valuetext={value}
										>
											{value}
										</li>
									))}

									{customCategory && (
										<li
											key="0"
											className="categoryList"
											aria-valuetext={customCategory}
											onClick={(e) => {
												handleCategorySelected(
													customCategory,
													e
												)
											}}
										>
											Add &ldquo;
											{customCategory}
											&rdquo;
										</li>
									)}
								</ul>
							)}
						</div>
						<div className="categoryTagContainer">
							{selectedCategories.map((value, index) => (
								<div className="tagItem" key={index}>
									{value}
									<button
										onClick={(e) => {
											handleRemoveSelectedCategory(
												value,
												e
											)
										}}
									>
										&times;
									</button>
								</div>
							))}
						</div>
					</div>
					<div className="formItem">
						<label htmlFor="description" className="label">
							Description
						</label>
						<textarea
							type="message"
							name="description"
							id="description"
							cols="31"
							rows="3"
							defaultValue={currTask?.description}
						></textarea>
					</div>

					<div className="btnSpaced">
						<Button
							style={'btnDelete'}
							onClickAction={(e) => {
								e.preventDefault()
								navigate(-1)
							}}
						>
							Cancel
						</Button>
						<Button style={'btnCompleted'}>
							{taskId ? 'Update' : 'Create'}
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default CreateTask
