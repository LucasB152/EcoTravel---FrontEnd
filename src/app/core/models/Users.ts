export class Users {
  private _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  private password: string;
  private _profilePicturePath?: string;

  constructor({
                firstName,
                lastName,
                email,
                password,
              }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    this.firstname = firstName;
    this.lastname = lastName;
    this.email = email;
    this.password = password;
  }


  get id(): string {
    return <string>this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  set profilePicturePath(value: string) {
    this._profilePicturePath = value;
  }

  get profilePicturePath(): string | undefined {
    return this._profilePicturePath;
  }
}
