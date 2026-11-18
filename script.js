// Data awal PC Warnet (12 Unit)
const defaultPCs = [
    { id: 'PC-01', zone: 'Reguler', status: 'available' },
    { id: 'PC-02', zone: 'Reguler', status: 'occupied' },
    { id: 'PC-03', zone: 'Reguler', status: 'occupied' },
    { id: 'PC-04', zone: 'Reguler', status: 'available' },
    { id: 'PC-05', zone: 'Reguler', status: 'available' },
    { id: 'PC-06', zone: 'Reguler', status: 'booked' },
    { id: 'PC-07', zone: 'Reguler', status: 'available' },
    { id: 'PC-08', zone: 'Reguler', status: 'occupied' },
    { id: 'PC-09', zone: 'VIP', status: 'available' },
    { id: 'PC-10', zone: 'VIP', status: 'occupied' },
    { id: 'PC-11', zone: 'VIP', status: 'available' },
    { id: 'PC-12', zone: 'VIP', status: 'available' }
];

// Ambil data dari LocalStorage atau gunakan data default
let pcs = JSON.parse(localStorage.getItem('warnet_pcs')) || defaultPCs;
let bookings = JSON.parse(localStorage.getItem('warnet_bookings')) || [
    { nama: 'Rizky_Gaming', pc: 'PC-06', jam: '19:00', durasi: 3 }
];

const pcGrid = document.getElementById('pcGrid');
const pilihPC = document.getElementById('pilihPC');
const activeBookings = document.getElementById('activeBookings');
const bookingForm = document.getElementById('bookingForm');

// Render Tampilan Grid PC dan Dropdown Form
function renderPCs() {
    pcGrid.innerHTML = '';
    pilihPC.innerHTML = '<option value="">-- Pilih PC Kosong --</option>';

    pcs.forEach((pc, index) => {
        // Buat kotak indikator PC
        const box = document.createElement('div');
        box.className = `pc-box ${pc.status}`;
        
        let statusLabel = 'Kosong';
        if (pc.status === 'occupied') statusLabel = 'Terpakai';
        if (pc.status === 'booked') statusLabel = 'Direservasi';

        box.innerHTML = `
            <h4>${pc.id}</h4>
            <small>${pc.zone}</small>
            <div class="pc-status-text">${statusLabel}</div>
        `;

        // Klik pada PC kosong untuk langsung memilih di form reservasi
        box.addEventListener('click', () => {
            if (pc.status === 'available') {
                pilihPC.value = pc.id;
                document.getElementById('reservasi').scrollIntoView();
            } else {
                // Fitur toggle status cepat untuk operator warnet (Double Click)
                alert(`${pc.id} sedang ${statusLabel}. Gunakan PC yang berwarna hijau.`);
            }
        });

        // Klik kanan untuk operator server mengubah status PC (Kosong <-> Terpakai)
        box.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            pc.status = pc.status === 'available' ? 'occupied' : 'available';
            saveAndRender();
        });

        pcGrid.appendChild(box);

        // Masukkan PC yang kosong ke dalam pilihan dropdown reservasi
        if (pc.status === 'available') {
            const option = document.createElement('option');
            option.value = pc.id;
            option.textContent = `${pc.id} (${pc.zone})`;
            pilihPC.appendChild(option);
        }
    });
}

// Render Daftar Reservasi
function renderBookings() {
    activeBookings.innerHTML = '';
    if (bookings.length === 0) {
        activeBookings.innerHTML = '<li style="color:#94a3b8;">Belum ada reservasi aktif.</li>';
        return;
    }

    bookings.forEach(b => {
        const li = document.createElement('li');
        li.className = 'booking-item';
        li.innerHTML = `
            <strong>${b.pc}</strong> - Dipesan oleh <strong>${b.nama}</strong><br>
            <span>Pukul ${b.jam} WIB (${b.durasi} Jam)</span>
        `;
        activeBookings.appendChild(li);
    });
}

// Proses Submit Form Reservasi
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nama = document.getElementById('nama').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const pcId = pilihPC.value;
    const durasi = document.getElementById('durasi').value;
    const jam = document.getElementById('jamMain').value;

    if (!pcId) {
        alert('Silakan pilih nomor PC yang tersedia!');
        return;
    }

    // Ubah status PC menjadi 'booked'
    const pcIndex = pcs.findIndex(p => p.id === pcId);
    if (pcIndex !== -1) {
        pcs[pcIndex].status = 'booked';
    }

    // Simpan data reservasi
    bookings.push({ nama, whatsapp, pc: pcId, durasi, jam });
    
    saveAndRender();
    bookingForm.reset();
    alert(`Reservasi berhasil! ${pcId} telah diamankan untuk ${nama}.`);
});

// Simpan ke LocalStorage dan render ulang
function saveAndRender() {
    localStorage.setItem('warnet_pcs', JSON.stringify(pcs));
    localStorage.setItem('warnet_bookings', JSON.stringify(bookings));
    renderPCs();
    renderBookings();
}

// Reset semua PC (Untuk simulasi operator)
function resetAllPC() {
    pcs.forEach(pc => pc.status = 'available');
    bookings = [];
    saveAndRender();
}

// Inisialisasi awal saat halaman dibuka
renderPCs();
renderBookings();