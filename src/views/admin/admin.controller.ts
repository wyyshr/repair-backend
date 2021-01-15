import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService
  ){}

  @Post('/login')
  login(@Body() body) {
    return this.adminService.login(body)
  }

  @Post('/register')
  register(@Body() body) {
    return this.adminService.register(body)
  }

  @Get('/getUser')
  getUser(@Query() query){
    return this.adminService.getUser(query)
  }

  @Get('/addManager')
  addManager(@Query() query){
    return this.adminService.addManager(query)
  }

  @Post('/changePower')
  changePower(@Body() body){
    return this.adminService.changePower(body)
  }

  @Post('/deleteUser')
  deleteUser(@Body() body){
    return this.adminService.deleteUser(body)
  }
}
