import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export namespace IdInput{
  export class Number {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({type: 'number'})
    id: number;
  }
  
  export class String {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    id: string;
  }
}
