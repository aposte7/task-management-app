import Button from "./Button"
import TagItem from "./TagItem"

function PriorityTag() {
	const priority = ["High", "Medium", "Low", "Urgent", "normal"]

	return (
		<div className="tagList priorityTag">
			<h2 className="tagName">Priority</h2>
			{priority.map((tagName, index) => (
				<TagItem tagName={tagName} key={index} />
			))}

			<Button>
				<span className="addBtn">
					<svg
						width="40px"
						height="40px"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle cx="12" cy="12" r="10" strokeWidth="1.5" />
						<path
							d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
							stroke="#1C274C"
							strokeWidth="1.5"
							strokeLinecap="round"
						/>
					</svg>
				</span>
			</Button>
		</div>
	)
}

export default PriorityTag
