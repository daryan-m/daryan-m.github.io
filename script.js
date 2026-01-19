// ١. کاتژمێرە زیندووەکە
function updateClock() {
    const clockElement = document.getElementById('live-clock');
    if (!clockElement) return;

    const now = new Date();
    const datePart = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
    const timePart = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
    clockElement.innerText = `${datePart} - ${timePart}`;
}
setInterval(updateClock, 1000);
updateClock();

// ٢. فەنکشنی سەرەکی بۆ کردنەوەی PDF
function loadPDF(pdfUrl) {
    const mainArea = document.getElementById('main-area');
    if (!mainArea) return;

    // ئامادەکردنی شوێنی پیشاندانەکە
    mainArea.style.padding = "0";
    mainArea.style.maxWidth = "100%";

    const fullPdfUrl = window.location.origin + window.location.pathname + pdfUrl;
    const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fullPdfUrl)}&embedded=true`;

    mainArea.innerHTML = `
        <div class="pdf-viewer-container">
            <div class="pdf-header">
                <div class="pdf-controls">
                    <span class="pdf-title">📖 خوێندنەوە</span>
                    <a href="${pdfUrl}" download class="download-btn">📥 داونلۆد</a>
                </div>
                <button onclick="location.reload()" class="close-btn">✕</button>
            </div>
            <iframe src="${googleViewerUrl}" class="pdf-frame" allowfullscreen></iframe>
        </div>
    `;
    
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// ٣. فەنکشن بۆ کردنەوەی لیستی جۆرەکانی کتێب
function openBook(bookName) {
    const mainArea = document.getElementById('main-area');
    if (!mainArea) return;

    mainArea.innerHTML = `
        <div class="info-box">
            <h2>بەشی ${bookName}</h2>
            <p>ئەم بەشە لە ئێستادا ئامادە دەکرێت... بەمزووانە کتێبەکانی لێرەدا بەردەست دەبن.</p>
            <button onclick="location.reload()" class="back-btn">گەڕانەوە</button>
        </div>
    `;
}

// ٤. سیستەمی دەنگ
function setTrack(fileName, title) {
    const audio = document.getElementById('audio-ctrl');
    const titleLabel = document.getElementById('track-display');
    
    if (audio && titleLabel) {
        titleLabel.innerText = "ئێستا پەخش دەبێت: " + title;
        audio.src = fileName;
        audio.load();
        audio.play().catch(e => console.log("بۆ کارکردنی دەنگ پێویستە جارێک کلیک لە سایتەکە بکەیت."));

        audio.onended = function() {
            titleLabel.innerText = "لیستی دەنگەکان";
        };
    }
}

// ٥. فەنکشنی دەربارە
function showAbout() {
    const mainArea = document.getElementById('main-area');
    if (!mainArea) return;

    mainArea.innerHTML = `
        <div class="info-box about-box">
            <h2>دەربارەی کتێبخانەی داریان</h2>
            <p>بەخێربێیت بۆ کتێبخانەی داریان. ئەم پڕۆژەیە هەوڵێکی تاکەکەسییە بۆ ئاسانکاری دەستڕاگەیشتن بە کتێبە کوردییەکان.</p>
            <ul class="features-list">
                <li>✅ خوێندنەوەی ڕاستەوخۆی PDF</li>
                <li>✅ گوێگرتن لە تلاوەت و دەنگەکان</li>
                <li>✅ داونلۆدکردنی کتێبەکان</li>
            </ul>
            <p class="dedication">سەرچاوەى زانیارییەکانم لە خولیاى باوکێکەوە دێت بۆ زانست و زانیارى، بۆیە هەمیشە ئەنوسم بەیادى ئەو.</p>
            <hr>
            <p class="footer-info">دیزاین و گەشەپێدان: <strong>مەزهەر ڕەئوف</strong><br>٢٠٢٦/١/٦</p>
            <button onclick="location.reload()" class="back-btn">گەڕانەوە بۆ سەرەتا</button>
        </div>
    `;
    window.scrollTo({top: 0, behavior: 'smooth'});
}
