// app.js

// เก็บสถานะ wallet address ปัจจุบัน
let currentWallet = null;

// ethers.js provider และ signer
let provider;
let signer;

// DOM elements
const walletDisplays = document.querySelectorAll('.wallet');
const roiDisplays = document.querySelectorAll('.roi');
const statusDisplays = document.querySelectorAll('.status');
const startButtons = document.querySelectorAll('button.start-btn');
const stopButtons = document.querySelectorAll('button.stop-btn');
const editButtons = document.querySelectorAll('button.edit-btn');
const chatSendButtons = document.querySelectorAll('.chat-box button');
const chatInputs = document.querySelectorAll('.chat-box input');
const latestMessageDisplays = document.querySelectorAll('.latest-message');

// ฟังก์ชันเชื่อม MetaMask
async function connectWallet() {
  if (typeof window.ethereum === 'undefined') {
    alert('กรุณาติดตั้ง MetaMask ก่อน');
    return;
  }
  try {
    await ethereum.request({ method: 'eth_requestAccounts' });
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    currentWallet = await signer.getAddress();
    updateWalletUI(currentWallet);
    updateBalance(currentWallet);
  } catch (error) {
    console.error(error);
    alert('เชื่อมต่อวอลเลทไม่สำเร็จ');
  }
}

// อัปเดตแสดง Wallet Address ใน UI (ทุกบอท ใช้ wallet เดียวกันก่อน)
function updateWalletUI(address) {
  walletDisplays.forEach(el => {
    el.textContent = `Wallet: ${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  });
}

// ดึงยอดเงิน MATIC ในวอเลท แล้วอัปเดตใน UI
async function updateBalance(address) {
  if (!provider) return;
  const balanceBigNumber = await provider.getBalance(address);
  const balance = ethers.utils.formatEther(balanceBigNumber);
  roiDisplays.forEach(el => {
    el.textContent = `Balance: ${parseFloat(balance).toFixed(4)} MATIC`;
  });
}

// ฟังก์ชัน Start Bot (ลองแค่ alert)
function startBot(index) {
  alert(`Start Bot ตัวที่ ${index + 1}`);
  statusDisplays[index].textContent = 'Status: กำลังทำงาน';
  statusDisplays[index].style.color = '#28a745';
}

// ฟังก์ชัน Stop Bot (ลองแค่ alert)
function stopBot(index) {
  alert(`Stop Bot ตัวที่ ${index + 1}`);
  statusDisplays[index].textContent = 'Status: หยุดทำงาน';
  statusDisplays[index].style.color = '#dc3545';
}

// ฟังก์ชัน Edit Wallet (alert ก่อน)
function editWallet(index) {
  alert(`Edit Wallet Bot ตัวที่ ${index + 1}`);
}

// ฟังก์ชัน ส่งข้อความในแชท (แค่โชว์ alert)
function sendChat(index) {
  const msg = chatInputs[index].value.trim();
  if (msg.length === 0) {
    alert('กรุณาพิมพ์ข้อความก่อนส่ง');
    return;
  }
  alert(`ส่งข้อความถึงบอทตัวที่ ${index + 1}: ${msg}`);
  chatInputs[index].value = '';
  latestMessageDisplays[index].textContent = `ข้อความล่าสุด: ${msg}`;
}

// ตั้ง event listeners ให้ปุ่มต่าง ๆ
function setupEventListeners() {
  startButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => startBot(idx));
  });
  stopButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => stopBot(idx));
  });
  editButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => editWallet(idx));
  });
  chatSendButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => sendChat(idx));
  });
}

// เรียกใช้เมื่อโหลดหน้า
window.addEventListener('DOMContentLoaded', () => {
  // ต่อปุ่ม connect wallet ใน UI (สร้างปุ่ม connect wallet แยก ถ้าไม่มีใน UI ก็เพิ่มเอง)
  const connectWalletBtn = document.getElementById('connectWalletBtn');
  if (connectWalletBtn) {
    connectWalletBtn.addEventListener('click', connectWallet);
  }

  setupEventListeners();
});
