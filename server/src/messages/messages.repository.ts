import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesRepository {
  async listMessages() {
    //list of messages
    return null;
  }

  async addMessage(messageData) {
    //add new message
    return messageData;
  }

  async getMessage(id: string) {
    //get message by id
    return id;
  }
}
