import { Module } from '@nestjs/common';
import { LogController } from '@/modules/system/log/log.controller';
import { LogService } from '@/modules/system/log/log.service';
const provider = [LogService];
@Module({
  // 用来引入其他模块
  // 如果当前模块需要使用其他模块提供的服务（provider），必须在这里导入
  // 我要用别人的东西。
  imports: [],
  // 定义该模块的控制器。
  // 控制器负责处理传入的请求并返回响应，主要是路由层的逻辑。
  // 我提供路由接口。
  controllers: [LogController],
  // 定义该模块中的服务（业务逻辑层）、仓库、自定义工具类等。
  // 可以通过依赖注入（DI）在控制器或其他 provider 中使用。
  // 我自己有哪些“服务/逻辑”。
  providers: [...provider],
  // 决定哪些 provider 可以被其他模块使用。
  // 只有在 exports 中声明的 provider，才能被 imports 本模块的其他模块访问。
  // 愿意把哪些服务分享出去给别人用。
  exports: [...provider]
})
export class LogModule {}
