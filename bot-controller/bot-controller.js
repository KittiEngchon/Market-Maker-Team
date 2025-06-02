// นำเข้า AI core ที่เราสร้างไว้
import { analyzeMarket } from '../bots/ai/core/ai-core-light.js';

// ข้อมูลบอทเบื้องต้น
export const bots = [
  {
    id: 1,
    name: "Bot Alpha",
    team: "A",
    role: "Trader",
    status: "ยังไม่เชื่อมต่อ",
    stars: 4,
    roi: 8.5,
    wallet: "",
    did: "did:bot:alpha",
    gig: "QuickSwap",
    coins: "MATIC, USDC",
    rewards: 2,
    lastMsg: "-"
  },
  {
    id: 2,
    name: "Bot Beta",
    team: "A",
    role: "Analyzer",
    status: "ยังไม่เชื่อมต่อ",
    stars: 5,
    roi: 12.3,
    wallet: "",
    did: "did:bot:beta",
    gig: "SushiSwap",
    coins: "USDT, WMATIC",
    rewards: 3,
    lastMsg: "-"
  },
];

// ควบคุมการรัน AI วิเคราะห์
export function runLightAI(botId) {
  const bot = bots.find(b => b.id === botId);
  if (!bot) return;

  // ข้อมูลราคาจำลอง (ตัวอย่าง)
  const dummyPrices = Array.from({ length: 20 }, (_, i) => ({
    close: 1 + Math.sin(i / 3) * 0.1
  }));

  // วิเคราะห์ด้วย AI
  const result = analyzeMarket("MATIC/USDC", dummyPrices);
  bot.lastMsg = `AI วิเคราะห์: ${result.signal} (${Math.round(result.confidence * 100)}%) - ${result.reason}`;

  // ส่งกลับผลเพื่อให้ dashboard อัปเดต
  if (typeof renderDashboard === "function") {
    renderDashboard();
  }
}
<script type="module" src="./bot-controller/bot-controller.js"></script>
<script type="module" src="./dashboard/dashboard.js"></script>
