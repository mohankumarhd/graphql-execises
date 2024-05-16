import { connection } from "../db/connection.js";

const { schema } = connection;

await schema.dropTableIfExists("user");
await schema.dropTableIfExists("product");
await schema.dropTableIfExists("store");
await schema.dropTableIfExists("customer");
await schema.dropTableIfExists("policy");

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

await schema.createTable("policy", (table) => {
  table.text("id").notNullable().primary();
  table.text("name").notNullable();
  table.text("startDate");
  table.text("endDate");
  table.text("renewalDate");
});

await schema.createTable("customer", (table) => {
  table.text("customerId").notNullable().primary();
  table.text("name").notNullable();
  table.text("email").notNullable();
  table.text("phoneNumber");
  table.text("policyId").notNullable().references("id").inTable("policy");
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

await connection.table("policy").insert([
  {
    id: "P245865",
    name: "Standard Health Insurance",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    renewalDate: "2023-12-15",
  },
  {
    id: "P654321",
    name: "Comprehensive Auto Insurance",
    startDate: "2023-03-01",
    endDate: "2024-02-29",
    renewalDate: "2024-02-15",
  },
  {
    id: "P789012",
    name: "Travel Insurance Plan",
    startDate: "2023-11-01",
    endDate: " 2024-10-31",
    renewalDate: "2024-10-15",
  },
  {
    id: "P445566",
    name: "Premium Life Insurance",
    startDate: "2023-05-15",
    endDate: "2024-05-14",
    renewalDate: "2024-05-01",
  },
  {
    id: "P112233",
    name: "Basic Homeowners Insurance",
    startDate: "2022-07-01",
    endDate: "2023-06-30",
    renewalDate: " 2023-06-15",
  },
]);

await connection.table("customer").insert([
  {
    customerId: "C10001",
    name: "John Smith",
    email: " john.smith@example.com",
    phoneNumber: "(555) 123-4567",
    policyId: "P245865",
  },
  {
    customerId: "C10002",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phoneNumber: "(555) 234-5678",
    policyId: "P654321",
  },
  {
    customerId: "C10003",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    phoneNumber: "(555) 345-6789",
    policyId: "P112233",
  },
  {
    customerId: "C10004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phoneNumber: "(555) 234-5678",
    policyId: "P445566",
  },
  {
    customerId: "C10005",
    name: "Robert Brown",
    email: "robert.brown@example.com",
    phoneNumber: "(555) 567-8901",
    policyId: "P789012",
  },
]);

process.exit();
