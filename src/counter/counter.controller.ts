import { Controller, Get, Post } from '@nestjs/common';
import { CounterService } from './counter.service';

@Controller('counter')
export class CounterController {
  constructor(private readonly counterService: CounterService) {}

  @Get()
  async getCounter(): Promise<{ value: number }> {
    const value = await this.counterService.getValue();
    return { value };
  }

  @Post('increment')
  async increment(): Promise<{ value: number }> {
    const value = await this.counterService.increment();
    return { value };
  }
}
