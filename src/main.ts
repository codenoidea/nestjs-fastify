import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { fastifyHelmet } from 'fastify-helmet';
import { ValidationPipe } from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';
import { contentParser, MulterFile } from 'fastify-file-interceptor';
import * as os from 'os';
import * as _cluster from 'cluster';
const cluster = _cluster as unknown as _cluster.Cluster;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    },
  );
  app.register(fastifyHelmet);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  app.register(require('fastify-cors'));
  await app.register(contentParser);
  // app.enableCors(); 11

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  initializeTransactionalContext();

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0', () => {
    console.log(
      `application started listening to environment:${
        process.env.NODE_ENV || 'localhost'
      }:${port}`,
    );
  });
}


if (cluster.isPrimary) {
  console.log(
    `Master server started on ${process.pid} cpu len: ${os.cpus().length}`,
  );
  const cpuNumber = process.env.OS_CPU_NUMBER || os.cpus().length;
  for (let i = 0; i < cpuNumber; i++) {
    console.log('cluster fork :', i);
    cluster.fork();
  }
} else {
  console.log('boot strap');
  bootstrap();
}