/* istanbul ignore file */
import { prisma } from '../../utils/prisma.util';

async function removeAllUsers(): Promise<void> {
  await prisma.user.deleteMany();
}

async function removeAllTrails(): Promise<void> {
  await prisma.trail.deleteMany();
}

async function removeAllPOI(): Promise<void> {
  await prisma.pointOfInterest.deleteMany();
}

async function setAdmin(email: string): Promise<void> {
  await prisma.user.update({
    where: {
      email: email
    },
    data: {
      roles: ['ADMIN']
    }
  });
}

const dbTest = {
  removeAllUsers,
  removeAllTrails,
  removeAllPOI,
  setAdmin
};

export { dbTest };
