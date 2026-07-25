/* ========================================================
   AYARLAR (BÜTÜN KİŞİSELLEŞTİRMELERİ BURADAN YAPABİLİRSİN)
======================================================== */
const CONFIG = {
    // 1. MÜZİK AYARI
    musicFile: "music/piano.mp3", 

    // 2. İSİMLER VE TARİH
    bride: "Yasemin",
    groom: "Ayşe",
    mainDate: "12 EYLÜL 2026",
    
    // 3. AİLELER
    brideParents: "Fatma & Ahmet Yılmaz",
    groomParents: "Ayşe & Mehmet Demir",

    // 4. KINA BİLGİLERİ
    kinaDate: "11 Eylül 2026, Cuma",
    kinaTime: "19:00",
    kinaLoc: "Gözde Balo Salonu, Bursa",
    kinaMap: "https://maps.google.com/?q=Bursa",

    // 5. DÜĞÜN BİLGİLERİ
    dugunDate: "12 Eylül 2026, Cumartesi",
    dugunTime: "18:30",
    dugunLoc: "Grand Balo Salonu, Bursa",
    dugunMap: "https://maps.google.com/?q=Grand+Balo+Salonu+Bursa",

    // 6. IBAN VE BANKA BİLGİLERİ
    bankName: "Garanti BBVA",
    ibanOwner: "Yasemin Yılmaz",
    ibanNumber: "TR33 0006 2000 1110 0006 8888 99",

    // 7. WHATSAPP LCV NUMARASI
    whatsappNum: "905555555555"
};

document.addEventListener('DOMContentLoaded', () => {
    // Verileri HTML'e Aktar
    document.getElementById('sealInitials').textContent = `${CONFIG.bride[0]} & ${CONFIG.groom[0]}`;
    document.getElementById('brideName').textContent = CONFIG.bride;
    document.getElementById('groomName').textContent = CONFIG.groom;
    document.getElementById('mainDate').textContent = CONFIG.mainDate;
    
    document.getElementById('brideParents').textContent = CONFIG.brideParents;
    document.getElementById('groomParents').textContent = CONFIG.groomParents;

    document.getElementById('kinaDate').textContent = CONFIG.kinaDate;
    document.getElementById('kinaTime').textContent = CONFIG.kinaTime;
    document.getElementById('kinaLoc').textContent = CONFIG.kinaLoc;
    document.getElementById('kinaMap').href = CONFIG.kinaMap;

    document.getElementById('dugunDate').textContent = CONFIG.dugunDate;
    document.getElementById('dugunTime').textContent = CONFIG.dugunTime;
    document.getElementById('dugunLoc').textContent = CONFIG.dugunLoc;
    document.getElementById('dugunMap').href = CONFIG.dugunMap;

    document.getElementById('bankName').textContent = CONFIG.bankName;
    document.getElementById('ibanOwner').textContent = CONFIG.ibanOwner;
    document.getElementById('ibanNumber').textContent = CONFIG.ibanNumber;

    // KAPILARI AÇMA VE MÜZİK KONTROLÜ
    const palaceIntro = document.getElementById('palaceIntro');
    const openDoorsBtn = document.getElementById('openDoorsBtn');
    const bgMusic = document.getElementById('bgMusic');
    const soundToggle = document.getElementById('soundToggle');
    const soundIcon = document.getElementById('soundIcon');
    let isPlaying = false;

    // Müzik dosyasını güvenli bir şekilde yükle
    const audioSource = document.getElementById('musicSource');
    if(audioSource) {
        audioSource.src = CONFIG.musicFile;
        bgMusic.load(); // Kaynağı değiştirdikten sonra yüklenmesini sağla
    }

    // Kapıya tıklandığında...
    openDoorsBtn.addEventListener('click', () => {
        // 1. HATA VERSE DE VERMESE DE KAPILARI KESİNLİKLE AÇ
        palaceIntro.classList.add('open');
        
        // 2. Müzik oynatmayı güvenli bir try-catch bloğuna alalım
        try {
            const playPromise = bgMusic.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isPlaying = true;
                    soundIcon.textContent = '🎵';
                }).catch(error => {
                    console.log("Tarayıcı otomatik müziği engelledi, sorun değil.");
                });
            }
        } catch(e) {
            console.log("Müzik yüklenemedi:", e);
        }

        // 3. Müzik butonunu göster ve giriş ekranını DOM'dan sil
        setTimeout(() => {
            soundToggle.classList.remove('hidden');
        }, 1000); 
        
        setTimeout(() => {
            palaceIntro.style.display = 'none';
        }, 1500); 
    });

    // Müzik Durdur/Başlat Butonu
    soundToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            soundIcon.textContent = '🔇';
        } else {
            bgMusic.play();
            soundIcon.textContent = '🎵';
        }
        isPlaying = !isPlaying;
    });

    // IBAN Kopyalama
    const copyBtn = document.getElementById('copyIbanBtn');
    if (copyBtn) {
        const copyAlert = document.getElementById('copyAlert');
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(CONFIG.ibanNumber).then(() => {
                copyAlert.classList.add('show');
                setTimeout(() => copyAlert.classList.remove('show'), 2000);
            });
        });
    }

    // Galeri Lightbox (Fotoğraf Büyütme)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox) {
        document.querySelectorAll('.gallery-img').forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
            });
        });

        lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
        lightbox.addEventListener('click', (e) => {
            if(e.target === lightbox) lightbox.classList.remove('active');
        });
    }

    // WhatsApp LCV (RSVP)
    const rsvpYes = document.getElementById('rsvpYes');
    const rsvpNo = document.getElementById('rsvpNo');
    
    if(rsvpYes) {
        rsvpYes.addEventListener('click', () => {
            const text = encodeURIComponent(`Merhaba, ${CONFIG.bride} & ${CONFIG.groom} düğününüze KATILIYORUM. Şimdiden mutluluklar! 🤍`);
            window.open(`https://wa.me/${CONFIG.whatsappNum}?text=${text}`, '_blank');
        });
    }

    if(rsvpNo) {
        rsvpNo.addEventListener('click', () => {
            const text = encodeURIComponent(`Merhaba, ${CONFIG.bride} & ${CONFIG.groom} maalesef düğününüze katılamıyorum, mutluluklar dilerim. 🤍`);
            window.open(`https://wa.me/${CONFIG.whatsappNum}?text=${text}`, '_blank');
        });
    }
});