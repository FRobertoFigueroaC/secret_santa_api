import express, { Router } from 'express';
import path from 'path';

interface Options {
  port: number;
  routes: Router;
}


export class Server {

  private app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor( options: Options ) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
  }



  async start() {


    //* Middlewares
    this.app.use( express.json() ); // raw json form
    this.app.use( express.urlencoded( { extended: true } ) ); // x-www-form-urlencoded


    //* REST API
    //* Routes
    this.app.use( this.routes );


    //* PORT
    this.app.listen( this.port, () => {
      console.log( `Server running on port ${ this.port }` );
    } );

  }

}