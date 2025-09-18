import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { TokenJob } from '@/shared/task/jobs/token.job';

@ApiTags('调度任务')
@Controller('sched')
export class TaskController {
  constructor(private readonly tokenJob: TokenJob) {}
  @ApiOperation({ summary: '定时清理无效token' })
  @Get('token/clean')
  async cleanToken() {
    return this.tokenJob.cleanToken();
  }
}
