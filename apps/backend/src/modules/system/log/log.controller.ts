import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { LogService } from '@/modules/system/log/log.service';
import { PageSearchDto } from '@/common/dto/request';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('操作日志管理')
@Controller('sys/log')
@UseGuards(JwtAuthGuard) // 使用JwtAuthGuard进行权限验证
@ApiBearerAuth('auth') // 添加Bearer认证
export class LogController {
  constructor(private logService: LogService) {}
  @ApiOperation({ summary: '查询操作日志' })
  @Get('page')
  page(@Query() query: PageSearchDto) {
    return this.logService.page(query);
  }
  @ApiOperation({ summary: '恢复操作' })
  @Get('recover')
  recover() {}
  @ApiOperation({ summary: '查询单条日志详情' })
  @Get(':id')
  findOne() {}
}
