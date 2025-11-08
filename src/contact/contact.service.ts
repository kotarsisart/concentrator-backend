import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  private BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  private CHAT_ID = process.env.TELEGRAM_CHAT_ID; // твой личный ID или ID группы

  async submitForm(data: { name: string; email?: string; message: string }) {
    // 1️⃣ Сохраняем в БД
    const saved = await this.prisma.contactMessage.create({ data });

    // 2️⃣ Отправляем в Telegram
    if (this.BOT_TOKEN && this.CHAT_ID) {
      const text =
        `📬 Новое сообщение:\n\n` +
        `👤 Имя: ${data.name}\n` +
        (data.email ? `✉️ Email: ${data.email}\n` : '') +
        `💬 Сообщение:\n${data.message}`;
      await axios.post(
        `https://api.telegram.org/bot${this.BOT_TOKEN}/sendMessage`,
        {
          chat_id: this.CHAT_ID,
          text,
          parse_mode: 'HTML',
        },
      );
    }

    // 3️⃣ Возвращаем успех
    return saved;
  }
}
