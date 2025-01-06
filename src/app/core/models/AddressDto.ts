export class AddressDto {
  constructor(
    public country: string,
    public location: string,
    public street: string,
    public number: string,
    public zipcode: string,
    public longitude: number,
    public latitude: number,
  ) {}
}
