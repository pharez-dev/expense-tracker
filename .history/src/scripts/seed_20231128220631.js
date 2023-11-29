// seed.js

const fs = require("fs").promises;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  try {
    // Read expense data from JSON file
    const expenses = JSON.parse([
      { category: "Income", subCategory: "Salary" },
      { category: "Income", subCategory: "Bonus" },
      { category: "Income", subCategory: "Freelance income" },
      { category: "Income", subCategory: "Side gig income" },
      { category: "Fixed Expenses", subCategory: "Rent or mortgage" },
      { category: "Fixed Expenses", subCategory: "Utilities (electricity)" },
      { category: "Fixed Expenses", subCategory: "Utilities (water)" },
      { category: "Fixed Expenses", subCategory: "Utilities (gas)" },
      { category: "Fixed Expenses", subCategory: "Insurance (health)" },
      { category: "Fixed Expenses", subCategory: "Insurance (car)" },
      { category: "Fixed Expenses", subCategory: "Insurance (home)" },
      {
        category: "Fixed Expenses",
        subCategory: "Loan payments (student loans)",
      },
      { category: "Fixed Expenses", subCategory: "Loan payments (car loans)" },
      { category: "Variable Expenses", subCategory: "Groceries" },
      { category: "Variable Expenses", subCategory: "Dining out" },
      { category: "Variable Expenses", subCategory: "Transportation (fuel)" },
      {
        category: "Variable Expenses",
        subCategory: "Transportation (public transport)",
      },
      { category: "Variable Expenses", subCategory: "Entertainment (movies)" },
      {
        category: "Variable Expenses",
        subCategory: "Entertainment (concerts)",
      },
      { category: "Variable Expenses", subCategory: "Shopping (clothing)" },
      { category: "Variable Expenses", subCategory: "Shopping (electronics)" },
      { category: "Savings", subCategory: "Emergency fund" },
      { category: "Savings", subCategory: "Retirement savings" },
      { category: "Savings", subCategory: "General savings" },
      { category: "Investments", subCategory: "Stocks" },
      { category: "Investments", subCategory: "Bonds" },
      { category: "Investments", subCategory: "Mutual funds" },
      { category: "Investments", subCategory: "Real estate" },
      { category: "Debt Repayment", subCategory: "Credit card payments" },
      { category: "Debt Repayment", subCategory: "Loan repayments" },
      { category: "Health", subCategory: "Health insurance premiums" },
      { category: "Health", subCategory: "Medical expenses" },
      { category: "Health", subCategory: "Fitness expenses" },
      { category: "Education", subCategory: "Tuition fees" },
      { category: "Education", subCategory: "Books and supplies" },
      { category: "Personal Care", subCategory: "Haircuts" },
      { category: "Personal Care", subCategory: "Toiletries" },
      { category: "Personal Care", subCategory: "Beauty products" },
      { category: "Miscellaneous", subCategory: "Gifts" },
      { category: "Miscellaneous", subCategory: "Donations" },
      { category: "Miscellaneous", subCategory: "Pet expenses" },
    ]);

    // Seed the database
    for (const expense of expenses) {
      const existingSubcategory = await prisma.expenseCategory.findUnique({
        where: {
          subCategory: expense.subCategory,
        },
      });

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
