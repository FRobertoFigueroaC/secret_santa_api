import {
  getCurrentReceiverByGiverId,
  getPerson,
  getPossiblePersons,
  setBlocked, 
  setSelection,
  validatePersonId
} from './utils';


const prismaMock = {
  person: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn()
  },
  assignment: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    delete: jest.fn()
  }
}

describe('Secret Santa utils tests', () => {
  test('should add the given id to blocked array', () => {

    // Arrange
    const blocked = [] as number[];
    const selectedId = 1;
    // Act
    const newBlocked = setBlocked(blocked, selectedId);

    // Assert
    expect( newBlocked ).toEqual([1]);
  });
  test('should remove the first item when blocked array length is 3 and add the new item', () => {

    // Arrange
    const blocked = [1,2,3];
    const selectedId = 4;
    // Act
    const newBlocked = setBlocked(blocked, selectedId);

    // Assert
    expect( newBlocked ).toEqual([2,3,4]);
  });


  it( 'should return possible receivers excluding blocked users and immediate family', async () => {
    const mockReceivers = [
      {
        id: 20,
        name: 'Bruce',
        family: 'Wayne',
        active: true,
        available: true,
        blocked: []
      },
      {
        id: 21,
        name: 'Selina',
        family: 'Wayne',
        active: true,
        available: true,
        blocked: []
      },
      {
        id: 22,
        name: 'Emily',
        family: 'Kent',
        active: true,
        available: true,
        blocked: []
      },
      {
        id: 23,
        name: 'Clark',
        family: 'Kent',
        active: true,
        available: true,
        blocked: []
      },
      {
        id: 24,
        name: 'Lisa',
        family: 'Kent',
        active: true,
        available: true,
        blocked: []
      }
    ]

    const possiblePersons = await getPossiblePersons( 14 );
    expect( possiblePersons ).toEqual( mockReceivers );
  });

  it( 'should return the current receiver and the last assignment', async () => {

  });

  it( 'should update the person and create a new assignment', async () => {
  });


})