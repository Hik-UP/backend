import { prisma } from '../../utils/prisma.util';

async function isUserInHike(
  hikeId: string,
  emailList: [string]
): Promise<boolean> {
  return (
    await prisma.hike.findMany({
      where: {
        OR: [
          {
            AND: [
              {
                id: hikeId,
                organizers: {
                  some: {
                    email: {
                      in: emailList
                    }
                  }
                }
              }
            ]
          },
          {
            AND: [
              {
                id: hikeId,
                attendees: {
                  some: {
                    email: {
                      in: emailList
                    }
                  }
                }
              }
            ]
          },
          {
            AND: [
              {
                id: hikeId,
                guests: {
                  some: {
                    email: {
                      in: emailList
                    }
                  }
                }
              }
            ]
          }
        ]
      },
      select: {
        id: true
      }
    })
  ).length === 0
    ? false
    : true;
}

export { isUserInHike };
