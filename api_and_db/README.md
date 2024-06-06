"# Backend"

1. install docker in wsl
2. run the command
   - docker compose up -d
     in detached mode (this command will run a dockerized postgres db)
3. cd in flyway and run the following commands

- sudo apt update
- sudo apt install snapd
- cd flyway

4. When you are within the flyway directory, add the db login details below into the flyway.conf file
   flyway.password=bbdpassword
   flyway.user=bbd_graduser
5. Run the command below to run all migrations within the migrations folder
   flyway migrate
6. Now your db has the necessary tables for the api to make requests to it!
7. cd out of the flyway dir into the root folder. Now, create a .env file and copy and paste the details below:
   DB_URL=jdbc:postgresql://localhost:5433/bplannerdb
   DB_USERNAME=bbd_graduser
   DB_PASSWORD=bbdpassword
8. Thereafter, run the commands below to run the api in a dockerized environment
   (java 21 and maven must be installed in your system!)
   mvn clean
   mvn install
   mvn spring-boot:run
