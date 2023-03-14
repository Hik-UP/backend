/* istanbul ignore file */
import { prisma } from '../utils/prisma.util';
import { vars } from './vars.test';

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

async function createDefaultSkin(): Promise<void> {
  await prisma.skin.create({
    data: {
      name: vars.defaultSkin.name,
      description: vars.defaultSkin.description,
      pictures: vars.defaultSkin.pictures,
      model: vars.defaultSkin.model
    }
  });

  const skins = await prisma.skin.findMany({
    select: {
      id: true
    }
  });

  vars.defaultSkin.id = skins[skins.length - 1].id;
}

async function removeAllPOI(): Promise<void> {
  await prisma.pointOfInterest.deleteMany();
}

async function removeAllHikes(): Promise<void> {
  await prisma.hike.deleteMany();
}

async function removeAllTrails(): Promise<void> {
  await prisma.trail.deleteMany();
}

async function removeAllUsers(): Promise<void> {
  await prisma.user.deleteMany();
}

async function removeAllSkins(): Promise<void> {
  await prisma.skin.deleteMany();
}

const db = {
  setAdmin,
  createDefaultSkin,
  removeAllPOI,
  removeAllHikes,
  removeAllTrails,
  removeAllUsers,
  removeAllSkins
};

export { db };