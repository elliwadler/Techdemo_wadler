const request = require('supertest');
const app = require('../server');
const expect = require('chai').expect;

describe('Integration Tests', () => {
  it('should set up the database table', async () => {
    // Your test logic here
    expect(true).to.equal(true);  // Replace with your actual test
  });

  it('should handle /setup endpoint', async () => {
    const response = await request(app).get('/setup');
    expect(response.status).to.equal(200);
    // Add more specific assertions based on your expected response structure
  });

  it('should get all cats from the database', async () => {
    const response = await request(app).get('/');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('cats');
    // Add more specific assertions based on your expected response structure
  });

  it('should add a cat to the database', async () => {
    const catData = { name: 'Whiskers', breed: 'Siamese' };
    const response = await request(app)
      .post('/')
      .send(catData);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('message', 'Successfully added cat');
    // Add more specific assertions based on your expected response structure

    // You can also make another request to check if the added cat is in the database
    const getAllCatsResponse = await request(app).get('/');
    expect(getAllCatsResponse.status).to.equal(200);
    const addedCat = getAllCatsResponse.body.cats.find(cat => cat.name === catData.name && cat.breed === catData.breed);
    expect(addedCat).to.not.be.undefined;
  });

  it('should respond with "pong!" for /ping endpoint', async () => {
    const response = await request(app).get('/ping');
    expect(response.status).to.equal(200);
    expect(response.text).to.equal('pong!');
  });

  it('should respond with "pong!" for /ping endpoint', async () => {
    expect(true).to.equal(false);
  });
});
