# Handoff Note — Frontend Starter Kit

Catatan untuk AI/developer berikutnya. Berisi kondisi terkini, keputusan penting,
kendala lingkungan, dan daftar pekerjaan berikutnya.

> Konteks: ini **starter frontend** untuk dipakai ulang di proyek freelance,
> dipasangkan dengan backend **Express Modular Skeleton** (auth access/refresh
> token + role sederhana). Netral domain, modular.

---

## 1. Stack & Arsitektur

- **Next.js 15 (App Router) + React 18**, JavaScript (bukan TypeScript)
- **Tailwind CSS v3** (PostCSS), bukan v4
- **TanStack Query** (server state), **Zustand** (auth state, persist localStorage)
- **axios** dengan interceptor (attach access token + auto-refresh 401)
- **React Hook Form + Zod** (form & validasi)
- **sonner** (toast)
- Style SPA client-side: hampir semua halaman `'use client'`, konsumsi REST API.
  TIDAK memakai Server Components untuk fetch / Server Functions.

Struktur: lihat README (section Project Structure). Ringkas:
`src/app` (routing App Router: route group `(auth)` & `(app)`),
`src/components/{ui,guards}`, `src/features/{auth,posts}`, `src/lib`.

---

## 2. KENAPA NEXT.JS, BUKAN VITE (penting dipahami)

Awalnya starter ini dibuat dengan **Vite**, tapi `npm install`/build GAGAL di
mesin dev karena **group policy memblokir eksekusi file `.exe`** dari dalam
`node_modules`. Vite perlu men-*spawn* `esbuild.exe` (proses terpisah) -> kena
blokir (`spawnSync ...esbuild.exe`, errno -4094 UNKNOWN).

Next.js memakai native addon `@next/swc-*.node` yang **di-load** ke proses Node
(bukan di-*spawn* sebagai `.exe`), sehingga LOLOS policy. Itu sebabnya proyek
Next (mis. MDW-UI) bisa `npm install` di mesin yang sama, sedangkan Vite tidak.

Kesimpulan: di mesin ini, hindari tooling yang menjalankan `.exe` dari
`node_modules`. Next.js aman. Jangan kembali ke Vite kecuali group policy
dilonggarkan.

---

## 3. STATUS VERIFIKASI — PENTING

- `npm install` SUKSES, `npm run build` SUKSES (ada `.next/BUILD_ID`).
- Halaman `/login` sudah dikonfirmasi tampil oleh user.
- **BELUM dites end-to-end dengan backend hidup.** Alur login/register/CRUD/
  refresh/logout belum pernah dijalankan melawan API asli. Ini risiko yang
  belum tertutup.

---

## 4. Koneksi ke Backend

- Env: `NEXT_PUBLIC_API_URL` (default `http://localhost:3000`) di `.env.local`.
- Backend & Next sama-sama default port 3000 -> jalankan Next di port lain:
  `npm run dev -- -p 3001`.
- Response backend berformat `{ success, message, data }`; service frontend
  mengambil `res.data.data`.
- Login balikin `{ accessToken, refreshToken, user }`. Interceptor auto-refresh
  memanggil `POST /users/refresh` saat 401.
- Untuk login sebagai admin: jalankan seeder di backend (`npm run seed:admin`).
  Register lewat UI selalu menghasilkan role `user`.

---

## 5. TODO Berurutan Prioritas

### P0 — sebelum dipakai di proyek klien
1. **Tes end-to-end dengan backend hidup.** Nyalakan Express + PostgreSQL,
   seed admin, lalu uji: register -> login -> dashboard -> Posts CRUD ->
   refresh token -> logout -> cek guard admin (/users). Perbaiki bug yang muncul.

### P1 — sangat dianjurkan
2. **Jaga Next tetap pada versi patch keamanan.** Saat ini `15.1.11`
   (mengatasi CVE-2025-66478 RCE, CVE-2025-55184/67779 DoS, CVE-2025-55183
   source exposure). Cek advisory berkala; upgrade ke patch terbaru di line 15.1.x
   bila ada.
3. **Loading state global** saat hydrate auth store (hindari flicker guard).
4. **Halaman edit Post** (saat ini hanya list/create/delete; update sudah ada di
   hook `useUpdatePost` tapi belum ada UI-nya).

### P2 — kualitas & DX
5. **Testing** (Vitest/Jest + Testing Library): auth flow & 1 fitur CRUD.
6. **Dark mode** (opsional) via class strategy Tailwind.
7. **Tangani token di httpOnly cookie** (ganti localStorage) untuk keamanan XSS
   lebih baik — butuh penyesuaian backend.
8. **Error page per-segment** & empty states yang lebih baik.

### P3 — opsional
9. Pertimbangkan TypeScript (migrasi besar). Kalau TS, Zod sudah sinkron.
10. i18n, Storybook untuk UI primitif.

---

## 6. Jebakan / Catatan Teknis

- **Terminal PowerShell di mesin ini** menampilkan output berantakan (echo
  per-karakter) dan sering exit code 1 pada sintaks shell tertentu. Verifikasi
  isi output, jangan hanya andalkan exit code shell.
- `npm install` di sini bisa lama (download besar). Jalankan sebagai background
  process dan pantau; jangan asumsikan gagal hanya karena belum selesai.
- Guard auth (`AuthGuard`/`RoleGuard`) berjalan di CLIENT setelah mount (token di
  localStorage tak tersedia di server). Ada state "checked/allowed" untuk
  menghindari mismatch hydration. Jangan ubah jadi pengecekan saat render awal.
- Alias `@` -> `src` diatur di `jsconfig.json`.

---

## 7. Prinsip yang Dijaga

- Tetap **netral domain**: `Post` adalah modul CONTOH (blueprint CRUD).
  Copy-rename untuk resource nyata, lalu hapus. Jangan tambah halaman/domain
  spesifik sebagai bawaan.
- Jaga konsistensi: service -> React Query hooks -> form (RHF+Zod) -> page.
- Setiap perubahan: minimal pastikan `npm run build` sukses. Sebutkan eksplisit
  apa yang belum terverifikasi (mis. alur end-to-end).
