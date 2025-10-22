# First stage: Maven build
FROM maven:3.8.5-eclipse-temurin-17 AS build
WORKDIR /app
COPY backend/pom.xml ./backend/pom.xml
COPY backend/src ./backend/src
RUN mvn -f backend/pom.xml clean package -DskipTests

# Second stage: run the jar
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/backend/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
