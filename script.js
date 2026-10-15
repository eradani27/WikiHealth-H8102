/* ==========================================================================
   1. STRUKTUR DATA: ARRAY OF OBJECTS
   - Menggunakan tipe data Array untuk menampung banyak data artikel.
   - Setiap artikel di dalam array berbentuk Object yang memiliki properti
     terstruktur (id, title, category, summary, image, content).
   ========================================================================== */
let daftarArtikel = [
    {
        id: 1,
        title: "Jantung Manusia",
        category: "Kesehatan Umum",
        summary: "Jantung adalah organ berotot yang memompa darah ke paru-paru dan seluruh tubuh untuk mengedarkan oksigen serta zat gizi.",
        image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=800&q=80",
        content: `1. Pengertian\n\nJantung adalah organ berotot yang terletak di rongga dada, di antara kedua paru-paru. Jantung bekerja sebagai pompa yang mengalirkan darah melalui sistem peredaran darah manusia.`
    },
    {
        id: 2,
        title: "Gizi Seimbang",
        category: "Nutrisi",
        summary: "Gizi seimbang adalah susunan makanan sehari-hari yang mengandung zat gizi sesuai kebutuhan tubuh untuk mendukung pertumbuhan dan menjaga kesehatan.",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
        content: `1. Pengertian\n\nGizi seimbang adalah susunan pangan sehari-hari yang mengandung jenis dan jumlah zat gizi sesuai kebutuhan tubuh.`
    },
    {
        id: 3,
        title: "Pentingnya Tidur yang Cukup",
        category: "Gaya Hidup",
        summary: "Tidur merupakan kebutuhan biologis yang berperan dalam pemulihan tubuh, fungsi otak, pengaturan emosi, dan pemeliharaan kesehatan secara keseluruhan.",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
        content: `1. Pengertian\n\nTidur adalah kondisi istirahat alami ketika kesadaran terhadap lingkungan berkurang.`
    },
    {
        id: 4,
        title: "Menjaga Kesehatan Mental",
        category: "Kesehatan Mental",
        summary: "Kesehatan mental mencakup kesejahteraan emosional, psikologis, dan sosial yang memengaruhi cara seseorang berpikir, merasakan, serta menjalani aktivitas sehari-hari.",
        image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=800&q=80",
        content: `1. Pengertian\n\nKesehatan mental merupakan bagian penting dari kesehatan secara keseluruhan.`
    }
];

// Variabel Global untuk menyimpan State (Kondisi Aktif Aplikasi)
let kategoriAktif = "Semua";
let idArtikelPilihan = 0;


/* ==========================================================================
   2. DOM SELECTION (PENGAMBILAN ELEMEN HTML)
   - Menggunakan method 'document.getElementById' untuk menghubungkan elemen 
     yang ada di file HTML (`index.html`) ke dalam JavaScript agar bisa dikontrol.
   ========================================================================== */
let elemenDaftarArtikel = document.getElementById("articleList");
let inputPencarian = document.getElementById("searchInput");
let tombolCari = document.getElementById("searchButton");
let pesanKosong = document.getElementById("emptyMessage");

let sectionDetail = document.getElementById("detailSection");
let judulDetail = document.getElementById("detailTitle");
let kategoriDetail = document.getElementById("detailCategory");
let ringkasanDetail = document.getElementById("detailSummary");
let kontenDetail = document.getElementById("detailContent");

let sectionForm = document.getElementById("formSection");
let formArtikel = document.getElementById("articleForm");
let inputIdArtikel = document.getElementById("articleId");
let inputJudul = document.getElementById("title");
let pilihanKategori = document.getElementById("category");
let inputGambar = document.getElementById("image"); // Input untuk Link/URL Gambar
let inputRingkasan = document.getElementById("summary");
let inputKonten = document.getElementById("content");
let judulForm = document.getElementById("formTitle");

let tombolBukaForm = document.getElementById("showFormButton");
let tombolBatal = document.getElementById("cancelButton");
let tombolKembali = document.getElementById("backButton");
let tombolEdit = document.getElementById("editButton");
let tombolHapus = document.getElementById("deleteButton");


/* ==========================================================================
   3. MODULAR FUNCTION & DOM MANIPULATION (RENDER ARTIKEL)
   - Fungsi 'renderArtikel' bertugas menampilkan data dari array ke halaman web.
   - TEKNIK: 
     * Looping menggunakan 'for' standar untuk menelusuri array satu per satu.
     * Conditional (If-Else) untuk menyaring kategori dan kata kunci pencarian.
     * DOM Manipulation menggunakan 'document.createElement' dan 'appendChild' 
       untuk merakit elemen HTML baru secara dinamis.
   ========================================================================== */
function renderArtikel() {
    // Mengosongkan kontainer terlebih dahulu agar tidak terjadi penumpukan data
    elemenDaftarArtikel.innerHTML = "";

    let kataKunci = inputPencarian.value.toLowerCase();
    let jumlahDitemukan = 0;

    // LOOPING: Menggunakan perulangan 'for' untuk membaca isi array 'daftarArtikel'
    for (let i = 0; i < daftarArtikel.length; i++) {
        let artikel = daftarArtikel[i];
        let judulLower = artikel.title.toLowerCase();
        let ringkasanLower = artikel.summary.toLowerCase();

        // CONDITIONAL (IF): Pengkondisian untuk filter kategori dan pencarian teks
        let cocokKategori = (kategoriAktif === "Semua" || artikel.category === kategoriAktif);
        let cocokKataKunci = (judulLower.includes(kataKunci) || ringkasanLower.includes(kataKunci));

        if (cocokKategori && cocokKataKunci) {
            // DOM MANIPULASI: Membuat elemen HTML baru secara dinamis dari JavaScript
            let itemArtikel = document.createElement("div");
            itemArtikel.className = "article-item";

            // Jika properti gambar ada, buat elemen tag <img>
            if (artikel.image) {
                let gambarArtikel = document.createElement("img");
                gambarArtikel.className = "article-image";
                gambarArtikel.src = artikel.image;
                gambarArtikel.alt = artikel.title;
                itemArtikel.appendChild(gambarArtikel);
            }

            let judulTag = document.createElement("h3");
            let tautanJudul = document.createElement("a");

            tautanJudul.href = "#detailSection";
            tautanJudul.className = "article-link";
            tautanJudul.textContent = artikel.title;

            // EVENT LISTENER: Menangkap aksi klik pada judul artikel untuk membuka halaman detail
            tautanJudul.addEventListener("click", function (event) {
                event.preventDefault(); // Mencegah perilaku bawaan link HTML
                bacaArtikel(artikel.id);
            });

            judulTag.appendChild(tautanJudul);

            let kategoriTag = document.createElement("span");
            kategoriTag.className = "article-category";
            kategoriTag.textContent = artikel.category;

            let ringkasanTag = document.createElement("p");
            ringkasanTag.textContent = artikel.summary;

            // Merakit elemen anak ke dalam kartu artikel
            itemArtikel.appendChild(judulTag);
            itemArtikel.appendChild(kategoriTag);
            itemArtikel.appendChild(ringkasanTag);

            // Memasukkan kartu artikel yang sudah jadi ke dalam kontainer utama di HTML
            elemenDaftarArtikel.appendChild(itemArtikel);
            jumlahDitemukan++;
        }
    }

    // Mengatur visibilitas pesan kosong menggunakan atribut 'hidden'
    pesanKosong.hidden = (jumlahDitemukan !== 0);
}


/* ==========================================================================
   4. MODULAR FUNCTION (BACA DETAIL ARTIKEL)
   - Fungsi ini mencari data spesifik berdasarkan ID saat judul diklik,
     lalu memindahkan tampilan layar ke bagian detail artikel.
   ========================================================================== */
function bacaArtikel(id) {
    // Looping untuk mencocokkan ID parameter dengan ID data di dalam array
    for (let i = 0; i < daftarArtikel.length; i++) {
        if (daftarArtikel[i].id === id) {
            idArtikelPilihan = id; // Menyimpan ID artikel aktif

            // Memasukkan data artikel ke elemen HTML detail
            judulDetail.textContent = daftarArtikel[i].title;
            kategoriDetail.textContent = daftarArtikel[i].category;
            ringkasanDetail.textContent = daftarArtikel[i].summary;

            kontenDetail.innerHTML = "";

            if (daftarArtikel[i].image) {
                let gambarDetail = document.createElement("img");
                gambarDetail.className = "detail-image";
                gambarDetail.src = daftarArtikel[i].image;
                gambarDetail.alt = daftarArtikel[i].title;
                kontenDetail.appendChild(gambarDetail);
            }

            let teksKonten = document.createElement("div");
            teksKonten.className = "article-text";
            teksKonten.textContent = daftarArtikel[i].content;
            kontenDetail.appendChild(teksKonten);

            // Mengubah state tampilan (Sembunyikan form, tampilkan section detail)
            sectionDetail.hidden = false;
            sectionForm.hidden = true;
            sectionDetail.scrollIntoView(); // Animasi gulir otomatis ke bagian detail
            return;
        }
    }
}