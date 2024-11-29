function Button({ children, style }) {
	return <button className={` bottom-right btn ${style}`}> {children}</button>
}

export default Button
