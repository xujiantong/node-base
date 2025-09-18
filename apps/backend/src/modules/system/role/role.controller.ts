import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
} from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiOperation } from '@nestjs/swagger';
import {
  RoleCreateOrPatchDto,
  RoleMenuAssignDto,
  RoleQueryDto,
  RoleUserAssignDto
} from '@/modules/system/role/dto/index.dto';
import { RoleMenuService } from '@/modules/system/role/service/role-menu.service';
import { RoleUserService } from '@/modules/system/role/service/role-user.service';

@Controller('sys/role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly roleMenuService: RoleMenuService,
    private readonly roleUserService: RoleUserService
  ) {}

  @ApiOperation({ summary: '新增角色' })
  @Post()
  create(@Body() createRoleDto: RoleCreateOrPatchDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({ summary: '获取全部角色' })
  @Get()
  findAll() {
    return this.roleService.findAll();
  }
  @ApiOperation({ summary: '分页查询角色列表' })
  @Get('list')
  findAllByPage(@Query() query: RoleQueryDto) {
    return this.roleService.findPaginated(query);
  }
  @ApiOperation({ summary: '通过ID获取角色信息' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.roleService.findOne(+id);
  }
  @ApiOperation({ summary: '更新角色信息' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRoleDto: RoleCreateOrPatchDto) {
    return this.roleService.update(+id, updateRoleDto);
  }
  @ApiOperation({ summary: '删除角色' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.roleService.remove(+id);
  }
  @ApiOperation({ summary: '角色分配菜单' })
  @Post('menu/assign')
  async assignMenu(@Body() roleMenuAssignDto: RoleMenuAssignDto) {
    return this.roleMenuService.create(
      roleMenuAssignDto.roleId,
      roleMenuAssignDto.menuIds
    );
  }
  @ApiOperation({ summary: '根据角色id获取分配的菜单' })
  @Get(':roleId/menu')
  async getMenu(@Param('roleId') roleId: number) {
    return this.roleMenuService.findByRoleId(roleId);
  }
  @ApiOperation({ summary: '角色分配用户' })
  @Post('user/assign')
  async assignUser(@Body() roleUserAssignDto: RoleUserAssignDto) {
    return this.roleUserService.create(
      roleUserAssignDto.roleId,
      roleUserAssignDto.userIds
    );
  }
  @ApiOperation({ summary: '根据角色id获取分配的用户' })
  @Get(':roleId/user')
  async getUser(@Param('roleId') roleId: number) {
    return this.roleUserService.findByRoleId(roleId);
  }
}
