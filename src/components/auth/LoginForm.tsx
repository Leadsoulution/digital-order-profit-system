"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { AlertCircle, Eye, EyeOff, Loader2, Lock, LogIn, Mail } from "lucide-react";

/** Amplitude du basculement de la carte sous la souris, en degres. */
const TILT = 7;

export default function LoginForm() {
  const searchParams = useSearchParams();
  const cardRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    // -0.5 a 0.5 depuis le centre de la carte.
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * TILT * 2, y: px * TILT * 2 });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Connexion impossible.");
        setPending(false);
        return;
      }
      // Navigation complete plutot que `router.replace` : les cookies de
      // session viennent d'etre poses par la reponse, et seule une
      // nouvelle requete au serveur les lui presente. Un changement de
      // route cote client repartirait du rendu deja en memoire, et le
      // proxy renverrait encore vers /login.
      //
      // `pending` reste vrai jusqu'au chargement de la page suivante :
      // le bouton ne doit pas redevenir cliquable entre-temps.
      window.location.assign(searchParams.get("suite") ?? "/");
    } catch {
      setError("Impossible de joindre le serveur.");
      setPending(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B1120] px-4 py-10">
      {/* Decor : halos colores flous et grille discrete. */}
      <div
        aria-hidden
        className="auth-aurora pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-blue-600/25 blur-[120px]"
      />
      <div
        aria-hidden
        style={{ animationDelay: "-6s" }}
        className="auth-aurora pointer-events-none absolute -bottom-48 -right-32 h-[560px] w-[560px] rounded-full bg-sky-400/20 blur-[130px]"
      />
      <div
        aria-hidden
        style={{ animationDelay: "-12s" }}
        className="auth-aurora pointer-events-none absolute left-1/2 top-1/3 h-[380px] w-[380px] rounded-full bg-indigo-500/15 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] [background-size:56px_56px]"
      />

      <div
        className="relative w-full max-w-4xl [perspective:1600px]"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      >
        {/*
          Deux elements imbriques, et non un seul : une animation CSS prend
          le pas sur le style en ligne tant qu'elle est appliquee (ici avec
          `both`). L'entree animee reste donc dehors, le basculement suivi
          a la souris est porte par l'element interieur.
        */}
        <div className="auth-card [transform-style:preserve-3d]">
        <div
          ref={cardRef}
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: "transform 260ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          className="grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_40px_120px_-20px_rgba(2,8,23,0.9)] backdrop-blur-xl [transform-style:preserve-3d] md:grid-cols-[1fr_1.05fr]"
        >
          {/* Panneau de marque */}
          <div className="relative hidden flex-col justify-between overflow-hidden border-r border-white/10 bg-gradient-to-br from-[#0f1e3d] via-[#0B1120] to-[#0d2a52] p-9 md:flex">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/35 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl"
            />
            <div
              className="auth-logo-float relative"
              style={{ transform: "translateZ(60px)" }}
            >
              <Image
                src="/logo-orderly.png"
                alt="Orderly - Gestion des commandes"
                width={720}
                height={168}
                priority
                className="h-11 w-auto drop-shadow-[0_10px_30px_rgba(2,8,23,0.55)]"
              />
            </div>
            <div className="relative" style={{ transform: "translateZ(40px)" }}>
              <h2 className="text-[26px] font-semibold leading-tight text-white">
                Vos commandes,
                <br />
                de bout en bout.
              </h2>
              <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-slate-400">
                Confirmation, expedition ForceLog, suivi de livraison et
                encaissement, dans un seul tableau de bord.
              </p>
            </div>
          </div>

          {/* Formulaire */}
          <div
            className="relative p-7 sm:p-9"
            style={{ transform: "translateZ(30px)" }}
          >
            <div className="auth-rise mb-7 md:hidden">
              <Image
                src="/logo-orderly.png"
                alt="Orderly - Gestion des commandes"
                width={720}
                height={168}
                priority
                className="h-9 w-auto"
              />
            </div>

            <div className="auth-rise" style={{ animationDelay: "120ms" }}>
              <h1 className="text-[22px] font-semibold text-white">
                Content de vous revoir
              </h1>
              <p className="mt-1.5 text-[13px] text-slate-400">
                Connectez-vous pour acceder a votre espace.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div className="auth-rise" style={{ animationDelay: "200ms" }}>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-[12.5px] font-medium text-slate-300"
                >
                  Adresse email
                </label>
                <div className="group relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-blue-400" />
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vous@exemple.com"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-3.5 text-[13.5px] text-white placeholder:text-slate-500 transition-all focus:border-blue-400/60 focus:bg-white/[0.07] focus:shadow-[0_0_0_4px_rgba(59,130,246,0.14)] focus:outline-none"
                  />
                </div>
              </div>

              <div className="auth-rise" style={{ animationDelay: "280ms" }}>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-[12.5px] font-medium text-slate-300"
                >
                  Mot de passe
                </label>
                <div className="group relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-blue-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Votre mot de passe"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-11 text-[13.5px] text-white placeholder:text-slate-500 transition-all focus:border-blue-400/60 focus:bg-white/[0.07] focus:shadow-[0_0_0_4px_rgba(59,130,246,0.14)] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword
                        ? "Masquer le mot de passe"
                        : "Afficher le mot de passe"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 transition-colors hover:text-slate-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p
                  role="alert"
                  className="flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3.5 py-2.5 text-[12.5px] text-red-300"
                >
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={pending}
                style={{ animationDelay: "360ms" }}
                className="auth-rise flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 py-3 text-[13.5px] font-semibold text-white shadow-[0_12px_30px_-8px_rgba(37,99,235,0.75)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-10px_rgba(37,99,235,0.9)] active:translate-y-0 active:shadow-[0_6px_16px_-8px_rgba(37,99,235,0.9)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {pending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Connexion...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    Se connecter
                  </>
                )}
              </button>
            </form>

            <p
              className="auth-rise mt-6 text-center text-[12px] text-slate-500"
              style={{ animationDelay: "440ms" }}
            >
              Pas encore de compte ? Demandez-en un a votre administrateur.
            </p>
          </div>
        </div>
        </div>
      </div>
    </main>
  );
}
