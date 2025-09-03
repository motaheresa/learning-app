import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs'; // Correct import for bcryptjs

const prisma = new PrismaClient();

async function main() {
  try {
    const hashedPassword = await bcryptjs.hash('123456', 10); // Use bcryptjs, not bcrypt
    
    const user = await prisma.user.upsert({
      where: { email: 'test@test.com' },
      update: {
        password: hashedPassword,
        name: 'Test User',
        role: 'STUDENT',
      },
      create: {
        email: 'test@test.com',
        password: hashedPassword,
        name: 'Test User',
        role: 'STUDENT',
        // classId: 1, // Uncomment and set if linking to a Class
      },
    });

    console.log('User created or updated:', user);
  } catch (error) {
    console.error('Error creating/updating user:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();