import {AddressDto} from "./AddressDto";

export class DestinationCreationDto {
  constructor(
    public name: string,
    public description: string,
    public price: string,
    public capacity: string,
    public visible: boolean,
    public contactPhone: string,
    public contactEmail: string,
    public destinationType: string,
    public userId: number,
    public addressCreationDto: AddressDto,
  ) {
  }
}
