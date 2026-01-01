/**
 * PROJECT: Command Computer Service - Optimized Bot Logic
 * FEATURE: Auto-greeting, Keyword detection (Price, Thanks), and State Management
 */

(function() {
    const WHATSAPP_NUMBER = "6282122321195";
    
    // State aplikasi untuk melacak alur percakapan
    let chatState = {
        step: 0, 
        isReturningCustomer: false
    };

    // 1. Struktur HTML & CSS
    const chatContainer = document.createElement('div');
    chatContainer.id = 'wa-draggable-wrapper';
    chatContainer.innerHTML = `
        <style>
            #wa-draggable-wrapper { position: fixed; bottom: 30px; right: 30px; z-index: 10000; font-family: 'Rajdhani', sans-serif; }
            #wa-button { 
                width: 65px; height: 65px; background: #b366ff; border-radius: 50%; 
                display: flex; align-items: center; justify-content: center; cursor: pointer;
                box-shadow: 0 0 20px rgba(179,102,255,0.6); transition: 0.3s; font-size: 30px;
            }
            #wa-popup { 
                display: none; position: absolute; bottom: 80px; right: 0; width: 330px;
                background: #100a1a; border: 1px solid #b366ff; border-radius: 12px; overflow: hidden;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5); animation: slideUp 0.4s ease;
            }
            @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            .wa-header { background: #b366ff; color: black; padding: 15px; font-weight: bold; font-family: 'Orbitron'; font-size: 0.8rem; border-bottom: 2px solid rgba(0,0,0,0.1); }
            .wa-chat-box { height: 280px; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 10px; background: #0a0510; }
            .msg { padding: 10px 14px; border-radius: 8px; font-size: 0.9rem; max-width: 85%; line-height: 1.4; }
            .msg-bot { background: #1a1525; color: white; border-left: 3px solid #b366ff; align-self: flex-start; }
            .msg-user { background: #b366ff; color: black; align-self: flex-end; font-weight: 600; }
            .wa-footer { padding: 10px; background: #100a1a; display: flex; gap: 5px; border-top: 1px solid #222; }
            #wa-input { flex: 1; padding: 10px; background: #1a1525; border: 1px solid #333; color: white; border-radius: 5px; outline: none; }
            .wa-send { background: #b366ff; border: none; padding: 0 15px; border-radius: 5px; cursor: pointer; color: black; font-weight: bold; }
        </style>
        <div id="wa-popup">
            <div class="wa-header">IT Live Support</div>
            <div id="wa-chat-box" class="wa-chat-box"></div>
            <div class="wa-footer">
                <input type="text" id="wa-input" placeholder="Tulis pesan anda...">
                <button id="wa-send-btn" class="wa-send">➤</button>
            </div>
        </div>
        <div id="wa-button">💬</div>
    `;
    document.body.appendChild(chatContainer);

    const btn = document.getElementById('wa-button');
    const popup = document.getElementById('wa-popup');
    const chatBox = document.getElementById('wa-chat-box');
    const inputField = document.getElementById('wa-input');
    const sendBtn = document.getElementById('wa-send-btn');

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `msg msg-${sender}`;
        div.innerText = text;
        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function getGreeting() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 11) return "pagi";
        if (hour >= 11 && hour < 15) return "siang";
        if (hour >= 15 && hour < 18) return "sore";
        return "malam";
    }

    function handleChat() {
        const text = inputField.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        inputField.value = "";

        setTimeout(() => {
            const lowText = text.toLowerCase();

            // 1. CEK KATA KUNCI: HARGA / BERAPA
            if (lowText.includes("harga") || lowText.includes("berapa") || lowText.includes("biaya") || lowText.includes("ongkos")) {
                addMessage("Mohon maaf kakak sebelumnya kami mengerti apa yang kakak maksud namun untuk harga dan berapanya belum bisa dipastikan dikarenakan tergantung jenis merk atau kendalanya apa saja , namun jika kakak ingin melakukan instal ulang ataupun upgrade perangkat komputernya disini bisa di kisaran mulai dari Rp. 100.000 (only reinstal windows & free software) dan jika teridentifikasi kendala tambahan selain itu paling akan ada biaya tambahan jika memang harus ada komponen yang harus di beli kak. Ada lagi yang bisa saya bantu? 😊", "bot");
                return;
            }

            // 2. CEK KATA KUNCI: TERIMA KASIH
            if (lowText.includes("terima kasih") || lowText.includes("terimakasih") || lowText.includes("tq") || lowText.includes("thanks")) {
                addMessage("sama-sama kakak, semoga puas dengan layanan perbaikan kami 😉 , ada lagi yang ingin kami bantu?", "bot");
                return;
            }

            // 3. ALUR PERCAKAPAN UTAMA (Step-by-Step)
            if (chatState.step === 0) {
                const salam = getGreeting();
                addMessage(`Halo selamat ${salam} kakak perkenalkan saya Reza, mohon maaf kak boleh saya konfirmasi terlebih dahulu ,apakah sebelumnya kakak pernah melakukan service laptop atau PC di Command Computer Service 😊?`, "bot");
                chatState.step = 1;
            } 
            else if (chatState.step === 1) {
                if (lowText.includes("tidak") || lowText.includes("belum")) {
                    addMessage("Baik kakak , silahkan ditunggu ya kami akan hubungkan kakak bersama tim IT Support kami ya 😊", "bot");
                    chatState.isReturningCustomer = false;
                    chatState.step = 2;
                } else if (lowText.includes("ya") || lowText.includes("sudah")) {
                    addMessage("Baik , bagaimana kabarnya kakak sehat? kami sangat senang bertemu kembali dengan anda , namun kendala apa yang sekarang terjadi pada perangkat kakak?", "bot");
                    chatState.isReturningCustomer = true;
                    chatState.step = 2;
                } else {
                    // Fitur "Bot Mengerti Apa Saja"
                    addMessage(`Saya mengerti tentang "${text}", namun boleh konfirmasi dulu kak apakah sebelumnya sudah pernah service di sini?`, "bot");
                }
            } 
            else if (chatState.step === 2) {
                // Arahkan ke WhatsApp
                let waMsg = chatState.isReturningCustomer 
                    ? "Halo kak, apa kabar? saya ingin melakukan kembali service perangkat disini" 
                    : "Halo , saya ingin bertanya seputar kendala perangkat yang saya miliki namun saya belum pernah service disini";
                
                addMessage("Baik kak, saya akan hubungkan kakak langsung ke WhatsApp admin untuk detail teknisnya...", "bot");
                setTimeout(() => {
                    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`, '_blank');
                    chatState.step = 0; // Reset ke awal
                }, 1500);
            }
        }, 800);
    }

    // Bindings
    sendBtn.onclick = handleChat;
    inputField.onkeypress = (e) => { if (e.key === "Enter") handleChat(); };
    btn.onclick = () => {
        const isVisible = popup.style.display === "block";
        popup.style.display = isVisible ? "none" : "block";
        if (!isVisible && chatBox.children.length === 0) {
            addMessage("Halo! Selamat datang di Command Computer Service. Ketik pesan Anda untuk memulai konsultasi.", "bot");
        }
    };
})();