import TagItem from './TagItem'

function CategoryTag() {
	const tagList = [
		'Personal',
		'Work',
		'Study',
		'Shopping',
		'Project',
		'Fitness',
		'Travel',
		'Finance',
		'Health',
		'fellow',
		'Social',
	]

	return (
		<div className="tagList categoryTag">
			<h2 className="tagName">Category</h2>
			{tagList.map((tagName, index) => (
				<TagItem
					tagName={tagName}
					tagType="category"
					key={index + 100}
				/>
			))}
		</div>
	)
}

export default CategoryTag
