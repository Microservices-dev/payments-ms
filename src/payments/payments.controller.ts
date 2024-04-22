import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentSessionDto } from './dtos/payment-session.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-session-payment')
  createPaymentSession(@Body() body: PaymentSessionDto) {
    return this.paymentsService.creatPaymentSession(body);
  }

  @Get('success')
  success() {
    return {
      ok: true,
      message: 'Payment successful',
    };
  }

  @Get('cancel')
  cancel() {
    return {
      ok: true,
      message: 'Payment Cenceled',
    };
  }

  @Post('hook')
  stripeHook() {
    return {
      ok: true,
      message: 'Payment Hook',
    };
  }
}
