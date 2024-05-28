import request from 'supertest';
import { testServer } from '../../../tests/test-server';

describe('persons route testing', () => {
  beforeAll(async() => {
    await testServer.start();
  });
  afterAll(()=> {
    testServer.close();
  });

  test('should return persons /api/secret-santa/persons', () => {
    const response = request(testServer.app)
      .get('/api/secret-santa/persons')
      .expect(200)
  });
});