import type { Prisma, User } from "../../../../../generated/prisma/client";
import type { UsersRepositoryPort } from "../ports/users-repository";
import { prisma } from "~/utils/db.server";

/**
 * Saves a user to the database.
 *
 * @param user The user to save.
 * @returns The saved user.
 */
export async function saveUserToDatabase(user: Prisma.UserCreateInput) {
  return prisma.user.create({ data: user });
}

/**
 * Retrieves a user by its id.
 *
 * @param id The id of the user.
 * @returns The user or null.
 */
export async function retrieveUserFromDatabaseById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

/**
 * Retrieves a user by their email address.
 *
 * @param email The email of the user.
 * @returns The user or null.
 */
export async function retrieveUserFromDatabaseByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

/**
 * Retrieves a user by their Clerk ID.
 *
 * @param clerkId The Clerk-issued user ID.
 * @returns The user or null.
 */
export async function retrieveUserFromDatabaseByClerkId(
  clerkId: NonNullable<User["clerkId"]>,
) {
  return prisma.user.findUnique({ where: { clerkId } });
}

/**
 * Updates a user in the database by their Clerk ID.
 *
 * @param clerkId The Clerk-issued user ID.
 * @param data The fields to update.
 * @returns The updated user.
 */
export async function updateUserInDatabaseByClerkId(
  clerkId: NonNullable<User["clerkId"]>,
  data: Pick<Prisma.UserUpdateInput, "email" | "name">,
) {
  return prisma.user.update({ data, where: { clerkId } });
}

export const usersRepositoryAdapter: UsersRepositoryPort = {
  retrieveByClerkId: retrieveUserFromDatabaseByClerkId,
  retrieveByEmail: retrieveUserFromDatabaseByEmail,
  retrieveById: retrieveUserFromDatabaseById,
  save: saveUserToDatabase,
  updateByClerkId: updateUserInDatabaseByClerkId,
};
