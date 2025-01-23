import PropTypes from 'prop-types'
import { useTasks } from '../hooks/useTasks'
import { useEffect, useState } from 'react'

function TagItem({ tagName, tagType = 'category' }) {
	const { handleCategory, handlePriority, priority } = useTasks()
	const [active, setActive] = useState(false)

	useEffect(() => {
		if (tagType.toLowerCase() === 'priority') {
			setActive(priority === tagName)
		}
	}, [priority, tagName, tagType])

	function handleCategorySelected() {
		if (tagType.toLowerCase() === 'category') {
			handleCategory(tagName, active)
			setActive((con) => !con)
		}
		if (tagType.toLowerCase() === 'priority') {
			handlePriority(tagName, active)
		}
	}

	return (
		<div
			onClick={handleCategorySelected}
			className={`btnDiv ${active ? 'btnActiveDiv' : ''}`}
		>
			{tagName}
		</div>
	)
}

TagItem.propTypes = {
	tagName: PropTypes.string.isRequired,
	tagType: PropTypes.string.isRequired,
}

export default TagItem
