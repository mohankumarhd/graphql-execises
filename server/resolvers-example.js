export const resolversExample = {
  Query: {
    employees: () => employees,
    cars: () => carsData,
  },
};

const carsData = [{ color: "RED" }, { color: "GREEN" }, { color: "BLUE" }];

const employees = [
  {
    __typename: "CurrentEmployee",
    name: "Ram",
    age: 21,
    salary: 300000,
  },
  {
    __typename: "FormerEmployee",
    name: "Shaym",
    age: 26,
    salary: 600000,
    terminationDate: "2019-12-12",
  },
  {
    __typename: "CurrentEmployee",
    name: "John",
    age: 28,
    salary: 800000,
  },
  {
    __typename: "FormerEmployee",
    name: "Ravi",
    age: 30,
    salary: 1200000,
    terminationDate: "2022-12-12",
  },
];
