import FastifyCookie from '@fastify/cookie';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import FastifyMultipart from '@fastify/multipart';

const app: FastifyAdapter = new FastifyAdapter({
  trustProxy: true,
  logger: false
});

// 文件上传
app.register(FastifyMultipart as any, {
  limits: {
    fields: 10, // 最大非文件字段数
    fileSize: 1024 * 1024 * 6, // 文件大小限制 6MB
    files: 5 // 最大文件字段数
  }
});
// 支持 Cookie 解析与签名
app.register(FastifyCookie as any, {
  secret: 'cookie-secret' // 签名密钥，无鉴权作用，影响不大
});

// 请求拦截器
app.getInstance().addHook('onRequest', (request, reply, done) => {
  // 处理请求头中的 origin，如果未定义，则用 host 替代，防止后续跨域处理异常
  const { origin, authorization } = request.headers;
  if (!origin) request.headers.origin = request.headers.host;
  console.log('onRequest', request.url, request.method);

  // 拒绝访问以 .php 结尾的请求路径，返回 418 状态码和自定义提示信息
  // 表示该服务器不支持 PHP 文件
  const { url } = request;
  if (url.endsWith('.php')) {
    reply.raw.statusMessage =
      'Eh. PHP is not support on this machine. Yep, I also think PHP is bestest programming language. But for me it is beyond my reach.';

    return reply.code(418).send();
  }

  // 跳过 favicon.ico 和 manifest.json 请求，直接返回 204 无内容状态，减少不必要处理
  if (url.match(/favicon.ico$/) || url.match(/manifest.json$/))
    return reply.code(204).send();
  // 继续处理后续请求
  done();
});
export { app as fastifyApp };
