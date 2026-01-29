# Absconders Portal

The Absconders Portal is a comprehensive web application designed for law enforcement agencies to efficiently manage, track, and report on criminal cases and absconders. It provides a secure and centralized platform for investigators and administrators to access and update case information, analyze trends, and generate reports.

## ✨ Features

*   **Secure Authentication:** Role-based access control (Admin, Investigator, Public) with JWT authentication.
*   **Case Management:** Create, update, and manage detailed criminal records and case files.
*   **Advanced Search & Filtering:** Quickly find cases by various criteria such as district, FIR number, name, and status.
*   **Interactive Dashboard:** Visualize key metrics and analytics with interactive charts and graphs.
*   **Reporting Engine:** Generate and export reports in PDF format.
*   **Audit Trails:** Comprehensive logging of all user actions for accountability and security.
*   **File Management:** Upload and manage images and documents related to cases.
*   **Responsive Design:** Fully responsive UI that works on all devices.

## 🚀 Tech Stack

### Frontend

*   **Framework:** React (with Vite)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **UI Components:** Lucide React (icons), Framer Motion (animations)
*   **Data Fetching:** TanStack React Query, Axios
*   **Routing:** React Router DOM
*   **Forms:** React Hook Form
*   **Charts:** Chart.js, React Chart.js 2
*   **Notifications:** React Hot Toast

### Backend

*   **Framework:** Node.js, Express
*   **Database:** MongoDB
*   **Authentication:** JSON Web Tokens (JWT)

## 📦 Installation and Setup

### Prerequisites

*   Node.js (v18 or higher)
*   npm
*   MongoDB instance (local or remote)

### Frontend

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/absconders-portal.git
    cd absconders-portal
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add the following:
    ```
    VITE_API_BASE_URL=http://localhost:5000/api
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

### Backend

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the `backend` directory and add the following:
    ```
    PORT=5000
    MONGODB_URI=your-mongodb-connection-string
    JWT_SECRET=your-jwt-secret
    ```

4.  **Run the server:**
    ```bash
    npm start
    ```

## 📜 Scripts

*   `npm run dev`: Starts the frontend development server.
*   `npm run build`: Builds the frontend for production.
*   `npm run lint`: Lints the frontend codebase.
*   `npm run preview`: Previews the production build locally.
*   `npm run server`: Starts the backend server.

## 🔑 Default Credentials

The application includes default user accounts for development and testing purposes.

### Admin User
*   **Email:** `admin@example.com`
*   **Password:** `admin123`
*   **State:** `Maharashtra`
*   **District:** `Mumbai`

### Investigator User
*   **Email:** `investigator@example.com`
*   **Password:** `investigator123`
*   **State:** `Maharashtra`
*   **District:** `Pune`


## 📝 Database Schema

The database schema is designed to be scalable and secure, with detailed collections for users, criminals, audit logs, and analytics. For more details, refer to the [database-schema.md](./database-schema.md) file.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.

## 📄 License

This project is licensed under the MIT License.
