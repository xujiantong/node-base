import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req
} from '@nestjs/common';
import { UserService } from './user.service';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto, UserPatchDto } from '@/modules/system/user/dto/user.dto';
import { ApiResult } from '@/decorators/swagger.decorator';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { PageSearchDto } from '@/common/dto/request';
import { PageDto } from '@/common/dto/response';

@ApiTags('用户管理')
@Controller('sys/user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('auth') // 添加Bearer认证
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '创建用户' })
  @Post()
  create(@Body() createUserDto: UserDto) {
    return this.userService.create(createUserDto);
  }
  @ApiOperation({ summary: '查询所有用户' })
  @Get()
  @ApiResult(UserDto)
  findAll() {
    return this.userService.findAll();
  }
  @ApiOperation({ summary: '分页查询用户' })
  @Get('list')
  @ApiResult(PageDto)
  findPage(@Query() pageSearchDto: PageSearchDto) {
    return this.userService.findPage(pageSearchDto);
  }
  @ApiOperation({ summary: '根据ID查找用户' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @ApiOperation({ summary: '更新用户' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UserPatchDto) {
    return this.userService.update(+id, updateUserDto);
  }
  @ApiOperation({ summary: '删除用户' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
  @ApiOperation({ summary: '获取当前登录信息' })
  @Get('profile')
  async profile(@Req() request: Request) {
    const userId = request['user'].id;
    return this.userService.findOne(userId);
  }
}
