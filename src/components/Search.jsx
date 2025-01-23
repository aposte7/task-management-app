import { useTasks } from '../hooks/useTasks'

function Search() {
	const { handleSearch } = useTasks()

	const handleInputChange = (e) => {
		handleSearch(e.target.value)
	}

	return (
		<div className="search">
			<input
				className="searchInput"
				aria-label="search input"
				placeholder="Search tasks"
				type="search"
				name="q"
				id="search"
				onChange={handleInputChange}
			/>
			<span className="searchIcon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 20 20"
					aria-hidden="true"
				>
					<g>
						<path d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8"></path>
					</g>
				</svg>
			</span>
		</div>
	)
}

export default Search
