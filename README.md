# Finance Tracker Backend

[![Java](https://img.shields.io/badge/Java-21-blue?logo=java)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring--Boot-3.5.3-brightgreen?logo=springboot)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Connected-blue?logo=postgresql)](https://www.postgresql.org/)
[![Dockerized](https://img.shields.io/badge/Docker-ready-blue?logo=docker)](https://www.docker.com/)
[![Deployed on Render](https://img.shields.io/badge/Deploy-Render-5375fb?logo=render)](https://render.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A secure Spring Boot REST API for managing your personal finances — with robust authentication, PostgreSQL integration, and full Swagger documentation. Fast, cloud-ready, and developer-friendly!

---

## 🚀 Live Demo
**Backend:** [https://finance-tracker-2-33df.onrender.com](https://finance-tracker-2-33df.onrender.com)  
**Swagger Docs:** [https://finance-tracker-2-33df.onrender.com/swagger-ui/index.html](https://finance-tracker-2-33df.onrender.com/swagger-ui/index.html)

---

## 📸 API Screenshots

### Endpoints
![Transaction/Authentication Endpoints](Images/Screenshot%202025-10-27%20at%201.37.49%20PM.png)

### Schemas
![API Schemas](Images/Screenshot%202025-10-27%20at%202.00.09%20PM.png)

---

## 📚 API Endpoints

### 🛡️ Authentication

| Method | Endpoint            | Description         |
|--------|---------------------|---------------------|
| POST   | `/api/auth/register`| Register a new user |
| POST   | `/api/auth/login`   | Login & get JWT     |

### 💸 Transaction

| Method | Endpoint                           | Description                      |
|--------|------------------------------------|----------------------------------|
| GET    | `/api/transaction`                 | List all transactions            |
| POST   | `/api/transaction`                 | Add a new transaction            |
| GET    | `/api/transaction/summary`         | Get transactions summary         |
| GET    | `/api/transaction/paginated`       | Paginated transactions           |
| GET    | `/api/transaction/filter`          | Filter transactions              |
| DELETE | `/api/transaction/{id}`            | Delete transaction by ID         |

### 🩺 Health

| Method | Endpoint | Description    |
|--------|----------|----------------|
| GET    | `/`      | Health status  |

---

## 🔑 Security

- **JWT Authentication**: Secure all sensitive endpoints.
- **Bearer Token**: Add as `Authorization: Bearer <token>` in your requests post-login.
- **CORS**: Configurable for frontend/backend integration.

---

## 🏗️ Technologies

- Java 21
- Spring Boot 3
- Spring Security + JWT
- PostgreSQL
- Docker
- Swagger/OpenAPI
- Lombok

---

## 🗂️ Project Structure

	Finance_Tracker/
	├── backend/ │   
	├── src/ │   
		└── pom.xml 
	├── Dockerfile 
	├── README.md 
		└── frontend/

	
---

## ⚙️ Getting Started

### Local

1. **Clone**
    ```
    git clone https://github.com/your-username/Finance_Tracker.git
    ```
2. **Database Config**  
   Edit `backend/src/main/resources/application.properties` with your DB credentials.

3. **Run**
    ```
    cd backend
    mvn clean package
    java -jar target/*.jar
    ```

### Docker

1. **Build & Run**
    ```
    docker build -t finance-tracker-backend .
    docker run -p 8080:8080 --env-file .env finance-tracker-backend
    ```

### Render Deployment

- Set these environment variables:
  - `SPRING_DATASOURCE_URL`
  - `DB_USERNAME`
  - `DB_PASSWORD`
  - `KEY` (JWT Secret)

---

## 🤝 Contributing

Pull requests and feature suggestions welcome!

---

## 📄 License

MIT

---

**Tip:**  
Check out the [Swagger UI](https://finance-tracker-2-33df.onrender.com/swagger-ui/index.html) for interactive API docs.
