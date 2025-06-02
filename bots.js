const bots = [
  { id: 1, name: "Market Maker", team: "Market Maker Team", role: "ทำราคาในตลาดให้ดูน่าสนใจ / ลดความผันผวน", wallet: "", roi: 12.5, stars: 5, status: "ยังไม่เชื่อมต่อ", did: "MKMKR-001", gig: "Stabilizer / Vol Controller", coins: "GEM, CORE, TIME, NOVA", rewards: 35, lastMsg: "พร้อมทำราคา" },
  { id: 2, name: "Arbitrage Bot", team: "Market Maker Team", role: "หาราคาแตกต่างระหว่าง DEX ทำกำไร", wallet: "", roi: 8.1, stars: 4, status: "ยังไม่เชื่อมต่อ", did: "ARB-002", gig: "Price Hunter", coins: "GEM, CORE, TIME", rewards: 20, lastMsg: "รอจับจังหวะ" },
  { id: 3, name: "Impact Bot", team: "Market Maker Team", role: "ซื้อ/ขายเพื่อทำให้ตลาดเคลื่อนไหว", wallet: "", roi: 10.3, stars: 4, status: "ยังไม่เชื่อมต่อ", did: "IMP-003", gig: "Market Mover", coins: "GEM, TIME, NOVA", rewards: 25, lastMsg: "เตรียมเข้าเทรด" },
  { id: 4, name: "Rebalancer", team: "Market Maker Team", role: "คอยปรับสัดส่วน LP เพื่อรักษาเสถียรภาพ", wallet: "", roi: 9.7, stars: 4, status: "ยังไม่เชื่อมต่อ", did: "REB-004", gig: "LP Adjuster", coins: "CORE, NOVA", rewards: 22, lastMsg: "รอปรับสมดุล" },
  { id: 5, name: "Auto Swapper", team: "Market Maker Team", role: "แปลงเหรียญอัตโนมัติตามสัญญาณ", wallet: "", roi: 7.5, stars: 3, status: "ยังไม่เชื่อมต่อ", did: "AUTOSWAP-005", gig: "Swap Master", coins: "GEM, CORE, TIME", rewards: 18, lastMsg: "พร้อมสลับเหรียญ" },
  { id: 6, name: "Multi-Arb", team: "Market Maker Team", role: "Arbitrage ข้าม Chain (รองรับอนาคต)", wallet: "", roi: 11.2, stars: 4, status: "ยังไม่เชื่อมต่อ", did: "MULTIARB-006", gig: "Cross-chain Arb", coins: "GEM, NOVA", rewards: 30, lastMsg: "เตรียมข้ามเชน" },
  { id: 7, name: "Portfolio Adjust", team: "Market Maker Team", role: "จัดการพอร์ตอัตโนมัติให้สมดุล", wallet: "", roi: 8.9, stars: 4, status: "ยังไม่เชื่อมต่อ", did: "PORTADJ-007", gig: "Portfolio Manager", coins: "GEM, CORE, TIME, NOVA", rewards: 28, lastMsg: "ตรวจสอบพอร์ต" },
  { id: 8, name: "Volume Simulator", team: "Market Maker Team", role: "จำลอง Volume การซื้อขายในตลาด", wallet: "", roi: 6.5, stars: 3, status: "ยังไม่เชื่อมต่อ", did: "VOLSIM-008", gig: "Volume Mimic", coins: "GEM, TIME", rewards: 15, lastMsg: "จำลองปริมาณซื้อขาย" },
  { id: 9, name: "Buy Wall Bot", team: "Market Maker Team", role: "ตั้ง Buy Wall ดักราคา/หลอก AI ตัวอื่น", wallet: "", roi: 7.9, stars: 3, status: "ยังไม่เชื่อมต่อ", did: "BUYWALL-009", gig: "Price Wall Builder", coins: "GEM, CORE", rewards: 19, lastMsg: "ตั้งกำแพงซื้อ" },
  { id: 10, name: "Sell Wall Bot", team: "Market Maker Team", role: "ตั้ง Sell Wall เพื่อกดราคาตามกลยุทธ์", wallet: "", roi: 7.3, stars: 3, status: "ยังไม่เชื่อมต่อ", did: "SELLWALL-010", gig: "Price Wall Setter", coins: "GEM, NOVA", rewards: 16, lastMsg: "ตั้งกำแพงขาย" },
  { id: 11, name: "Trend Rider", team: "Market Maker Team", role: "วิ่งตามแนวโน้มเทรนด์เพื่อทำกำไร", wallet: "", roi: 13.2, stars: 5, status: "ยังไม่เชื่อมต่อ", did: "TREND-011", gig: "Trend Follower", coins: "CORE, TIME", rewards: 40, lastMsg: "รอเทรนด์ใหม่" },
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

function connectBot(id) {
  const bot = bots.find(b => b.id === id);
  if (!bot) return;
  bot.wallet = "0xABC...123"; // ตัวอย่างกระเป๋าที่เชื่อมต่อ
  bot.status = "เชื่อมต่อแล้ว";
  connectedBotId = id;
  renderDashboard();
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

window.onload = () => {
  renderDashboard();
};
