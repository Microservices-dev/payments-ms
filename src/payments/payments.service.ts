import { Inject, Injectable, Logger } from '@nestjs/common';
import { envs, NATS_SERVICE } from 'src/config';
import Stripe from 'stripe';
import { PaymentSessionDto } from './dtos/payment-session.dto';
import { Request, Response } from 'express';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(envs.stripeSecret);
  private readonly logger = new Logger(PaymentsService.name);

  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}
  async creatPaymentSession(paymentSessionDto: PaymentSessionDto) {
    const { currency, items, orderId } = paymentSessionDto;
    const lineItems = items.map((item) => {
      return {
        price_data: {
          currency: currency,
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(+item.price * 100),
        },
        quantity: item.quantity,
      };
    }) as any;
    const session = await this.stripe.checkout.sessions.create({
      payment_intent_data: {
        metadata: { orderId },
      },
      mode: 'payment',
      line_items: [...lineItems],
      success_url: envs.stripeUrlSuccess,
      cancel_url: envs.stripeUrlCancel,
    });
    return {
      id: session.id,
      cancelUrl: session.cancel_url,
      successUrl: session.success_url,
      url: session.url,
    };
  }

  async stripeWebhook(req: Request, res: Response) {
    const sign = req.headers['stripe-signature'];
    let event;

    //const endpointSecret ='whsec_de8fbd5444679a8690647410a247f264babd8c6e3d509ef5042f33ed388026e1';
    const endpointSecret = envs.stripeEndpointSecret;
    try {
      event = this.stripe.webhooks.constructEvent(
        req['rawBody'],
        sign,
        endpointSecret,
      );
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    switch (event.type) {
      case 'charge.succeeded':
        const chargeSucceded = event.data.object;
        const paylod = {
          stripePaymentId: chargeSucceded.id,
          orderId: chargeSucceded.metadata.orderId,
          receiptUrl: chargeSucceded.receipt_url,
        };
        this.client.emit('payment.succeeded', paylod);
        break;
      default:
        this.logger.log(`Unhandled event type ${event.type}`);
    }
    return res.status(200).json({ sign });
  }
}
