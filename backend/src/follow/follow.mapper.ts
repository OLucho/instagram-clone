import { Follow } from './follow.entity';

export function fromDtoToEntity(userToId: number, userFromId: number): Follow {
  const follow = new Follow();
  follow.userFromId = userFromId;
  follow.userToId = userToId;
  return follow;
}
