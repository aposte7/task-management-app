import { useLoaderData } from "react-router-dom"
import HeaderContent from "../components/HeaderContent"
import TaskList from "../components/TaskList"

function AppLayout() {
	const tasks = useLoaderData()
	return (
		<div className="mainContainer">
			<HeaderContent />
			<TaskList tasks={tasks} />
		</div>
	)
}

export default AppLayout
