import { ApiProperty } from '@nestjs/swagger';

export class LogisProfileDto {
  @ApiProperty({ example: '1', description: '유저 고유 번호' })
  id: number;

  @ApiProperty({ example: 'jasong', description: '유저 로그인 ID' })
  username: string;
}
