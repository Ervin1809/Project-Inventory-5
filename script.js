let admin = {
    "admin@gmail.com": "admin123"
}
let user = {
    "ervin@gmail.com": "ervin123",
    "nanci@gmail.com": "nanci123"
}

function capitalizeFirstLetter(string) {
    if (string.length === 0) return string; // Jika string kosong, kembalikan string kosong
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// MENAMBAHKAN ITEM
function addItem() {
    const isiTable = document.getElementById("isiTable")
    const namaItem = document.getElementById("namaItem")
    const srcItem = document.getElementById("srcItem")
    const jumlahItem = document.getElementById("jumlahItem")

    // Mengecek isi dari inputan
    if (namaItem.value.trim() === "" ||
        !srcItem.files || srcItem.files.length === 0 ||
        jumlahItem.value.trim() === "" || jumlahItem.value < 0 ||
        isNaN(jumlahItem.value)) {
        alert("Data Error!! Cek Data Yang Anda Masukkan");
        return;
    }

    // Menambahkan Isi Table beserta data-datanya
    const newItem = document.createElement("tr");
    newItem.style.height = "3.5rem"

    const tdNama = document.createElement("td")
    tdNama.textContent = namaItem.value

    const tdImage = document.createElement("td")

    const img = document.createElement("img")
    img.src = URL.createObjectURL(srcItem.files[0]);
    img.alt = namaItem.value
    img.style.width = "40px"
    img.classList.add("rounded")
    tdImage.appendChild(img);


    const tdJumlahItem = document.createElement("td")
    tdJumlahItem.textContent = jumlahItem.value + " pcs"

    const tdStatus = document.createElement("td")
    if (parseInt(jumlahItem.value) > 0) {
        tdStatus.textContent = "Tersedia"
    } else {
        tdStatus.textContent = "Tidak Tersedia"
    }


    newItem.appendChild(tdNama)
    newItem.appendChild(tdImage)
    newItem.appendChild(tdStatus)
    newItem.appendChild(tdJumlahItem)

    isiTable.appendChild(newItem)

    namaItem.value = '';
    srcItem.value = '';
    jumlahItem.value = '';
}


// EDIT ITEM
function editItem() {
    const namaItem = capitalizeFirstLetter(document.getElementById("namaItemEdit").value).trim(); // Ambil nilai dari input nama item dan trim
    const jumlahItem = parseInt(document.getElementById("jumlahItemEdit").value); // Ambil nilai dari input jumlah item
    const srcItem = document.getElementById("srcItemEdit");

    let itemFound = false;

    const rows = document.getElementById("isiTable").getElementsByTagName('tr'); // Pastikan isiTable didefinisikan
    for (let i = 0; i < rows.length; i++) {
        const tdNama = rows[i].getElementsByTagName("td")[0]; // Kolom pertama (nama item)
        if (capitalizeFirstLetter(tdNama.textContent.trim()) === namaItem) { // Bandingkan nama item
            itemFound = true;
            const hasil = rows[i].getElementsByTagName("td")[3]; // Kolom keempat (jumlah item)
            const hasilSrcItem = rows[i].getElementsByTagName("td")[1].getElementsByTagName("img")[0]; // Kolom keempat (jumlah item)
            const tdJumlah = hasil.textContent.split(" "); // Ambil isi dari kolom keempat
            const jumlah = parseInt(tdJumlah[0]); // Ambil jumlah dari string


            if (srcItem != "") {
                const newSrc = URL.createObjectURL(srcItem.files[0]); // Buat URL sementara dari file yang diunggah
                hasilSrcItem.src = newSrc; // Update src dari img
            }

            if (!isNaN(jumlahItem)) {
                const sisaItem = jumlah + jumlahItem;
                hasil.textContent = sisaItem + " pcs"; // Update jumlah item di tabel
                alert('Berhasil Mengedit item');
                if (sisaItem === 0) {
                    const status = rows[i].getElementsByTagName("td")[2];
                    status.textContent = "Tidak Tersedia";
                } else if (sisaItem >= 1) {
                    const status = rows[i].getElementsByTagName("td")[2];
                    status.textContent = "Tersedia";
                }
                break; // Keluar dari loop jika item ditemukan
            } else {
                alert("Jumlah Item Yang Di Edit Tidak Boleh Mines")
            }

        }
    }
    if (!itemFound) {
        alert("Tidak Ada Item!! Periksa nama item dengan baik"); // Pesan jika item tidak ditemukan
    }

    document.getElementById("namaItemEdit").value = '';
    srcItem.value = '';
    document.getElementById("jumlahItemEdit").value = '';
}


// KEMBALIKAN ITEM

function returnItem() {
    const namaItem = capitalizeFirstLetter(document.getElementById("namaItemReturn").value).trim(); // Ambil nilai dari input nama item dan trim
    const jumlahItem = parseInt(document.getElementById("jumlahItemReturn").value); // Ambil nilai dari input jumlah item

    let itemFound = false;

    const rows = document.getElementById("isiTable").getElementsByTagName('tr'); // Pastikan isiTable didefinisikan
    for (let i = 0; i < rows.length; i++) {
        const tdNama = rows[i].getElementsByTagName("td")[0]; // Kolom pertama (nama item)
        if (capitalizeFirstLetter(tdNama.textContent.trim()) === namaItem) { // Bandingkan nama item
            itemFound = true;
            const hasil = rows[i].getElementsByTagName("td")[3]; // Kolom keempat (jumlah item)
            const tdJumlah = hasil.textContent.split(" "); // Ambil isi dari kolom keempat
            const jumlah = parseInt(tdJumlah[0]); // Ambil jumlah dari string

            if (!isNaN(jumlahItem)) {
                const sisaItem = jumlah + jumlahItem;
                hasil.textContent = sisaItem + " pcs"; // Update jumlah item di tabel
                alert('Berhasil Mengembalikan item');
                if (sisaItem === 0) {
                    const status = rows[i].getElementsByTagName("td")[2];
                    status.textContent = "Tidak Tersedia";
                } else if (sisaItem >= 1) {
                    const status = rows[i].getElementsByTagName("td")[2];
                    status.textContent = "Tersedia";
                }
                break; // Keluar dari loop jika item ditemukan
            } else {
                alert("Jumlah Item Yang Di Kembalikan Tidak Boleh Mines")
            }

        }
    }
    if (!itemFound) {
        alert("Tidak Ada Item!! Periksa nama item dengan baik"); // Pesan jika item tidak ditemukan
    }
    document.getElementById("namaItemReturn").value = '';
    document.getElementById("jumlahItemReturn").value = '';
}


// CARI ITEM
function searchTable() {
    const searchItem = document.getElementById("searchItem");
    const filter = searchItem.value.toLowerCase();
    const rows = isiTable.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        const tdNamaSearch = rows[i].getElementsByTagName("td")[0]; // Kolom pertama (Nama Item)
        if (tdNamaSearch) {
            const txtValue = tdNamaSearch.textContent || tdNamaSearch.innerText;
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                rows[i].style.display = ""; // Tampilkan baris
            } else {
                rows[i].style.display = "none"; // Sembunyikan baris
            }
        }
    }
}




// PINJAM ITEM
function pinjamItem() {
    const namaItem = capitalizeFirstLetter(document.getElementById("namaItem").value).trim(); // Ambil nilai dari input nama item dan trim
    const jumlahItem = parseInt(document.getElementById("jumlahItem").value); // Ambil nilai dari input jumlah item

    let itemFound = false;

    const rows = document.getElementById("isiTable").getElementsByTagName('tr'); // Pastikan isiTable didefinisikan
    const rowsPeminjam = document.getElementById("isiTablePeminjam");

    for (let i = 0; i < rows.length; i++) {
        const tdNama = rows[i].getElementsByTagName("td")[0]; // Kolom pertama (nama item)
        if (capitalizeFirstLetter(tdNama.textContent.trim()) === namaItem) { // Bandingkan nama item
            itemFound = true;
            const hasil = rows[i].getElementsByTagName("td")[3]; // Kolom keempat (jumlah item)
            const tdJumlah = hasil.textContent.split(" "); // Ambil isi dari kolom keempat
            const jumlah = parseInt(tdJumlah[0]); // Ambil jumlah dari string

            if (jumlahItem >= 1) {
                const sisaItem = jumlah - jumlahItem;

                if (jumlah === 0) {
                    alert("Pemimjaman gagal, Tidak ada item tersedia!!");
                } else if (jumlahItem > jumlah) {
                    alert(`Peminjaman gagal, hanya ${jumlah} item tersedia`)
                } else {
                    hasil.textContent = sisaItem + " pcs"; // Update jumlah item di tabel
                    alert('Berhasil meminjam item');
                    kirimPesan(namaItem, jumlahItem)

                    if (sisaItem === 0) {
                        const status = rows[i].getElementsByTagName("td")[2];
                        status.textContent = "Tidak Tersedia";
                    }

                }
                break; // Keluar dari loop jika item ditemukan
            } else {
                alert("Jumlah Item Tidak Boleh Mines")
            }

        }
    }
    if (!itemFound) {
        alert("Tidak Ada Item!! Periksa nama item dengan baik"); // Pesan jika item tidak ditemukan
    }
}

// LOG OUT
function logout() {
    localStorage.removeItem("session");
    window.location.href = "loginScene.html";
}
document.getElementById("out").addEventListener("click", logout);



// DASHBOARD SECTION
function showDashboard(dashboard) {
    document.getElementById("dashboardBorrowing").style.display = "none";
    document.getElementById("dashboardItems").style.display = "none";
    document.getElementById("dashboard" + dashboard).style.display = "block";
}


// LAPORAN KE KETUA
function kirimPesan(nama, jumlah) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))

    const message = `${currentUser.name} Meminjam : %0A-Item : ${nama}%0A-Jumlah : ${jumlah} pcs`;

    const whatsappLink = `https://wa.me/6282293589748?text=${message}`;

    window.open(whatsappLink, '_blank');
}















