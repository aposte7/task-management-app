import PropTypes from "prop-types"

function TagItem({ tagName }) {
	return <div className="btnDiv">{tagName}</div>
}

TagItem.propTypes = {
	tagName: PropTypes.string.isRequired,
}

export default TagItem
