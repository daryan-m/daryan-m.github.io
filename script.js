function loadPDF(pdfUrl) {
    const mainArea = document.getElementById('main-area');
    const googleViewerUrl = `https://docs.google.com/viewer?url=${window.location.origin + window.location.pathname + pdfUrl}&embedded=true`;
    
    mainArea.innerHTML = `
        <div style="height: 80vh;">
            <div style="background:#3498db; color:white; padding:10px; display:flex; justify-content:space-between;">
                <span>خوێندنەوەی پەرتووک</span>
                <button onclick="location.reload()" style="background:red; color:white; border:none; padding:5px 10px; cursor:pointer; border-radius:4px;">داخستن</button>
            </div>
            <iframe src="${googleViewerUrl}" style="width:100%; height:100%; border:none;"></iframe>
        </div>
    `;
}

function openBook(name) {
    document.getElementById('main-area').innerHTML = `
        <div style="padding:20px;">
            <h2 style="color:#3498db;">بەشی ${name}</h2>
            <p style="margin-top:15px;">ئەم بەشە لە ئێستادا ئامادە دەکرێت...</p>
            <button onclick="location.reload()" style="margin-top:20px; padding:10px 20px; background:#3498db; color:white; border:none; border-radius:5px; cursor:pointer;">گەڕانەوە</button>
        </div>
    `;
}

function setTrack(file, title) {
    const audio = document.getElementById('audio-ctrl');
    document.getElementById('track-display').innerText = "پەخش دەبێت: " + title;
    audio.src = file;
    audio.play();
}

function showAbout() {
    document.getElementById('main-area').innerHTML = `
        <div style="text-align:right; padding:20px;">
            <h2 style="color:#3498db;">دەربارەی پڕۆژە</h2>
            <p style="margin-top:15px; line-height:1.8;">ئەمە کتێبخانەیەکی دیجیتاڵییە بۆ خزمەتکردن بە خوێنەرانی کورد.</p>
            <p>دیزاین و گەشەپێدان: مەزهەر ڕەئوف</p>
            <button onclick="location.reload()" style="margin-top:20px; padding:10px 20px; background:#3498db; color:white; border:none; border-radius:5px; cursor:pointer;">گەڕانەوە</button>
        </div>
    `;
}
