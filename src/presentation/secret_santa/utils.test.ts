import {
  getCurrentReceiverByGiverId,
  getPerson,
  getPossiblePersons,
  setBlocked, 
  setSelection,
  validatePersonId
} from './utils';

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
})