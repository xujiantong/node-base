import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import {
  MenuCreateOrPatchDto,
  MenuSortDto,
  MenuUpdateLevelDto
} from '@/modules/system/menu/dto/index.dto';
import { ApiSecurityAuth } from '@/decorators/swagger.decorator';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@Controller('sys/menu')
@UseGuards(JwtAuthGuard) // 使用JwtAuthGuard进行权限验证
@ApiBearerAuth('auth') // 添加Bearer认证
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({ summary: '新增菜单' })
  @Post()
  create(@Body() createMenuDto: MenuCreateOrPatchDto) {
    return this.menuService.create(createMenuDto);
  }
  @ApiOperation({ summary: '查询所有菜单' })
  @Get()
  findAll() {
    return this.menuService.findAll();
  }
  @ApiOperation({ summary: '查询菜单树' })
  @Get('tree')
  async findMenuTree() {
    const menus = await this.menuService.findAll();
    return this.menuService.menusToTree(menus);
  }
  @ApiOperation({ summary: '根据权限获取菜单' })
  @Get('dynamicTree')
  async findMenuDynamicTree() {
    const menus = await this.menuService.findMenuDynamic();
    return this.menuService.menusToTree(menus);
  }
  @ApiOperation({ summary: '查询单个菜单信息' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }
  @ApiOperation({ summary: '更新菜单信息' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: MenuCreateOrPatchDto) {
    return this.menuService.update(+id, updateMenuDto);
  }
  @ApiOperation({ summary: '删除菜单信息' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }

  @ApiOperation({ summary: '菜单排序' })
  @Post('sort')
  sort(@Body() menuSortDto: MenuSortDto) {
    return this.menuService.sort(menuSortDto.ids);
  }
  @ApiOperation({ summary: '更新层级' })
  @Post('updateLevel')
  updateLevel(@Body() menuUpdateLevelDto: MenuUpdateLevelDto) {
    return this.menuService.updateLevel(menuUpdateLevelDto);
  }
}
