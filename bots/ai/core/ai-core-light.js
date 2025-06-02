// bots/ai/core/ai-core-light.js

// ฟังก์ชันคำนวณค่า EMA (Exponential Moving Average)
function calculateEMA(prices, period) {
  const k = 2 / (period + 1);
  let ema = prices[0];

  for (let i = 1; i < prices.length; i++) {
    ema = prices[i] * k + ema * (1 - k);
  }

  return ema;
}

// ฟังก์ชันหลัก: วิเคราะห์ตลาดแบบเบา
export function analyzeMarket(pair, data) {
  const prices = data.map(candle => candle.close);
  if (prices.length < 20) {
    return {
      pair,
      signal: 'WAIT',
      confidence: 0.1,
      reason: 'ข้อมูลราคาไม่เพียงพอ'
    };
  }

  const ema5 = calculateEMA(prices.slice(-5), 5);
  const ema20 = calculateEMA(prices.slice(-20), 20);

  let signal = 'WAIT';
  let confidence = 0.5;
  let reason = '';

  if (ema5 > ema20) {
    signal = 'UP';
    confidence = 0.75;
    reason = 'EMA5 ตัด EMA20 ขึ้น';
  } else if (ema5 < ema20) {
    signal = 'DOWN';
    confidence = 0.75;
    reason = 'EMA5 ตัด EMA20 ลง';
  }

  return {
    pair,
    signal,
    confidence,
    ema5,
    ema20,
    reason
  };
}
