import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const hugo = await prisma.person.create( {
    data: {
      name: 'Hugo',
      family: 'White',
      active: true,
      available: true,
      blocked: []
    },
  } );
  const alice = await prisma.person.create( {
      data:{
        name: 'Alice',
        family: 'White',
        active: true,
        available: true,
        blocked: []
      }
  } );
  const francis = await prisma.person.create( {
    data: {
      name: 'Francis',
      family: 'White',
      active: true,
      available: true,
      blocked: []
    },
  } );
  const stela = await prisma.person.create( {
    data: {
      name: 'Stela',
      family: 'White',
      active: true,
      available: true,
      blocked: []
    },
  } );
  const robert = await prisma.person.create( {
    data: {
      name: 'Robert',
      family: 'Pinkman',
      active: true,
      available: true,
      blocked: []
    },
  } );
  const maria = await prisma.person.create( {
    data: {
      name: 'Maria',
      family: 'Pinkman',
      active: true,
      available: true,
      blocked: []
    },
  } );
  const bruce = await prisma.person.create( {
    data: {
      name: 'Bruce',
      family: 'Wayne',
      active: true,
      available: true,
      blocked: []
    },
  } );
  const selina = await prisma.person.create( {
    data: {
      name: 'Selina',
      family: 'Wayne',
      active: true,
      available: true,
      blocked: []
    },
  } );
  const emily = await prisma.person.create( {
    data: {
      name: 'Emily',
      family: 'Kent',
      active: true,
      available: true,
      blocked: []
    },
  } );
  const clark = await prisma.person.create( {
    data: {
      name: 'Clark',
      family: 'Kent',
      active: true,
      available: true,
      blocked: []
    },
  } );
  const lisa = await prisma.person.create( {
    data: {
      name: 'Lisa',
      family: 'Kent',
      active: true,
      available: true,
      blocked: []
    },
  } );
  const charly = await prisma.person.create( {
    data: {
      name: 'Charly',
      family: 'Kent',
      active: true,
      available: true,
      blocked: []
    },
  } );

  const hugoAssignments = await prisma.assignment.createMany({
    data:[
      { personId: hugo.id, receiverId: clark.id},
      { personId: hugo.id, receiverId: lisa.id},
      { personId: hugo.id, receiverId: charly.id},

    ],
  });
}
main()
  .then( async () => {
    await prisma.$disconnect();
  } )
  .catch( async ( e ) => {
    console.error( e );
    await prisma.$disconnect();
    process.exit( 1 );
  } );