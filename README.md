# ⭐ Rating-system-project

## 📌 Project Description – Store Rating System

The **Rating System** is a full-stack web application that enables users to rate and review stores based on their experiences. With a role-based login system, the platform provides unique dashboards and functionalities for each user type — System Administrator, Normal User, and Store Owner.

---

## 🛠 Tech Stack

- **Frontend:** ReactJS  
- **Backend:** ExpressJS / Loopback / NestJS (choose one)
- **Database:** PostgreSQL / MySQL

---

## 🎯 Objective

To build a centralized platform that allows users to submit and manage ratings for various stores, while giving different roles access to specific features.

---

## 👥 User Roles and Functionalities

### 1. 🛠 System Administrator

- **Features:**
  - Add/manage:
    - Stores
    - Normal Users
    - Other Admin Users
  - View dashboard with:
    - Total number of users
    - Total number of stores
    - Total number of submitted ratings
  - Manage Users and Stores:
    - Filter/sort by Name, Email, Address, Role
    - View individual user/store details and their ratings
  - Logout functionality

---

### 2. 🙋 Normal User

- **Features:**
  - Register and log in
  - Update password
  - View/search stores by Name or Address
  - View:
    - Store name and address
    - Overall store rating
    - Their own rating (if submitted)
  - Submit or update a rating (1–5 stars)
  - Logout functionality

---

### 3. 🏪 Store Owner

- **Features:**
  - Log in
  - Update password
  - Dashboard showing:
    - List of users who rated their store
    - Average store rating
  - Logout functionality

---

## 📁 Project Setup

### 1. Clone the repository
```bash
git clone https://github.com/Ujjwal9329/Rating-system-project.git
cd Rating-system-project

2. Install dependencies
# For frontend
cd client
npm install

# For backend
cd ../server
npm install

3. Run the application

# Run backend
npm run start

# In a separate terminal, run frontend
npm start
