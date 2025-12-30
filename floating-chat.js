/**
 * PROJECT: Command Computer Service Floating Chat
 * DESCRIPTION: Draggable WhatsApp Button with Popup
 * AUTHOR: AI Thought Partner (Gemini)
 */

const WHATSAPP_NUMBER = "6282122321195";

// 1. Injeksi Struktur HTML & CSS ke dalam Document
const chatContainer = document.createElement('div');
chatContainer.id = 'wa-draggable-wrapper';
chatContainer.innerHTML = `
    <style>
        #wa-draggable-wrapper {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 10000;
            font-family: 'Rajdhani', sans-serif;
            touch-action: none; /* Penting untuk mobile dragging */
        }
        #wa-button { 
            width: 65px; height: 65px; 
            background: #b366ff; 
            border-radius: 50%; 
            display: flex; align-items: center; justify-content: center; 
            cursor: move; 
            box-shadow: 0 0 20px rgba(179, 102, 255, 0.7); 
            transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            user-select: none;
            border: 2px solid rgba(255,255,255,0.2);
        }
        #wa-button:active { transform: scale(0.9); }
        #wa-popup { 
            display: none; 
            position: absolute; 
            bottom: 85px; 
            right: 0; 
            width: 300px; 
            background: #100a1a; 
            border: 1px solid #b366ff; 
            border-radius: 15px; 
            overflow: hidden; 
            box-shadow: 0 10px 40px rgba(0,0,0,0.9);
            animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .wa-header { 
            background: #b366ff; 
            color: #000; 
            padding: 15px; 
            font-weight: bold; 
            font-family: 'Orbitron'; 
            font-size: 0.85rem;
            display: flex;
            justify-content: space-between;
        }
        .wa-body { padding: 20px; background: rgba(10, 5, 16, 0.98); }
        .wa-body p { color: #fff; margin-bottom: 12px; font-size: 0.95rem; }
        #wa-input { 
            width: 100%; padding: 12px; background: rgba(255,255,255,0.05); 
            border: 1px solid rgba(179, 102, 255, 0.5); border-radius: 8px; 
            color: #fff; outline: none; font-family: 'Rajdhani';
        }
        #wa-input:focus { border-color: #b366ff; box-shadow: 0 0 10px rgba(179, 102, 255, 0.3); }
        .wa-send-btn { 
            margin-top: 15px; width: 100%; padding: 12px; 
            background: #b366ff; border: none; border-radius: 8px; 
            cursor: pointer; font-weight: bold; font-family: 'Orbitron';
            color: #000; transition: 0.3s;
        }
        .wa-send-btn:hover { background: #d4aaff; box-shadow: 0 0 15px #b366ff; }
    </style>
    
    <div id="wa-popup">
        <div class="wa-header">
            <span>CMD SUPPORT</span>
            <span onclick="this.parentElement.parentElement.style.display='none'" style="cursor:pointer">×</span>
        </div>
        <div class="wa-body">
            <p>Halo! Ada kendala perbaikan? Kirim pesan untuk solusi cepat.</p>
            <input type="text" id="wa-input" placeholder="Tulis keluhan Anda..." autocomplete="off">
            <button class="wa-send-btn" id="wa-submit">KIRIM KE WHATSAPP</button>
        </div>
    </div>
    
    <div id="wa-button">
        <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
    </div>
`;
document.body.appendChild(chatContainer);

// 2. Logika Drag & Drop (Pemindahan Tombol)
const wrapper = document.getElementById("wa-draggable-wrapper");
const btn = document.getElementById("wa-button");
const popup = document.getElementById("wa-popup");
const inputField = document.getElementById("wa-input");
const submitBtn = document.getElementById("wa-submit");

let isDragging = false;
let startX, startY, initialX, initialY;
let xOffset = 0, yOffset = 0;

function dragStart(e) {
    if (e.type === "touchstart") {
        startX = e.touches[0].clientX - xOffset;
        startY = e.touches[0].clientY - yOffset;
    } else {
        startX = e.clientX - xOffset;
        startY = e.clientY - yOffset;
    }
    
    if (e.target === btn || btn.contains(e.target)) {
        isDragging = true;
    }
}

function dragEnd() {
    isDragging = false;
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        let currentX, currentY;
        
        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - startX;
            currentY = e.touches[0].clientY - startY;
        } else {
            currentX = e.clientX - startX;
            currentY = e.clientY - startY;
        }

        xOffset = currentX;
        yOffset = currentY;
        wrapper.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    }
}

// Event Listeners Drag
document.addEventListener("mousedown", dragStart);
document.addEventListener("mouseup", dragEnd);
document.addEventListener("mousemove", drag);
document.addEventListener("touchstart", dragStart, { passive: false });
document.addEventListener("touchend", dragEnd);
document.addEventListener("touchmove", drag, { passive: false });

// 3. Logika Klik & Pengiriman Pesan
let dragThreshold = 5; // Toleransi pixel agar tidak tertukar drag & klik
let moveDetected = false;

btn.addEventListener("mousedown", () => { moveDetected = false; });
btn.addEventListener("mousemove", () => { moveDetected = true; });

btn.addEventListener("click", () => {
    // Hanya buka popup jika tombol tidak sedang digeser
    if (!moveDetected) {
        const isVisible = popup.style.display === "block";
        popup.style.display = isVisible ? "none" : "block";
        if (!isVisible) inputField.focus();
    }
});

function handleSend() {
    const msg = inputField.value.trim();
    if (msg !== "") {
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
        inputField.value = "";
        popup.style.display = "none";
    }
}

submitBtn.addEventListener("click", handleSend);
inputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSend();
});