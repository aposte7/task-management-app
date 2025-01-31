import TaskItem from './TaskItem'
import { Outlet } from 'react-router-dom'
import { useTasks } from '../hooks/useTasks'

function TaskList() {
	const { tasks } = useTasks()

	return (
		<>
			<Outlet />
			<section className="taskSection">
				{tasks.map((task) => (
					<TaskItem task={task} key={task.id} />
				))}
			</section>
		</>
	)
}

export default TaskList
