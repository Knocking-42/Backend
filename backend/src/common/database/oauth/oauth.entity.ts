import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../user';
import { OauthType } from './oauth.type';

@Entity('oauth')
export class OauthEntity {
  @ApiProperty({ example: '1', description: '유저 고유번호' })
  @PrimaryColumn()
  userId: number;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @ApiProperty({ example: '80000', description: 'Oauth ID' })
  @Column({ type: 'varchar', length: 30, nullable: false })
  oauthId: string;

  @ApiProperty({ example: 'GOOGLE', description: 'Oauth 타입' })
  @Column({ type: 'enum', enum: OauthType, nullable: false })
  type: OauthType;
}
