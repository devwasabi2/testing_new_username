# Use an official OpenJDK runtime as a parent image
FROM openjdk:21-jdk

# Set the working directory
WORKDIR /app

# Copy the Spring Boot application JAR file
COPY target/BBDBudget-1.jar /app/BBDBudget-1.jar

# Expose the port that the application runs on
EXPOSE 5000

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "/app/BBDBudget-1.jar"]
