import { Request, Response } from 'express';
import { Person } from '../../domain/interfaces';
import { prisma } from '../../data/postgres';
import {
  getCurrentReceiverByGiverId,
  getPerson,
  getPossiblePersons,
  setSelection,
  validatePersonId
} from './utils';




export class SecretSantaController {

  // * DI
  constructor() { }

  public getPersons = async( req: Request, res: Response ) => {
    const persons = await prisma.person.findMany()
    return res.json( persons );
  };


  public getPersonById = async( req: Request, res: Response ) => {
    const id = Number( req.params.id );
    if ( isNaN( id ) ) {
      return res.status( 400 ).json( { error: 'ID argument is not valid' } );
    }
    const person = await getPerson(id);
    ( person )
      ? res.json( person )
      : res.status( 404 ).json( { error: `Person with id ${ id } not found` } );
  };


  public generateSecretSantaPair = async( req: Request, res: Response ) => {
    const { personId } = req.body;
    validatePersonId( personId, res);

    // get posibilities
    const possibleReceivers = await getPossiblePersons( personId );
    // pick one
    const selectedPerson = possibleReceivers[ (Math.floor(Math.random() * possibleReceivers.length))];
    // update list set available to false and add to blocked
    const result = await setSelection( selectedPerson.id, personId );

    return res.json( result );
  };


  public getAssignment = async ( req: Request, res: Response ) => {
    const { personId } = req.body;
    validatePersonId( personId, res );

    const { lastAssignment, receiver } = await getCurrentReceiverByGiverId(personId);
    return res.json( {
      person: receiver,
      assignment: lastAssignment
    } );

  }




}