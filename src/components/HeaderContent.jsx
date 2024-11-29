import Search from "./Search"
import CategoryTag from "./CategoryTag"
import PriorityTag from "./PriorityTag"
import TodoList from "./TodoList"
import Button from "./Button"

function HeaderContent() {
	return (
		<>
			<div className="headerContent">
				<Search />
				<section className="tags">
					<CategoryTag />
					<PriorityTag />
				</section>
			</div>

			<TodoList />
		</>
	)
}

export default HeaderContent
