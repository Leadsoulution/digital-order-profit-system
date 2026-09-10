/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Next.js sert les pages prerendues avec `s-maxage=31536000`, soit
        // un an de cache CDN. Hostinger applique cette consigne (hcdn) et
        // continuait donc a servir l'ancien HTML apres un deploiement —
        // HTML qui reclame des fichiers CSS/JS au nom hache supprimes par
        // le nouveau build, d'ou une page sans aucun style.
        //
        // On force la revalidation des pages a chaque requete. Les assets
        // de `/_next/static` gardent leur cache immuable : leur nom change
        // a chaque build, ils n'ont donc jamais besoin d'etre revalides.
        source: "/:path((?!_next/static).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
