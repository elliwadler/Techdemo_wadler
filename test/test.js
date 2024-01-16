const request = require('supertest');
const app = require('../server');
const expect = require('chai').expect;

describe('Tests', () => {

  it('should handle /setup endpoint', async () => {
    const response = await request(app).get('/setup');
    expect(response.status).to.equal(200);
  });

  it('should get all cats from the database', async () => {
    const response = await request(app).get('/');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('cats');
  });

  it('should add a cat to the database', async () => {
    const catData = { name: 'Whiskers', breed: 'Siamese' };
    const response = await request(app)
      .post('/')
      .send(catData);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('message', 'Successfully added cat');

    const getAllCatsResponse = await request(app).get('/');
    expect(getAllCatsResponse.status).to.equal(200);
    const addedCat = getAllCatsResponse.body.cats.find(cat => cat.name === catData.name && cat.breed === catData.breed);
    expect(addedCat).to.not.be.undefined;
  });

// Test for updating a cat in the database
it('should update a cat in the database', async () => {
  const catData = { name: 'UpdateMe', breed: 'TestBreed' };

  // Add a cat and retrieve the added cat including its ID
  const addResponse = await request(app)
      .post('/')
      .send(catData);

  expect(addResponse.status).to.equal(200);
  const addedCat = addResponse.body.cat; // Assuming the response includes the added cat object

  // Update the added cat
  const updatedCatData = { name: 'UpdatedCat', breed: 'NewBreed' };
  const updateResponse = await request(app)
      .put(`/${addedCat.id}`)
      .send(updatedCatData);

  expect(updateResponse.status).to.equal(200);
  expect(updateResponse.body).to.have.property('message', 'Successfully updated cat');

  // Retrieve the updated cat and check if it matches the updated data
  const getUpdatedCatResponse = await request(app).get(`/${addedCat.id}`);
  expect(getUpdatedCatResponse.status).to.equal(200);
  expect(getUpdatedCatResponse.body.cat).to.deep.include(updatedCatData);
});

it('should delete a cat from the database', async () => {
  const catData = { name: 'DeleteMe', breed: 'TestBreed' };
  const addResponse = await request(app)
      .post('/')
      .send(catData);

  expect(addResponse.status).to.equal(200);
  const addedCatId = addResponse.body.id;

  const deleteResponse = await request(app)
      .delete(`/${addedCatId}`);

  expect(deleteResponse.status).to.equal(200);
  expect(deleteResponse.body).to.have.property('message', 'Successfully deleted cat');

  const getDeletedCatResponse = await request(app).get(`/${addedCatId}`);
  expect(getDeletedCatResponse.status).to.equal(404); // HTTP 404 indicates the resource is not found
});

it('should respond with "pong!" for /ping endpoint', async () => {
  const response = await request(app).get('/ping');
  expect(response.status).to.equal(200);
  expect(response.text).to.equal('pong!');
});
});
