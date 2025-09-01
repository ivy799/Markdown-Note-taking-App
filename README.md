# Markdown Note-taking App

Aplikasi ini adalah backend sederhana untuk mencatat menggunakan format Markdown. Setiap catatan dapat dicek tata bahasa dan gaya penulisannya, serta disimpan dalam bentuk HTML. Cocok untuk kebutuhan pencatatan yang rapi dan terstruktur.

## Cara Menggunakan

1. **Instalasi Dependensi**
   ```
   npm install
   ```

2. **Menjalankan Server**
   ```
   npm run dev
   ```
   Server akan berjalan di `http://localhost:5000`.

3. **Endpoint API**
   - `POST /api/markdown/check`  
     Upload file markdown untuk pengecekan grammar/style dan konversi ke HTML.
   - `POST /api/markdown/save`  
     Kirim markdown melalui body untuk menyimpan catatan.
   - `GET /api/markdown/`  
     Ambil daftar semua catatan yang sudah disimpan.

##