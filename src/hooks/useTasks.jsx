import { useContext } from "react"
import TasksContext from "../contexts/tasks/Context"
export function useTasks() {
	const context = useContext(TasksContext)
	if (context === undefined) {
		throw new Error("TasksContext must be used within a TasksProvider")
	}
	return context
}
