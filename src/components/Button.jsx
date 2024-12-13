import PropTypes from "prop-types"

Button.propTypes = {
	children: PropTypes.node.isRequired,
	style: PropTypes.string,
	onClickAction: PropTypes.func,
}

function Button({ children, style, onClickAction = () => {} }) {
	return (
		<button
			onClick={onClickAction}
			type="submit"
			className={`${style} btn`}
		>
			{children}
		</button>
	)
}

export default Button
