import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { AddMessageDto } from './dtos/messages.dtos';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get()
  async listMessages() {
    const messages = await this.messagesService.listMessages();
    if (!messages) {
      throw new NotFoundException('Messages was not found');
    }
    return messages;
  }

  @Post()
  async addMessage(@Body() body: AddMessageDto) {
    const message = await this.messagesService.addMessage(body);
    if (!message) {
      throw new NotFoundException('Message was not created');
    }
    return message;
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesService.getMessage(id);
    if (!message) {
      throw new NotFoundException('Message was not found');
    }
    return message;
  }
}
