import HeaderContent from '../components/HeaderContent'
import TaskList from '../components/TaskList'
import { useTasks } from '../hooks/useTasks'

function AppLayout() {
	const { status } = useTasks()

	return (
		<div className="mainContainer">
			<HeaderContent />
			{status.value === 'ready' && <TaskList />}
			{/* Render child routes */}
		</div>
	)
}

export default AppLayout
