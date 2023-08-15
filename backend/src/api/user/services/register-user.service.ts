import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pwEncryption } from 'common/utils/encrypt';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../common/database/entities/user.entity';
import { LogisProfileDto } from '../dto/register-response.dto';
import { RegisterRequestDto } from '../dto/user-register-request.dto';

@Injectable()
export class RegisterUserService {
  private readonly logger: Logger = new Logger(RegisterUserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(
    //TODO: return에 user 정보 들어가도 될지 확인하기
    registerRequestDto: RegisterRequestDto,
  ): Promise<LogisProfileDto> {
    const dupUser = await this.userRepository.findOne({
      where: { username: registerRequestDto.username },
    });
    if (dupUser) {
      this.logger.verbose(`dupUser : ${dupUser}`);
      throw new BadRequestException(
        `User ID ${registerRequestDto.username} is already used`,
      );
    }
    const user: UserEntity = await this.userRepository.save({
      username: registerRequestDto.username,
      password: pwEncryption(registerRequestDto.password),
    });
    return {
      id: user.id,
      username: user.username,
    };
  }
}
