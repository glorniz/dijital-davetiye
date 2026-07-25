/* ========================================================
   ŞABLON AYAR MERKEZİ (CONFIG)
   Yeni çiftler için sadece burayı düzenlemen yeterlidir!
======================================================== */
const CONFIG = {
    partner1: "YASEMİN",
    partner2: "AHMET",
    weddingDateString: "September 12, 2026 18:30:00", // Geri sayım için
    dateDisplay: "12 Eylül 2026",
    timeDisplay: "18:30",
    locationDisplay: "Grand Balo Salonu, Bursa",
    storyText: "Hayatımızın en özel yolculuğuna çıkarken, bu anlamlı günde siz değerli sevdiklerimizi aramızda görmekten mutluluk duyarız.",
    whatsappNumber: "905555555555", // Başında 90 olacak şekilde
    ibanOwner: "Yasemin Yılmaz",
    bankName: "Garanti BBVA",
    ibanNumber: "TR33 0006 2000 1110 0006 8888 99",
    program: [
        { time: "18.30", title: "Nikah" },
        { time: "19.00", title: "Kokteyl" },
        { time: "20.00", title: "Yemek" },
        { time: "21.00", title: "İlk Dans" }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    // Şablon Verilerini HTML'e Yerleştir
    applyTemplateData();

    const envelopeScreen = document.getElementById('envelope-screen');
    const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');
    const mainContent = document.getElementById('mainContent');
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');

    // ZARF AÇMA EFEKTİ
    openEnvelopeBtn.addEventListener('click', () => {
        envelopeScreen.classList.add('opening');
        
        bgMusic.play().then(() => {
            musicIcon.textContent = '🎵';
        }).catch(() => {
            musicIcon.textContent = '🔇';
        });

        setTimeout(() => {
            envelopeScreen.classList.add('fade-out');
            mainContent.classList.remove('hidden');
            musicToggle.classList.remove('hidden');
            startTitleAnimation();
        }, 900);
    });

    // MÜZİK AÇ/KAPAT
    let isPlaying = true;
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicIcon.textContent = '🔇';
        } else {
            bgMusic.play();
            musicIcon.textContent = '🎵';
        }
        isPlaying = !isPlaying;
    });

    // APPLE TARZI HARF HARF YAZILMA ANIMASYONU
    function startTitleAnimation() {
        const chars = document.querySelectorAll('.apple-title .char');
        const ampersand = document.querySelector('.apple-title .ampersand');
        
        chars.forEach((char, index) => {
            setTimeout(() => {
                char.classList.add('animate');
            }, index * 80);
        });

        setTimeout(() => {
            ampersand.classList.add('animate');
        }, chars.length * 80 + 200);
    }

    // SCROLL İLE FOTOĞRAF ZOOM EFEKTİ
    const zoomImg = document.getElementById('zoomImg');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        let scaleVal = 1 + (scrollY * 0.0005);
        if (scaleVal > 1.3) scaleVal = 1.3;
        zoomImg.style.transform = `scale(${scaleVal})`;
    });

    // CANLI GERİ SAYIM
    const weddingDate = new Date(CONFIG.weddingDateString).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const gap = weddingDate - now;
        if (gap < 0) return;

        const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;

        document.getElementById('days').innerText = String(Math.floor(gap / day)).padStart(2, '0');
        document.getElementById('hours').innerText = String(Math.floor((gap % day) / hour)).padStart(2, '0');
        document.getElementById('minutes').innerText = String(Math.floor((gap % hour) / minute)).padStart(2, '0');
        document.getElementById('seconds').innerText = String(Math.floor((gap % minute) / second)).padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // IBAN KOPYALAMA ÖZELLİĞİ
    const copyBtn = document.getElementById('copyIbanBtn');
    const copyAlert = document.getElementById('copyAlert');
    
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(CONFIG.ibanNumber).then(() => {
            copyAlert.classList.add('show');
            setTimeout(() => {
                copyAlert.classList.remove('show');
            }, 2500);
        });
    });

    // LIGHTBOX GALERİ
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.lightbox-close');
    const galleryImages = document.querySelectorAll('.gallery-img');

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
        });
    });

    lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('active'); });

    // WHATSAPP RSVP ENTEGRASYONU
    document.getElementById('rsvpYes').addEventListener('click', () => {
        const message = encodeURIComponent(`Merhaba, ${CONFIG.partner1} & ${CONFIG.partner2} düğününüze KATILIYORUM! Şimdiden tebrikler.`);
        window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${message}`, '_blank');
    });

    document.getElementById('rsvpNo').addEventListener('click', () => {
        const message = encodeURIComponent(`Merhaba, ${CONFIG.partner1} & ${CONFIG.partner2} maalesef düğününüze katılamıyorum ama mutluluklar dilerim.`);
        window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${message}`, '_blank');
    });
});

// ŞABLON VERİLERİNİ SAYFAYA ENTEGRE EDEN FONKSİYON
function applyTemplateData() {
    document.getElementById('pageTitle').textContent = `${CONFIG.partner1} & ${CONFIG.partner2} - Düğün Davetiyesi`;
    document.getElementById('sealText').textContent = `${CONFIG.partner1[0]} & ${CONFIG.partner2[0]}`;
    document.getElementById('sealNames').textContent = `${CONFIG.partner1[0]} & ${CONFIG.partner2[0]}`;

    // Hero başlığı harf harf bölme
    const heroTitle = document.getElementById('heroTitle');
    let titleHTML = '';
    for (let char of CONFIG.partner1) {
        titleHTML += `<span class="char">${char}</span>`;
    }
    titleHTML += `<span class="ampersand">&amp;</span>`;
    for (let char of CONFIG.partner2) {
        titleHTML += `<span class="char">${char}</span>`;
    }
    heroTitle.innerHTML = titleHTML;

    document.getElementById('storyText').textContent = CONFIG.storyText;
    document.getElementById('infoDate').textContent = CONFIG.dateDisplay;
    document.getElementById('infoTime').textContent = CONFIG.timeDisplay;
    document.getElementById('infoLocation').textContent = CONFIG.locationDisplay;

    // IBAN Bilgileri
    document.getElementById('ibanOwner').textContent = CONFIG.ibanOwner;
    document.getElementById('bankName').textContent = CONFIG.bankName;
    document.getElementById('ibanNumber').textContent = CONFIG.ibanNumber;

    // Program Timeline Dinamik Oluşturma
    const timelineContainer = document.getElementById('timelineContainer');
    let timelineHTML = '';
    CONFIG.program.forEach((item, index) => {
        timelineHTML += `
            <div class="timeline-item">
                <span class="time">${item.time}</span>
                <h4>${item.title}</h4>
            </div>
        `;
        if (index < CONFIG.program.length - 1) {
            timelineHTML += `<div class="timeline-line">↓</div>`;
        }
    });
    timelineContainer.innerHTML = timelineHTML;
}