import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../common/database/user/user.entity';
import { LogisProfileDto } from '../dto/register-response.dto';
import { RegisterRequestDto } from '../dto/user-register-request.dto';

@Injectable()
export class RegisterUserService {
  private readonly logger: Logger = new Logger(RegisterUserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  //TODO: 로직 변경 및 DTO 수정
  async create(
    registerRequestDto: RegisterRequestDto,
  ): Promise<LogisProfileDto> {
    const dupUser = await this.userRepository.findOne({
      where: { user: registerRequestDto.user },
    });
    if (dupUser) {
      this.logger.verbose(`dupUser : ${dupUser}`);
      throw new BadRequestException(
        `User ID ${registerRequestDto.username} is already used`,
      );
    }
    const user: UserEntity = await this.userRepository.save({
      username: registerRequestDto.username,
    });
    return {
      id: user.id,
      username: user.username,
    };
  }
}
