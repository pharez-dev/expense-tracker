// seed.js
const { PrismaClient } = require("@prisma/client");
const fs = require("fs").promises;

const prisma = new PrismaClient();

async function seed() {
  try {
    // Read expense data from JSON file
    const expenses = JSON.parse(await fs.readFile("expenses.json", "utf-8"));

    // Seed the database
    for (const expense of expenses) {
      await prisma.expenseCategory.create({
        data: {
          category: expense.category,
          subCategory: expense.subCategory,
        },
      });
      console.log(
        `Expense category "${expense.category} - ${expense.subCategory}" seeded.`
      );
    }

    console.log("Database seeding completed.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
