import prisma from "@/lib/prisma";

async function getEmployee() {
  "use server";

  const employee = await prisma.v2_employee.findMany();

  return employee;
}

export default async function Test() {
  const employee = await getEmployee();
  return (
    <div>
      <h1>Employee :</h1>
      {employee.map((employee) => (
        <div key={employee.id}>
          <h2>{employee.prenom}</h2>
          <h2>{employee.nom}</h2>
        </div>
      ))}
    </div>
  );
}
