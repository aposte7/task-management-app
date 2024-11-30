import PropTypes from "prop-types"

Button.propTypes = {
	children: PropTypes.node.isRequired,
	style: PropTypes.string,
}

function Button({ children, style }) {
	return <button className={`${style} btn`}> {children}</button>
}

export default Button
