# Techdemo - Cat Database API

This application serves as a simple API for managing a database of cats. It utilizes Node.js with the Express framework and interacts with a PostgreSQL database through the node-postgres library. Below is a brief guide on using and setting up the application.

## Endpoints
### GET /
Retrieves a list of all cats in the database.

### POST /
Adds a new cat to the database. Requires a JSON payload with the name and breed of the cat.

### GET /setup
Sets up the database by creating a cats table if it does not exist.

### GET /ping
A simple health check endpoint that responds with 'pong!'.

## Git Hub Action
In the deploy.yml are two Jobs defined.
#### 1. Test Job

    Sets up a PostgeSQL Docker Image. Then clones the repository, then setup node and then the tests are executed. After the tests are finished the PostgreSQL container will be stopped and removed.

#### 2. Deploy Job

    When the tests succeeded an image of the application will be builded and pushed to docker hub. The tag of the image will be based on the tag which is pushed to gitHub. 

## Push Code to the Repository

git tag v{version Number}
git push origin v{version Number}

## References
- https://www.youtube.com/watch?v=sDPw2Yp4JwE
- https://medium.com/@avash700/ci-cd-made-easy-github-actions-docker-compose-and-watchtower-60a698d24f27


