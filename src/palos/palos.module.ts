import { Module } from '@nestjs/common';
import { PalosController } from './palos.controller';
import { PalosService } from './palos.service';

@Module({
  controllers: [PalosController],
  providers: [PalosService]
})
export class PalosModule {}
