import { Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Catch(WsException)
export class WsExceptionFilter extends BaseWsExceptionFilter {
  private readonly logger = new Logger(WsExceptionFilter.name);
  catch(exception: WsException, host: ArgumentsHost) {
    super.catch(exception, host);
    this.logger.error('WsExceptionFilter called');
  }
}
