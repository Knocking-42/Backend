import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @ApiProperty({ example: 1, description: '유저 고유번호' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'jasong', description: '유저 이름(아이디)' })
  @Column({ type: 'varchar', length: 45, nullable: false })
  username: string;

  @ApiProperty({
    example: 'p@ssw0rd',
    description: '유저 패스워드',
  })
  @Column({ type: 'varchar', length: 100, nullable: true })
  password: string;
}
