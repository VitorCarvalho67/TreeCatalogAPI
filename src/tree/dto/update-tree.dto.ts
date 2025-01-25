import { PartialType } from '@nestjs/mapped-types';
import { CreateTreeDto } from './create-tree.dto';

export class UpdateTreeDto extends PartialType(CreateTreeDto) {
    tag: string;
    specie: string;
    age: number;
    height: number;
}
