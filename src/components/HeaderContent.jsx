import Search from "./Search"
import CategoryTag from "./CategoryTag"
import PriorityTag from "./PriorityTag"

function HeaderContent() {
	return (
		<div className="headerContent">
			<Search />
			<section className="tags">
				<CategoryTag />
				<PriorityTag />
			</section>
		</div>
	)
}

export default HeaderContent
