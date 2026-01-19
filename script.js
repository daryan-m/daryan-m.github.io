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

    // گۆڕینی ناوەڕۆکی بەشی ناوەڕاست بۆ پیشاندانی PDF
    mainArea.innerHTML = `
        <div style="animation: fadeIn 0.6s ease; height: 100%;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f8f9fa; border: 1px solid #3498db; border-radius: 8px; margin-bottom: 10px;">
                <h3 style="color: #2c3e50; font-size: 16px;">📖 خوێندنەوەی کتێب</h3>
                <button onclick="location.reload()" style="background: #e74c3c; color: white; border: none; padding: 5px 15px; cursor: pointer; border-radius: 4px; font-weight: bold;">داخستن و گەڕانەوە</button>
            </div>
            <iframe src="${pdfUrl}" width="100%" height="700px" style="border: 2px solid #3498db; border-radius: 8px;"></iframe>
        </div>
    `;
    
    // سکرۆڵ بکات بۆ سەرەوە بۆ ئەوەی کتێبەکە ببینێت
    window.scrollTo({top: 0, behavior: 'smooth'});
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
