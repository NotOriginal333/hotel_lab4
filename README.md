# Project Setup

## Starting the Application

To start the application, follow these steps:

**Build and Start Containers**

- Run the following command to build and start all the Docker containers:

```sh
   docker compose up --build
```

- If you encounter issues with React packages, you may need to manually install them within the container.
To access the container, run:

```sh
docker compose exec frontend sh
```

- Before accessing the frontend container, ensure the containers are started in detached mode using:

```sh
    docker compose up --build -d
```

- If you haven't made changes to the Docker setup or application code, you can restart the containers with:

```sh
    docker compose up
```

**Running Cypress with GUI (Optional):**

- To run Cypress with a GUI for interactive tests, use the command below 
(ensure the cy-open.yml is correctly configured for your machine):
```sh
docker compose -f docker-compose.yml -f cy-open.yml up --exit-code-from cypress --build
```


## Ports that user in app:

### For postgres (db):

- **5432:5432**

### For nginx (proxy):

- **8080:80**

### For django (backend):

- **3000:3000**

### For react (frontend):

- **8000:8000**

### Known issues:

**1. React Modules:** React modules may not install properly in the containers. If this happens,
   you will need to install them manually within the container.

**2. Cypress Configuration:** The cy-open.yml file is provided for running Cypress with a GUI, but it may
require adjustments based on your host machine configuration. Ensure that all necessary dependencies and configurations
are set.

### Notes:

- There's a cy-open.yml file, but it depends on your host machine, so you may need to configure it by yourself.
- Ensure Docker and Docker Compose are installed and running on your machine.
- Adjust container names and paths according to your specific setup if they differ from the defaults.