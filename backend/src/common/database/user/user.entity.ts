import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserAuthType } from './user.auth.type';

@Entity('user')
export class UserEntity {
  @ApiProperty({ example: 1, description: '유저 고유번호' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '차영훈', description: '유저 이름' })
  @Column({ type: 'varchar', length: 15, nullable: false })
  name: string;

  @ApiProperty({ example: 'skyrich2000@gmail.com', description: '유저 이메일' })
  @Column({ type: 'varchar', length: 30, nullable: false })
  email: string;

  @ApiProperty({ example: 'GOOGLE', description: '유저 로그인 방식' })
  @Column({ type: 'enum', enum: UserAuthType.GOOGLE, nullable: false })
  authType: UserAuthType;
}
