function loadPDF(pdfUrl) {
    const mainArea = document.getElementById('main-area');
    if (!mainArea) return;

    mainArea.innerHTML = `
        <div class="pdf-modal-container" style="animation: fadeIn 0.6s ease; display: flex; flex-direction: column; height: 90vh; background: white; margin: 0; border: none;">
            
            <div class="pdf-header-modern" style="justify-content: center; position: relative;">
                <a href="${pdfUrl}" download class="pdf-btn" style="position: absolute; right: 15px; text-decoration: none; color: inherit; font-size: 12px;">📥 داونلۆد</a>
                
                <h3 style="font-size: 14px; font-weight: bold; margin: 0;">📖 خوێندنەوەی کتێب</h3>
                
                <button onclick="location.reload()" class="pdf-btn close-btn" style="position: absolute; left: 15px;">✕</button>
            </div>

            <iframe id="pdf-viewer" src="${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0" 
                    style="width: 100%; flex-grow: 1; border: none; margin: 0;"></iframe>
        </div>
    `;
    
    // لادانی پادینگی بەشی ناوەڕاست کاتێک کتێبەکە دەکرێتەوە
    mainArea.style.padding = "0";
    
    window.scrollTo({top: 0, behavior: 'smooth'});
}


// ٣. کردنەوەی بەشە دەقییەکان
function openBook(bookName) {
    const mainArea = document.getElementById('main-area');
    mainArea.innerHTML = `
        <div style="animation: fadeIn 0.6s ease; text-align: right; padding: 30px; background: white; border-radius: 12px; border: 1px solid #e0e0e0; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            <h2 style="color: #3498db; border-bottom: 3px solid #3498db; display: inline-block; padding-bottom: 10px; margin-bottom: 20px;">بەشی ${bookName}</h2>
            <p style="font-size: 16px; line-height: 2; color: #555;">
                ئەم بەشە لە ئێستادا ئامادە دەکرێت... <br>
                بەمزووانە کتێبەکانی تایبەت بە <strong>${bookName}</strong> لێرەدا بەردەست دەبن.
            </p>
            <button onclick="location.reload()" style="margin-top: 30px; padding: 10px 25px; background: #3498db; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">گەڕانەوە بۆ سەرەتا</button>
        </div>
    `;
}

// ٤. سیستەمی دەنگ
function setTrack(fileName, title) {
    const audio = document.getElementById('audio-ctrl');
    const titleLabel = document.getElementById('track-display');
    
    if (audio && titleLabel) {
        titleLabel.innerText = title;
        audio.src = fileName;
        audio.load();
        audio.play().catch(() => console.log("لێدان پێویستی بە دەستکاری بەکارهێنەرە"));
    }
}

// ٥. دەربارە
function showAbout() {
    const mainArea = document.getElementById('main-area');
    mainArea.innerHTML = `
        <div style="animation: fadeIn 0.6s ease; text-align: right; padding: 30px; background: white; border-radius: 12px; border: 1px solid #3498db;">
            <h2 style="color: #3498db; margin-bottom: 20px;">دەربارەی کتێبخانەی داریان</h2>
            <p style="font-size: 15px; line-height: 2; color: #333;">
                بەخێربێیت بۆ کتێبخانەی داریان. ئەم پڕۆژەیە هەوڵێکی تاکەکەسییە بۆ ئاسانکاری دەستڕاگەیشتن بە کتێبە کوردییەکان.
            </p>
            <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;">
            <p style="font-size: 14px; color: #666;">دیزاین و گەشەپێدان: مەزهەر ڕەئوف</p>
            <button onclick="location.reload()" style="margin-top: 25px; padding: 10px 30px; background: #3498db; color: white; border: none; border-radius: 8px; cursor: pointer;">داخستن</button>
        </div>
    `;
    window.scrollTo({top: 0, behavior: 'smooth'});
}


