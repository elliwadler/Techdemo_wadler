# Techdemo - Cat Database API

This application serves as a simple API for managing a database of cats. It utilizes Node.js with the Express framework and interacts with a PostgreSQL database through the node-postgres library. Below is a guide on using and setting up the application.

## Endpoints
#### GET /
Retrieves a list of all cats in the database.

#### POST /
Adds a new cat to the database. Requires a JSON payload with the name and breed of the cat.

#### GET /setup
Sets up the database by creating a cats table if it does not exist.

#### Put /:id
Updates information about a cat based on the provided :id. Requires a JSON payload with the updated name and breed of the cat.

#### Delete /:id
Deltes the cat with the defined Id. 

## Way of Work

#### Code Development
Developers work on the code as they see fit, add branches, making changes, and improvements to the application.

#### Versioning
When the developers are ready to create a new version of the application, they create a tag in the Git repository. This tag serves as a snapshot of the codebase at that particular point in time.

#### GitHub Trigger
After creating the tag, the code changes are pushed to GitHub. This action triggers a defined CI/CD (Continuous Integration/Continuous Deployment) workflow.

#### CI/CD Workflow (defined in deploy.yml):

1. Test Job:

   Sets up a temporary PostgreSQL container.
   Executes project-defined tests within the temporary environment.
   Ensures that the application behaves correctly and meets the specified criteria.
2. Deploy Job:

   Initiates the deployment process only if all tests from the Test Job succeed.
   Builds the application.
   Creates a Docker image of the application.
   Logs in to DockerHub (authentication to DockerHub).
   Pushes the newly built Docker image to DockerHub.
   
#### Overall Workflow:

   Developers work on the code.
   When ready, they tag a new version.
   Pushing the tag to GitHub triggers the CI/CD workflow.
   The Test Job validates the changes using a temporary PostgreSQL container and runs project-defined tests.
   If tests pass, the Deploy Job builds the application, creates a Docker image, and pushes it to DockerHub.
   This workflow ensures that only successfully tested and validated versions of the application are deployed, maintaining a reliable and consistent deployment process.

## Push a new Tag

1. Create a new tag for the version: git tag -a v{version Number} -m "commit message"
2. Push the tag to GitHub: git push origin v{version Number}

## Run application

**docker compose up**
Once the container is started Watchtower ensures that the newest image of the app is used. 

## Docker Infrastructure
My Docker application consists of three containers orchestrated using Docker Compose:

1. **PostgreSQL Container (`db`):**
   - Internally, the PostgreSQL service is accessible on its default port `5432` within the container.

2. **Application Container (`app`):**
   - Externally, the Node.js application is accessible on the host machine at `http://localhost:13000`.
   - This is achieved through port mapping, where the host's port `13000` is mapped to the container's port `3000`.

3. **Watchtower Container (`watchtower`):**
   - Does not expose any ports externally; it communicates with Docker to monitor and update containers.

## References
- https://www.youtube.com/watch?v=sDPw2Yp4JwE
- https://medium.com/@avash700/ci-cd-made-easy-github-actions-docker-compose-and-watchtower-60a698d24f27


test

