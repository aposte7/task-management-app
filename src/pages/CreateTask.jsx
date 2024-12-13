import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { useEffect, useRef, useState } from "react"
import { useTasks } from "../hooks/useTasks"

function CreateTask() {
	const cat = ["Project", "sport", "Class", "Spiritual"]
	const navigate = useNavigate()
	const elementRef = useRef(null)
	const { createTask } = useTasks()
	const [isOpen, setIsOpen] = useState(false)

	const [inputMessage, setInputMessage] = useState(null)
	const [filteredCategories, setFilteredCategories] = useState(cat)
	const [selectedCategories, setSelectedCategories] = useState([])
	const [customCategory, setCustomCategory] = useState("")
	const categoryInputElem = useRef(null)
	const dropdownElem = useRef(null)

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside)

		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [])

	const handleCategoryInput = (e) => {
		e.preventDefault()

		setIsOpen(true)
		const inputValue = e.target.value.trim()
		if (inputValue === "") {
			setFilteredCategories(cat)
			setCustomCategory("")
		} else {
			setCustomCategory(inputValue)

			const currentCategory = cat.filter((value) =>
				value.toLowerCase().includes(inputValue.toLowerCase())
			)
			setFilteredCategories(currentCategory)
		}
	}

	const handleFocus = () => {
		setIsOpen(true)
	}

	const handleCategorySelected = (value, event) => {
		event.stopPropagation()
		const category = value.toLowerCase()
		if (!selectedCategories.includes(value)) {
			setSelectedCategories((prevCategories) => [
				category,
				...prevCategories,
			])
		}
		setCustomCategory("")
		categoryInputElem.current.value = ""
		setFilteredCategories(cat)
	}
	const handleClickOutside = (event) => {
		if (elementRef.current && !elementRef.current.contains(event.target)) {
			navigate(-1)
		}
		if (
			dropdownElem.current &&
			!dropdownElem.current.contains(event.target)
		) {
			setIsOpen(false)
		}
	}

	async function handleCreateTask(e) {
		e.preventDefault()
		const formData = new FormData(e.target)
		let newTask = Object.fromEntries(formData)

		if (newTask.title.trim() === "") {
			setInputMessage("title is required")
			return
		}

		const now = new Date()

		const createdAt = now.toISOString()

		newTask = {
			...newTask,
			category: selectedCategories,
			isCompleted: false,
			createdAt,
		}

		try {
			await createTask(newTask)
			navigate(-1)
			alert("Task created successfully!")
		} catch (error) {
			console.error("Error creating task:", error)
			alert("Failed to create task. Please try again.")
		} finally {
			setInputMessage(null)
		}
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
						/>
					</div>
					<div className="formItem">
						<label htmlFor="dueDate" className="label">
							Due Date
						</label>
						<input type="date" name="dueDate" id="dueDate" />
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
							>
								<option value="normal">Normal</option>
								<option value="high">High</option>
								<option value="medium">Medium</option>
								<option value="low">Low</option>
							</select>
						</div>
					</div>
					<div className="formItem">
						<label htmlFor="categoryInput">Category</label>
						<div className="categoryContainer">
							<input
								ref={categoryInputElem}
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
											Add &ldquo;{customCategory}&rdquo;
										</li>
									)}
								</ul>
							)}
						</div>
						<div className="categoryTagContainer">
							{selectedCategories.map((value, index) => (
								<p className="tagItem" key={index}>
									<span>{value}</span>
									<button>x</button>
								</p>
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
						></textarea>
					</div>

					<div className="btnSpaced">
						<Button style={"btnDelete"}>Cancel</Button>
						<Button style={"btnCompleted"}>Create</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default CreateTask
