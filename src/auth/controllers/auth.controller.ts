import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { LocalAuthGuard } from '../guard/local-auth.guard';

@UseGuards(LocalAuthGuard)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}
  
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginDto: LoginDto
  ): Promise<any> {
    return await this.authService.login(loginDto);
  }
}
