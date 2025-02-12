# Linux Security Dashboard

A full-stack application for real-time monitoring and analysis of Linux system security. It provides a **Node.js/Express** backend for gathering critical system data and optionally running vulnerability scans, and a **React** frontend for visualizing information such as open ports, system logs, and more.

---

## Table of Contents

1. [Key Features](#key-features)  
2. [Tech Stack](#tech-stack)  
3. [Project Structure](#project-structure)  
4. [Installation](#installation)  
5. [Usage](#usage)  
6. [Docker Deployment](#docker-deployment-optional)  
7. [Contributing](#contributing)  
8. [License](#license)


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

- **Optional Docker Support**  
  Use `docker-compose` to containerize the application (frontend, backend, and MongoDB if applicable) for easy deployment.


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
│   │   ├── routes/
│   │   │   ├── system.js                   # Routes for system information & open ports
│   │   │   ├── vulnerabilities.js          # Routes for vulnerability scanning
│   │   │   └── logs.js                     # Routes for failed login logs or system logs
│   │   ├── controllers/
│   │   │   ├── systemController.js         # Business logic for system data (info/ports)
│   │   │   ├── vulnerabilityController.js  # Business logic for scanning vulnerabilities
│   │   │   └── logsController.js           # Business logic for handling & cleaning logs
│   │   ├── models/
│   │   │   └── SystemLog.js                # Mongoose model (example) for storing system logs
│   │   └── utils/
│   │       ├── systemInfo.js               # Helper functions to fetch system info/ports
│   │       └── vulnerabilityScanner.js     # Utility to run Nmap or other scan tools
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
│   │   │   └── LogsView.jsx                # Shows recent failed login attempts or logs
│   │   ├── services/
│   │   │   └── api.js                      # Axios instance & interceptors for API requests
│   │   ├── App.js                          # Main React component with routes/navigation
│   │   └── index.js                        # React DOM entry point, imports global styles
│   ├── package.json                        # Frontend dependencies & scripts
│   └── Dockerfile                          # Dockerfile for containerizing the frontend
├── docker-compose.yml                      # Multi-container setup for backend, frontend, DB, etc.
├── README.md                               # Project documentation (setup, usage, etc.)
└── LICENSE                                 # License file (e.g., MIT)
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

### 4. Configure Environment (Optional)
If using a database or advanced features, create a `.env` file in `backend/`:
```plaintext
PORT=5000
DB_URI=mongodb://localhost:27017/linux_security
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
   - Open your browser at `http://localhost:3000` to view system info, logs, and more.


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


**Enjoy securing your system with the Linux Security Dashboard!** For questions or feedback, [open an issue](https://github.com/marwan-ahmed-23/linux-security-dashboard/issues) or start a discussion in the repository.
