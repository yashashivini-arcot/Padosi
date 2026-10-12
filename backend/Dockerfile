# Stage 1: Build stage
FROM eclipse-temurin:17-jdk-jammy AS build

WORKDIR /app

# Copy Maven wrapper and POM first to leverage Docker layer caching
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

# Ensure maven wrapper script has execution permissions
RUN chmod +x ./mvnw

# Pre-download dependencies offline
RUN ./mvnw dependency:go-offline -B

# Copy project source code
COPY src/ src/

# Package the application (skip tests during container build)
RUN ./mvnw clean package -DskipTests

# Stage 2: Runtime stage
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

# Create a non-root group and user for security
RUN groupadd -r spring && useradd -r -g spring spring

# Copy the built jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Change ownership of the application jar
RUN chown -R spring:spring /app

USER spring:spring

# Default port matching application.properties default
ENV PORT=8080
EXPOSE ${PORT}

# Run the Spring Boot application, respecting PORT and JVM options
ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT} -jar /app/app.jar"]
