import { Module, HttpModule } from '@nestjs/common';
import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';

@Module({
  controllers: [CryptoController],
  imports: [HttpModule],
  providers: [CryptoService],
  exports: [CryptoService],
})
export class CryptoModule {}
