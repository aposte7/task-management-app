import { fetchData } from "../api/fetchData"

export async function tasksLoader() {
	try {
		const url = "http://localhost:9000/tasks"

		const data = await fetchData(url)
		return data
	} catch (error) {
		throw new Response("Failed to fetch tasks", { status: 500 })
	}
}
