import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HealthChekController {
  @Get()
  healthCheck() {
    return 'Payments MS is up and running!';
  }
}
