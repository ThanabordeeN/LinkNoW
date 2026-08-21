# Thanabodee / NAV — AI Hub (Cloudflare Worker)

เว็บ Hub / Linktree ส่วนตัวสำหรับ **Thanabodee (NAV)** พัฒนาบน **Cloudflare Workers** พร้อม Static Assets และ Serverless API Endpoint สำหรับ Gemini AI Concierge

---

## 🛠 ฟีเจอร์หลัก (Features)

- **Interactive UI**:
  - Live Camera Background พร้อมฟิลเตอร์ Blur หลายระดับ
  - Ambient Canvas Fallback เมื่อไม่เปิดกล้อง
  - Interactive Thai Voice Synthesizer Studio Preview (Web Audio API)
  - ProofMe Parcel Inspection HUD Simulation
  - Booking & Contact Drawer สำหรับนัดหมายเวิร์กชอป
  - Profile Sharing พร้อมระบบ Copy Link และ Toast แจ้งเตือน
- **Cloudflare Worker Backend**:
  - เสิร์ฟ Static Assets (`public/index.html`) ความเร็วสูงบน Cloudflare Global Edge Network
  - Endpoint `POST /api/ask`: ประมวลผลคำถามด้วย Google Gemini API แบบ Serverless
  - Endpoint `POST /api/contact`: รองรับการส่งแบบฟอร์มนัดหมายเวิร์กชอป

---

## 🚀 โครงสร้างโปรเจกต์ (Project Structure)

```
LinkNoW/
├── public/
│   └── index.html          # โค้ดหน้าเว็บ HTML / Tailwind / Lucide Icons
├── src/
│   └── index.ts            # Cloudflare Worker Handler & Serverless API Routes
├── wrangler.jsonc          # การตั้งค่า Cloudflare Workers & Static Assets
├── tsconfig.json           # การตั้งค่า TypeScript
├── package.json            # Scripts และ Dependencies
└── README.md
```

---

## 💻 การรันและทดสอบบน Local (Development)

1. ติดตั้ง Dependencies (ทำครั้งแรก):
   ```bash
   npm install
   ```

2. รัน Local Development Server:
   ```bash
   npm run dev
   ```
   ระบบจะเปิด Worker ที่ `http://localhost:8787`

---

## 🌐 การ Deploy ขึ้น Cloudflare Workers

1. ล็อกอิน Cloudflare (ถ้ายังไม่ได้ล็อกอิน):
   ```bash
   npx wrangler login
   ```

2. (ทางเลือก) ตั้งค่า Gemini API Key สำหรับระบบ Ask NAV:
   ```bash
   npx wrangler secret put GEMINI_API_KEY
   ```

3. สั่ง Deploy ขึ้น Cloudflare Edge:
   ```bash
   npm run deploy
   ```

---

## ⚙️ การตั้งค่าเพิ่มเติม (Custom Domain)

หากต้องการผูกโดเมนส่วนตัว (เช่น `nav.yourdomain.com`):
สามารถระบุใน `wrangler.jsonc` หรือเข้าไปผูกผ่านหน้า Cloudflare Dashboard > Workers & Pages > Triggers > Custom Domains
