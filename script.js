// File: script.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Script.js dimuat. Situs siap!');

    const body = document.body;
    
    // Tambahkan kelas setelah sedikit jeda untuk inisiasi transisi/animasi CSS
    setTimeout(() => {
        body.classList.add('loaded');
    }, 100); 

    // Kode JavaScript kustom dapat ditambahkan di sini.
    
function toggleKonten() {
            // Dapatkan elemen konten dan tombol berdasarkan ID
            var konten = document.getElementById("kontenLengkap");
            var tombol = document.getElementById("tombolToggle");

            // Periksa apakah konten saat ini disembunyikan
            if (konten.style.display === "none" || konten.style.display === "") {
                // Jika disembunyikan, tampilkan konten dan ubah teks tombol
                konten.style.display = "block";
                tombol.innerHTML = "Sembunyikan";
            } else {
                // Jika ditampilkan, sembunyikan konten dan ubah teks tombol kembali
                konten.style.display = "none";
                tombol.innerHTML = "Baca Selengkapnya";
            }
        }
        // PENTING: Untuk memastikan konten awalnya tersembunyi
        // Kita juga bisa menggunakan CSS untuk menyembunyikannya secara default (seperti di <style>).
        // Fungsi ini hanya akan dipanggil saat tombol diklik.
    

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB-2TAsHmukE04GySya4I_MNbIhafbNfGA",
    authDomain: "blog-fdc54.firebaseapp.com",
    projectId: "blog-fdc54",
    storageBucket: "blog-fdc54.firebasestorage.app",
    messagingSenderId: "593493999764",
    appId: "1:593493999764:web:f8e745c24a9e9c0eed3481",
    measurementId: "G-553SB1VFQK"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
    
});