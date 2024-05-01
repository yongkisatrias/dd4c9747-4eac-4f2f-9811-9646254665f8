"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import validator from "validator";

const ContactSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().min(5).refine(validator.isEmail),
  phone: z.string().min(10).refine(validator.isMobilePhone),
});

export const saveContact = async (prevState: any, formData: FormData) => {
  const validatedField = ContactSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validatedField.success) {
    return {
      Error: validatedField.error.flatten().fieldErrors,
    };
  }
  try {
    await prisma.contact.create({
      data: {
        firstName: validatedField.data.firstName,
        lastName: validatedField.data.lastName,
        email: validatedField.data.email,
        phone: validatedField.data.phone,
      },
    });
  } catch (error) {
    return { message: "Failed to create contact" };
  }
  revalidatePath("/");
  redirect("/");
};

export const updateContact = async (
  id: string,
  prevState: any,
  formData: FormData
) => {
  const validatedField = ContactSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validatedField.success) {
    return {
      Error: validatedField.error.flatten().fieldErrors,
    };
  }
  try {
    await prisma.contact.update({
      data: {
        firstName: validatedField.data.firstName,
        lastName: validatedField.data.lastName,
        email: validatedField.data.email,
        phone: validatedField.data.phone,
      },
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to update contact" };
  }
  revalidatePath("/");
  redirect("/");
};

export const deleteContact = async (id: string) => {
  try {
    await prisma.contact.delete({
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to delete contact" };
  }
  revalidatePath("/");
};
