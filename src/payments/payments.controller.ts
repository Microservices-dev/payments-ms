import { Controller, Get, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-session-payment')
  createPaymentSession() {
    return 'payment session created';
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
