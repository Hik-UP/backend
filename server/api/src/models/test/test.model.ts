/* istanbul ignore file */
import { prisma } from '../../utils/prisma.util';
import { crypto } from '../../utils/cryptography.util';

async function createSkin(): Promise<void> {
  await prisma.skin.create({
    data: {
      name: crypto.randomString(20),
      description: crypto.randomString(20),
      pictures: [crypto.randomString(20)],
      model: crypto.randomString(20)
    }
  });
}

async function removeAllSkins(): Promise<void> {
  await prisma.skin.deleteMany();
}

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
  createSkin,
  removeAllSkins,
  removeAllUsers,
  removeAllTrails,
  removeAllPOI,
  setAdmin
};

export { dbTest };
