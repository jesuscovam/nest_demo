import {TypeOrmModuleOptions} from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 58755,
    username: 'postgres',
    password: 'agosto2018',
    database: 'taskmanagement',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
}