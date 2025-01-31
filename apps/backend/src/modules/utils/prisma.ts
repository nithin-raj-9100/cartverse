import { PrismaClient, User } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ["query", "info", "warn"],
});

// async function crudOperations(): Promise<void> {
//   // create, read, update, delete
//   const createUser = async () => {
//     const user = await prisma.user.create({
//       data: {
//         email: "email@email.com",
//         name: "name",
//         password: "password",
//       },
//     });

//     console.log("user created", user);
//     return user;
//   };

//   const readUser = async () => {
//     const user = await prisma.user.findMany({});
//     console.log("users are ", user);
//   };

//   const updateUser = async (user: User) => {
//     const updatedUser = await prisma.user.update({
//       where: {
//         email: "email@email.com",
//       },
//       data: {
//         email: "new@new.com",
//         name: "new_name",
//         password: "new_password",
//       },
//     });
//     console.log("before update", user);
//     console.log("after upadte", updatedUser);
//     return updatedUser;
//   };

//   const deleteUser = async (user: User) => {
//     const deletedUser = await prisma.user.delete({
//       where: {
//         email: "new@new.com",
//       },
//     });
//     console.log("deleted user is ", deletedUser);
//   };

//   const user = await createUser();
//   await readUser();
//   const updatedUser = await updateUser(user);
//   // await deleteUser(updatedUser);
// }

// crudOperations()
//   .catch((e) => {
//     throw e;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

export default prisma;
