/** File: Code.gs
 * 目標：
 * - GET?action=list 讀取公開清單（不驗證）
 * - POST { action:'add', idToken, name, email } 需驗證 Google Identity Services 的 ID Token 才寫入
 * 規則：
 * - 「祕密」只放後端（SpreadSheet ID；可將允許網域/Email 白名單等設定放 Script Properties）
 */

const SPREADSHEET_ID = '1a97auTLdeJs97drk2X-xacsww1mqD2YN2HwNqj6wD6I';
const SHEET_NAME = '工作表1';

// 你的 Google Identity Services 的 Web client_id（前端公開沒問題，但伺服端要核對 aud）
const CLIENT_ID = '381449379125-2ukt76od388nsb2ronls8r1p1ps61qhb.apps.googleusercontent.com';

// （選配）允許的網域或信箱白名單
const ALLOWED_HD = '';           // 例：'example.com'；留空則不限制
const ALLOWED_EMAILS = [];       // 例：['you@example.com']

/** 小工具：將試算表資料轉物件陣列 */
function readAllRows_() {
  const sh = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const values = sh.getDataRange().getValues();
  if (values.length <= 1) return [];
  const headers = values[0].map(h => String(h).trim());
  return values.slice(1).map(r => {
    const o = {};
    headers.forEach((h, i) => o[h] = r[i]);
    return o;
  });
}

/** 小工具：寫入一筆資料（最小示範） */
function addRow_(payload) {
  const sh = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const last = sh.getLastRow();
  const headers = sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0].map(h => String(h).trim());
  const id = last; // 用列號當 id（簡易示範）
  const row = [id, payload.name || '', payload.email || '', new Date().toISOString()];
  sh.getRange(last+1, 1, 1, row.length).setValues([row]);
  const o = {};
  headers.forEach((h,i)=>o[h]=row[i]);
  return o;
}

/** 驗證 Google ID Token（GIS） */
function verifyIdToken_(idToken) {
  if (!idToken) throw new Error('Missing idToken');
  const url = 'https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(idToken);
  const res = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  if (res.getResponseCode() !== 200) throw new Error('Invalid token');
  const info = JSON.parse(res.getContentText());

  // 關鍵檢查：aud 必須等於你的 CLIENT_ID；email 需已驗證
  if (info.aud !== CLIENT_ID) throw new Error('aud mismatch');
  if (String(info.email_verified) !== 'true') throw new Error('email not verified');

  // （選配）限制網域（hd）或白名單信箱
  if (ALLOWED_HD && info.hd !== ALLOWED_HD) throw new Error('hd not allowed');
  if (ALLOWED_EMAILS.length && !ALLOWED_EMAILS.includes(info.email)) {
    throw new Error('email not allowed');
  }
  return info; // 內含 email, sub, name, picture, hd...
}

/** 統一 JSON 回應 */
function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj, null, 2))
          .setMimeType(ContentService.MimeType.JSON);
}

/** 公開讀：GET?action=list */
function doGet(e) {
  try {
    const action = (e.parameter.action || 'ping').toLowerCase();
    if (action === 'ping') return jsonResponse({ ok:true, message:'pong', ts: Date.now() });
    if (action === 'list') return jsonResponse({ ok:true, data: readAllRows_() });
    return jsonResponse({ ok:false, error:'Unknown action' });
  } catch (err) {
    return jsonResponse({ ok:false, error: String(err) });
  }
}

/** 驗證後寫：POST {action:'add', idToken, name, email} */
function doPost(e) {
  try {
    const body = e.postData ? JSON.parse(e.postData.contents || '{}') : {};
    const action = (body.action || '').toLowerCase();

    if (action === 'add') {
      // 1) 先驗證 idToken
      const tokenInfo = verifyIdToken_(body.idToken);

      // 2) 再檢查必填欄位
      const name = (body.name || '').trim();
      const email = (body.email || '').trim();
      if (!name || !email) return jsonResponse({ ok:false, error:'name/email required' });

      // 3) 寫入
      const created = addRow_({ name, email, by: tokenInfo.email });
      return jsonResponse({ ok:true, data: created });
    }

    return jsonResponse({ ok:false, error:'Unknown action' });
  } catch (err) {
    return jsonResponse({ ok:false, error: String(err) });
  }
}
