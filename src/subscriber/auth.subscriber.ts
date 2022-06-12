
import { hash } from 'bcrypt';
import { UserEntity } from 'src/crud/user/user.entity';

import {
    DataSource,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    UpdateEvent,
  } from 'typeorm';

  
  @EventSubscriber()
  export class AuthSubscriber implements EntitySubscriberInterface<UserEntity> {
    constructor(dataSource: DataSource) {
      dataSource.subscribers.push(this);
    }
  
    listenTo() {
      return UserEntity;
    }
  
    async beforeInsert(event: InsertEvent<UserEntity>) {
        if(!event.entity.password) return;
        event.entity.password = await hash(event.entity.password, 10);
    }

    async beforeUpdate(event: UpdateEvent<UserEntity>){
        if(!event.entity.password) return;
        event.entity.password = await hash(event.entity.password, 10);
    }
  }