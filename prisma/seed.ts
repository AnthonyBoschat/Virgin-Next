import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('virgin', 10);

  await prisma.user.upsert({
    where: { email: 'AnthonyBoschat.dev@hotmail.com' },
    update: {},
    create: {
      email: 'AnthonyBoschat.dev@hotmail.com',
      password: hashedPassword,
      name: 'Anthony',
    },
  });
  
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());