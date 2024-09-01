import { PrismaClient } from "@prisma/client/extension";

export const prismaClient=new PrismaClient()
//whenever we create a schema , we need to migrate the db and migrate the client