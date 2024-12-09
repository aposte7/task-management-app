import PropTypes from "prop-types"
import TaskItem from "./TaskItem"
import { Outlet } from "react-router-dom"

TaskList.propTypes = {
	tasks: PropTypes.array.isRequired,
}

function TaskList({ tasks }) {
	return (
		<section className="taskSection">
			<Outlet />
			{tasks.map((task) => (
				<TaskItem task={task} key={task.id} />
			))}
		</section>
	)
}

export default TaskList
