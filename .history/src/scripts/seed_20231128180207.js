// seed.js

const fs = require("fs").promises;

async function seed() {
  try {
    // Read expense data from JSON file
    const expenses = JSON.parse(await fs.readFile("categories.json", "utf-8"));

    // Seed the database
    for (const expense of expenses) {
      const existingSubcategory = await prisma.expenseCategory.findO;

      if (!existingSubcategory) {
        await prisma.expenseCategory.create({
          data: {
            category: expense.category,
            subCategory: expense.subCategory,
          },
        });
        console.log(
          `Expense category "${expense.category} - ${expense.subCategory}" seeded.`
        );
      } else {
        console.log(
          `Expense category "${expense.category} - ${expense.subCategory}" already exists.`
        );
      }
    }

    console.log("Database seeding completed.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
