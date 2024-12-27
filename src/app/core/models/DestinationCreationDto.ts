export class DestinationCreationDto {
  constructor(
    public name: string,
    public description: string,
    public price: string,
    public capacity: string,
    public contactPhone: string,
    public contactEmail: string,

    public addressCreationDto: {
      country: string,
      location: string,
      street: string,
      number: string,
      zipcode: string,
      longitude: number
    }
  ) {
  }
}
