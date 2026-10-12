# Padosi (पड़ोसी) - Neighborhood Community Platform

**Padosi** is a hyper-local neighborhood assistance and community sharing web platform designed to connect residents in apartment complexes and residential communities. Neighbors can post requests for household tools, emergency supplies, personal assistance, and help each other seamlessly.

---

## 🚀 Key Features

- **Resident Authentication**: Secure registration and login with BCrypt password hashing.
- **Community Help Board**: Post requests categorized by *Household Items*, *Tools*, *Kitchen Items*, *Personal Assistance*, and *Other*.
- **Interactive Discussion / Replies**: Threaded replies allowing neighbors to offer help, coordinate lending, and communicate.
- **Request Lifecycle Management**: Status updates (*OPEN*, *IN_PROGRESS*, *FULFILLED*) to keep track of ongoing and resolved requests.
- **Activity & Participation Hub**: Resident activity dashboard displaying personal requests, contributions, and community involvement stats.
- **Notifications System**: In-app notifications alerting residents when replies or updates occur on their requests.
- **Modern Responsive Interface**: Clean, mobile-friendly interface built with React and custom styling.

---

## 🛠️ Technology Stack

### Frontend (Root Directory)
- **Framework / Runtime**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Styling**: Vanilla CSS Design System

### Backend (`/backend` Directory)
- **Framework**: [Spring Boot 3.3.4](https://spring.io/projects/spring-boot)
- **Java Version**: Java 17+ (compatible with Java 17 to Java 25)
- **Persistence**: Spring Data JPA / Hibernate
- **Security**: Spring Security Crypto (BCrypt password encoder)
- **Build Tool**: Apache Maven (Maven Wrapper included)

### Database
- **Engine**: MySQL 8.0+
- **Dialect**: `org.hibernate.dialect.MySQLDialect`
- **Auto DDL**: `update` (auto-creates and updates database tables)

---

## 📁 Project Structure

```text
Padosi/
├── index.html                   # HTML entry point for React app
├── package.json                 # Frontend dependencies and scripts
├── package-lock.json            # Exact dependency versions
├── vite.config.js               # Vite bundler configuration
├── .gitignore                   # Comprehensive root gitignore
├── README.md                    # Root project documentation
├── public/                      # Static assets
├── src/                         # React frontend source code
│   ├── App.jsx                  # Main application routes & layout
│   ├── main.jsx                 # React root DOM mount
│   ├── index.css                # Global CSS styles & design tokens
│   ├── components/              # Shared UI components (Navbar, etc.)
│   ├── pages/                   # Application pages
│   │   ├── Home.jsx             # Community requests feed
│   │   ├── PostRequest.jsx      # Create new help request
│   │   ├── RequestDetails.jsx   # Detailed request view & replies
│   │   ├── Activity.jsx         # User participation & stats
│   │   ├── Notifications.jsx    # Notifications center
│   │   ├── Login.jsx            # Sign-in page
│   │   └── Register.jsx         # Sign-up page
│   └── services/                # API and mock services
│       └── apiService.js        # Axios client for backend API
│
└── backend/                     # Spring Boot Java backend
    ├── pom.xml                  # Maven project configuration
    ├── mvnw / mvnw.cmd          # Maven wrapper scripts
    ├── .mvn/                    # Maven wrapper settings
    └── src/
        ├── main/
        │   ├── java/com/padosi/api/
        │   │   ├── PadosiApplication.java   # Spring Boot entry point
        │   │   ├── config/                  # CORS and Security configs
        │   │   ├── controller/              # REST API controllers
        │   │   ├── dto/                     # Request/Response DTOs
        │   │   ├── model/                   # JPA Entity definitions
        │   │   ├── repository/             # Spring Data repositories
        │   │   └── service/                # Business logic services
        │   └── resources/
        │       └── application.properties   # Database and server config
        └── test/                            # Backend tests
```

---

## 🗄️ MySQL Database Setup

1. **Install and Run MySQL**: Ensure MySQL Server is running locally on port `3306`.
2. **Create Database**:
   Log in to MySQL (via MySQL Command Line Client, MySQL Workbench, or your preferred SQL tool):
   ```sql
   CREATE DATABASE IF NOT EXISTS padosi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
   *(Note: The database connection URL is configured with `createDatabaseIfNotExist=true`, so MySQL will create it automatically if user permissions allow).*

---

## ⚙️ Configuration & Environment Variables

The backend database settings in `backend/src/main/resources/application.properties` support environment variables:

| Setting Key | Environment Variable | Default Value | Description |
|---|---|---|---|
| `spring.datasource.url` | `DB_URL` | `jdbc:mysql://localhost:3306/padosi?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true` | MySQL JDBC URL |
| `spring.datasource.username` | `DB_USER` | `root` | Database username |
| `spring.datasource.password` | `DB_PASSWORD` | `your_password` | Database password |
| `server.port` | `SERVER_PORT` | `8080` | Backend port |

### Setting your MySQL Password before running:
- **Windows PowerShell**:
  ```powershell
  $env:DB_PASSWORD = "YourActualPasswordHere"
  ```
- **Windows Command Prompt (cmd)**:
  ```cmd
  set DB_PASSWORD=YourActualPasswordHere
  ```
- **macOS / Linux**:
  ```bash
  export DB_PASSWORD="YourActualPasswordHere"
  ```

---

## 🚀 Running the Application

To run the complete platform, start both the backend and frontend in **two separate terminal windows**.

### 1. Start the Spring Boot Backend (Terminal 1)

1. Open PowerShell or Terminal and navigate to the `backend` directory:
   ```powershell
   cd backend
   ```
2. Ensure `JAVA_HOME` is set (if not already configured):
   ```powershell
   # Example for Windows:
   $env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-25.0.1.8-hotspot"
   ```
3. Set your MySQL password:
   ```powershell
   $env:DB_PASSWORD = "YourActualPasswordHere"
   ```
4. Run the Spring Boot application using the Maven wrapper:
   - **Windows**:
     ```powershell
     .\mvnw.cmd spring-boot:run
     ```
   - **macOS / Linux**:
     ```bash
     ./mvnw spring-boot:run
     ```
5. The backend will start on: **`http://localhost:8080`**.

---

### 2. Start the React Frontend (Terminal 2)

1. Open a **new** terminal window and navigate to the project root:
   ```powershell
   cd c:\Padosi
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and visit: **`http://localhost:5173`**.

---

## 📡 API Reference Overview

The backend exposes RESTful endpoints with CORS enabled for `http://localhost:5173`:

### Authentication (`/api/auth`)
- `POST /api/auth/register` — Register a new resident (name, email, password, flat number, phone).
- `POST /api/auth/login` — Authenticate resident and retrieve user profile.
- `GET /api/auth/me?userId={id}` — Retrieve resident profile details.

### Community Requests & Activity (`/api/community`)
- `GET /api/community/requests` — List all community requests.
- `GET /api/community/requests/{id}` — Get request details by ID.
- `POST /api/community/requests?userId={id}` — Create a new help request.
- `PUT /api/community/requests/{id}/status?userId={id}` — Update request status (*OPEN*, *IN_PROGRESS*, *FULFILLED*).
- `GET /api/community/requests/{id}/replies` — Get discussion replies for a request.
- `POST /api/community/requests/{id}/replies?userId={id}` — Add a reply or offer assistance.
- `GET /api/community/notifications?userId={id}` — Fetch notifications for a resident.
- `PUT /api/community/notifications/{id}/read?userId={id}` — Mark notification as read.
- `PUT /api/community/notifications/read-all?userId={id}` — Mark all notifications as read.
- `GET /api/community/participation?userId={id}` — Get summary statistics and participation history.

---

## 🛡️ Production Build & Verification

- **Frontend Build**:
  ```bash
  npm run build
  ```
- **Backend Build**:
  ```bash
  cd backend
  .\mvnw.cmd clean package -DskipTests
  ```

---

## 📄 License
This project is for neighborhood community empowerment and personal portfolio use.
