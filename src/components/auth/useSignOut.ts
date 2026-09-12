"use client";

import { useState } from "react";

/**
 * Deconnexion, partagee par les deux endroits qui la proposent : la barre
 * laterale et le menu de l'en-tete. Une seule implementation, pour qu'un
 * des deux boutons ne finisse pas par diverger de l'autre.
 */
export function useSignOut() {
  const [signingOut, setSigningOut] = useState(false);

  async function signOut() {
    setSigningOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      /* Meme si l'appel echoue, on quitte l'application. */
    }
    // Navigation complete plutot qu'un changement de route cote client :
    // seule une nouvelle requete montre au serveur que les cookies de
    // session ont disparu. Et `replace` plutot que `push`, pour que le
    // bouton Precedent ne ramene pas sur une page de l'application.
    window.location.replace("/login");
  }

  return { signOut, signingOut };
}
