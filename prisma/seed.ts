import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// Initialize Prisma Client
const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function seedUsers() {
  const userData = [
    {
      name: 'Sabin Adams',
      email: 'sabin@adams.com',
      password: 'password-sabin',
    },
    {
      name: 'Alex Ruheni',
      email: 'alex@ruheni.com',
      password: 'password-alex',
    },
  ];

  const hashedUserData = await Promise.all(
    userData.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, roundsOfHashing),
    })),
  );

  return Promise.all(
    hashedUserData.map((user) =>
      prisma.user.upsert({
        where: { email: user.email },
        update: { password: user.password },
        create: user,
      }),
    ),
  );
}

async function seedArticles() {
  const articlesData = [
    {
      title: 'Prisma Adds Support for MongoDB',
      description:
        "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
      content:
        'Support for MongoDB has been one of the most requested features since the initial release of...',
      published: false,
      publishedAt: null,
      school: { connect: { id: 1 } },
      user: { connect: { id: 1 } },
    },
    {
      title: "What's new in Prisma? (Q1/22)",
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
      content:
        'Our engineers have been working hard, issuing new releases with many improvements...',
      published: true,
      publishedAt: new Date(),
      school: { connect: { id: 2 } },
      user: { connect: { id: 2 } },
    },
    {
      title: 'Prisma Client Just Became a Lot More Flexible',
      description:
        'This article will explore various ways you can use Prisma Client extensions to add custom functionality to Prisma Client.',
      content:
        'Prisma Client extensions provide a powerful new way to add functionality to Prisma in a type-safe manner...',
      published: true,
      publishedAt: new Date(),
    },
  ];

  return Promise.all(
    articlesData.map((articleData) =>
      prisma.article.upsert({
        where: { title: articleData.title },
        update: {},
        create: {
          ...articleData,
          school: { connect: { id: 1 } },
          user: { connect: { id: 1 } },
        },
      }),
    ),
  );
}

async function seedDatabase() {
  await seedUsers();
  await seedArticles();
}

async function main() {
  try {
    await seedDatabase();
    console.log('Seed completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
