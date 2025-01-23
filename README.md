# Task Management App

This is a Task Management App built with React, React Router, and Context API for state management. The app allows users to create, update, delete, and filter tasks based on categories and priority. It also includes a search functionality to find tasks quickly.

## Features

-   📅 Adding new tasks
-   🏷 Managing categories
-   ✅ Marking tasks as completed
-   🗑 Deleting tasks
-   ✏️ Editing tasks
-   🔍 Filtering tasks based on priority and category
-   🔎 Search functionality

## Technologies Used

-   **React**: For building the user interface
-   **React Router**: For client-side routing
-   **Context API**: For state management
-   **JSON Server**: For a mock backend
-   **Vite**: For fast and efficient development

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/task-management-app.git
    cd task-management-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the JSON server:

    ```bash
    npm run server
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Use the form to add new tasks.
3. Use the search bar to find tasks quickly.
4. Filter tasks by selecting categories and priority tags.
5. Edit or delete tasks as needed.

## Project Structure

-   [Provider.jsx](http://_vscodecontentref_/0): Context provider for managing tasks state.
-   [useTasks.jsx](http://_vscodecontentref_/1): Custom hook for accessing tasks context.
-   [components](http://_vscodecontentref_/2): Directory containing reusable components.
-   [pages](http://_vscodecontentref_/3): Directory containing main application pages.
-   [index.css](http://_vscodecontentref_/4): Global styles for the application.
-   [tasks.json](http://_vscodecontentref_/5): Sample task data used by the JSON server.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## Acknowledgements

-   [React](https://reactjs.org/)
-   [React Router](https://reactrouter.com/)
-   [Context API](https://reactjs.org/docs/context.html)
-   [JSON Server](https://github.com/typicode/json-server)
-   [Vite](https://vitejs.dev/)
