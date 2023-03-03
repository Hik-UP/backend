import { prisma } from '../../../utils/prisma.util';

async function isUserInPOI(
  poiId: string,
  emailList: [string]
): Promise<boolean> {
  return (
    await prisma.pointOfInterest.findMany({
      where: {
        OR: [
          {
            AND: [
              {
                id: poiId,
                creator: {
                  email: {
                    in: emailList
                  }
                }
              }
            ]
          },
          {
            AND: [
              {
                id: poiId,
                sharedWith: {
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

export { isUserInPOI };
