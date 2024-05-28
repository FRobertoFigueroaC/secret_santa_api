
import { Response } from 'express'; 
import { prisma } from '../../data/postgres';

export const setBlocked = ( currentBlocked: number[] = [], selectedId: number ): number[] => {

  if ( currentBlocked && currentBlocked.length == 3 ) {
    // delete the first element 
    currentBlocked.shift();
    currentBlocked.push( selectedId );
  } else {
    // add the id 
    currentBlocked.push( selectedId );
  }
  return currentBlocked;
}

export const validatePersonId = ( personId: number, res: Response ) => {
  if ( !personId ) return res.status( 404 ).json( { error: `personId property is required` } );
}

export const getPerson = async (id: number) => {
  const person = await prisma.person.findUnique( {
    where: { id }
  } );
  return person;;
}

export const getPossiblePersons = async ( id: number ) => {
  const assignments = await prisma.assignment.findMany( {
    where: { personId: id }
  } );
  const blockedUsers: number[] = assignments.map( assignment => {
    return assignment.receiverId;
  } );
  const person = await getPerson( id );

  const possibleReceivers = await prisma.person.findMany( {
    where: { 
      id: {
        notIn: [...blockedUsers, id]
      },
      available: true,
      active: true,
      family: { not: person?.family}
    }
  } );

  return possibleReceivers;
}

export const setSelection = async( selectedId: number, personId: number ) => { 

  const person = await getPerson( personId );

  const newBlocked = setBlocked( person?.blocked || [], selectedId )


  // Update blocker person field
  const updatedPerson = await prisma.person.update( {
    where: { id: personId},
    data: {
      available: false,
      blocked: newBlocked
    },
  });

  // get and delete last assignment
  const assignments = await prisma.assignment.findMany( {
    where: { personId: personId },
    orderBy: { id: 'desc'},
  });

  // delete the oldest assignment if is required
  if ( assignments.length == 3) {
    await prisma.assignment.delete( {
      where: { id: assignments[ assignments.length - 1].id },
    });
  }
  
  // update selected person
  const selectedPerson = await prisma.person.update( {
    where: { id: selectedId },
    data: { available: false},
  } );

  // Create new assignment
  const assignment = await prisma.assignment.create({
    data: {
      personId: personId,
      receiverId: selectedId
    },
  });

  return {
    giver: updatedPerson,
    receiver: selectedPerson,
    assignment
  }

};

export const getCurrentReceiverByGiverId = async ( personId: number) => {
  const lastAssignment = await prisma.assignment.findFirst( {
    where: { personId: personId },
    orderBy: { id: 'desc' },
  });

  const receiver = await prisma.person.findFirst({
    where: { id: lastAssignment?.receiverId },
  });

  return {
    lastAssignment,
    receiver,
  }


};
