import { connection } from "../db/connection.js";

const { schema } = connection;

await schema.dropTableIfExists("user");
await schema.dropTableIfExists("product");
await schema.dropTableIfExists("store");

await schema.createTable("store", (table) => {
  table.text("id").notNullable().primary();
  table.text("name").notNullable();
  table.text("description");
});

await schema.createTable("product", (table) => {
  table.text("id").notNullable().primary();
  table.text("storeId").notNullable().references("id").inTable("store");
  table.text("title").notNullable();
  table.text("description");
  table.text("createdAt").notNullable();
});

await schema.createTable("user", (table) => {
  table.text("id").notNullable().primary();
  table.text("storeId").notNullable().references("id").inTable("store");
  table.text("email").notNullable().unique();
  table.text("password").notNullable();
});

await connection.table("store").insert([
  {
    id: "FjcJCHJALA4i",
    name: "Max",
    description:
      "Where fashion meets affordability, bringing style to every aisle.",
  },
  {
    id: "Gu7QW9LcnF5d",
    name: "Lifestyle",
    description:
      "Your ultimate destination for curated living, where every choice echoes your personal essence..",
  },
]);

await connection.table("product").insert([
  {
    id: "f3YzmnBZpK0o",
    storeId: "FjcJCHJALA4i",
    title: "Regular Fit Casual Shirt",
    description:
      "This Multi-colored rayon half sleeves shirts for men includes a mens casual shirt in comfortable rayon fabric.",
    createdAt: "2024-05-13T11:00:00.000Z",
  },
  {
    id: "XYZNJMXFax6n",
    storeId: "FjcJCHJALA4i",
    title: "Slim Fit Casual Shirt",
    description:
      "This Casual Checkered shirt has a Slim Collar, Full Sleeves and a curved hemline Size",
    createdAt: "2024-05-13T11:00:00.000Z",
  },
  {
    id: "6mA05AZxvS1R",
    storeId: "Gu7QW9LcnF5d",
    title: "Slim Fit Trousers",
    description: "Elevate your wardrobe with our slim-fit trousers",
    createdAt: "2024-05-13T11:00:00.000Z",
  },
]);

await connection.table("user").insert([
  {
    id: "AcMJpL7b413Z",
    storeId: "FjcJCHJALA4i",
    email: "employee.1@test.com",
    password: "test123",
  },
  {
    id: "BvBNW636Z89L",
    storeId: "Gu7QW9LcnF5d",
    email: "employee.2@test.com",
    password: "test123",
  },
]);

process.exit();
