export const fetchData = async (url, options = {}) => {
	try {
		const response = await fetch(url, {
			headers: {
				"Content-Type": "application/json",
				...options.headers, // Allow custom headers
			},
			...options, // Merge any other custom options
		})

		if (!response.ok) {
			throw new Error(`Error ${response.status}: ${response.statusText}`)
		}

		return await response.json()
	} catch (error) {
		console.error(`Failed to fetch data from ${url}`, error)
		throw error
	}
}
