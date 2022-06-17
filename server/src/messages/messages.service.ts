import { MessagesRepository } from './messages.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  constructor(private messagesRepository: MessagesRepository) {}

  async listMessages() {
    return await this.messagesRepository.listMessages();
  }

  async addMessage(messageData) {
    return await this.messagesRepository.addMessage(messageData);
  }

  async getMessage(id: string) {
    return await this.messagesRepository.getMessage(id);
  }
}
