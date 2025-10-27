Finance Tracker Backend
A robust Spring Boot REST API backend for tracking and managing personal finances. Secure, Dockerized, and ready for cloud deployment with JWT-based authentication and comprehensive Swagger documentation.

🌟 Features
	•	User Authentication: Secure login, register, and JWT-based session management.
	•	Transaction Management: Create, view, filter, and delete financial transactions.
	•	Summaries & Pagination: Get monthly summaries and paged results.
	•	PostgreSQL Integration: Data persistence using PostgreSQL.
	•	Swagger UI Documentation: Interactive API docs.
	•	Ready for Render & Docker: Effortless cloud deployment.
  
🚀 Live Demo
Backend Deployed at:
https://finance-tracker-2-33df.onrender.com
Swagger UI:
https://finance-tracker-2-33df.onrender.com/swagger-ui/index.html

🛠️ Project Structure
Finance_Tracker/
├── backend/
│   ├── src/
│   └── pom.xml
├── Dockerfile
├── README.md
└── frontend/

🔑 Authentication
Most endpoints require a JWT token. Register and login via  /api/auth/register  and  /api/auth/login  to get your JWT.
📖 API Endpoints
Auth Endpoints
