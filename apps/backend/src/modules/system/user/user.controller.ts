import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { UserService } from './user.service';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from '@/modules/system/user/dto/user.dto';
import { ApiResult } from '@/decorators/swagger.decorator';

@ApiTags('用户管理')
@Controller('sys/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '创建用户' })
  @Post()
  create(@Body() createUserDto: UserDto) {
    return this.userService.create(createUserDto);
  }
  @Get()
  @ApiResult(UserDto)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
