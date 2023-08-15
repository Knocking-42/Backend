import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'jasong', description: '유저 로그인 ID' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'p@ssw0rd', description: '유저 비밀번호' })
  password: string;
}
