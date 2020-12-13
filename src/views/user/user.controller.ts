import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ){}

  @Post('/login')
  login(@Body() body){
    return this.userService.login(body)
  }

  @Get('/fillInfo')
  fillInfo(@Query() query){
    return this.userService.fillInfo(query)
  }

  @Get('/getUserInfo')
  getUserInfo(@Query() query){
    return this.userService.getUserInfo(query)
  }
}
