import {AddressDto} from "./AddressDto";

export class DestinationCreationDto {
  constructor(
    public name: string,
    public description: string,
    public price: string,
    public capacity: string,
    public contactPhone: string,
    public contactEmail: string,
    public isVisible: boolean,
    public addressCreationDto: AddressDto,
  ) {
  }
}
