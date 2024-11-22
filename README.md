# **RBAC Project Setup Guide**

This guide provides step-by-step instructions to set up the Role-Based Access Control (RBAC) project on your local machine.

---

## **Project Overview**

The **RBAC Project** is a web-based application that demonstrates a Role-Based Access Control system. It allows users to define and manage roles, permissions, and users effectively. Key features include:

- **User Management**: Add, edit, or remove users and assign roles.
- **Role Management**: Define roles with specific permissions.
- **Permission Management**: Customize what actions a role can perform.
- **Mock API**: Uses a JSON server for simulating backend operations.

The project is built using modern web development tools and frameworks to ensure scalability and performance.

---

## **Tech Stack**

- **Frontend**: React.js with Material-UI for the user interface.
- **Backend**: Mock backend using `json-server`.
- **Routing**: React Router DOM for page navigation.
- **State Management**: Managed using React state and hooks.
- **HTTP Client**: Axios for API requests.

---

## **Features**

1. **Dynamic Role Assignment**: Assign or modify roles for users dynamically.
2. **CRUD Operations**: Perform Create, Read, Update, and Delete operations on roles, users, and permissions.
3. **Mock Data Handling**: Uses `db.json` as a simulated backend to handle data storage and retrieval.
4. **Responsive Design**: Optimized UI for desktop and mobile devices.

---

## **Prerequisites**

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)
- A code editor like [VS Code](https://code.visualstudio.com/)

---

## **Setup Instructions**

### **1. Clone the Repository**
Clone the project from GitHub:
```bash
git clone https://github.com/RajveerSinghGour/rbac.git
```

Navigate into the project directory:
```bash
cd rbac
```

---

### **2. Install Dependencies**

Run the following command to install the required dependencies:
```bash
npm install @mui/material @emotion/react @emotion/styled axios json-server react-router-dom
```

Install the development dependency for Babel:
```bash
npm install --save-dev @babel/plugin-proposal-private-property-in-object
```

---

### **3. Start the Mock Backend**

Use `json-server` to start a mock backend server with the provided `db.json` file:
```bash
npx json-server --watch db.json --port 5000
```

This will serve your mock data at [http://localhost:5000](http://localhost:5000).

---

### **4. Start the Development Server**

Run the following command to start the frontend development server:
```bash
npm start
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

---

## **Quick Commands Summary**

1. Install dependencies:
   ```bash
   npm install @mui/material @emotion/react @emotion/styled axios json-server react-router-dom
   npm install --save-dev @babel/plugin-proposal-private-property-in-object
   ```

2. Start the backend:
   ```bash
   npx json-server --watch db.json --port 5000
   ```

3. Start the frontend:
   ```bash
   npm start
   ```

---

## **Folder Structure**

The following is the folder structure of the project:

```
src/
├── components/
│   ├── Dashboard.js         # Component for the main dashboard UI
│   ├── Users.js             # Component for managing users
│   ├── Roles.js             # Component for managing roles
│   └── Permissions.js       # Component for managing permissions
├── App.js                   # Root application component
├── index.js                 # Entry point of the React application
```

---

## **Troubleshooting**

### **1. Missing Babel Plugin Warning**
If you encounter a Babel plugin warning, ensure you’ve installed the development dependency:
```bash
npm install --save-dev @babel/plugin-proposal-private-property-in-object
```

### **2. Error: `ERR_OSSL_EVP_UNSUPPORTED`**
Set the environment variable for OpenSSL:
```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

---

## **Contributing**

Feel free to fork the repository, create a new branch, and submit pull requests with your changes. Suggestions for improvements and additional features are welcome!

---
