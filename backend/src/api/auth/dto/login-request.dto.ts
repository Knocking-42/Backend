import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'jasong' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'p@ssw0rd' })
  password: string;
}
