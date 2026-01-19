// ١. کاتژمێرە زیندووەکە
function updateClock() {
    const now = new Date();
    const datePart = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
    const timePart = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
    const clockElement = document.getElementById('live-clock');
    if(clockElement) clockElement.innerText = `${datePart} - ${timePart}`;
}
setInterval(updateClock, 1000);
updateClock();

// ٢. فەنکشنی سەرەکی بۆ کردنەوەی PDF لە ناوەڕاست (بۆ قورئان و کتێبەکانی تر)
function loadPDF(pdfUrl) {
    const mainArea = document.getElementById('main-area');
    if (!mainArea) return;

    // دروستکردنی دیزاینێکی نوێ بە ڕەنگی شین و دوگمەی پرێنت و داونلۆد
    mainArea.innerHTML = `
        <div style="animation: fadeIn 0.6s ease; display: flex; flex-direction: column; height: 95vh; border: 2px solid #3498db; border-radius: 10px; overflow: hidden; background: white;">
            
            <div style="background: #3498db; color: white; padding: 4px 6px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                <div style="display: flex; gap: 10px; align-items: center;">
                    <span style="font-size: 11px;">📖 خوێندنەوەی کتێب</span>
                    <button onclick="printPDF('${pdfUrl}')" style="background: #ffffff33; color: white; border: 1px solid white; padding: 1px 2px; cursor: pointer; border-radius: 2px; font-size: 11px;">🖨️ پرێنت</button>
                    <a href="${pdfUrl}" download style="background: #ffffff33; color: white; border: 1px solid white; padding: 1px 2px; cursor: pointer; border-radius: 2px; font-size: 11px; text-decoration: none;">📥 داونلۆد</a>
                </div>
                <button onclick="location.reload()" style="background: #e74c3c; color: white; border: 1px solid white; padding: 1px 2px; cursor: pointer; border-radius: 2px; font-size: 11px;">✕ داخستن</button>
            </div>

            <iframe id="pdf-frame" src="${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH" 
                    style="width: 100%; flex-grow: 1; border: none;"></iframe>
        </div>
    `;
    
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// فەنکشنی تایبەت بۆ پرێنتکردن
function printPDF(pdfUrl) {
    const printWindow = window.open(pdfUrl, '_blank');
    printWindow.print();
}

// ٣. فەنکشن بۆ کردنەوەی لیستی جۆرەکانی کتێب (ئەوانەی تەنها دەقن)
function openBook(bookName) {
    const mainArea = document.getElementById('main-area');
    mainArea.innerHTML = `
        <div style="animation: fadeIn 0.6s ease; text-align: right; padding: 15px; background: white; border-radius: 10px; border: 1px solid #eee;">
            <h2 style="color: #3498db; border-bottom: 2px solid #3498db; display: inline-block; margin-bottom: 20px;">بەشی ${bookName}</h2>
            <p style="font-size: 18px; line-height: 1.8; color: #444;">
                ئەم بەشە لە ئێستادا ئامادە دەکرێت... <br>
                بەمزووانە کتێبەکانی تایبەت بە <strong>${bookName}</strong> لێرەدا بەردەست دەبن.
            </p>
            <button onclick="location.reload()" style="margin-top: 30px; padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer;">گەڕانەوە بۆ سەرەتا</button>
        </div>
    `;
}

// ٤. سیستەمی دەنگ (setTrack)
function setTrack(fileName, title) {
    const audio = document.getElementById('audio-ctrl');
    const titleLabel = document.getElementById('track-display');
    
    if (audio && titleLabel) {
        titleLabel.innerText = title;
        audio.src = fileName;
        audio.load();
        audio.play().catch(e => console.log("لێدان پێویستی بە کلیکە"));

        audio.onended = function() {
            titleLabel.innerText = "دەنگەکان";
        };
    }
}

// ٥. ئەنیمەیشنی fadeIn
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeIn { 
        from { opacity: 0; transform: translateY(10px); } 
        to { opacity: 1; transform: translateY(0); } 
    }
`;
document.head.appendChild(style);

// ٦. مامەڵەکردن لەگەڵ یەکەم جوڵە (بۆ کارکردنی دەنگ لە مۆبایل)
const handleFirstInteraction = () => {
    const audio = document.getElementById('audio-ctrl');
    if (audio) {
        audio.load();
        removeInteractionListeners();
    }
};

const removeInteractionListeners = () => {
    window.removeEventListener('click', handleFirstInteraction);
    window.removeEventListener('touchstart', handleFirstInteraction);
};

window.addEventListener('click', handleFirstInteraction);
window.addEventListener('touchstart', handleFirstInteraction);

function showAbout() {
    const mainArea = document.getElementById('main-area');
    if (!mainArea) return;

    mainArea.innerHTML = `
        <div style="animation: fadeIn 0.6s ease; text-align: right; padding: 20px; background: white; border-radius: 10px; border: 1px solid #3498db;">
            <h2 style="color: #3498db; border-bottom: 2px solid #3498db; display: inline-block; margin-bottom: 20px;">دەربارەی کتێبخانەی داریان</h2>
            
            <p style="font-size: 14px; line-height: 2; color: #333; margin-bottom: 15px;">
                بەخێربێیت بۆ کتێبخانەی داریان. ئەم پڕۆژەیە هەوڵێکی تاکەکەسییە بۆ کۆکردنەوە و ئاسانکاری دەستڕاگەیشتن بە کتێبە کوردییەکان و سەرچاوە ئایینی و زانستییەکان.
            </p>

            <ul style="list-style: none; padding-right: 0; font-size: 12px; color: #555;">
                <li style="margin-bottom: 10px;">✅ خوێندنەوەی ڕاستەوخۆی PDF</li>
                <li style="margin-bottom: 10px;">✅ گوێگرتن لە تلاوەت و دەنگەکان</li>
                <li style="margin-bottom: 10px;">✅ داونلۆدکردنی کتێبەکان بەخۆڕایی</li>
            </ul>

            <p style="font-size: 14px; line-height: 2; color: #333; margin-bottom: 15px;">
                سەرچاوەى زانیارییەکانم لە خولیاى باوکێکەوە دێت بۆ زانست و زانیارى،بۆیە هەمیشە ئەنوسم بەیادى ئەو.  .
            </p>

            <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;">
            
            <p style="font-size: 14px; color: #777;">
                دیزاین و گەشەپێدان: <strong>مەزهەر ڕەئوف</strong><br>
                بەرواری دروستکردن: ٢٠٢٦/١/٦
            </p>

            <button onclick="location.reload()" style="margin-top: 25px; padding: 10px 25px; background: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">گەڕانەوە بۆ سەرەتا</button>
        </div>
    `;
    
    // سکرۆڵ بکات بۆ لای نووسینەکە
    window.scrollTo({top: 0, behavior: 'smooth'});
}
