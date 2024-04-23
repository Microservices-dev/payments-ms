import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentSessionDto } from './dtos/payment-session.dto';
import { Request, Response } from 'express';

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
  async stripeHook(@Req() req: Request, @Res() res: Response) {
    const sign = await this.paymentsService.stripeWebhook(req, res);
    return {
      ok: true,
      message: 'Payment Hook',
      sign,
    };
  }
}
