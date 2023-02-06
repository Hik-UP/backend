/* istanbul ignore file */
import { prisma } from '../utils/prisma.util';

async function removeAllUsers(): Promise<void> {
  await prisma.user.deleteMany();
}

async function removeUser(email: string): Promise<void> {
  await prisma.user.delete({
    where: {
      email: email
    }
  });
}

async function removeAllTrails(): Promise<void> {
  await prisma.trail.deleteMany();
}

async function removeAllPOI(): Promise<void> {
  await prisma.pointOfInterest.deleteMany();
}

async function removeTrail(id: string): Promise<void> {
  await prisma.trail.delete({
    where: {
      id: id
    }
  });
}

async function setUserAdmin(email: string): Promise<void> {
  await prisma.user.update({
    where: {
      email: email
    },
    data: {
      roles: ['USER', 'ADMIN']
    }
  });
}

const dbTest = {
  removeAllUsers,
  removeUser,
  removeTrail,
  removeAllTrails,
  removeAllPOI,
  setUserAdmin
};

export { dbTest };
