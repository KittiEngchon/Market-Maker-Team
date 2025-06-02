const bots = [
  // ...ข้อมูลบอทเหมือนเดิม...
];

let connectedBotId = null;

function renderDashboard() {
  const dash = document.getElementById("dashboard");
  dash.innerHTML = "";
  bots.forEach(bot => {
    const card = document.createElement("div");
    card.className = "bot-card";

    const stars = "★".repeat(bot.stars) + "☆".repeat(5 - bot.stars);

    card.innerHTML = `
      <div class="bot-header">
        <img src="https://via.placeholder.com/50" alt="Bot" />
        <div class="bot-info">
          <div class="bot-name">${bot.name}</div>
          <div class="bot-team">Team: ${bot.team}</div>
          <div class="bot-role">หน้าที่: ${bot.role}</div>
          <div class="wallet">${bot.wallet ? `Wallet: ${bot.wallet}` : "Wallet: ยังไม่เชื่อมต่อ"}</div>
          <div class="roi">ROI: ${bot.roi}%</div>
          <div class="stars" title="${bot.stars} ดาว">${stars}</div>
          <div class="status">สถานะ: ${connectedBotId === bot.id ? "เชื่อมต่อแล้ว" : bot.status}</div>
          <div class="section"><span class="label">DID:</span> ${bot.did}</div>
          <div class="section"><span class="label">Gig:</span> ${bot.gig}</div>
          <div class="section"><span class="label">Coins:</span> ${bot.coins}</div>
          <div class="section"><span class="label">รางวัลสะสม:</span> ${bot.rewards} NFTs</div>
          <div class="section"><span class="label">ข้อความล่าสุด:</span> ${bot.lastMsg}</div>
        </div>
      </div>
      <div class="bot-controls">
        <button ${connectedBotId === bot.id ? "disabled" : ""} onclick="connectBot(${bot.id})">เชื่อมต่อ</button>
        <button ${connectedBotId === bot.id ? "" : "disabled"} onclick="disconnectBot()">ตัดการเชื่อมต่อ</button>
      </div>
      <div class="chat-box" ${connectedBotId === bot.id ? "" : "style='display:none;'"} >
        <input type="text" id="chatInput-${bot.id}" placeholder="พิมพ์ข้อความ..." />
        <button onclick="sendMessage(${bot.id})">ส่ง</button>
      </div>
    `;

    dash.appendChild(card);
  });
}

// เชื่อม MetaMask และอัพเดต bot
async function connectBot(id) {
  if (!window.ethereum) {
    alert("กรุณาติดตั้ง MetaMask ก่อนใช้งาน");
    return;
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (!accounts || accounts.length === 0) {
      alert("ไม่พบบัญชีกระเป๋า MetaMask");
      return;
    }
    const walletAddress = accounts[0];

    const bot = bots.find(b => b.id === id);
    if (!bot) return;
    bot.wallet = walletAddress;
    bot.status = "เชื่อมต่อแล้ว";
    connectedBotId = id;
    renderDashboard();
  } catch (err) {
    alert("เชื่อมต่อ MetaMask ล้มเหลว: " + err.message);
  }
}

function disconnectBot() {
  if (!connectedBotId) return;
  const bot = bots.find(b => b.id === connectedBotId);
  if (!bot) return;
  bot.wallet = "";
  bot.status = "ยังไม่เชื่อมต่อ";
  connectedBotId = null;
  renderDashboard();
}

function sendMessage(id) {
  const input = document.getElementById(`chatInput-${id}`);
  if (!input) return;
  const msg = input.value.trim();
  if (msg.length === 0) {
    alert("กรุณาพิมพ์ข้อความก่อนส่ง");
    return;
  }
  alert(`ส่งข้อความไปยัง Bot ID ${id}: "${msg}"`);
  input.value = "";
}

// ตรวจสอบการเปลี่ยนบัญชี MetaMask
window.ethereum?.on('accountsChanged', (accounts) => {
  if (accounts.length === 0) {
    disconnectBot();
  } else if (connectedBotId !== null) {
    const bot = bots.find(b => b.id === connectedBotId);
    if (bot) {
      bot.wallet = accounts[0];
      renderDashboard();
    }
  }
});

// รีเฟรชหน้าเมื่อเปลี่ยนเครือข่าย
window.ethereum?.on('chainChanged', () => {
  window.location.reload();
});

window.onload = () => {
  renderDashboard();
};
