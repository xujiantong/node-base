import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('token')
export class TokenProcessor {
  private readonly logger = new Logger(TokenProcessor.name);

  @Process('cleanToken')
  handleCleanToken(job: Job) {
    this.logger.debug(`定时任务执行: ${job.id}-${job.name}`);
  }
}
