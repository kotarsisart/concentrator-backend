import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

/**
 * UserService handles user management operations.
 * Includes creating users with hashed passwords and fetching by email.
 */
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new user with hashed password.
   * @param dto - User data (email, password, role)
   * @returns Created user
   */
  async create(dto: CreateUserDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashed,
        role: dto.role || 'admin',
      },
    });
  }

  /**
   * Find user by email.
   * @param email - User's email
   * @returns User object or null
   */
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  /**
   * Get all users (excluding password field).
   * @returns Array of users
   */
  async findAll() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, role: true, createdAt: true },
    });
  }
}
