import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UUIDInput {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}
