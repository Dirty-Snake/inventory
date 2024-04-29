import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { ItemsInfoModule } from './items-info/items-info.module';
import { ItemsLocationModule } from './items-locations/items-locations.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import postgres from './config/postgres';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ItemsBrandsModule } from './items-brands/items-brands.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(postgres()),
    ItemsModule,
    ItemsInfoModule,
    ItemsLocationModule,
    UsersModule,
    AuthModule,
    ItemsBrandsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
