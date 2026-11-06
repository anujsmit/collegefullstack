# Full-Stack To-Do List Manager (Simple CRUD)

A simple, beginner-friendly **Full-Stack To-Do List Manager** built using HTML, CSS, Vanilla JavaScript, Node.js, Express.js, and MySQL.

This project demonstrates the basic CRUD operations (Create, Read, Update, and Delete) through a simple task management application.

## 📌 Features

- **Add Tasks:** Create new tasks with a title and description.
- **View Tasks:** Display all tasks stored in the MySQL database.
- **View Single Task:** Retrieve a specific task using its ID.
- **Update Tasks:** Edit existing task details.
- **Update Status:** Mark tasks as Completed or Pending.
- **Delete Tasks:** Remove tasks permanently from the database.
- **Database Integration:** Store and manage tasks using MySQL.
- **REST API:** Communicate between frontend and backend using REST API endpoints.

## 📁 Project Structure

```text
fullstackproject/
│
├── backend/
│   ├── db.js          # MySQL connection pool (mysql2)
│   └── server.js      # Express server with CRUD API routes
│
├── frontend/
│   ├── index.html     # Dashboard, Add Form, Task List & Edit Modal
│   ├── style.css      # Simple and clean CSS styling
│   └── script.js      # Fetch API calls using async/await
│
├── .env               # Database credentials and port
├── database.sql       # MySQL database schema
├── package.json       # Project dependencies and scripts
└── README.md          # Project documentation
```

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Structure of the application |
| CSS3 | Styling and layout |
| JavaScript | Frontend functionality |
| Node.js | Backend runtime environment |
| Express.js | Creating REST API routes |
| MySQL | Database management |
| mysql2 | Connecting Node.js with MySQL |
| dotenv | Managing environment variables |
| CORS | Handling cross-origin requests |

## 🚀 How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/anujsmit/collegefullstack
```

Navigate into the project directory:

```bash
cd fullstackproject
```

### 2. Install Dependencies

Install all required Node.js packages:

```bash
npm install
```

### 3. Configure the Database

Make sure MySQL is installed and running.

Open the `.env` file and configure your MySQL credentials:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=12345
DB_NAME=todo_manager
```

**Note:** Replace the database password with your actual MySQL password.

The backend automatically creates the `todo_manager` database and `tasks` table if they do not already exist.

### 4. Start the Backend Server

Run the following command:

```bash
npm start
```

Or use the development command with automatic server restarting:

```bash
npm run dev
```

### 5. Open the Application

Open your browser and visit:

```text
http://localhost:5000
```

You can now start managing your tasks!

## 🔗 API Routes

The application provides the following REST API endpoints:

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Retrieve all tasks |
| GET | `/api/tasks/:id` | Retrieve a single task by ID |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update an existing task |
| PATCH | `/api/tasks/:id/status` | Update task status |
| DELETE | `/api/tasks/:id` | Delete a task |

## 📖 Understanding CRUD Operations

CRUD stands for **Create, Read, Update, and Delete**. These are the four basic operations used to manage data in a database.

| Operation | HTTP Method | Functionality |
|---|---|---|
| Create | POST | Add a new task |
| Read | GET | Display existing tasks |
| Update | PUT / PATCH | Modify task details or status |
| Delete | DELETE | Remove a task |

## 🗄️ Database Structure

**Database Name:** `todo_manager`

**Table Name:** `tasks`

The tasks table stores information about each task.

| Column | Description |
|---|---|
| id | Unique task identifier |
| title | Task title |
| description | Task description |
| status | Pending or Completed |
| created_at | Task creation timestamp |

*The exact column definitions depend on the `database.sql` schema.*

## 🔄 How the Application Works

1. The user interacts with the frontend through the browser.
2. JavaScript sends HTTP requests using the Fetch API.
3. Express.js receives the requests through the backend API routes.
4. The backend communicates with MySQL using the mysql2 package.
5. MySQL performs the requested database operation.
6. The backend returns a JSON response.
7. JavaScript updates the webpage with the latest task information.

## 📚 Learning Outcomes

By completing this project, beginners can understand:

- How frontend and backend communicate.
- How to create a REST API using Express.js.
- How to connect Node.js with MySQL.
- How to perform CRUD operations.
- How to use JavaScript Fetch API with async/await.
- How to manage database records.
- How to organize a simple full-stack project.

## 👨‍💻 Author

Developed as a beginner-friendly Full-Stack CRUD project for learning and practicing web development.

---

**Happy Coding! 🚀**
