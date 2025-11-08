import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CounterService {
  constructor(private readonly prisma: PrismaService) {}

  async getValue(): Promise<number> {
    const counter = await this.prisma.counter.findUnique({
      where: { key: 'hero_focus' },
    });

    if (!counter) {
      const created = await this.prisma.counter.create({
        data: { key: 'hero_focus', value: 12000 },
      });
      return created.value;
    }

    return counter.value;
  }

  async increment(): Promise<number> {
    const updated = await this.prisma.counter.update({
      where: { key: 'hero_focus' },
      data: { value: { increment: 1 } },
    });
    return updated.value;
  }
}
