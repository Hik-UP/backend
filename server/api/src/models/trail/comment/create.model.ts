import { prisma } from '../../../utils/prisma.util';
import { INewTrailComment } from '../../../ts/trail.type';

async function create(newTrailComment: INewTrailComment): Promise<void> {
  await prisma.comment.create({
    data: {
      authorId: newTrailComment.authorId,
      trailId: newTrailComment.trailId,
      body: newTrailComment.body,
      pictures: newTrailComment.pictures
    }
  });
}

export { create };
