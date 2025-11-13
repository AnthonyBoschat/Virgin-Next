'use server'

import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function updateProfile(name: string) {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error("Non autorisé")
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { name }
  })

  return { success: true, user: updatedUser }
}