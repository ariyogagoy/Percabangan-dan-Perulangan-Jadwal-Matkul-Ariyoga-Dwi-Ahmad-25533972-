
const jadwalMingguan = [
  {
    hari: "Senin",
    kuliah: [
      { matkul: "Struktur Data", jam: "12.30 - 15.00", ruangan: "Ruang 304" }
    ]
  },
  {
    hari: "Selasa",
    kuliah: [
      { matkul: "Pemrograman Web", jam: "09.20 - 11.20", ruangan: "Ruang 405" },
      { matkul: "Sistem Operasi", jam: "12.30 - 15.00", ruangan: "Ruang 403" },
      { matkul: "Matematika Diskret", jam: "15.30-17.00", ruangan: "Ruang 401" }
    ]
  },
  {
    hari: "Rabu",
    kuliah: [
      { matkul: "Pemrograman Berorientasi Objek", jam: "06.50 - 09.30", ruangan: "Ruang 401" },
      { matkul: "Jaringan Komunikasi", jam: "12.30 - 15.00", ruangan: "Ruang 401" }
    ]
  },
  {
    hari: "Kamis",
    kuliah: [
      { matkul: "Sertifikasi KWU", jam: "10.00 - 12.00", ruangan: "Hibrid Class" }
    ]
  },
  { hari: "Jumat", kuliah: [] },
  { hari: "Sabtu", kuliah: [] },
  { hari: "Minggu", kuliah: [] }
];

const namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const hariIni = namaHari[new Date().getDay()];

// Element DOM
const scheduleGrid = document.getElementById("scheduleGrid");
const inputHari = document.getElementById("inputHari");
const btnCari = document.getElementById("btnCari");
const outputContainer = document.getElementById("outputContainer");
const outputResult = document.getElementById("outputResult");

function renderJadwal() {
  let html = "";

  jadwalMingguan.forEach((item) => {
    let jenisClass = "";
    let isiKuliah = "";

    if (item.kuliah.length === 0) {
      jenisClass = "libur";
      isiKuliah = `
        <div class="session">
          <div class="matkul">Libur kuliah<span class="jenis">Tidak ada kuliah</span></div>
          <div class="when"><span>-</span><span>-</span></div>
        </div>`;
    } else {
      jenisClass = "ada-kuliah";
      item.kuliah.forEach((k) => {
        isiKuliah += `
        <div class="session">
          <div class="matkul">${k.matkul}</div>
          <div class="when"><span>${k.jam}</span><span>${k.ruangan}</span></div>
        </div>`;
      });
    }

    let kelasHariIni = "";
    let tandaHariIni = "";
    if (item.hari === hariIni) {
      kelasHariIni = " is-today";
      tandaHariIni = `<span class="today-tag">Hari ini</span>`;
    }

    html += `
      <div class="row ${jenisClass}${kelasHariIni}" data-hari="${item.hari.toLowerCase()}">
        <div class="day">${item.hari}${tandaHariIni}</div>
        <div class="sessions">${isiKuliah}</div>
      </div>
    `;
  });

  scheduleGrid.innerHTML = html;
}

function sorotBaris(query) {
  const semuaBaris = scheduleGrid.querySelectorAll(".row");
  semuaBaris.forEach((baris) => {
    if (query !== "" && baris.dataset.hari === query) {
      baris.classList.add("is-found");
      baris.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } else {
      baris.classList.remove("is-found");
    }
  });
}


function cariJadwal() {
  const query = inputHari.value.trim().toLowerCase();
  outputResult.classList.remove("is-error");

  if (query === "") {
    outputResult.textContent = "Kolom pencarian masih kosong. Ketik nama hari, misalnya Senin.";
    outputResult.classList.add("is-error");
    outputContainer.classList.remove("hidden");
    sorotBaris("");
    return;
  }

  const hasil = jadwalMingguan.find((item) => item.hari.toLowerCase() === query);

  if (!hasil) {

    outputResult.textContent = `"${inputHari.value.trim()}" bukan nama hari. Tulis salah satu dari Senin sampai Minggu.`;
    outputResult.classList.add("is-error");
  } else if (hasil.kuliah.length === 0) {

    outputResult.textContent = `${hasil.hari} libur kuliah. Waktunya istirahat dan mengulang materi.`;
  } else {

    const baris = hasil.kuliah.map(
      (k, i) => `${i + 1}. ${k.matkul}, ${k.jam}, ${k.ruangan}`
    );
    outputResult.textContent = `${hasil.hari} (${hasil.kuliah.length} mata kuliah):\n` + baris.join("\n");
  }

  outputContainer.classList.remove("hidden");
  sorotBaris(query);
}


btnCari.addEventListener("click", cariJadwal);

inputHari.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    cariJadwal();
  }
});


renderJadwal();
