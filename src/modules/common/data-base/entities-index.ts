import * as UserEntities from '../users/user.entity';
import * as TaskEntities from '../../task/entities/task.entity';


export const entities = {
  ...UserEntities,
  ...TaskEntities,
};