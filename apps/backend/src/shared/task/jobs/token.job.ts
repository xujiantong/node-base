import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { BizException } from '@/shared/exception';
import { Errors } from '@/shared/exception/exception.const';
import { Cron, Interval } from '@nestjs/schedule';
@Injectable()
export class TokenJob {
  private readonly logger = new Logger(TokenJob.name);

  constructor(@InjectQueue('token') private tokenQueue: Queue) {}

  @Cron('0 52 * * * *')
  async cleanToken() {
    try {
      const job = await this.tokenQueue.add('cleanToken', { data: null });
      this.logger.debug(`定时任务启动:  ${job.id}-${job.name}`);
    } catch (e) {
      throw new BizException(Errors.CREATE_TASK_ERROR);
    }
  }
}
