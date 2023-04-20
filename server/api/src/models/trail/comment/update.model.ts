import { prisma } from '../../../utils/prisma.util';
import { IUpdateTrailComment } from '../../../ts/trail.type';

async function update(
  userId: string,
  comment: IUpdateTrailComment
): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      trailComments: {
        update: {
          where: {
            id: comment.id
          },
          data: {
            body: comment.body,
            pictures: comment.pictures
          }
        }
      }
    }
  });
}

export { update };
