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

## Ports that user in app:

### For postgres (db):

- **5432:5432**

### For nginx (proxy):

- **8080:80**

### For django (backend):

- **3001:3000**

### For react (frontend):

- **8001:8000**

### Known issues:

**1. React Modules:** React modules may not install properly in the containers. If this happens,
   you will need to install them manually within the container.

**2. Environment Variables:** Environment variables may not be properly added to the Django settings file.
   This will be addressed in future updates.

### Notes:

- Ensure Docker and Docker Compose are installed and running on your machine.
- Adjust container names and paths according to your specific setup if they differ from the defaults.