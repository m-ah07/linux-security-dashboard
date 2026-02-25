# Linux Security Dashboard

A full-stack application for real-time monitoring and analysis of Linux system security. It provides a **Node.js/Express** backend for gathering critical system data and optionally running vulnerability scans, and a **React** frontend for visualizing information such as open ports, system logs, and more.

---

## Table of Contents

1. [Key Features](#key-features)  
2. [Requirements](#requirements)  
3. [Platform Support](#platform-support)  
4. [Tech Stack](#tech-stack)  
5. [Project Structure](#project-structure)  
6. [Installation](#installation)  
7. [Usage](#usage)  
8. [Default Login Credentials](#default-login-credentials)  
9. [API Endpoints](#api-endpoints)  
10. [Docker Deployment](#docker-deployment-optional)  
11. [Troubleshooting](#troubleshooting)  
12. [Contributing](#contributing)  
13. [License](#license)


## Key Features

- **System Metrics**  
  Collect CPU, memory, and uptime details, along with system-wide info (hostname, OS, etc.).

- **Open Ports**  
  Scan and display currently open ports on the host for quick identification of potential threats.

- **Vulnerability Scanning**  
  Perform simple vulnerability scans (using Nmap, for example) to detect common security gaps.

- **Logs and Failed Logins**  
  Fetch and display recent authentication failures or other relevant system logs, highlighting suspicious activity.

- **Scalable Architecture**  
  Separate **backend** for data collection/processing and **frontend** for a responsive, user-friendly dashboard.

- **Authentication**  
  JWT-based login protects all dashboard data. Default credentials can be configured via environment variables.

- **Optional Docker Support**  
  Use `docker-compose` to containerize the application (frontend, backend, and MongoDB if applicable) for easy deployment.


## Requirements

Before you begin, ensure you have:

- **Node.js** (v18 or newer) — [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Linux** — For full functionality (Open Ports, Logs, Vulnerability Scanner)
- **Nmap** — Required for Vulnerability Scanner (install: `apt install nmap` on Ubuntu/Debian)


## Platform Support

| Feature              | Linux | Windows |
|----------------------|-------|---------|
| System Dashboard     | ✅    | ✅      |
| Open Ports           | ✅    | ❌      |
| Failed Login Logs    | ✅    | ❌      |
| Vulnerability Scanner| ✅*   | ⚠️      |

\* Requires Nmap installed  
⚠️ Windows: Only works if Nmap is installed; Open Ports and Logs use Linux commands (`ss`, `grep`, `/var/log/auth.log`).

**On Windows:** Use [WSL2](https://docs.microsoft.com/en-us/windows/wsl/) or [Docker](#docker-deployment-optional) for full support.


## Tech Stack

- **Backend**  
  - [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)  
  - (Optional) [MongoDB](https://www.mongodb.com/) if you want to persist historical data (via [Mongoose](https://mongoosejs.com/))

- **Frontend**  
  - [React](https://reactjs.org/) + [Bootstrap](https://getbootstrap.com/)  
  - [React Router](https://reactrouter.com/) for routing  
  - [Axios](https://axios-http.com/) for API requests

- **Deployment**  
  - [Docker](https://www.docker.com/) & [docker-compose](https://docs.docker.com/compose/) (Optional)  
  - Can be self-hosted on any server or cloud service (AWS, Azure, GCP, etc.)


## Project Structure

```plaintext
linux-security-dashboard/
├── backend/
│   ├── src/
│   │   ├── app.js                          # Main Express server setup & configuration
│   │   ├── middleware/
│   │   │   └── auth.js                     # JWT authentication middleware
│   │   ├── routes/
│   │   │   ├── auth.js                     # Login route (public)
│   │   │   ├── system.js                   # Routes for system information & open ports
│   │   │   ├── vulnerabilities.js          # Routes for vulnerability scanning
│   │   │   └── logs.js                     # Routes for failed login logs
│   │   ├── controllers/
│   │   │   ├── authController.js           # Login logic & JWT issuance
│   │   │   ├── systemController.js         # Business logic for system data (info/ports)
│   │   │   ├── vulnerabilityController.js  # Business logic for scanning vulnerabilities
│   │   │   └── logsController.js           # Business logic for handling logs
│   │   ├── models/
│   │   │   └── SystemLog.js                # Mongoose model (example) for storing system logs
│   │   └── utils/
│   │       ├── systemInfo.js               # Helper functions to fetch system info/ports
│   │       └── vulnerabilityScanner.js     # Utility to run Nmap or other scan tools
│   ├── .env.example                        # Environment variables template
│   ├── package.json                        # Backend dependencies & scripts
│   └── Dockerfile                          # Dockerfile for containerizing the backend
├── frontend/
│   ├── public/
│   │   └── index.html                      # Main HTML entry for the React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── SystemDashboard.jsx         # Displays system info (CPU, memory, etc.)
│   │   │   ├── PortList.jsx                # Lists open ports fetched from the backend
│   │   │   ├── VulnerabilityScanner.jsx    # UI to trigger vulnerability scans & show results
│   │   │   ├── LogsView.jsx                # Shows recent failed login attempts or logs
│   │   │   ├── Login.jsx                   # Login form component
│   │   │   └── ProtectedRoute.jsx          # Route guard for authenticated users
│   │   ├── services/
│   │   │   └── api.js                      # Axios instance & interceptors for API requests
│   │   ├── App.js                          # Main React component with routes/navigation
│   │   └── index.js                        # React DOM entry point, imports global styles
│   ├── .env.example                        # Frontend environment variables template
│   ├── package.json                        # Frontend dependencies & scripts
│   └── Dockerfile                          # Dockerfile for containerizing the frontend
├── docker-compose.yml                      # Multi-container setup for backend, frontend, DB
├── .gitignore                              # Git ignore rules
├── README.md                               # Project documentation (setup, usage, etc.)
└── LICENSE                                 # License file (MIT)
```


## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/m-ah07/linux-security-dashboard.git
```

### 2. Install Backend Dependencies
```bash
cd linux-security-dashboard/backend
npm install
```
- (Optional) If you plan on using a database like MongoDB, install **mongoose** as well:
  ```bash
  npm install mongoose
  ```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```
- If `react-scripts` is not found when running `npm start`, install it:
  ```bash
  npm install react-scripts
  ```

### 4. Install Nmap (Linux only, for Vulnerability Scanner)
```bash
# Ubuntu/Debian
sudo apt install nmap

# RHEL/CentOS
sudo yum install nmap
```

### 5. Configure Environment
Copy `.env.example` to `.env` in both backend and frontend:

**Backend** (`backend/.env`):
```plaintext
PORT=5000
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=24h
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin
```

**Frontend** (`frontend/.env`):
```plaintext
REACT_APP_API_URL=http://localhost:5000/api
```

If using a database, add to backend `.env`:
```plaintext
DB_URI=mongodb://localhost:27017/linux_security
```

**RHEL/CentOS** — Use `/var/log/secure` for auth logs:
```plaintext
AUTH_LOG_PATH=/var/log/secure
```


## Usage

1. **Run the Backend**  
   ```bash
   cd linux-security-dashboard/backend
   npm run dev
   ```
   - Starts an Express server on `http://localhost:5000` by default.

2. **Run the Frontend**  
   ```bash
   cd ../frontend
   npm start
   ```
   - Runs the React application on `http://localhost:3000`.

3. **Access the Dashboard**  
   - Open your browser at **`http://localhost:3000`** (frontend).  
   - Do **not** use `http://localhost:5000` in the browser — that is the API server and will show "Cannot GET /".


## Default Login Credentials

| Field     | Default Value |
|-----------|---------------|
| **Username** | `admin` |
| **Password** | `admin` |

Change these in production via `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `backend/.env`.


## API Endpoints

All endpoints except `/api/auth/login` require a JWT token in the `Authorization` header: `Bearer <token>`.

| Method | Endpoint                      | Auth | Description                    |
|--------|-------------------------------|------|--------------------------------|
| POST   | `/api/auth/login`             | No   | Login; returns JWT             |
| GET    | `/api/system/info`            | Yes  | System metrics (CPU, memory…)  |
| GET    | `/api/system/ports`           | Yes  | Open ports on the host         |
| POST   | `/api/vulnerabilities/scan`   | Yes  | Run vulnerability scan (Nmap)  |
| GET    | `/api/vulnerabilities/results`| Yes  | Get last scan results          |
| GET    | `/api/logs/failed-logins`     | Yes  | Failed login attempts          |
| DELETE | `/api/logs/cleanup`           | Yes  | Log cleanup info (read-only)   |


## Docker Deployment (Optional)

1. **Build and Run**  
   ```bash
   cd linux-security-dashboard
   docker-compose up --build
   ```
2. **Containers**  
   - **backend**: Exposes `http://localhost:5000`  
   - **frontend**: Accessible at `http://localhost:3000`  
   - **mongo** (if configured) on `27017`  

3. **Login** — Use `admin` / `admin` (or credentials from env vars).


## Troubleshooting

| Problem | Solution |
|---------|----------|
| **"Cannot GET /"** | You are on the backend URL. Open `http://localhost:3000` (frontend) instead of `http://localhost:5000`. |
| **"react-scripts is not recognized"** | Run `npm install react-scripts` in the frontend folder. |
| **Open Ports / Logs empty on Windows** | These features require Linux. Use WSL2 or Docker. |
| **Vulnerability scan fails** | Install Nmap: `apt install nmap` (Linux). |
| **401 Unauthorized** | Log in again. The JWT may have expired (default: 24h). |
| **CORS errors** | Ensure backend runs on port 5000 and frontend uses `REACT_APP_API_URL=http://localhost:5000/api`. |


## Contributing

1. **Fork** the repository.  
2. **Create a branch** for your feature:  
   ```bash
   git checkout -b feature/some-new-feature
   ```
3. **Commit & push** your changes:  
   ```bash
   git commit -m "Add some new feature"
   git push origin feature/some-new-feature
   ```
4. **Open a Pull Request** on GitHub, describing your changes and any relevant details.

We appreciate your contributions—bug reports, suggestions, and pull requests are always welcome!


## License

This project is licensed under the [MIT License](LICENSE).  
Feel free to modify and distribute as you see fit.


**Enjoy securing your system with the Linux Security Dashboard!** For questions or feedback, [open an issue](https://github.com/m-ah07/linux-security-dashboard/issues) or start a discussion in the repository.
