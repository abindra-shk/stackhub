import { Controller, Get } from '@nestjs/common';

@Controller('contacts')
export class ContactsController {
  @Get()
  findAll() {
    return [
      { id: 1, name: 'Prasidha Karki' },
      { id: 2, name: 'Sagar Adhikari' },
      { id: 3, name: 'Prabin Acharya' },
    ];
  }
}
