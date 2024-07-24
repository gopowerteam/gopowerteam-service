import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class IdsStringInput {
  @IsString({ each: true })
  @IsNotEmpty()
  @ApiProperty({ isArray: true, type: String })
  ids: string[];
}

export class IdsNumberInput {
  @IsString({ each: true })
  @IsNotEmpty()
  @ApiProperty({ isArray: true, type: String })
  ids: string[];
}


export const IdsInput = {
  Number: IdsNumberInput,
  String: IdsStringInput
}