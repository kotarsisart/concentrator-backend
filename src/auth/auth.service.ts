import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

/**
 * AuthService handles authentication and token generation.
 * Uses UserService for validation and JwtService for signing tokens.
 */
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validate user credentials.
   * Throws UnauthorizedException if email not found or password mismatch.
   * @param email - User's email
   * @param password - Plain text password
   * @returns User object if valid
   */
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

    return user;
  }

  /**
   * Authenticate user and return a signed JWT token.
   * Token payload contains userId, email, and role.
   * @param email - User's email
   * @param password - Plain text password
   * @returns Object with access_token
   */
  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = { sub: user.id, email: user.email, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }
}
