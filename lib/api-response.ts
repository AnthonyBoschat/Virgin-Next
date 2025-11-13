// lib/api-response.ts

import { NextResponse } from "next/server"

/**
 * Helper pour les réponses API
 * Gère automatiquement les status HTTP courants
 */
export const ApiResponse = {
  // Succès (200)
  success: (data: any) => {
    return NextResponse.json(data)
  },

  // Créé (201)
  created: (data: any) => {
    return NextResponse.json(data, { status: 201 })
  },

  // Erreur client (400)
  badRequest: (message = "Bad request") => {
    return NextResponse.json({ error: message }, { status: 400 })
  },

  // Non autorisé (401)
  unauthorized: (message = "Unauthorized") => {
    return NextResponse.json({ error: message }, { status: 401 })
  },

  // Interdit (403)
  forbidden: (message = "Forbidden") => {
    return NextResponse.json({ error: message }, { status: 403 })
  },

  // Non trouvé (404)
  notFound: (message = "Not found") => {
    return NextResponse.json({ error: message }, { status: 404 })
  },

  // Conflit (409)
  conflict: (message = "Conflict") => {
    return NextResponse.json({ error: message }, { status: 409 })
  },

  // Erreur serveur (500)
  serverError: (message = "Server error") => {
    return NextResponse.json({ error: message }, { status: 500 })
  },

  // Custom
  custom: (data: any, status: number) => {
    return NextResponse.json(data, { status })
  }
}