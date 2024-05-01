"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ContactSchema = z.object({
  name: z.string().min(3),
  phone: z.string().min(10),
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
        name: validatedField.data.name,
        phone: validatedField.data.phone,
      },
    });
  } catch (error) {
    return { message: "Failed to create contact" };
  }
  revalidatePath("/contacts");
  redirect("/contacts");
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
        name: validatedField.data.name,
        phone: validatedField.data.phone,
      },
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to update contact" };
  }
  revalidatePath("/contacts");
  redirect("/contacts");
};
