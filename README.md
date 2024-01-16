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

## Git Hub Action Worfflow

The jobs defined in the depoy.yml file are triggered when a new tag is pushed. In the deploy.yml file, two jobs are defined:

1. Test Job
Sets up a PostgreSQL Docker container.
Clones the repository.
Sets up Node.js.
Executes the tests.
After the tests are finished, the PostgreSQL container is stopped and removed.

2. Deploy Job
When the tests succeed, an image of the application is built and pushed to Docker Hub.
The tag of the image is based on the tag pushed to GitHub

## Push a new Tag

1. Create a new tag for the version: git tag -a v{version Number} -m "commit message"
2. Push the tag to GitHub: git push origin v{version Number}

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


