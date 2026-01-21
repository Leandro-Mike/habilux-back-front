require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const email = 'sergioleandroramirez97@gmail.com';
    const password = '003584Fyl#.#';

    console.log(`Creating admin user: ${email}...`);

    try {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Check if exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            console.log('User already exists. Updating to ADMIN...');
            await prisma.user.update({
                where: { email },
                data: {
                    password: hashedPassword, // Update password just in case
                    role: 'ADMIN',
                    status: 'APPROVED'
                }
            });
            console.log('User updated successfully.');
        } else {
            console.log('Creating new user...');
            // Create user
            await prisma.user.create({
                data: {
                    name: 'Leandro',
                    lastName: 'Ramirez',
                    email,
                    password: hashedPassword,
                    role: 'ADMIN',
                    status: 'APPROVED'
                }
            });
            console.log('Admin user created successfully.');
        }
    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
