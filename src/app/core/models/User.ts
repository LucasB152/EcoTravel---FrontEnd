import {UUID} from 'node:crypto';

export class Users {
  private _id?: UUID;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  private _profilePicturePath?: string;

  constructor({firstname, lastname, email, password}: Users) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }


  set id(value: UUID) {
    this._id = value;
  }

  set profilePicturePath(value: string) {
    this._profilePicturePath = value;
  }
}
