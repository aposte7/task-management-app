import HeaderContent from "../components/HeaderContent"
import TaskList from "../components/TaskList"
import { useTasks } from "../hooks/useTasks"

function AppLayout() {
	const { tasks, status } = useTasks()

	console.log("Context loaded:", { tasks, status })

	return (
		<div className="mainContainer">
			<HeaderContent />
			{status.value === "ready" && <TaskList tasks={tasks} />}
			{/* Render child routes */}
		</div>
	)
}

export default AppLayout
