// ============================================================================
// ARCDESIGN CONSTRUCTION SERVICES - CORE LOGIC & CONTROLLER
// Version: 3.0.0 (Native Android Integrated + Complete Offline Engine)
// ============================================================================

// --- NATIVE ANDROID BRIDGE & SHARING POLYFILLS ---
function getAndroid() { return window.AndroidBridge || window.Android || null; }
var Android = getAndroid();
if (typeof window !== "undefined") {
  if (!window.Android && window.AndroidBridge) window.Android = window.AndroidBridge;
  if (!window.AndroidBridge && window.Android) window.AndroidBridge = window.Android;
}
var bootstrap = window.bootstrap || (typeof bootstrap !== "undefined" ? bootstrap : {});

if (typeof navigator.share === 'undefined') {
  navigator.share = async function(data) {
    if (Android && Android.shareText) {
      Android.shareText(data.title || "ARCDESIGN Timesheet", (data.text || "") + (data.url ? " " + data.url : ""));
      return Promise.resolve();
    }
    return Promise.reject(new Error("Web Share not supported"));
  };
}

const originalPrint = window.print;
window.print = function() {
  if (Android && Android.printPage) {
    Android.printPage();
  } else if (originalPrint) {
    originalPrint.call(window);
  }
};

// --- CORE DATA & CONSTANTS ---
const INITIAL_LOCATIONS_DATA = { 
  "SAN JOSEF": { 
    "baleValue": 0, 
    "siteRemarksHistory": [], 
    "roles": { 
      "SKILLED": [
        "WILLY MANIBIN", "JERWIN MAGALLON", "JERRY MATUTE", "MICHAEL CANLAPAN", 
        "JEFF DELA CRUZ", "MICHAEL CAMACHO", "JONATHAN BARGAMENTO", "MONOLITO CABAGAN", 
        "PESELITO APILADO", "FAUSTINO MENDOZA", "CARLOS VALINO", "ARNEL BARELO", "NIKKO DIZON"
      ], 
      "MASONRY": ["JESSIE DIZON"],
      "LABOR": [
        "JOHN DELOS REYES", "NELSON MIRANDA", "NOEL MEDRIANO", "ACE GARCIA", 
        "REY MANINANG", "RICHARD SARMIENTO", "ROLANDO TOREJOS", "JAIME ANCHETA", 
        "ADRIAN RAMON", "RYAN BRIONES", "RIC VARGAS"
      ]
    } 
  }, 
  "PILIGAN": { 
    "baleValue": 0, 
    "siteRemarksHistory": [], 
    "roles": { 
      "SKILLED": ["OGIE DE VARA", "RONEL TELEZ", "ROWEL SEBASTIAN", "RONNIE TELEZ", "RHEGIE SEBASTIAN"], 
      "LABOR": ["ROBIN DIZON", "GREGORIO PUNZAL", "ANGELITO ABALOS", "JOHN CARLO TRIGUEROS"], 
      "STAY IN": ["S- ROBERT DIAZ", "L- DANNY DELA CRUZ"] 
    } 
  }, 
  "GVE REYES": { 
    "baleValue": 0, 
    "siteRemarksHistory": [], 
    "roles": { 
      "SKILLED": ["ED APOSTOL", "REX GONZALES", "JUN BERNABE", "MAVERIC DELOS SANTOS", "EDUARDO JAVIER"], 
      "LABOR": ["ALBERTO DELA CRUZ", "RANDY BERNARDINO", "RENE BERNABE", "ARNOLD CASTRO"] 
    } 
  }, 
  "GVE MORALES": { 
    "baleValue": 0, 
    "siteRemarksHistory": [], 
    "roles": { 
      "SKILLED": ["WILLY ARELLANO", "MARIO AQUINO", "ALBERT RIVERA", "ROMMEL SANTOS", "EDGAR VALENTIN", "DANNY GUILERMO", "PIOLO VALENTIN"], 
      "WELDER": ["ORLAN REYES"], 
      "LABOR": ["RICHARD RIVERA", "ALJHON PALASAN", "CHRIS ANTONIO", "CENEN DANGAL"] 
    } 
  }, 
  "BALOC PINTOR": { 
    "baleValue": 0, 
    "siteRemarksHistory": [], 
    "roles": { 
      "SKILLED": ["ARSENIO ESCUDERO", "JULIUS ESCUDERO", "JOHN DY", "JUN-JUN RAMOS", "JHON REY RAMOS"], 
      "LABOR": ["ALBERTO DELA CRUZ", "RANDY BERNARDINO", "RENE BERNABE", "ARNOLD CASTRO"] 
    } 
  }, 
  "BALOC SAMONTE": { 
    "baleValue": 0, 
    "siteRemarksHistory": [], 
    "roles": { 
      "SKILLED": ["ROMEL SANTOS"], 
      "LABOR": ["JM VALLEJO", "CHRIS ANTONIO"] 
    } 
  }, 
  "AVIDA": { 
    "baleValue": 0, 
    "siteRemarksHistory": [], 
    "roles": { 
      "SKILLED": ["MARCELO BULACLAC", "DANILO BULACLAC", "DAMASO BULACLAC", "BERNIE SYLVESTRE", "ROLY SYLVESTRE", "JOMVIC VALINO", "DARWIN GUSTO", "MARLON BULACLAC", "ROLANDO MEDOZA"], 
      "LABOR": ["MARCOS BULACLAC", "LON-LON CUAZON", "JUSTINE DELA CRUZ", "ANDREI DUMANGAN", "JAYSON DELA CRUZ", "JERIC YAKAT", "EMERSON SANTILLANA", "RAYBIN BARON", "ALLAN MABALAY"] 
    } 
  }, 
  "DINTOR ZARAGOZA": { 
    "baleValue": 0, 
    "siteRemarksHistory": [], 
    "roles": { 
      "SKILLED": ["PHILIP CASTILLO", "JOHN PAUL CASTILLO", "JOHN GENRE PALANAN", "ROMEO RAMOS"] 
    } 
  }, 
  "NABAO": { 
    "baleValue": 0, 
    "siteRemarksHistory": [], 
    "roles": { 
      "SKILLED": ["RESTY DIZON", "ILENG TABALDO", "ANTHONY TOLENTINO", "JOSE JUAN", "ROY GONZALES", "MARCELINO TOLENTINO", "ARVIN SANTOS", "ROBERT GONZALES", "MICHAEL TOLENTINO"], 
      "LABOR": ["FREDIE GUSTO", "LAUREN TABALDO", "REYNALDO LAGASCA", "WAWI VARGAS", "MARCIAL KATAHAN", "MARIANO BRIÑA", "RAMIL PAJARDO", "ANGELO SANTOS", "JEFFREY ESTIPULAR", "FELIPE GONZALES"], 
      "STAY IN": ["MARLON MAON"] 
    } 
  }, 
  "GEN LUNA": { 
    "baleValue": 0, 
    "siteRemarksHistory": [], 
    "roles": { 
      "SKILLED": ["MICHAEL TOLENTINO"], 
      "LABOR": ["FELIPE GONZALES"] 
    } 
  }, 
  "SAN ANTONIO": { 
    "baleValue": 0, 
    "siteRemarksHistory": [], 
    "roles": { 
      "SKILLED": ["ARMANDO JOSE", "JUN MARQUEZ", "ARNOLD SALAYSAY"], 
      "LABOR": ["MAVIN MAGNO", "AMARDY DELA CRUZ", "BENJIE LOPEZ", "JR DELA CRUZ", "RAMIL FAUSTINO", "DENNIS VICOS"] 
    } 
  } 
}; 

const ALL_ROLES = ["FOREMAN", "SKILLED", "MASON", "MASONRY", "WELDER", "LABOR", "STAY IN", "BALE", "EXTRA"]; 

const DEFAULT_ROLE_DAY_RATES = {
  "FOREMAN": 1100, 
  "MASON": 700, 
  "MASONRY": 700, 
  "SKILLED": 720, 
  "WELDER": 720, 
  "LABOR": 500, 
  "STAY IN": 500, 
  "BALE": 500, 
  "EXTRA": 500
};

const DEFAULT_ROLE_HOURLY_RATES = {
  "FOREMAN": 137.5, 
  "MASON": 87.5, 
  "MASONRY": 87.5, 
  "SKILLED": 90, 
  "WELDER": 90, 
  "LABOR": 62.5, 
  "STAY IN": 62.5, 
  "BALE": 62.5, 
  "EXTRA": 62.5
};

const DAY_KEYS = ['SAT', 'MON', 'TUE', 'WED', 'THU', 'FRI']; 
const DAY_NAMES = { 
  'SAT': 'Saturday', 'MON': 'Monday', 'TUE': 'Tuesday', 'WED': 'Wednesday', 'THU': 'Thursday', 'FRI': 'Friday', 'SUN': 'Sunday',
  'S': 'Saturday', 'M': 'Monday', 'T': 'Tuesday', 'W': 'Wednesday', 'Th': 'Thursday', 'F': 'Friday' 
};

const STORAGE_KEY = "arcdesign_timesheet_records_v20"; 
const PAYROLL_STORAGE_KEY = "arcdesign_payroll_rates_v1";
const STAFF_STORAGE_KEY = "arcdesign_staff_accounts_v1"; 

const DELETED_SITES_STORAGE_KEY = "arc_deleted_sites_list_v2";
const DELETED_WORKERS_STORAGE_KEY = "arc_deleted_workers_list_v2";
const DELETED_DATES_STORAGE_KEY = "arc_deleted_dates_list_v2";

const REMEMBER_FLAG_KEY = "arc_device_auto_login_active"; 
const REMEMBER_USER_KEY = "arc_saved_username_val"; 
const REMEMBER_PASS_KEY = "arc_saved_password_val"; 
const REMEMBER_ROLE_KEY = "arc_saved_user_role_val"; 
const NOTIF_FLAG_KEY = "arc_device_notifs_enabled";

// --- APPLICATION STATE ---
let timesheetDB = {}; 
let payrollDB = {};
let currentDate = getTodayFormatted(); 
let currentLocation = "SAN JOSEF"; 
let currentActiveData = null; 
let showStatsFlag = false; 
let selectedRolesFilter = []; 

let currentClearMath = { question: "", answer: 0 };
let currentDeleteDateMath = { question: "", answer: 0 };
let currentDeleteProjectMath = { question: "", answer: 0 };
let sitePendingDeletion = null;

let activeWorkerForNotes = null;
let activeWorkerForRename = null;
let activeCustomHourWorker = null;
let activeCustomHourDayKey = null;

let focusWorkerIndex = 0;
let focusWorkerList = [];

// --- STORAGE HELPERS ---
function safeStorageGet(key) { 
  try { return localStorage.getItem(key); } catch(e) { return null; } 
} 
function safeStorageSet(key, val) { 
  try { localStorage.setItem(key, val); } catch(e) { console.warn("Storage write error", e); } 
} 
function safeSessionSet(key, val) {
  try { sessionStorage.setItem(key, val); } catch(e) { window['__mem_' + key] = val; }
}
function safeSessionGet(key) {
  try { return sessionStorage.getItem(key) || window['__mem_' + key] || null; } catch(e) { return window['__mem_' + key] || null; }
}
function safeSessionRemove(key) {
  try { sessionStorage.removeItem(key); } catch(e) {}
  delete window['__mem_' + key];
}

function getDeletedSites() {
  try {
    let list = JSON.parse(localStorage.getItem(DELETED_SITES_STORAGE_KEY) || '["YT", "TEST"]');
    if (!list.includes("YT")) list.push("YT");
    if (!list.includes("TEST")) list.push("TEST");
    return list;
  } catch(e) { return ["YT", "TEST"]; }
}
function saveDeletedSites(list) {
  try { localStorage.setItem(DELETED_SITES_STORAGE_KEY, JSON.stringify(list)); } catch(e) {}
}
function getDeletedWorkers() {
  try { return JSON.parse(localStorage.getItem(DELETED_WORKERS_STORAGE_KEY) || '[]'); } catch(e) { return []; }
}
function saveDeletedWorkers(list) {
  try { localStorage.setItem(DELETED_WORKERS_STORAGE_KEY, JSON.stringify(list)); } catch(e) {}
}
function getDeletedDates() {
  try { return JSON.parse(localStorage.getItem(DELETED_DATES_STORAGE_KEY) || '[]'); } catch(e) { return []; }
}
function saveDeletedDates(list) {
  try { localStorage.setItem(DELETED_DATES_STORAGE_KEY, JSON.stringify(list)); } catch(e) {}
}
function getStaffAccounts() { 
  const data = safeStorageGet(STAFF_STORAGE_KEY); 
  if (data) { 
    try { return JSON.parse(data); } catch(e) { return []; } 
  } 
  return []; 
} 
function saveStaffAccounts(accounts) { 
  safeStorageSet(STAFF_STORAGE_KEY, JSON.stringify(accounts)); 
} 

// --- AUTH & ROLES ---
function isAdmin() { 
  return (safeSessionGet("arcdesign_user_role") || localStorage.getItem(REMEMBER_ROLE_KEY) || "staff") === "admin"; 
} 

function getCurrentUser() { 
  return { 
    username: safeSessionGet("arcdesign_logged_user") || localStorage.getItem(REMEMBER_USER_KEY) || "User", 
    role: safeSessionGet("arcdesign_user_role") || localStorage.getItem(REMEMBER_ROLE_KEY) || "staff" 
  }; 
} 

function reloadStoreFromDisk() {
  try {
    const raw = safeStorageGet(STORAGE_KEY);
    const rawPayroll = safeStorageGet(PAYROLL_STORAGE_KEY);
    if (rawPayroll) {
      try { payrollDB = JSON.parse(rawPayroll); } catch(e) { payrollDB = {}; }
    }
    if (raw) {
      try { timesheetDB = JSON.parse(raw); } catch(e) { timesheetDB = {}; }
    }
    if (!timesheetDB[currentDate]) {
      const today = getTodayFormatted();
      if (timesheetDB[today]) {
        currentDate = today;
      } else {
        const remaining = Object.keys(timesheetDB).filter(k => checkHasRecordForDate(k));
        if (remaining.length > 0) currentDate = remaining.sort().reverse()[0];
      }
    }
    if (timesheetDB[currentDate]) {
      currentActiveData = timesheetDB[currentDate];
    }
  } catch(e) {
    console.error("Error reloading store from disk:", e);
  }
}

// Automatic synchronization between Admin and Staff accounts / active tabs
if (typeof window !== "undefined") {
  window.addEventListener('storage', function(e) {
    if (e.key === STORAGE_KEY || e.key === PAYROLL_STORAGE_KEY || e.key === DELETED_DATES_STORAGE_KEY || e.key === DELETED_SITES_STORAGE_KEY || e.key === DELETED_WORKERS_STORAGE_KEY) {
      reloadStoreFromDisk();
      renderLocationDropdown();
      renderRecordedDatesList();
      renderUI();
    }
  });
} 

function checkAuth() { 
  const sessionAuth = safeSessionGet("arcdesign_logged_in"); 
  const sessionRole = safeSessionGet("arcdesign_user_role"); 
  const isRemembered = localStorage.getItem(REMEMBER_FLAG_KEY); 
  const savedUser = localStorage.getItem(REMEMBER_USER_KEY); 
  const savedPass = localStorage.getItem(REMEMBER_PASS_KEY); 

  const overlay = document.getElementById("loginOverlay"); 
  const userField = document.getElementById("loginUsername"); 
  const passField = document.getElementById("loginPassword"); 
  const rememberCheck = document.getElementById("rememberMeCheck"); 

  // If first time running or not authenticated, default to Admin so user is never locked out
  if (sessionAuth !== "true" && (isRemembered === null || isRemembered === "true")) {
    safeSessionSet("arcdesign_logged_in", "true");
    safeSessionSet("arcdesign_user_role", "admin");
    safeSessionSet("arcdesign_logged_user", "Admin");
    try {
      localStorage.setItem(REMEMBER_FLAG_KEY, "true");
      localStorage.setItem(REMEMBER_USER_KEY, "admin");
      localStorage.setItem(REMEMBER_PASS_KEY, "812124750");
      localStorage.setItem(REMEMBER_ROLE_KEY, "admin");
    } catch(e) {}
    if (userField) userField.value = "admin";
    if (passField) passField.value = "812124750";
    if (overlay) overlay.style.display = "none";
    updateAccountFooterDisplay();
    return;
  }

  if (sessionAuth === "true" && sessionRole) { 
    if (overlay) overlay.style.display = "none"; 
    updateAccountFooterDisplay(); 
  } else if (isRemembered === "true" && savedUser && savedPass) { 
    if (userField) userField.value = savedUser; 
    if (passField) passField.value = savedPass; 
    if (rememberCheck) rememberCheck.checked = true; 
    attemptLogin(true); 
    return; 
  } else { 
    if (overlay) overlay.style.display = "none"; // never obstruct UI
    if (userField) userField.value = savedUser || "admin"; 
    if (passField) passField.value = savedPass || "812124750";
  } 
  updateAccountFooterDisplay(); 
} 

window.attemptLogin = function(isAutomatic = false) { 
  try {
    const u = (document.getElementById("loginUsername")?.value || "").trim(); 
    const p = (document.getElementById("loginPassword")?.value || "").trim(); 
    const rememberCheck = document.getElementById("rememberMeCheck"); 
    const shouldRemember = rememberCheck ? rememberCheck.checked : false; 
    const alertEl = document.getElementById("loginErrorAlert");

    let authenticated = false; 
    let role = "staff"; 
    let user = u || "Staff"; 

    if (u.toLowerCase() === "admin" && p === "812124750") { 
      authenticated = true; 
      role = "admin"; 
      user = "Admin"; 
    } else { 
      const staffList = getStaffAccounts(); 
      const matched = staffList.find(s => s.username && s.username.toLowerCase() === u.toLowerCase() && s.password === p); 
      if (matched) { 
        authenticated = true; 
        role = "staff"; 
        user = matched.username; 
      } 
    } 

    if (authenticated) { 
      safeSessionSet("arcdesign_logged_in", "true"); 
      safeSessionSet("arcdesign_user_role", role); 
      safeSessionSet("arcdesign_logged_user", user); 

      if (shouldRemember) { 
        try {
          localStorage.setItem(REMEMBER_FLAG_KEY, "true"); 
          localStorage.setItem(REMEMBER_USER_KEY, u); 
          localStorage.setItem(REMEMBER_PASS_KEY, p); 
          localStorage.setItem(REMEMBER_ROLE_KEY, role); 
        } catch(e) {}
      } else { 
        try {
          localStorage.removeItem(REMEMBER_FLAG_KEY); 
          localStorage.removeItem(REMEMBER_USER_KEY); 
          localStorage.removeItem(REMEMBER_PASS_KEY); 
          localStorage.removeItem(REMEMBER_ROLE_KEY); 
        } catch(e) {}
      } 

      if (alertEl) alertEl.classList.add("d-none"); 
      const overlay = document.getElementById("loginOverlay"); 
      if (overlay) overlay.style.display = "none"; 

      reloadStoreFromDisk();
      updateAccountFooterDisplay(); 
      if (currentActiveData) renderUI(); 
      checkShowFeatureIntro(); 
      return; 
    } 

    if (!isAutomatic) { 
      if (alertEl) {
        alertEl.className = "alert alert-danger p-2 small text-center fw-bold";
        alertEl.innerText = "Invalid Username or Password!";
        alertEl.classList.remove("d-none");
      }
    } 
  } catch(e) {
    console.error("Login attempt error:", e);
  }
};

function logoutSession() { 
  safeSessionRemove("arcdesign_logged_in"); 
  safeSessionRemove("arcdesign_user_role"); 
  safeSessionRemove("arcdesign_logged_user"); 
  localStorage.removeItem(REMEMBER_FLAG_KEY); 
  localStorage.removeItem(REMEMBER_USER_KEY); 
  localStorage.removeItem(REMEMBER_PASS_KEY); 
  localStorage.removeItem(REMEMBER_ROLE_KEY); 

  const overlay = document.getElementById("loginOverlay"); 
  const userField = document.getElementById("loginUsername"); 
  const passField = document.getElementById("loginPassword"); 
  if (userField) userField.value = ""; 
  if (passField) passField.value = ""; 
  if (overlay) overlay.style.display = "flex"; 
  updateAccountFooterDisplay(); 
} 

function updateAccountFooterDisplay() { 
  const footerBadge = document.getElementById("activeAccountDisplay"); 
  const btnCreate = document.getElementById("btnCreateAccount"); 
  const btnAddWorker = document.getElementById("btnAddWorkerBtn");
  const isAdm = isAdmin(); 
  const currUser = getCurrentUser(); 

  if (footerBadge) { 
    footerBadge.className = isAdm ? "badge bg-danger" : "badge bg-info text-dark"; 
    footerBadge.innerText = isAdm ? `Administrator (${currUser.username})` : `Staff Member (${currUser.username})`; 
  } 

  if (btnCreate) { 
    btnCreate.style.display = isAdm ? "inline-block" : "none"; 
  } 

  if (btnAddWorker) {
    btnAddWorker.style.display = isAdm ? "inline-block" : "none";
  }
} 

// --- DATE CALCULATION & WEEK MANAGEMENT ---
function getTodayFormatted() { 
  const d = new Date(); 
  const year = d.getFullYear(); 
  const month = String(d.getMonth() + 1).padStart(2, '0'); 
  const day = String(d.getDate()).padStart(2, '0'); 
  return `${year}-${month}-${day}`; 
} 

function normalizeDateStringToYYYYMMDD(str) { 
  if (!str) return getTodayFormatted(); 
  const cleanStr = String(str).trim(); 
  if (/^\d{4}-\d{2}-\d{2}$/.test(cleanStr)) return cleanStr; 
  const parsed = new Date(cleanStr); 
  if (!isNaN(parsed.getTime())) { 
    const year = parsed.getFullYear(); 
    const month = String(parsed.getMonth() + 1).padStart(2, '0'); 
    const day = String(parsed.getDate()).padStart(2, '0'); 
    return `${year}-${month}-${day}`; 
  } 
  return getTodayFormatted(); 
}

const DAY_INFO = [
  { key: 'SUN', short: 'SUN', full: 'Sunday', oldKey: 'Sun' },
  { key: 'MON', short: 'MON', full: 'Monday', oldKey: 'M' },
  { key: 'TUE', short: 'TUE', full: 'Tuesday', oldKey: 'T' },
  { key: 'WED', short: 'WED', full: 'Wednesday', oldKey: 'W' },
  { key: 'THU', short: 'THU', full: 'Thursday', oldKey: 'Th' },
  { key: 'FRI', short: 'FRI', full: 'Friday', oldKey: 'F' },
  { key: 'SAT', short: 'SAT', full: 'Saturday', oldKey: 'S' }
];

function calculateDatesForStart(dateStr) { 
  if (!dateStr) return []; 
  const cleanStr = normalizeDateStringToYYYYMMDD(dateStr); 
  const [year, month, day] = cleanStr.split('-').map(Number); 
  let curr = new Date(year, month - 1, day); 

  // If Sunday is selected, advance to Monday since Sunday is always excluded
  if (curr.getDay() === 0) {
    curr.setDate(curr.getDate() + 1);
  }

  const result = []; 
  while (result.length < 6) { 
    const dayOfWeek = curr.getDay();
    if (dayOfWeek !== 0) { // Sunday is always excluded
      const info = DAY_INFO[dayOfWeek];
      const dCopy = new Date(curr.getTime());
      result.push({ 
        key: info.key, 
        oldKey: info.oldKey,
        dayNameShort: info.short,
        dayName: info.full,
        dayNum: dCopy.getDate(), 
        monthStr: dCopy.toLocaleString('en-US', { month: 'short' }), 
        year: dCopy.getFullYear(),
        dateStr: `${dCopy.getFullYear()}-${String(dCopy.getMonth() + 1).padStart(2, '0')}-${String(dCopy.getDate()).padStart(2, '0')}`,
        fullDateStr: dCopy.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) 
      }); 
    }
    curr.setDate(curr.getDate() + 1);
  } 
  return result; 
} 

function getPeriodString(dates) {
  if (!dates || dates.length === 0) return currentDate;
  const first = dates[0];
  const last = dates[dates.length - 1];
  if (first.monthStr.toUpperCase() === last.monthStr.toUpperCase()) {
    return `${first.monthStr.toUpperCase()}-${first.dayNum}-${last.dayNum}`;
  }
  return `${first.monthStr.toUpperCase()}-${first.dayNum} - ${last.monthStr.toUpperCase()}-${last.dayNum}`;
}

function getCalculatedDates() { 
  return calculateDatesForStart(currentDate); 
}

function getWorkerAttendanceVal(w, d) {
  if (!w || !w.attendance) return '';
  if (typeof d === 'string') return w.attendance[d] ?? '';
  return w.attendance[d.key] ?? w.attendance[d.dayNameShort] ?? (d.oldKey ? w.attendance[d.oldKey] : undefined) ?? '';
}

function getWorkerOtVal(w, d) {
  if (!w || !w.ot) return 0;
  if (typeof d === 'string') return parseInt(w.ot[d], 10) || 0;
  const val = w.ot[d.key] ?? w.ot[d.dayNameShort] ?? (d.oldKey ? w.ot[d.oldKey] : undefined) ?? 0;
  return parseInt(val, 10) || 0;
}

function onStartDateChange(newDateVal) { 
  if (!newDateVal) return; 
  saveStore(); 
  currentDate = normalizeDateStringToYYYYMMDD(newDateVal); 
  if (!timesheetDB[currentDate]) { 
    timesheetDB[currentDate] = buildFreshLocationsData(); 
  } 
  currentActiveData = timesheetDB[currentDate]; 
  syncWeeklyPayrollRates(currentDate); 
  renderLocationDropdown(); 
  renderUI(); 
} 

// --- METRICS & CALCULATION ---
function parseHourlyValue(val) {
  if (typeof val === 'string' && val.endsWith('h')) {
    const num = parseFloat(val.replace('h', ''));
    return isNaN(num) ? 0 : num;
  }
  return 0;
}

function getWorkerMetrics(w) { 
  let daysWorked = 0; 
  let hourlyHours = 0;
  let totalOT = 0; 

  const dates = getCalculatedDates();
  dates.forEach(d => {
    const val = getWorkerAttendanceVal(w, d);
    if (val === '1.0' || val === '1') { 
      daysWorked += 1.0; 
    } else if (val === '0.5') { 
      daysWorked += 0.5; 
    } else if (typeof val === 'string' && val.endsWith('h')) {
      hourlyHours += parseHourlyValue(val);
    }
    const otVal = getWorkerOtVal(w, d);
    totalOT += otVal;
  });

  return { daysWorked, hourlyHours, totalOT }; 
} 

function getAttendanceClass(val) { 
  if (val === '1.0' || val === '1') return 'att-full'; 
  if (val === '0.5') return 'att-half'; 
  if (typeof val === 'string' && val.endsWith('h')) return 'att-custom-hour';
  if (val === 'absent') return 'att-absent'; 
  if (val === 'sick') return 'att-sick'; 
  if (val === 'emergency') return 'att-emergency'; 
  return ''; 
} 

function getWorkerAutomatedRemarks(worker, customDates) { 
  const remarks = []; 
  let absentCount = 0; 
  let sickCount = 0;
  let emergencyCount = 0;
  let fullDaysCount = 0;
  let halfDaysCount = 0;
  let lateHours = 0; 

  const dates = (customDates && customDates.length > 0) ? customDates : getCalculatedDates();
  dates.forEach(d => {
    const val = getWorkerAttendanceVal(worker, d);
    if (val === '1.0' || val === '1') fullDaysCount++;
    else if (val === '0.5') halfDaysCount++;
    else if (val === 'absent') absentCount++; 
    else if (val === 'sick') { absentCount++; sickCount++; }
    else if (val === 'emergency') { absentCount++; emergencyCount++; }
    else if (typeof val === 'string' && val.endsWith('h')) {
      const h = parseHourlyValue(val);
      if (h < 8) lateHours += (8 - h);
    }
  });

  const metrics = getWorkerMetrics(worker); 

  // Attendance automated non-editable system remarks
  if (absentCount >= 3) { 
    remarks.push({ type: 'danger', text: `⚠️ High Absences (${absentCount} Days)`, bg: '#fee2e2', color: '#991b1b', border: '#fca5a5' }); 
  } else if (absentCount > 0) {
    remarks.push({ type: 'warning text-dark', text: `⚠️ ${absentCount} Day${absentCount > 1 ? 's' : ''} Absent`, bg: '#fef3c7', color: '#92400e', border: '#fcd34d' });
  }

  if (sickCount > 0) {
    remarks.push({ type: 'warning text-dark', text: `🩹 Sick Leave (${sickCount}d)`, bg: '#fef3c7', color: '#b45309', border: '#fde68a' });
  }
  if (emergencyCount > 0) {
    remarks.push({ type: 'danger', text: `🚨 Emergency (${emergencyCount}d)`, bg: '#fee2e2', color: '#b91c1c', border: '#fca5a5' });
  }

  if (metrics.daysWorked >= 6 || fullDaysCount >= 6) { 
    remarks.push({ type: 'success', text: '⭐ Perfect Attendance (6/6)', bg: '#dcfce7', color: '#166534', border: '#86efac' }); 
  } else if (metrics.daysWorked >= 5 && absentCount === 0) {
    remarks.push({ type: 'primary', text: `✓ Consistent Attendance (${metrics.daysWorked.toFixed(1)}d)`, bg: '#dbeafe', color: '#1e40af', border: '#93c5fd' });
  } else if (metrics.daysWorked > 0 && metrics.daysWorked < 3 && absentCount === 0) {
    remarks.push({ type: 'secondary', text: `⏳ Partial Week (${metrics.daysWorked.toFixed(1)}d)`, bg: '#f4f4f5', color: '#3f3f46', border: '#d4d4d8' });
  }

  if (metrics.totalOT >= 8) { 
    remarks.push({ type: 'warning text-dark', text: `🔥 Heavy OT (${metrics.totalOT} hrs)`, bg: '#ffedd5', color: '#9a3412', border: '#fdba74' }); 
  } else if (metrics.totalOT > 0) {
    remarks.push({ type: 'info text-dark', text: `⚡ OT Logged (+${metrics.totalOT}h)`, bg: '#e0f2fe', color: '#0369a1', border: '#7dd3fc' });
  }

  if (lateHours > 0) {
    remarks.push({ type: 'secondary', text: `⏱️ Undertime (-${lateHours}h)`, bg: '#fef2f2', color: '#991b1b', border: '#fecaca' });
  }

  if ((worker.baleValue || 0) > 0) { 
    remarks.push({ type: 'danger', text: `💳 Active Bale: ₱${Number(worker.baleValue).toLocaleString()}`, bg: '#fee2e2', color: '#991b1b', border: '#fca5a5' }); 
  } 

  if (remarks.length === 0) {
    if (metrics.daysWorked > 0) {
      remarks.push({ type: 'success', text: '✓ Normal Operations', bg: '#f0fdf4', color: '#166534', border: '#bbf7d0' });
    } else {
      remarks.push({ type: 'secondary', text: '⚪ Inactive / No Shifts', bg: '#f4f4f5', color: '#71717a', border: '#e4e4e7' });
    }
  }

  return remarks; 
} 

// --- STORE INITIALIZATION & PERSISTENCE ---
function initStore() { 
  const raw = safeStorageGet(STORAGE_KEY); 
  const rawPayroll = safeStorageGet(PAYROLL_STORAGE_KEY);

  if (rawPayroll) {
    try { payrollDB = JSON.parse(rawPayroll); } catch(e) { payrollDB = {}; }
  } else {
    payrollDB = {};
  }

  if (raw) { 
    try { timesheetDB = JSON.parse(raw); } catch (e) { timesheetDB = {}; } 
  } 

  const today = getTodayFormatted(); 
  if (!timesheetDB[today]) { 
    timesheetDB[today] = buildFreshLocationsData(); 
  } 

  currentDate = today; 
  currentActiveData = timesheetDB[currentDate]; 

  syncWeeklyPayrollRates(currentDate);

  const picker = document.getElementById("startDatePicker"); 
  if (picker) picker.value = currentDate; 

  checkAuth(); 
} 

function saveStore() { 
  if (currentDate && currentActiveData) { 
    timesheetDB[currentDate] = currentActiveData; 
  } 
  safeStorageSet(STORAGE_KEY, JSON.stringify(timesheetDB)); 
} 

function buildFreshLocationsData() { 
  const data = { locations: {}, roleBales: {} }; 
  const delSites = getDeletedSites(); 
  const delWorkers = getDeletedWorkers(); 

  for (let loc in INITIAL_LOCATIONS_DATA) { 
    if (delSites.includes(loc.toUpperCase())) continue; 

    data.locations[loc] = { 
      baleValue: INITIAL_LOCATIONS_DATA[loc].baleValue || 0, 
      isDone: false, 
      siteRemarksHistory: [], 
      updatedAt: Date.now(), 
      workers: [] 
    }; 

    const rolesObj = INITIAL_LOCATIONS_DATA[loc].roles; 
    for (let role in rolesObj) { 
      rolesObj[role].forEach((workerName, idx) => { 
        const workerId = `w_${loc.substring(0, 3)}_${role.substring(0, 3)}_${idx}_${Date.now()}`; 
        if (delWorkers.includes(workerId)) return; 

        data.locations[loc].workers.push({ 
          id: workerId, 
          name: workerName.trim().toUpperCase(), 
          role: role, 
          baleValue: 0, 
          notesHistory: [], 
          updatedAt: Date.now(), 
          attendance: { M: '', T: '', W: '', Th: '', F: '', S: '' }, 
          ot: { M: 0, T: 0, W: 0, Th: 0, F: 0, S: 0 } 
        }); 
      }); 
    } 
  } 
  return data; 
} 

function syncWeeklyPayrollRates(targetDateKey) {
  if (!payrollDB[targetDateKey]) payrollDB[targetDateKey] = {};
  
  const allRecordedDates = Object.keys(payrollDB).filter(d => d !== targetDateKey).sort().reverse();
  if (allRecordedDates.length === 0) return;

  const latestDateKey = allRecordedDates[0];
  const latestSitesData = payrollDB[latestDateKey] || {};

  for (let loc in latestSitesData) {
    if (!payrollDB[targetDateKey][loc]) payrollDB[targetDateKey][loc] = {};
    const locWorkersRates = latestSitesData[loc] || {};

    for (let wId in locWorkersRates) {
      if (!payrollDB[targetDateKey][loc][wId]) {
        payrollDB[targetDateKey][loc][wId] = { ...locWorkersRates[wId] };
      }
    }
  }
}

function checkHasRecordForDate(dKey) { 
  const dObj = timesheetDB[dKey]; 
  if (!dObj || !dObj.locations) return false; 
  for (let loc in dObj.locations) { 
    const workers = dObj.locations[loc].workers || []; 
    for (let w of workers) { 
      for (let k in (w.attendance || {})) { 
        if (w.attendance[k] && w.attendance[k] !== '') return true; 
      } 
      for (let k in (w.ot || {})) { 
        if (w.ot[k] > 0) return true; 
      } 
    } 
  } 
  return false; 
} 

// --- LOCATION DROPDOWN & SWITCHING ---
function renderLocationDropdown() { 
  const sel = document.getElementById("locationSelector"); 
  if (!sel) return; 
  sel.innerHTML = ""; 

  const delSites = getDeletedSites(); 
  const sites = Object.keys(currentActiveData.locations || {}).filter(s => !delSites.includes(s.toUpperCase())); 

  let html = `<option value="VIEW_ALL" ${currentLocation === "VIEW_ALL" ? "selected" : ""}>🌐 VIEW ALL LOCATIONS</option>`; 
  sites.forEach(loc => { 
    const isDone = !!(currentActiveData.locations[loc] && currentActiveData.locations[loc].isDone); 
    const mark = isDone ? "✓ " : ""; 
    const isSel = (loc === currentLocation); 
    html += `<option value="${loc}" ${isSel ? "selected" : ""}>${mark}${loc}</option>`; 
  }); 

  sel.innerHTML = html; 

  if (currentLocation !== "VIEW_ALL" && !sites.includes(currentLocation)) { 
    currentLocation = sites.length > 0 ? sites[0] : "VIEW_ALL"; 
    sel.value = currentLocation; 
  } 
} 

function switchLocation(newLoc) { 
  currentLocation = newLoc; 
  renderUI(); 
}

// --- RECORDED DATES DROPDOWN WITH PER-DATE DELETE BUTTONS ---
let targetDatePendingDeletion = null;

function renderRecordedDatesList() { 
  const cont = document.getElementById("recordedDatesContainer"); 
  if (!cont) return; 

  const recordedKeys = Object.keys(timesheetDB).filter(dKey => checkHasRecordForDate(dKey)); 
  if (recordedKeys.length === 0) { 
    cont.innerHTML = `
      <button class="btn btn-sm btn-outline-secondary fw-semibold py-1 px-2 disabled opacity-75" style="font-size: 0.8rem;">
        <i class="bi bi-clock-history me-1 text-danger"></i>No past recorded dates
      </button>
    `; 
    return; 
  } 

  recordedKeys.sort().reverse(); 

  const itemsHtml = recordedKeys.map(dKey => { 
    const isCurrent = (dKey === currentDate); 
    const dates = calculateDatesForStart(dKey); 
    const label = (dates.length > 0) ? getPeriodString(dates) : dKey; 

    return ` 
      <li class="px-2 py-1"> 
        <div class="d-flex align-items-center justify-content-between p-1 rounded-2 border ${isCurrent ? 'bg-danger text-white border-danger shadow-xs' : 'bg-white border-secondary border-opacity-25 dropdown-item-hover'}"> 
          <button type="button" class="btn btn-sm text-start flex-grow-1 p-1 border-0 ${isCurrent ? 'text-white fw-bold' : 'text-dark fw-semibold'}" 
                  onclick="selectRecordedDate('${dKey}')" style="font-size: 0.82rem;"> 
            <div class="d-flex align-items-center gap-1">
              <i class="bi ${isCurrent ? 'bi-check-circle-fill text-white' : 'bi-calendar3 text-danger'} me-1"></i>
              <span>${label}</span>
            </div>
            <small class="${isCurrent ? 'text-white-50' : 'text-muted'} d-block ps-3" style="font-size: 0.7rem;">Week Key: ${dKey}</small>
          </button> 
          <button type="button" class="btn btn-sm py-1 px-2 border-0 rounded-circle ${isCurrent ? 'btn-outline-light text-white' : 'btn-outline-danger'}" 
                  title="Delete record for this week" 
                  onclick="event.stopPropagation(); promptDeleteRecordedDate('${dKey}', '${label.replace(/'/g, "\\'")}')"> 
            <i class="bi bi-trash3-fill" style="font-size: 0.82rem;"></i> 
          </button> 
        </div> 
      </li> 
    `; 
  }).join(''); 

  cont.innerHTML = ` 
    <div class="dropdown d-inline-block"> 
      <button class="btn btn-sm btn-dark dropdown-toggle fw-bold d-inline-flex align-items-center shadow-sm py-1 px-3 border border-secondary" 
              type="button" id="recordedDatesDropdownBtn" data-bs-toggle="dropdown" aria-expanded="false" 
              style="font-size: 0.82rem; background-color: #18181b;"> 
        <i class="bi bi-clock-history text-danger me-1"></i> 
        <span>Past Records</span> 
        <span class="badge bg-danger ms-2 px-1 py-0">${recordedKeys.length}</span> 
      </button> 
      <ul class="dropdown-menu dropdown-menu-start shadow-lg border-danger border-2 p-1" 
          style="max-height: 380px; overflow-y: auto; min-width: 320px; z-index: 1060;" 
          aria-labelledby="recordedDatesDropdownBtn"> 
        <li class="dropdown-header text-uppercase fw-bold text-dark small py-1 px-2 d-flex justify-content-between align-items-center border-bottom mb-1"> 
          <span><i class="bi bi-calendar-check-fill text-danger me-1"></i>Recorded Weeks (${recordedKeys.length})</span> 
          <span class="text-muted" style="font-size: 0.68rem;">Tap to open &bull; Trash to delete</span> 
        </li> 
        ${itemsHtml} 
      </ul> 
    </div> 
  `; 
} 

function selectRecordedDate(dateKey) { 
  saveStore(); 
  currentDate = dateKey; 
  currentActiveData = timesheetDB[currentDate]; 
  const picker = document.getElementById("startDatePicker"); 
  if (picker) picker.value = currentDate; 
  syncWeeklyPayrollRates(currentDate);
  renderLocationDropdown(); 
  renderRecordedDatesList();
  renderUI(); 
} 

// --- ROLE FILTER BUTTONS ---
function renderRoleFilterButtons() { 
  const cont = document.getElementById("roleFilterButtons"); 
  if (!cont) return; 

  let html = ` 
    <button class="btn btn-sm ${selectedRolesFilter.length === 0 ? 'btn-danger' : 'btn-outline-dark'} fw-bold px-2 py-0" 
            onclick="clearRoleFilters()">ALL</button> 
  `; 

  ALL_ROLES.forEach(r => { 
    const isSel = selectedRolesFilter.includes(r); 
    html += ` 
      <button class="btn btn-sm ${isSel ? 'btn-danger' : 'btn-outline-dark'} fw-semibold px-2 py-0" 
              onclick="toggleRoleFilter('${r}')">${r}</button> 
    `; 
  }); 

  cont.innerHTML = html; 
} 

function toggleRoleFilter(role) { 
  if (selectedRolesFilter.includes(role)) { 
    selectedRolesFilter = selectedRolesFilter.filter(r => r !== role); 
  } else { 
    selectedRolesFilter.push(role); 
  } 
  renderRoleFilterButtons(); 
  renderUI(); 
} 

function clearRoleFilters() { 
  selectedRolesFilter = []; 
  renderRoleFilterButtons(); 
  renderUI(); 
} 

function toggleStatsView() { 
  showStatsFlag = !showStatsFlag; 
  renderUI(); 
} 

// --- HEADER CONTROLS (BALE, CONTROLS, SUMMARY) ---
function renderLocationHeaderControls() {
  const baleCont = document.getElementById("locationBaleContainer");
  const dateRangeSummary = document.getElementById("dateRangeSummary");
  const siteControl = document.getElementById("siteControlContainer");
  const dates = getCalculatedDates();
  const dateRangeStr = (dates.length > 0) 
    ? `${dates[0].monthStr} ${dates[0].dayNum} - ${dates[dates.length - 1].monthStr} ${dates[dates.length - 1].dayNum}` 
    : currentDate;

  if (dateRangeSummary) {
    dateRangeSummary.innerHTML = `<i class="bi bi-calendar-range me-1 text-danger"></i>Current Period: <strong>${dateRangeStr}</strong>`;
  }

  const isAdm = isAdmin();

  if (baleCont) {
    if (currentLocation === "VIEW_ALL") {
      baleCont.innerHTML = `
        <span class="badge bg-danger fs-6"><i class="bi bi-globe me-1"></i>ALL SITES OVERVIEW</span>
      `;
    } else {
      const locData = (currentActiveData.locations && currentActiveData.locations[currentLocation]) || { baleValue: 0, isDone: false };
      baleCont.innerHTML = `
        <span class="badge bg-dark fs-6"><i class="bi bi-building me-1 text-danger"></i>${currentLocation}</span>
        <span class="badge ${locData.isDone ? 'bg-success' : 'bg-warning text-dark'}">${locData.isDone ? '✓ COMPLETED' : '⏱ IN PROGRESS'}</span>
        <div class="input-group input-group-sm" style="max-width: 170px;">
          <span class="input-group-text fw-bold bg-light text-danger">Site Bale ₱</span>
          <input type="number" step="any" class="form-control fw-bold text-end" value="${locData.baleValue || ''}" placeholder="0" onchange="updateLocationBale(this.value)">
        </div>
      `;
    }
  }

  if (siteControl) {
    siteControl.innerHTML = `
      <div class="d-flex align-items-center justify-content-xl-end gap-2 flex-wrap">
        ${isAdm ? `
          <button class="btn btn-outline-danger btn-sm fw-bold" onclick="showCreateProjectModal()">
            <i class="bi bi-plus-circle-fill me-1"></i>New Site
          </button>
        ` : ''}
        <button class="btn btn-danger btn-sm fw-bold shadow-sm" onclick="toggleStatsView()"><i class="bi bi-pie-chart-fill me-1"></i>Site Analytics</button>
        <button class="btn btn-outline-dark btn-sm fw-bold" onclick="promptClearRecords()">
          <i class="bi bi-arrow-counterclockwise text-danger me-1"></i>Clear Site Records
        </button>
        <button class="btn btn-outline-secondary btn-sm fw-bold" onclick="promptDeleteRecordedDate()">
          <i class="bi bi-calendar-x text-danger me-1"></i>Delete Period
        </button>
      </div>
    `;
  }
}

// --- SITE STATS & ANALYTICS ---
let selectedAnalyticsSite = null;

function toggleStatsView() { 
  showStatsFlag = !showStatsFlag; 
  renderUI();
  if (showStatsFlag) {
    setTimeout(() => {
      const statsContainer = document.getElementById("siteStatsContainer");
      if (statsContainer) {
        statsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }
}

function updateSiteRemarks(loc, text) {
  if (currentActiveData.locations && currentActiveData.locations[loc]) {
    currentActiveData.locations[loc].remarks = text || '';
    saveStore();
  }
}

function switchAnalyticsSiteRemarks(siteName) {
  selectedAnalyticsSite = siteName;
  const textarea = document.getElementById("analyticsSiteRemarksField");
  if (textarea && currentActiveData.locations[siteName]) {
    textarea.value = currentActiveData.locations[siteName].remarks || '';
  }
  const msgEl = document.getElementById("analyticsSiteSavedMsg");
  if (msgEl) {
    msgEl.innerText = `Loaded notes for ${siteName}`;
    msgEl.className = "small text-muted";
  }
}

function saveAnalyticsSiteRemarks(text, showToast = false) {
  const delSites = getDeletedSites();
  const availableSites = Object.keys(currentActiveData.locations || {}).filter(s => !delSites.includes(s.toUpperCase()));
  const site = selectedAnalyticsSite || (currentLocation !== "VIEW_ALL" ? currentLocation : availableSites[0]);
  if (!site || !currentActiveData.locations[site]) return;
  currentActiveData.locations[site].remarks = text || '';
  saveStore();
  const msgEl = document.getElementById("analyticsSiteSavedMsg");
  if (msgEl) {
    msgEl.innerText = `✓ Saved notes for ${site}!`;
    msgEl.className = "small text-success fw-bold";
    setTimeout(() => {
      if (msgEl) {
        msgEl.innerText = "Auto-saves as you type";
        msgEl.className = "small text-muted";
      }
    }, 2500);
  }
  if (showToast) {
    alert(`Site notes saved successfully for ${site}!`);
  }
}

function appendAnalyticsPresetTag(tag) {
  const textarea = document.getElementById("analyticsSiteRemarksField");
  if (!textarea) return;
  const current = textarea.value.trim();
  textarea.value = current ? `${current}\n• ${tag}` : `• ${tag}`;
  saveAnalyticsSiteRemarks(textarea.value);
}

// --- INDIVIDUAL WORKER ATTENDANCE GRAPHS & PERCENTAGES ---
let currentAnalyticsWorkersData = [];
let workerGraphSearchQuery = "";
let workerGraphSortOrder = "att_desc";

function renderSingleWorkerGraphCard(w) {
  const borderClass = w.attPct >= 80 ? 'border-success' : (w.attPct >= 50 ? 'border-primary' : 'border-danger');
  const badgeClass = w.attPct >= 80 ? 'bg-success' : (w.attPct >= 50 ? 'bg-primary' : 'bg-danger');
  const strokeColor = w.attPct >= 80 ? '#198754' : (w.attPct >= 50 ? '#0d6efd' : '#dc3545');

  // Day pills HTML
  const dayPills = (w.dayStatuses || []).map(d => `
    <div class="text-center p-1 rounded border bg-light flex-fill" style="min-width: 44px;">
      <div class="text-muted fw-bold" style="font-size: 0.62rem;">${d.key}</div>
      <span class="badge ${d.badgeClass} d-block my-1" style="font-size: 0.68rem; padding: 2px 3px;">${d.label}</span>
      <div style="font-size: 0.62rem;" class="${d.ot > 0 ? 'text-danger fw-bold' : 'text-muted'}">${d.ot > 0 ? `+${d.ot}h` : '0h'}</div>
    </div>
  `).join('');

  return `
    <div class="card p-3 mb-2 bg-white border-start ${borderClass} border-4 shadow-sm hover-bg-light transition-all">
      <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
        <div class="d-flex align-items-center gap-2 flex-wrap">
          <!-- CIRCULAR PERCENTAGE DONUT GAUGE -->
          <div class="position-relative d-inline-flex justify-content-center align-items-center" style="width: 46px; height: 46px; flex-shrink: 0;">
            <svg viewBox="0 0 36 36" class="w-100 h-100" style="transform: rotate(-90deg);">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e9ecef" stroke-width="4.5" />
              <path stroke-dasharray="${w.attPct}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="${strokeColor}" stroke-width="4.5" />
            </svg>
            <div class="position-absolute text-center">
              <span class="fw-bold" style="font-size: 0.68rem; color: ${strokeColor};">${w.attPct}%</span>
            </div>
          </div>

          <div>
            <div class="d-flex align-items-center gap-2 flex-wrap">
              <span class="fw-bold text-dark fs-6 cursor-pointer" onclick="openWorkerProfileModal('${w.id}', '${w.name.replace(/'/g, "\\'")}')" title="View Full Worker Profile">${w.name}</span>
              <span class="badge bg-dark">${w.role}</span>
              <span class="badge bg-light text-muted border">${w.loc}</span>
            </div>
            ${w.remarks ? `<small class="text-muted fst-italic d-block mt-1" style="font-size: 0.75rem;"><i class="bi bi-chat-left-quote me-1"></i>"${w.remarks}"</small>` : ''}
          </div>
        </div>

        <div class="d-flex align-items-center gap-2">
          <div class="text-end">
            <span class="badge ${badgeClass} fs-6 fw-bold px-2 py-1">${w.attPct}% Attendance</span>
            <div class="text-muted" style="font-size: 0.72rem;">${w.daysWorked.toFixed(1)} / 6.0 Days</div>
          </div>
          <button type="button" class="btn btn-outline-danger btn-sm py-1 px-2" onclick="openWorkerProfileModal('${w.id}', '${w.name.replace(/'/g, "\\'")}')" title="Detailed Worker Profile & History">
            <i class="bi bi-graph-up me-1"></i>Profile
          </button>
        </div>
      </div>

      <!-- VISUAL ATTENDANCE PROGRESS GRAPH -->
      <div class="mb-2">
        <div class="d-flex justify-content-between align-items-center small text-muted mb-1" style="font-size: 0.75rem;">
          <span><i class="bi bi-bar-chart-steps text-danger me-1"></i>Shift & Attendance Distribution Graph:</span>
          <span><strong>${w.daysWorked.toFixed(1)}d</strong> worked &bull; <strong>${w.totalOT}h</strong> OT</span>
        </div>
        <div class="progress" style="height: 13px; border-radius: 6px; background-color: #e9ecef; overflow: hidden;">
          ${w.pFullW > 0 ? `<div class="progress-bar bg-success" style="width: ${w.pFullW}%;" title="Full Days: ${w.wFull} (${w.pFullW.toFixed(0)}%)"></div>` : ''}
          ${w.pHalfW > 0 ? `<div class="progress-bar bg-primary" style="width: ${w.pHalfW}%;" title="Half Days: ${w.wHalf} (${w.pHalfW.toFixed(0)}%)"></div>` : ''}
          ${w.pHourlyW > 0 ? `<div class="progress-bar" style="width: ${w.pHourlyW}%; background-color: #6f42c1;" title="Hourly: ${w.wHourly} (${w.pHourlyW.toFixed(0)}%)"></div>` : ''}
          ${w.pAbsentW > 0 ? `<div class="progress-bar bg-danger" style="width: ${w.pAbsentW}%;" title="Absences: ${w.wAbsent} (${w.pAbsentW.toFixed(0)}%)"></div>` : ''}
          ${w.pSickW > 0 ? `<div class="progress-bar bg-warning text-dark" style="width: ${w.pSickW}%;" title="Sick Leave: ${w.wSick} (${w.pSickW.toFixed(0)}%)"></div>` : ''}
          ${w.pEmergencyW > 0 ? `<div class="progress-bar" style="width: ${w.pEmergencyW}%; background-color: #fd7e14;" title="Emergency: ${w.wEmergency} (${w.pEmergencyW.toFixed(0)}%)"></div>` : ''}
        </div>
        <div class="d-flex justify-content-between align-items-center mt-1 text-muted" style="font-size: 0.68rem;">
          <span>0%</span>
          <span>50%</span>
          <span>100% Target Attendance</span>
        </div>
      </div>

      <!-- 6-DAY SHIFTS TIMELINE & KEY METRICS -->
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 pt-2 border-top mt-1">
        <div class="d-flex gap-1 flex-wrap flex-grow-1" style="max-width: 520px;">
          ${dayPills}
        </div>
        <div class="d-flex align-items-center gap-3 ms-auto small">
          <div><span class="text-muted">Overtime:</span> <strong class="${w.totalOT > 0 ? 'text-danger' : 'text-dark'}">${w.totalOT} hrs</strong></div>
          <div><span class="text-muted">Bale Advance:</span> <strong class="${w.bale > 0 ? 'text-danger' : 'text-dark'}">₱${w.bale.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></div>
        </div>
      </div>
    </div>
  `;
}

function filterWorkerGraphs(query, sortBy) {
  if (query !== undefined) workerGraphSearchQuery = query;
  if (sortBy !== undefined) workerGraphSortOrder = sortBy;
  
  const container = document.getElementById("workerGraphsListContainer");
  const countBadge = document.getElementById("workerGraphsCountBadge");
  if (!container) return;
  
  let list = [...currentAnalyticsWorkersData];
  
  if (workerGraphSearchQuery) {
    const q = workerGraphSearchQuery.toLowerCase().trim();
    list = list.filter(w => 
      (w.name || '').toLowerCase().includes(q) || 
      (w.role || '').toLowerCase().includes(q) || 
      (w.loc || '').toLowerCase().includes(q) ||
      (w.remarks || '').toLowerCase().includes(q)
    );
  }
  
  if (workerGraphSortOrder === "att_desc") {
    list.sort((a, b) => b.attPct - a.attPct || b.daysWorked - a.daysWorked);
  } else if (workerGraphSortOrder === "att_asc") {
    list.sort((a, b) => a.attPct - b.attPct || a.daysWorked - b.daysWorked);
  } else if (workerGraphSortOrder === "ot_desc") {
    list.sort((a, b) => b.totalOT - a.totalOT);
  } else if (workerGraphSortOrder === "bale_desc") {
    list.sort((a, b) => b.bale - a.bale);
  } else if (workerGraphSortOrder === "name_asc") {
    list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  }
  
  if (countBadge) countBadge.innerText = `${list.length} Workers Analyzed`;
  
  if (list.length === 0) {
    container.innerHTML = `<div class="alert alert-light text-muted text-center py-4">No workers matching "${workerGraphSearchQuery}".</div>`;
    return;
  }
  
  container.innerHTML = list.map(w => renderSingleWorkerGraphCard(w)).join("");
}

function renderSiteStats(container) { 
  if (!container) return; 
  container.className = "card card-custom p-3 p-md-4 mb-3 bg-white border-start border-danger border-4 shadow-sm"; 

  const dates = getCalculatedDates();
  const isViewAll = (currentLocation === "VIEW_ALL");
  const delSites = getDeletedSites();
  const sitesToProcess = isViewAll 
    ? Object.keys(currentActiveData.locations || {}).filter(s => !delSites.includes(s.toUpperCase()))
    : [currentLocation];

  let totalHeadcount = 0; 
  let activeWorkersCount = 0;
  let totalDays = 0; 
  let totalHourly = 0;
  let totalOT = 0; 
  let totalWorkerBale = 0; 
  let totalSiteBale = 0;
  let fullDaysCount = 0;
  let halfDaysCount = 0;
  let hourlyDaysCount = 0;
  let absentDaysCount = 0;
  let sickDaysCount = 0;
  let emergencyDaysCount = 0;
  let totalExpectedShifts = 0;

  const roleCounts = {};
  const automatedWorkersList = [];
  const workerRemarksList = [];
  const allWorkersData = [];

  sitesToProcess.forEach(loc => {
    const locData = currentActiveData.locations[loc];
    if (!locData) return;
    totalSiteBale += (locData.baleValue || 0);

    const workers = locData.workers || [];
    totalHeadcount += workers.length;

    workers.forEach(w => {
      const m = getWorkerMetrics(w);
      if (m.daysWorked > 0 || m.hourlyHours > 0 || m.totalOT > 0) activeWorkersCount++;
      totalDays += m.daysWorked;
      totalHourly += m.hourlyHours;
      totalOT += m.totalOT;
      totalWorkerBale += (w.baleValue || 0);

      // Role distribution
      const r = w.role || 'LABOR';
      if (!roleCounts[r]) roleCounts[r] = { count: 0, days: 0 };
      roleCounts[r].count++;
      roleCounts[r].days += m.daysWorked;

      // Attendance tally
      let wFull = 0;
      let wHalf = 0;
      let wHourly = 0;
      let wAbsent = 0;
      let wSick = 0;
      let wEmergency = 0;
      const dayStatuses = [];

      dates.forEach(d => {
        totalExpectedShifts++;
        const att = (w.attendance && w.attendance[d.key]) || '';
        const ot = (w.overtime && w.overtime[d.key]) || 0;
        let label = '-';
        let badgeClass = 'bg-light text-muted border';

        if (att === '1.0' || att === '1') {
          fullDaysCount++;
          wFull++;
          label = '1.0';
          badgeClass = 'bg-success text-white';
        } else if (att === '0.5') {
          halfDaysCount++;
          wHalf++;
          label = '0.5';
          badgeClass = 'bg-primary text-white';
        } else if (String(att).endsWith('h')) {
          hourlyDaysCount++;
          wHourly++;
          label = att;
          badgeClass = 'text-white" style="background-color: #6f42c1;';
        } else if (att === 'absent') {
          absentDaysCount++;
          wAbsent++;
          label = 'A';
          badgeClass = 'bg-danger text-white';
        } else if (att === 'sick') {
          sickDaysCount++;
          wSick++;
          label = 'S';
          badgeClass = 'bg-warning text-dark';
        } else if (att === 'emergency') {
          emergencyDaysCount++;
          wEmergency++;
          label = 'E';
          badgeClass = 'text-white" style="background-color: #fd7e14;';
        }

        dayStatuses.push({
          key: d.key,
          dayNum: d.dayNum,
          label: label,
          badgeClass: badgeClass,
          ot: ot
        });
      });

      const totalPeriodDays = dates.length || 6;
      const attPct = totalPeriodDays > 0 ? Math.min(100, Math.round(((wFull + (wHalf * 0.5)) / totalPeriodDays) * 100)) : 0;
      const pFullW = totalPeriodDays > 0 ? ((wFull / totalPeriodDays) * 100) : 0;
      const pHalfW = totalPeriodDays > 0 ? ((wHalf / totalPeriodDays) * 100) : 0;
      const pHourlyW = totalPeriodDays > 0 ? ((wHourly / totalPeriodDays) * 100) : 0;
      const pAbsentW = totalPeriodDays > 0 ? ((wAbsent / totalPeriodDays) * 100) : 0;
      const pSickW = totalPeriodDays > 0 ? ((wSick / totalPeriodDays) * 100) : 0;
      const pEmergencyW = totalPeriodDays > 0 ? ((wEmergency / totalPeriodDays) * 100) : 0;

      allWorkersData.push({
        id: w.id,
        name: w.name,
        role: w.role || 'LABOR',
        loc: loc,
        daysWorked: m.daysWorked,
        totalOT: m.totalOT,
        bale: w.baleValue || 0,
        attPct: attPct,
        wFull: wFull,
        wHalf: wHalf,
        wHourly: wHourly,
        wAbsent: wAbsent,
        wSick: wSick,
        wEmergency: wEmergency,
        pFullW: pFullW,
        pHalfW: pHalfW,
        pHourlyW: pHourlyW,
        pAbsentW: pAbsentW,
        pSickW: pSickW,
        pEmergencyW: pEmergencyW,
        dayStatuses: dayStatuses,
        remarks: w.remarks || '',
        notesHistory: w.notesHistory || []
      });

      // Automated worker notes & alerts
      const autoNotes = getWorkerAutomatedRemarks(w);
      if (autoNotes.length > 0 || m.daysWorked >= 6 || m.totalOT >= 6 || (w.baleValue || 0) >= 1000) {
        automatedWorkersList.push({
          id: w.id,
          name: w.name,
          role: w.role,
          loc: loc,
          flags: autoNotes,
          daysWorked: m.daysWorked,
          totalOT: m.totalOT,
          bale: w.baleValue || 0
        });
      }

      // Worker custom remarks
      if (w.remarks || (w.notesHistory && w.notesHistory.length > 0)) {
        workerRemarksList.push({
          id: w.id,
          name: w.name,
          role: w.role,
          loc: loc,
          remarks: w.remarks || '',
          notesCount: (w.notesHistory || []).length
        });
      }
    });
  });

  currentAnalyticsWorkersData = allWorkersData;

  const grandBale = totalSiteBale + totalWorkerBale; 
  const totalLoggedShifts = fullDaysCount + halfDaysCount + hourlyDaysCount + absentDaysCount + sickDaysCount + emergencyDaysCount;
  const attendanceRate = totalExpectedShifts > 0 
    ? Math.round(((fullDaysCount + (halfDaysCount * 0.5)) / totalExpectedShifts) * 100) 
    : (totalLoggedShifts > 0 ? Math.round(((fullDaysCount + (halfDaysCount * 0.5)) / totalLoggedShifts) * 100) : 0);

  // SVG Pie Circle Slices Calculation (Donut)
  const pFull = totalLoggedShifts > 0 ? ((fullDaysCount / totalLoggedShifts) * 100) : 0;
  const pHalf = totalLoggedShifts > 0 ? ((halfDaysCount / totalLoggedShifts) * 100) : 0;
  const pHourly = totalLoggedShifts > 0 ? ((hourlyDaysCount / totalLoggedShifts) * 100) : 0;
  const pAbsent = totalLoggedShifts > 0 ? ((absentDaysCount / totalLoggedShifts) * 100) : 0;
  const pSick = totalLoggedShifts > 0 ? ((sickDaysCount / totalLoggedShifts) * 100) : 0;
  const pEmergency = totalLoggedShifts > 0 ? ((emergencyDaysCount / totalLoggedShifts) * 100) : 0;

  const off1 = 0;
  const off2 = -pFull;
  const off3 = -(pFull + pHalf);
  const off4 = -(pFull + pHalf + pHourly);
  const off5 = -(pFull + pHalf + pHourly + pAbsent);
  const off6 = -(pFull + pHalf + pHourly + pAbsent + pSick);

  // Active site for site notes panel
  const activeSiteForNotes = selectedAnalyticsSite && sitesToProcess.includes(selectedAnalyticsSite) 
    ? selectedAnalyticsSite 
    : (sitesToProcess.length > 0 ? sitesToProcess[0] : "");
  const activeSiteData = activeSiteForNotes && currentActiveData.locations[activeSiteForNotes] 
    ? currentActiveData.locations[activeSiteForNotes] 
    : { remarks: '' };

  let rolePillsHtml = '';
  for (let r in roleCounts) {
    rolePillsHtml += `
      <div class="col-6 col-sm-4 col-md-2">
        <div class="p-2 border rounded bg-light text-center shadow-xs">
          <small class="text-muted fw-bold d-block text-truncate">${r}</small>
          <span class="fs-6 fw-bold text-dark">${roleCounts[r].count} <small class="text-muted">(${roleCounts[r].days.toFixed(1)}d)</small></span>
        </div>
      </div>
    `;
  }

  container.innerHTML = ` 
    <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom flex-wrap gap-2"> 
      <div>
        <h5 class="fw-bold text-dark mb-0">
          <i class="bi bi-pie-chart-fill text-danger me-2"></i>Workforce Analytics & Site Health Dashboard
        </h5>
        <small class="text-muted">
          Comprehensive project metrics, overall attendance pie chart, automated worker notes, and supervisor logs for <strong>${isViewAll ? 'All Active Sites (' + sitesToProcess.length + ')' : currentLocation}</strong>.
        </small>
      </div>
      <div class="d-flex align-items-center gap-2">
        <button type="button" class="btn btn-outline-danger btn-sm fw-bold" onclick="generatePDF('download', false, true)">
          <i class="bi bi-file-earmark-pdf-fill me-1"></i>Export Analytics PDF
        </button>
        <button type="button" class="btn btn-secondary btn-sm fw-bold px-3" onclick="toggleStatsView()">
          <i class="bi bi-x-lg me-1"></i>Close
        </button> 
      </div>
    </div> 

    <!-- STAT CARDS ROW (Using .analytics-stat-card & .analytics-stat-val) -->
    <div class="row g-2 mb-3"> 
      <div class="col-6 col-md-3"> 
        <div class="analytics-stat-card shadow-sm border-start border-primary border-3"> 
          <small class="text-muted fw-bold d-block text-uppercase">Total Headcount</small> 
          <div class="analytics-stat-val text-dark">${totalHeadcount}</div> 
          <small class="text-muted">${activeWorkersCount} Active this period</small>
        </div> 
      </div> 
      <div class="col-6 col-md-3"> 
        <div class="analytics-stat-card shadow-sm border-start border-success border-3"> 
          <small class="text-muted fw-bold d-block text-uppercase">Attendance Rate</small> 
          <div class="analytics-stat-val text-success">${attendanceRate}%</div> 
          <small class="text-muted">${totalDays.toFixed(1)} Days ${totalHourly > 0 ? '(+' + totalHourly + 'h)' : ''}</small>
        </div> 
      </div> 
      <div class="col-6 col-md-3"> 
        <div class="analytics-stat-card shadow-sm border-start border-danger border-3"> 
          <small class="text-muted fw-bold d-block text-uppercase">Total Overtime</small> 
          <div class="analytics-stat-val text-danger">${totalOT} hrs</div> 
          <small class="text-muted">Across all logged shifts</small>
        </div> 
      </div> 
      <div class="col-6 col-md-3"> 
        <div class="analytics-stat-card shadow-sm border-start border-warning border-3"> 
          <small class="text-muted fw-bold d-block text-uppercase">Total Cash Advance</small> 
          <div class="analytics-stat-val text-warning text-dark">₱${grandBale.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div> 
          <small class="text-muted">Site Bale + Worker Bale</small>
        </div> 
      </div> 
    </div> 

    <!-- PIE CIRCLE OF DATA OVERALL (CIRCULAR DONUT CHART + BREAKDOWN) -->
    <div class="card p-3 p-md-4 mb-3 bg-light border shadow-sm">
      <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom flex-wrap gap-2">
        <div>
          <h6 class="fw-bold text-dark mb-0">
            <i class="bi bi-pie-chart-fill text-danger me-2"></i>Overall Workforce Shift & Attendance Distribution
          </h6>
          <small class="text-muted">Visual breakdown of all logged worker shifts for this period</small>
        </div>
        <span class="badge bg-dark fs-6 px-3 py-2">${totalLoggedShifts} Logged Shifts</span>
      </div>

      <div class="row align-items-center g-3">
        <!-- SVG CIRCULAR PIE / DONUT CHART WITH CENTER METRICS -->
        <div class="col-12 col-md-5 col-lg-4 text-center">
          <div class="position-relative d-inline-flex justify-content-center align-items-center" style="width: 190px; height: 190px;">
            <svg viewBox="0 0 42 42" class="w-100 h-100" style="transform: rotate(-90deg);">
              <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#e9ecef" stroke-width="5.5"></circle>
              ${totalLoggedShifts === 0 ? `
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#ced4da" stroke-width="5.5" stroke-dasharray="100 0"></circle>
              ` : `
                ${pFull > 0 ? `<circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#198754" stroke-width="5.5" stroke-dasharray="${pFull} ${100 - pFull}" stroke-dashoffset="${off1}"></circle>` : ''}
                ${pHalf > 0 ? `<circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#0d6efd" stroke-width="5.5" stroke-dasharray="${pHalf} ${100 - pHalf}" stroke-dashoffset="${off2}"></circle>` : ''}
                ${pHourly > 0 ? `<circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#6f42c1" stroke-width="5.5" stroke-dasharray="${pHourly} ${100 - pHourly}" stroke-dashoffset="${off3}"></circle>` : ''}
                ${pAbsent > 0 ? `<circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#dc3545" stroke-width="5.5" stroke-dasharray="${pAbsent} ${100 - pAbsent}" stroke-dashoffset="${off4}"></circle>` : ''}
                ${pSick > 0 ? `<circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#ffc107" stroke-width="5.5" stroke-dasharray="${pSick} ${100 - pSick}" stroke-dashoffset="${off5}"></circle>` : ''}
                ${pEmergency > 0 ? `<circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#fd7e14" stroke-width="5.5" stroke-dasharray="${pEmergency} ${100 - pEmergency}" stroke-dashoffset="${off6}"></circle>` : ''}
              `}
            </svg>
            <div class="position-absolute text-center" style="pointer-events: none;">
              <div class="fw-bold text-dark fs-2 lh-1">${attendanceRate}%</div>
              <div class="text-muted text-uppercase fw-bold mt-1" style="font-size: 0.65rem; letter-spacing: 0.5px;">Attendance</div>
              <div class="text-muted" style="font-size: 0.65rem;">${totalDays.toFixed(1)} Days Worked</div>
            </div>
          </div>
          <div class="small text-muted mt-2">Overall Shift Distribution Ring</div>
        </div>

        <!-- PIE SLICES LEGEND & METRIC DETAILS -->
        <div class="col-12 col-md-7 col-lg-8">
          <div class="row g-2">
            <div class="col-6 col-sm-4">
              <div class="p-2 bg-white rounded border border-start border-success border-3">
                <div class="d-flex justify-content-between align-items-center">
                  <span class="small fw-bold text-success"><i class="bi bi-check-circle-fill me-1"></i>Full Days</span>
                  <span class="badge bg-success">${pFull.toFixed(1)}%</span>
                </div>
                <div class="fs-5 fw-bold text-dark mt-1">${fullDaysCount} <small class="text-muted fs-6">shifts</small></div>
              </div>
            </div>

            <div class="col-6 col-sm-4">
              <div class="p-2 bg-white rounded border border-start border-primary border-3">
                <div class="d-flex justify-content-between align-items-center">
                  <span class="small fw-bold text-primary"><i class="bi bi-circle-half me-1"></i>Half Days</span>
                  <span class="badge bg-primary">${pHalf.toFixed(1)}%</span>
                </div>
                <div class="fs-5 fw-bold text-dark mt-1">${halfDaysCount} <small class="text-muted fs-6">shifts</small></div>
              </div>
            </div>

            <div class="col-6 col-sm-4">
              <div class="p-2 bg-white rounded border border-start border-3" style="border-left-color: #6f42c1 !important;">
                <div class="d-flex justify-content-between align-items-center">
                  <span class="small fw-bold" style="color: #6f42c1;"><i class="bi bi-clock-history me-1"></i>Hourly</span>
                  <span class="badge text-white" style="background-color: #6f42c1;">${pHourly.toFixed(1)}%</span>
                </div>
                <div class="fs-5 fw-bold text-dark mt-1">${hourlyDaysCount} <small class="text-muted fs-6">(${totalHourly}h)</small></div>
              </div>
            </div>

            <div class="col-6 col-sm-4">
              <div class="p-2 bg-white rounded border border-start border-danger border-3">
                <div class="d-flex justify-content-between align-items-center">
                  <span class="small fw-bold text-danger"><i class="bi bi-x-circle-fill me-1"></i>Absences</span>
                  <span class="badge bg-danger">${pAbsent.toFixed(1)}%</span>
                </div>
                <div class="fs-5 fw-bold text-dark mt-1">${absentDaysCount} <small class="text-muted fs-6">days</small></div>
              </div>
            </div>

            <div class="col-6 col-sm-4">
              <div class="p-2 bg-white rounded border border-start border-warning border-3">
                <div class="d-flex justify-content-between align-items-center">
                  <span class="small fw-bold text-warning text-dark"><i class="bi bi-bandaid me-1"></i>Sick Leave</span>
                  <span class="badge bg-warning text-dark">${pSick.toFixed(1)}%</span>
                </div>
                <div class="fs-5 fw-bold text-dark mt-1">${sickDaysCount} <small class="text-muted fs-6">days</small></div>
              </div>
            </div>

            <div class="col-6 col-sm-4">
              <div class="p-2 bg-white rounded border border-start border-3" style="border-left-color: #fd7e14 !important;">
                <div class="d-flex justify-content-between align-items-center">
                  <span class="small fw-bold" style="color: #d65b00;"><i class="bi bi-exclamation-triangle-fill me-1"></i>Emergency</span>
                  <span class="badge text-white" style="background-color: #fd7e14;">${pEmergency.toFixed(1)}%</span>
                </div>
                <div class="fs-5 fw-bold text-dark mt-1">${emergencyDaysCount} <small class="text-muted fs-6">days</small></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ROLE TRADE DISTRIBUTION -->
    <div class="mb-3">
      <h6 class="fw-bold small text-dark mb-2"><i class="bi bi-people-fill text-danger me-1"></i>Position / Role Trade Distribution:</h6>
      <div class="row g-2">
        ${rolePillsHtml || '<div class="col-12 text-muted small">No workers found.</div>'}
      </div>
    </div>

    <!-- INDIVIDUAL WORKER ATTENDANCE GRAPHS & PERCENTAGES -->
    <div class="card p-3 p-md-4 mb-3 bg-light border shadow-sm">
      <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom flex-wrap gap-2">
        <div>
          <h6 class="fw-bold text-dark mb-0">
            <i class="bi bi-bar-chart-line-fill text-danger me-2"></i>Individual Worker Attendance Graphs & Percentages
          </h6>
          <small class="text-muted">Individual worker visual attendance graph, percentage rate, daily shift pills, and overtime</small>
        </div>
        <div class="d-flex align-items-center gap-2 flex-wrap">
          <span id="workerGraphsCountBadge" class="badge bg-danger fs-6 px-3 py-2">${allWorkersData.length} Workers Analyzed</span>
        </div>
      </div>

      <!-- SEARCH & SORT CONTROLS -->
      <div class="row g-2 mb-3">
        <div class="col-12 col-md-6">
          <div class="input-group input-group-sm shadow-xs">
            <span class="input-group-text bg-white"><i class="bi bi-search text-muted"></i></span>
            <input type="text" id="workerGraphSearchInput" class="form-control form-control-sm" 
                   placeholder="Search worker by name, trade/role, site, or remarks..." 
                   oninput="filterWorkerGraphs(this.value, undefined)">
            <button class="btn btn-outline-secondary" type="button" onclick="const input = document.getElementById('workerGraphSearchInput'); if (input) { input.value = ''; filterWorkerGraphs('', undefined); }">Clear</button>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="d-flex align-items-center justify-content-md-end gap-2">
            <label for="workerGraphSortSelect" class="small text-muted fw-bold mb-0 text-nowrap">Sort By:</label>
            <select id="workerGraphSortSelect" class="form-select form-select-sm shadow-xs" style="max-width: 250px;" onchange="filterWorkerGraphs(undefined, this.value)">
              <option value="att_desc" selected>Highest Attendance %</option>
              <option value="att_asc">Lowest Attendance %</option>
              <option value="ot_desc">Highest Overtime (OT)</option>
              <option value="bale_desc">Highest Cash Advance (Bale)</option>
              <option value="name_asc">Worker Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- WORKER GRAPHS CONTAINER -->
      <div id="workerGraphsListContainer" style="max-height: 540px; overflow-y: auto; padding-right: 4px;">
        ${allWorkersData.length > 0 
          ? allWorkersData.sort((a,b) => b.attPct - a.attPct || b.daysWorked - a.daysWorked).map(w => renderSingleWorkerGraphCard(w)).join('') 
          : '<div class="alert alert-light text-muted text-center py-4">No workers found in this site.</div>'}
      </div>
    </div>

    <!-- ROW: AUTOMATED WORKER NOTES & SITE SUPERVISOR REMARKS -->
    <div class="row g-3 mb-3">
      <!-- AUTOMATED WORKER NOTES & OPERATIONAL FLAGS ENGINE -->
      <div class="col-12 col-lg-6">
        <div class="card p-3 h-100 bg-white border shadow-sm">
          <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
            <h6 class="fw-bold small text-dark mb-0">
              <i class="bi bi-robot text-danger me-2"></i>Automated Worker Notes & Operational Flags:
            </h6>
            <span class="badge bg-danger text-white">${automatedWorkersList.length} Flagged</span>
          </div>
          <p class="text-muted small mb-2">Automated system remarks for attendance anomalies, overtime milestones, and cash advances.</p>
          
          <div style="max-height: 250px; overflow-y: auto;">
            ${automatedWorkersList.length > 0 ? automatedWorkersList.map(w => `
              <div class="d-flex justify-content-between align-items-center p-2 border-bottom hover-bg-light">
                <div>
                  <span class="fw-bold text-dark cursor-pointer" onclick="openWorkerProfileModal('${w.id}', '${w.name.replace(/'/g, "\\'")}')" title="View worker profile">${w.name}</span>
                  <span class="badge bg-dark ms-1">${w.role}</span>
                  ${isViewAll ? `<span class="badge bg-light text-muted border ms-1">${w.loc}</span>` : ''}
                  <div class="d-flex flex-wrap gap-1 mt-1">
                    ${w.flags.map(f => `<span class="badge bg-${f.type}" style="font-size:0.68rem;">${f.text}</span>`).join('')}
                  </div>
                </div>
                <div class="text-end">
                  <button type="button" class="btn btn-outline-danger btn-sm py-0 px-2" style="font-size: 0.72rem;" onclick="openWorkerProfileModal('${w.id}', '${w.name.replace(/'/g, "\\'")}')">
                    <i class="bi bi-graph-up me-1"></i>Analytics
                  </button>
                </div>
              </div>
            `).join('') : '<div class="alert alert-light text-muted small py-3 text-center">No automated worker attendance or overtime alerts detected this week.</div>'}
          </div>
        </div>
      </div>

      <!-- SITE SUPERVISOR NOTES & DAILY REMARKS PANEL (INTERACTIVE WITH AUTO-SAVE) -->
      <div class="col-12 col-lg-6">
        <div class="card p-3 h-100 bg-white border shadow-sm">
          <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
            <h6 class="fw-bold small text-dark mb-0">
              <i class="bi bi-journal-text text-danger me-2"></i>Site Supervisor Notes & Remarks:
            </h6>
            <div class="d-flex align-items-center gap-1">
              <label for="analyticsSiteSelect" class="small text-muted me-1 mb-0 fw-bold">Site:</label>
              <select id="analyticsSiteSelect" class="form-select form-select-sm fw-bold border-danger py-0" style="width: auto;" onchange="switchAnalyticsSiteRemarks(this.value)">
                ${sitesToProcess.map(s => `<option value="${s}" ${s === activeSiteForNotes ? 'selected' : ''}>${s}</option>`).join('')}
              </select>
            </div>
          </div>
          <p class="text-muted small mb-2">Record daily progress, weather conditions, deliveries, safety inspections, and site reminders.</p>
          
          <div class="d-flex flex-wrap gap-1 mb-2">
            <button type="button" class="btn btn-outline-secondary btn-sm py-0 px-2" style="font-size:0.75rem;" onclick="appendAnalyticsPresetTag('☀️ Good Weather & Operations Normal')">+ ☀️ Good Weather</button>
            <button type="button" class="btn btn-outline-secondary btn-sm py-0 px-2" style="font-size:0.75rem;" onclick="appendAnalyticsPresetTag('🌧️ Heavy Rain / Standby')">+ 🌧️ Rain Standby</button>
            <button type="button" class="btn btn-outline-secondary btn-sm py-0 px-2" style="font-size:0.75rem;" onclick="appendAnalyticsPresetTag('🚚 Materials Delivered On Site')">+ 🚚 Materials</button>
            <button type="button" class="btn btn-outline-secondary btn-sm py-0 px-2" style="font-size:0.75rem;" onclick="appendAnalyticsPresetTag('⚠️ Safety Inspection Done')">+ ⚠️ Safety</button>
            <button type="button" class="btn btn-outline-secondary btn-sm py-0 px-2" style="font-size:0.75rem;" onclick="appendAnalyticsPresetTag('👷 Concrete Pouring Completed')">+ 👷 Pouring</button>
          </div>

          <div class="mb-2">
            <textarea id="analyticsSiteRemarksField" class="form-control form-control-sm" rows="4" 
                      placeholder="Enter site supervisor notes, daily achievements, supplier status, or delays..." 
                      oninput="saveAnalyticsSiteRemarks(this.value)">${(activeSiteData.remarks || '')}</textarea>
          </div>

          <div class="d-flex justify-content-between align-items-center">
            <span id="analyticsSiteSavedMsg" class="small text-muted">Auto-saves as you type</span>
            <button type="button" class="btn btn-danger btn-sm fw-bold px-3 shadow-sm" onclick="saveAnalyticsSiteRemarks(document.getElementById('analyticsSiteRemarksField')?.value, true)">
              <i class="bi bi-check2-circle me-1"></i>Save Site Remarks
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- WORKER CUSTOM REMARKS & INCIDENT LOG ROSTER -->
    <div class="card p-3 bg-white border shadow-sm">
      <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
        <h6 class="fw-bold small text-dark mb-0">
          <i class="bi bi-chat-left-text-fill text-danger me-2"></i>Worker Custom Remarks & Incident Notes Roster:
        </h6>
        <span class="badge bg-secondary">${workerRemarksList.length} Notes Recorded</span>
      </div>
      <div style="max-height: 200px; overflow-y: auto;">
        ${workerRemarksList.length > 0 ? workerRemarksList.map(w => `
          <div class="d-flex justify-content-between align-items-center p-2 border-bottom small">
            <div>
              <strong>${w.name}</strong> <span class="badge bg-dark">${w.role}</span>
              ${isViewAll ? `<span class="badge bg-light text-muted border ms-1">${w.loc}</span>` : ''}
              <span class="text-muted ms-2">${w.remarks ? `"${w.remarks}"` : '<em class="text-secondary">(No official remark)</em>'}</span>
            </div>
            <div class="d-flex align-items-center gap-2">
              ${w.notesCount > 0 ? `<span class="badge bg-info text-dark">${w.notesCount} Incident Notes</span>` : ''}
              <button type="button" class="btn btn-outline-secondary btn-sm py-0 px-2" style="font-size:0.72rem;" onclick="openWorkerProfileModal('${w.id}', '${w.name.replace(/'/g, "\\'")}')">
                <i class="bi bi-pencil-square me-1"></i>Edit Notes
              </button>
            </div>
          </div>
        `).join('') : '<div class="text-muted small py-2 text-center">No custom remarks or incident notes recorded for workers this period. You can add remarks directly on the timesheet rows or in the worker profile modal.</div>'}
      </div>
    </div>
  `; 
}

// --- MAIN TIMESHEET RENDER ---
function renderUI() { 
  const container = document.getElementById("mainTimesheetContainer") || document.getElementById("tablesContainer"); 
  const statsContainer = document.getElementById("siteStatsContainer"); 
  const dates = getCalculatedDates(); 
  const isAdm = isAdmin(); 

  renderLocationHeaderControls();
  renderRecordedDatesList(); 
  renderRoleFilterButtons(); 
  updateAccountFooterDisplay(); 
  updateNotifButtonUI(); 

  if (statsContainer) {
    if (showStatsFlag) { 
      renderSiteStats(statsContainer); 
    } else { 
      statsContainer.className = "d-none"; 
      statsContainer.innerHTML = ""; 
    } 
  }

  if (container) {
    if (currentLocation === "VIEW_ALL") { 
      container.innerHTML = renderViewAllHTML(dates, isAdm); 
    } else { 
      container.innerHTML = renderSingleLocationHTML(currentLocation, dates, isAdm); 
    } 
  }
} 

function renderSingleLocationHTML(loc, dates, isAdm) { 
  const locData = currentActiveData.locations[loc]; 
  if (!locData) { 
    return `<div class="alert alert-warning">No records found for site: ${loc}</div>`; 
  } 

  const isDone = !!locData.isDone; 
  let workers = locData.workers || []; 
  if (selectedRolesFilter.length > 0) { 
    workers = workers.filter(w => selectedRolesFilter.includes(w.role)); 
  } 

  let siteTotalDays = 0; 
  let siteTotalHourlyHours = 0;
  let siteTotalOT = 0; 
  let siteTotalWorkerBale = 0; 

  const headerDayCols = dates.map(d => ` 
    <th class="text-center col-day-header px-1" style="min-width: 72px;"> 
      <span class="day-letter d-block fw-bold text-dark" style="font-size: 0.85rem; letter-spacing: 0.5px;">${d.dayNameShort || d.key}</span> 
      <span class="day-number small fw-bold text-danger">${d.dayNum}</span> 
    </th> 
  `).join(''); 

  const rows = workers.map(w => { 
    const m = getWorkerMetrics(w); 
    siteTotalDays += m.daysWorked; 
    siteTotalHourlyHours += m.hourlyHours;
    siteTotalOT += m.totalOT; 
    siteTotalWorkerBale += (w.baleValue || 0); 

    const dayCells = dates.map(d => { 
      const val = getWorkerAttendanceVal(w, d); 
      const otVal = getWorkerOtVal(w, d); 
      const attClass = getAttendanceClass(val); 
      const isEligibleForOT = (val === '1.0' || val === '1' || val === '0.5'); 
      const isHourly = val && val.endsWith('h');

      return ` 
        <td class="p-0 border-end"> 
          <div class="d-flex flex-column h-100"> 
            <select class="form-select custom-select-compact text-center ${attClass} fw-bold rounded-0 border-0" 
                    onchange="if(this.value==='__custom_hours__'){ promptCustomHours('${w.id}', '${d.key}'); } else { updateAttendance('${w.id}', '${d.key}', this.value); }"> 
              <option value="" ${val === '' ? 'selected' : ''}>-</option> 
              <option value="1.0" ${val === '1.0' || val === '1' ? 'selected' : ''}>Full</option> 
              <option value="0.5" ${val === '0.5' ? 'selected' : ''}>Half</option> 
              ${isHourly ? `<option value="${val}" selected>${val}</option>` : ''}
              <option value="__custom_hours__">⏱ Custom...</option> 
              <option value="absent" ${val === 'absent' ? 'selected' : ''}>Abs</option> 
              <option value="sick" ${val === 'sick' ? 'selected' : ''}>Sick</option> 
              <option value="emergency" ${val === 'emergency' ? 'selected' : ''}>Emg</option> 
            </select> 
            <select class="form-select custom-select-compact text-center bg-light text-danger fw-bold rounded-0 border-top border-0" 
                    style="font-size: 0.65rem;" 
                    ${!isEligibleForOT ? 'disabled' : ''} 
                    onchange="updateOT('${w.id}', '${d.key}', this.value)"> 
              <option value="0" ${otVal === 0 ? 'selected' : ''}>0</option> 
              <option value="1" ${otVal === 1 ? 'selected' : ''}>+1h</option> 
              <option value="2" ${otVal === 2 ? 'selected' : ''}>+2h</option> 
              <option value="3" ${otVal === 3 ? 'selected' : ''}>+3h</option> 
              <option value="4" ${otVal === 4 ? 'selected' : ''}>+4h</option> 
              <option value="5" ${otVal === 5 ? 'selected' : ''}>+5h</option> 
            </select> 
          </div> 
        </td> 
      `; 
    }).join(''); 

    const autoRemarks = getWorkerAutomatedRemarks(w); 
    const workerNotes = w.notesHistory || []; 
    const safeWorkerName = (w.name || '').replace(/ /g, '&nbsp;');

    return ` 
      <tr id="workerRow_${w.id}"> 
        <td class="align-middle fw-bold worker-name-cell"> 
          <div class="d-flex align-items-center justify-content-between"> 
            <div class="d-flex align-items-center gap-1 text-truncate">
              ${isAdm ? `
                <button class="btn btn-sm btn-outline-primary p-0 px-1 no-print" onclick="openRenameWorkerModal('${w.id}')" title="Rename worker / Change role">
                  <i class="bi bi-pencil-fill" style="font-size: 0.72rem;"></i>
                </button>
              ` : ''}
              <span class="text-uppercase text-nowrap cursor-pointer" style="word-spacing: 4px; cursor: pointer;" onclick="openWorkerProfileModal('${w.id}', '${(w.name || '').replace(/'/g, "\\'")}')" title="Click to view Worker Analytics & Remarks">${safeWorkerName}</span> 
            </div>
            <div class="d-flex align-items-center gap-1 no-print"> 
              <button class="btn btn-sm btn-outline-danger p-0 px-1" onclick="startFocusMode('${w.id}')" title="Focus Log">
                <i class="bi bi-bullseye"></i>
              </button>
              <button class="btn btn-sm btn-outline-dark p-0 px-1" onclick="openWorkerProfileModal('${w.id}', '${(w.name || '').replace(/'/g, "\\'")}')" title="Worker Analytics & Remarks"> 
                <i class="bi bi-graph-up text-danger"></i>${workerNotes.length > 0 ? `<span class="badge bg-danger ms-1" style="font-size:0.6rem;">${workerNotes.length}</span>` : ''} 
              </button> 
              ${isAdm ? ` 
                <button class="btn btn-sm btn-outline-danger p-0 px-1 border-0" onclick="promptDeleteWorker('${loc}', '${w.id}', '${(w.name || '').replace(/'/g, "\\'")}')" title="Delete worker"> 
                  <i class="bi bi-trash-fill"></i> 
                </button> 
              ` : ''} 
            </div> 
          </div> 
          ${autoRemarks.length > 0 ? ` 
            <div class="d-flex flex-wrap gap-1 mt-1"> 
              ${autoRemarks.map(r => `<span class="badge bg-${r.type}" style="font-size: 0.6rem;">${r.text}</span>`).join('')} 
            </div> 
          ` : ''} 
        </td> 
        <td class="align-middle text-center fw-bold text-muted col-role" style="font-size: 0.72rem;">${w.role}</td> 
        ${dayCells} 
        <td class="align-middle text-center fw-bold bg-light text-dark fs-6 col-days-total">
          ${m.daysWorked.toFixed(1)}
          ${m.hourlyHours > 0 ? `<div class="badge bg-secondary text-white" style="font-size:0.6rem; display:block;">+${m.hourlyHours}h</div>` : ''}
        </td> 
        <td class="align-middle text-center fw-bold bg-light text-danger fs-6 col-ot-total">${m.totalOT}h</td> 
        <td class="align-middle text-center p-1 col-worker-bale"> 
          <div class="input-group input-group-sm"> 
            <span class="input-group-text p-1 py-0 bg-transparent text-secondary border-0" style="font-size: 0.7rem;">₱</span> 
            <input type="number" step="any" class="form-control form-control-sm text-end p-1 fw-bold" 
                   value="${w.baleValue || ''}" placeholder="0" 
                   onchange="updateWorkerBale('${w.id}', this.value)" style="min-width: 60px;"> 
          </div> 
        </td> 
        <td class="align-middle p-1 col-worker-remarks"> 
          <div class="input-group input-group-sm"> 
            <input type="text" class="form-control form-control-sm fw-semibold" 
                   value="${(w.remarks || '').replace(/"/g, '&quot;')}" placeholder="Notes/Remarks..." 
                   title="Worker custom remark or note" 
                   oninput="updateWorkerRemarks('${w.id}', this.value)"
                   onchange="updateWorkerRemarks('${w.id}', this.value)" style="font-size: 0.75rem; min-width: 90px;"> 
            <button class="btn btn-outline-secondary btn-sm p-0 px-1" 
                    onclick="openWorkerProfileModal('${w.id}', '${(w.name || '').replace(/'/g, "\\'")}')" 
                    title="Worker Analytics & Remarks"> 
              <i class="bi bi-pencil-square text-danger"></i> 
            </button> 
          </div> 
        </td> 
      </tr> 
    `; 
  }).join(''); 

  const dateRangeStr = getPeriodString(dates); 
  const isNotesActive = !!siteNotesVisible[loc];

  return ` 
    <div class="card card-custom p-3 bg-white mb-4 shadow-sm"> 
      <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2"> 
        <div class="d-flex align-items-center gap-2"> 
          <h4 class="fw-bold mb-0 text-dark fs-5"> 
            <i class="bi bi-building-fill text-danger me-2"></i>${loc} 
          </h4> 
          <span class="badge ${isDone ? 'bg-success' : 'bg-warning text-dark'}"> 
            ${isDone ? '<i class="bi bi-check-circle-fill me-1"></i>COMPLETED' : '<i class="bi bi-clock-fill me-1"></i>IN PROGRESS'} 
          </span> 
          <span class="badge bg-dark">${dateRangeStr}</span> 
        </div> 

        <div class="d-flex align-items-center gap-2 flex-wrap no-print"> 
          <button class="btn btn-outline-danger btn-sm fw-bold" onclick="startFocusMode()" title="Mobile Shift Flow">
            <i class="bi bi-bullseye me-1"></i>Focus Mode
          </button>
          <button class="btn btn-outline-dark btn-sm fw-bold" onclick="toggleStatsView()"> 
            <i class="bi bi-pie-chart-fill me-1 text-danger"></i>${showStatsFlag ? 'Hide Analytics' : 'Site Analytics'} 
          </button> 
          <button class="btn ${isNotesActive ? 'btn-danger text-white' : 'btn-outline-danger'} btn-sm fw-bold" onclick="toggleSiteNotes('${loc}')" title="Site Supervisor Notes & Daily Remarks"> 
            <i class="bi bi-journal-text me-1"></i>Site Notes${locData.remarks ? '<span class="badge bg-white text-danger ms-1">●</span>' : ''} 
          </button> 
          <button class="btn ${isDone ? 'btn-outline-secondary' : 'btn-success'} btn-sm fw-bold" onclick="toggleSiteStatus('${loc}')"> 
            <i class="bi ${isDone ? 'bi-arrow-counterclockwise' : 'bi-check2-all'} me-1"></i>${isDone ? 'Reopen Site' : 'Mark as Done'} 
          </button> 
          ${isAdm ? `
            <button class="btn btn-outline-dark btn-sm fw-bold" onclick="showAddWorkerModal('${loc}')"> 
              <i class="bi bi-person-plus-fill me-1 text-danger"></i>Add Worker 
            </button> 
          ` : ''}
          ${isAdm ? ` 
            <button class="btn btn-outline-danger btn-sm fw-bold" onclick="promptDeleteSite('${loc}')"> 
              <i class="bi bi-trash-fill me-1"></i>Delete Site 
            </button> 
          ` : ''} 
        </div> 
      </div> 

      <!-- SITE SUPERVISOR NOTES CARD (COLLAPSIBLE / EXPANDABLE) -->
      <div id="siteNotesSection_${loc}" class="${isNotesActive ? '' : 'd-none'} card p-3 mb-3 bg-light border-start border-danger border-4 shadow-sm no-print">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h6 class="fw-bold mb-0 text-dark">
            <i class="bi bi-journal-text text-danger me-2"></i>Site Supervisor Notes & Daily Remarks (${loc})
          </h6>
          <button type="button" class="btn-close btn-sm" onclick="toggleSiteNotes('${loc}')" title="Close Notes"></button>
        </div>
        <p class="text-muted small mb-2">Record weather conditions, material arrivals, safety observations, and general site notes for this week.</p>
        <div class="d-flex flex-wrap gap-1 mb-2">
          <span class="badge bg-white text-dark border cursor-pointer" onclick="appendSiteNotePreset('${loc}', '☀️ Good Weather')">+ Good Weather</span>
          <span class="badge bg-white text-dark border cursor-pointer" onclick="appendSiteNotePreset('${loc}', '🌧️ Heavy Rain / Standby')">+ Heavy Rain</span>
          <span class="badge bg-white text-dark border cursor-pointer" onclick="appendSiteNotePreset('${loc}', '🚚 Materials Delivered')">+ Materials Delivered</span>
          <span class="badge bg-white text-dark border cursor-pointer" onclick="appendSiteNotePreset('${loc}', '⚠️ Safety Inspection Done')">+ Safety Inspection</span>
          <span class="badge bg-white text-dark border cursor-pointer" onclick="appendSiteNotePreset('${loc}', '👷 Concrete Pouring')">+ Concrete Pouring</span>
        </div>
        <textarea id="siteNotesText_${loc}" class="form-control mb-2" rows="3" 
                  placeholder="Type site notes, daily progress, weather, or supplier deliveries..."
                  oninput="updateSiteRemarks('${loc}', this.value)"
                  onchange="updateSiteRemarks('${loc}', this.value)">${locData.remarks || ''}</textarea>
        <div class="d-flex justify-content-between align-items-center">
          <small class="text-muted" id="siteNotesSavedStatus_${loc}">${locData.remarks ? 'Notes saved for this site.' : 'No site notes recorded yet.'}</small>
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-outline-secondary btn-sm" onclick="openSiteNotesModal('${loc}')">
              <i class="bi bi-arrows-fullscreen me-1"></i>Full Modal
            </button>
            <button type="button" class="btn btn-dark btn-sm fw-bold px-3" onclick="saveSiteNotesDirect('${loc}')">
              <i class="bi bi-save me-1"></i>Save Site Notes
            </button>
          </div>
        </div>
      </div>

      ${(!isNotesActive && locData.remarks) ? `
        <div class="alert alert-secondary py-2 px-3 mb-3 d-flex justify-content-between align-items-center shadow-sm" style="font-size: 0.82rem;">
          <div>
            <strong class="text-danger"><i class="bi bi-journal-text me-1"></i>Site Notes:</strong>
            <span id="siteNotesPreviewText_${loc}" class="text-dark">${(locData.remarks || '').replace(/</g, '&lt;')}</span>
          </div>
          <button class="btn btn-sm btn-link p-0 text-danger fw-bold text-decoration-none ms-2" onclick="toggleSiteNotes('${loc}')">Edit Notes</button>
        </div>
      ` : ''}

      <div class="table-responsive"> 
        <table class="table table-bordered table-hover align-middle mb-2"> 
          <thead class="table-dark"> 
            <tr> 
              <th class="align-middle" style="min-width: 170px;">WORKER NAME</th> 
              <th class="text-center align-middle col-role" style="width: 80px;">ROLE</th> 
              ${headerDayCols} 
              <th class="text-center align-middle col-days-total" style="width: 70px;">DAYS</th> 
              <th class="text-center align-middle col-ot-total" style="width: 60px;">OT</th> 
              <th class="text-center align-middle col-worker-bale" style="width: 100px;">BALE (₱)</th> 
              <th class="text-center align-middle col-worker-remarks" style="min-width: 140px;">REMARKS</th> 
            </tr> 
          </thead> 
          <tbody> 
            ${rows || `<tr><td colspan="${dates.length + 6}" class="text-center p-3 text-muted">No workers recorded for this site. Click "Add Worker" to add one.</td></tr>`} 
          </tbody> 
          <tfoot class="table-secondary fw-bold"> 
            <tr> 
              <td colspan="2" class="text-end">SUBTOTALS:</td> 
              <td colspan="6" class="text-center text-muted small">Shift Tallies Above</td> 
              <td class="text-center text-dark fs-6">${siteTotalDays.toFixed(1)}${siteTotalHourlyHours > 0 ? ` (+${siteTotalHourlyHours}h)` : ''}</td> 
              <td class="text-center text-danger fs-6">${siteTotalOT}h</td> 
              <td class="text-end text-danger fs-6">₱${siteTotalWorkerBale.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td> 
              <td class="text-center small text-muted">Worker Remarks</td>
            </tr> 
          </tfoot> 
        </table> 
      </div> 

      <div class="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2 pt-2 border-top"> 
        <div class="d-flex align-items-center gap-2"> 
          <span class="badge bg-secondary">${workers.length} Workers at Site</span> 
          ${selectedRolesFilter.length > 0 ? `<span class="badge bg-danger">Filtered: ${selectedRolesFilter.join(', ')}</span>` : ''} 
        </div> 
        <div class="d-flex align-items-center gap-3"> 
          <div class="d-flex align-items-center gap-2"> 
            <div class="form-check form-switch mb-0 d-flex align-items-center gap-2">
              <input class="form-check-input border-danger" type="checkbox" id="siteBaleSwitch_${loc}" 
                     ${locData.isBaleEnabled !== false ? 'checked' : ''} 
                     onchange="toggleLocationBaleEnabled('${loc}', this.checked)">
              <label class="form-check-label small fw-bold text-dark user-select-none mb-0" for="siteBaleSwitch_${loc}">
                Project Bale: 
                <span class="badge ${locData.isBaleEnabled !== false ? 'bg-success' : 'bg-secondary'}" style="font-size: 0.7rem;">
                  ${locData.isBaleEnabled !== false ? 'ON' : 'OFF'}
                </span>
              </label>
            </div>
            ${locData.isBaleEnabled !== false ? `
              <div class="input-group input-group-sm" style="width: 120px;">
                <span class="input-group-text fw-bold bg-light p-1">₱</span>
                <input type="number" step="any" class="form-control form-control-sm text-end fw-bold" 
                       value="${locData.baleValue || ''}" placeholder="0" 
                       onchange="updateLocationBaleForSite('${loc}', this.value)"> 
              </div>
            ` : `
              <span class="text-muted small fst-italic">(Turned OFF)</span>
            `}
          </div> 
        </div> 
      </div> 
    </div> 
  `; 
} 

function renderViewAllHTML(dates, isAdm) { 
  const delSites = getDeletedSites(); 
  const sites = Object.keys(currentActiveData.locations || {}).filter(s => !delSites.includes(s.toUpperCase())); 
  if (sites.length === 0) { 
    return `<div class="alert alert-info">No project sites configured yet. Add your first site above.</div>`; 
  } 

  return sites.map(loc => renderSingleLocationHTML(loc, dates, isAdm)).join(''); 
}

// --- ATTENDANCE & SHIFT UPDATES ---
function updateAttendance(workerId, dayKey, value) { 
  for (let loc in currentActiveData.locations) { 
    const w = (currentActiveData.locations[loc].workers || []).find(item => item.id === workerId); 
    if (w) { 
      if (!w.attendance) w.attendance = {}; 
      w.attendance[dayKey] = value; 
      if (value !== '1.0' && value !== '1' && value !== '0.5') { 
        if (w.ot) w.ot[dayKey] = 0; 
      } 
      w.updatedAt = Date.now(); 
      saveStore(); 
      renderUI(); 
      return; 
    } 
  } 
} 

function updateOT(workerId, dayKey, value) { 
  for (let loc in currentActiveData.locations) { 
    const w = (currentActiveData.locations[loc].workers || []).find(item => item.id === workerId); 
    if (w) { 
      if (!w.ot) w.ot = {}; 
      w.ot[dayKey] = parseInt(value, 10) || 0; 
      w.updatedAt = Date.now(); 
      saveStore(); 
      renderUI(); 
      return; 
    } 
  } 
} 

function updateWorkerBale(workerId, value) { 
  for (let loc in currentActiveData.locations) { 
    const w = (currentActiveData.locations[loc].workers || []).find(item => item.id === workerId); 
    if (w) { 
      w.baleValue = parseFloat(value) || 0; 
      w.updatedAt = Date.now(); 
      saveStore(); 
      renderUI(); 
      return; 
    } 
  } 
} 

function updateLocationBale(value) { 
  if (currentLocation !== "VIEW_ALL" && currentActiveData.locations[currentLocation]) { 
    currentActiveData.locations[currentLocation].baleValue = parseFloat(value) || 0; 
    saveStore(); 
    renderUI(); 
  } 
} 

function updateLocationBaleForSite(loc, value) {
  const targetLoc = loc || currentLocation;
  if (currentActiveData.locations[targetLoc]) {
    currentActiveData.locations[targetLoc].baleValue = parseFloat(value) || 0;
    saveStore();
    renderUI();
  }
}

function toggleLocationBaleEnabled(loc, isEnabled) {
  const targetLoc = loc || currentLocation;
  if (currentActiveData.locations[targetLoc]) {
    currentActiveData.locations[targetLoc].isBaleEnabled = !!isEnabled;
    saveStore();
    renderUI();
  }
} 

function toggleSiteStatus(loc) { 
  if (currentActiveData.locations[loc]) { 
    const current = !!currentActiveData.locations[loc].isDone; 
    currentActiveData.locations[loc].isDone = !current; 
    saveStore(); 
    renderLocationDropdown(); 
    renderUI(); 
  } 
} 

// --- CUSTOM HOURS MODAL ---
function promptCustomHours(workerId, dayKey) {
  activeCustomHourWorker = workerId;
  activeCustomHourDayKey = dayKey;

  let workerName = "Worker";
  for (let loc in currentActiveData.locations) {
    const w = (currentActiveData.locations[loc].workers || []).find(item => item.id === workerId);
    if (w) { workerName = w.name; break; }
  }

  const nameEl = document.getElementById("customHoursWorkerName");
  const dayEl = document.getElementById("customHoursDayBadge");
  const inputEl = (document.getElementById("customHourNumberInput") || document.getElementById("customHourInputNumber"));

  if (nameEl) nameEl.innerText = workerName;
  if (dayEl) dayEl.innerText = DAY_NAMES[dayKey] || dayKey;
  if (inputEl) inputEl.value = "4";

  const modalEl = document.getElementById("customHoursModal");
  if (modalEl && window.bootstrap) {
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();
  }
}

function setCustomHourInputValue(val) {
  const inputEl = (document.getElementById("customHourNumberInput") || document.getElementById("customHourInputNumber"));
  if (inputEl) inputEl.value = val;
}

function confirmCustomHoursEntry() {
  const inputEl = (document.getElementById("customHourNumberInput") || document.getElementById("customHourInputNumber"));
  if (!inputEl) return;
  const num = parseFloat(inputEl.value);

  if (isNaN(num) || num <= 0 || num > 12) {
    alert("Please enter valid hours between 1 and 12.");
    return;
  }

  const formattedVal = `${num}h`;
  if (activeCustomHourWorker && activeCustomHourDayKey) {
    updateAttendance(activeCustomHourWorker, activeCustomHourDayKey, formattedVal);
    const focusModal = document.getElementById("focusModeModal");
    if (focusModal && (focusModal.classList.contains("show") || focusModal.style.display === "block")) {
      renderFocusWorker();
    }
  }

  const modalEl = document.getElementById("customHoursModal");
  if (modalEl && window.bootstrap) {
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
  }
}

// --- FOCUS MODE (1-BY-1 SHIFT ENTRY) ---
// --- SINGLE WORKER FOCUS MODE ---
function startFocusMode(targetWorkerId = null) {
  if (currentLocation === "VIEW_ALL") {
    alert("Please select a specific project site first to use Focus Mode.");
    return;
  }
  const locData = currentActiveData.locations[currentLocation];
  if (!locData || !locData.workers || locData.workers.length === 0) {
    alert("No workers recorded at this site to log attendance.");
    return;
  }

  let workers = locData.workers;
  if (selectedRolesFilter.length > 0) {
    workers = workers.filter(w => selectedRolesFilter.includes(w.role));
  }

  if (workers.length === 0) {
    alert("No workers match the selected role filter.");
    return;
  }

  focusWorkerList = workers;
  if (targetWorkerId) {
    const idx = focusWorkerList.findIndex(w => w.id === targetWorkerId);
    focusWorkerIndex = idx >= 0 ? idx : 0;
  } else {
    focusWorkerIndex = 0;
  }

  isFocusRateEditorOpen = false;
  renderFocusWorker();

  const modalEl = document.getElementById("focusModeModal");
  if (modalEl && window.bootstrap) {
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();
  }
}

function openFocusCustomHours(dayKey) {
  const w = focusWorkerList[focusWorkerIndex];
  if (!w) return;
  activeCustomHourWorker = w.id;
  activeCustomHourDayKey = dayKey;
  const inputEl = (document.getElementById("customHourNumberInput") || document.getElementById("customHourInputNumber"));
  if (inputEl) inputEl.value = "";
  const modalEl = document.getElementById("customHoursModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

function updateFocusWorkerRemarks(val) {
  const w = focusWorkerList[focusWorkerIndex];
  if (!w) return;
  w.remarks = val || "";
  saveStore();
  renderUI();
}

function getWorkerLocation(workerId) {
  if (currentLocation && currentLocation !== "VIEW_ALL" && currentActiveData?.locations?.[currentLocation]?.workers?.some(item => item.id === workerId)) {
    return currentLocation;
  }
  for (let loc in currentActiveData?.locations || {}) {
    if ((currentActiveData.locations[loc].workers || []).some(item => item.id === workerId)) {
      return loc;
    }
  }
  return currentLocation || "SAN JOSEF";
}

let isFocusRateEditorOpen = false;

function toggleFocusRateEditor() {
  isFocusRateEditorOpen = !isFocusRateEditorOpen;
  renderFocusWorker();
}

function onFocusDailyRateInput(val) {
  const w = focusWorkerList[focusWorkerIndex];
  if (!w) return;
  const num = parseFloat(val) || 0;
  const targetLoc = getWorkerLocation(w.id);
  saveWorkerRate(targetLoc, w.id, num);

  // Auto-calculate hourly rate based on standard 8-hour workday preserving decimals (e.g. 700/8 = 87.5, 1100/8 = 137.5, 500/8 = 62.5)
  const autoHour = Math.round((num / 8.0) * 100) / 100;
  const hourInput = document.getElementById("focusHourlyRateInput");
  if (hourInput) {
    hourInput.value = autoHour;
  }
  saveWorkerHourlyRate(targetLoc, w.id, autoHour);

  updateFocusRateHeaderAndEst(w, num, autoHour);
  flashFocusRateStatus(`✓ Saved: ₱${num.toFixed(2)}/day, ₱${autoHour.toFixed(2)}/hr`);
}

function onFocusHourlyRateInput(val) {
  const w = focusWorkerList[focusWorkerIndex];
  if (!w) return;
  const num = parseFloat(val) || 0;
  const targetLoc = getWorkerLocation(w.id);
  saveWorkerHourlyRate(targetLoc, w.id, num);

  const dailyRate = getWorkerRate(w.id, w.role);
  updateFocusRateHeaderAndEst(w, dailyRate, num);
  flashFocusRateStatus(`✓ Custom hourly rate saved: ₱${num.toFixed(2)}/hr`);
}

function setFocusRatePreset(daily, hourly) {
  const w = focusWorkerList[focusWorkerIndex];
  if (!w) return;
  const targetLoc = getWorkerLocation(w.id);
  saveWorkerRate(targetLoc, w.id, daily);
  saveWorkerHourlyRate(targetLoc, w.id, hourly);

  const dayInput = document.getElementById("focusDailyRateInput");
  const hourInput = document.getElementById("focusHourlyRateInput");
  if (dayInput) dayInput.value = daily;
  if (hourInput) hourInput.value = hourly;

  updateFocusRateHeaderAndEst(w, daily, hourly);
  flashFocusRateStatus(`✓ Preset applied: ₱${daily}/day, ₱${hourly}/hr`);
}

function updateFocusRateHeaderAndEst(w, dailyRate, hourlyRate) {
  const otHourlyRate = hourlyRate * 1.0;
  const otDisplay = document.getElementById("focusOtRateDisplay");
  if (otDisplay) {
    otDisplay.innerText = `₱${otHourlyRate.toFixed(2)}/hr`;
  }
  const headerBadge = document.getElementById("focusRateHeaderBadge");
  if (headerBadge) {
    headerBadge.innerHTML = `<i class="bi bi-tag-fill text-danger me-1"></i>Rate: <strong>₱${dailyRate.toFixed(2)}</strong>/day &bull; <strong>₱${hourlyRate.toFixed(2)}</strong>/hr`;
  }
  const m = getWorkerMetrics(w);
  const estWage = (m.daysWorked * dailyRate) + (m.hourlyHours * hourlyRate) + (m.totalOT * otHourlyRate) - (w.baleValue || 0);
  const netBadge = document.getElementById("focusEstNetBadge");
  if (netBadge) {
    netBadge.innerHTML = `Est. Net: <strong>₱${Math.max(0, estWage).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>`;
  }
  renderUI(); // sync underlying timesheet / payroll tables in background
}

function flashFocusRateStatus(msg) {
  const statusEl = document.getElementById("focusRateSaveStatus");
  if (statusEl) {
    statusEl.innerText = msg;
    statusEl.className = "text-success fw-bold";
    setTimeout(() => {
      if (statusEl) {
        statusEl.innerText = "✓ Rates synced with weekly payroll records.";
        statusEl.className = "text-muted";
      }
    }, 2500);
  }
}

function jumpToFocusWorker(idx) {
  const target = parseInt(idx, 10);
  if (!isNaN(target) && target >= 0 && target < focusWorkerList.length) {
    focusWorkerIndex = target;
    renderFocusWorker();
  }
}

function renderFocusWorker() {
  const w = focusWorkerList[focusWorkerIndex];
  if (!w) return;

  const total = focusWorkerList.length;
  const progressBadge = document.getElementById("focusProgressBadge");
  if (progressBadge) progressBadge.innerText = "Worker " + (focusWorkerIndex + 1) + " of " + total;

  const prevBtn = document.getElementById("focusPrevBtn");
  const nextBtn = document.getElementById("focusNextBtn");
  if (prevBtn) prevBtn.disabled = (focusWorkerIndex === 0);
  if (nextBtn) nextBtn.disabled = (focusWorkerIndex === total - 1);

  const dates = getCalculatedDates();
  const m = getWorkerMetrics(w);
  const targetLoc = getWorkerLocation(w.id);
  const dailyRate = getWorkerRate(w.id, w.role);
  const hourlyRate = getWorkerHourlyRate(targetLoc, w.id, dailyRate);
  const otHourlyRate = hourlyRate * 1.0;
  const estWage = (m.daysWorked * dailyRate) + (m.hourlyHours * hourlyRate) + (m.totalOT * otHourlyRate) - (w.baleValue || 0);

  const focusBody = document.getElementById("focusModeBody");
  if (!focusBody) return;

  // Dropdown options to jump directly to any worker
  let workerOptionsHtml = "";
  focusWorkerList.forEach((worker, i) => {
    workerOptionsHtml += `<option value="${i}" ${i === focusWorkerIndex ? 'selected' : ''}>${i + 1}. ${worker.name} (${worker.role})</option>`;
  });

  // Render each day using .focus-day-item
  let daysCardsHtml = "";
  dates.forEach(d => {
    const val = (w.attendance && w.attendance[d.key]) || '';
    const otVal = (w.ot && w.ot[d.key]) || 0;

    let statusBadge = '<span class="badge bg-light text-muted border">NOT LOGGED</span>';
    if (val === '1.0' || val === '1') {
      statusBadge = '<span class="badge bg-success"><i class="bi bi-check-circle-fill me-1"></i>FULL DAY (1.0)</span>';
    } else if (val === '0.5') {
      statusBadge = '<span class="badge bg-primary"><i class="bi bi-circle-half me-1"></i>HALF DAY (0.5)</span>';
    } else if (String(val).endsWith('h')) {
      statusBadge = '<span class="badge text-white" style="background-color: #6f42c1;"><i class="bi bi-clock-history me-1"></i>' + val + '</span>';
    } else if (val === 'absent') {
      statusBadge = '<span class="badge bg-danger"><i class="bi bi-x-circle-fill me-1"></i>ABSENT</span>';
    } else if (val === 'sick') {
      statusBadge = '<span class="badge bg-warning text-dark"><i class="bi bi-bandaid me-1"></i>SICK LEAVE</span>';
    } else if (val === 'emergency') {
      statusBadge = '<span class="badge text-white" style="background-color: #fd7e14;"><i class="bi bi-exclamation-triangle-fill me-1"></i>EMERGENCY</span>';
    }

    daysCardsHtml += `
      <div class="focus-day-item p-3 mb-3 shadow-sm border">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-1">
          <div>
            <span class="badge bg-dark fw-bold me-2 fs-6">${d.key}</span>
            <span class="fw-bold text-dark">${d.monthStr} ${d.dayNum}</span>
            <span class="text-muted small ms-1">(${d.fullDateStr})</span>
          </div>
          <div>${statusBadge}</div>
        </div>

        <div class="row g-2 align-items-center">
          <!-- LARGE TOUCH BUTTONS: FULL, HALF, HOURS, ABSENT, SICK, EMERGENCY -->
          <div class="col-12 col-xl-8">
            <div class="row g-1">
              <div class="col-4 col-sm-2">
                <button type="button" class="btn w-100 ${val === '1.0' || val === '1' ? 'btn-success fw-bold text-white shadow-sm' : 'btn-outline-success'} py-2" style="font-size: 0.85rem; min-height: 46px;" onclick="setFocusAttendance('${d.key}', '1.0')" title="Full Day (1.0)">
                  <i class="bi bi-check-circle d-block d-sm-inline me-sm-1"></i>Full
                </button>
              </div>
              <div class="col-4 col-sm-2">
                <button type="button" class="btn w-100 ${val === '0.5' ? 'btn-primary fw-bold text-white shadow-sm' : 'btn-outline-primary'} py-2" style="font-size: 0.85rem; min-height: 46px;" onclick="setFocusAttendance('${d.key}', '0.5')" title="Half Day (0.5)">
                  <i class="bi bi-circle-half d-block d-sm-inline me-sm-1"></i>Half
                </button>
              </div>
              <div class="col-4 col-sm-2">
                <button type="button" class="btn w-100 ${String(val).endsWith('h') ? 'btn-dark fw-bold text-white shadow-sm' : 'btn-outline-dark'} py-2" style="font-size: 0.85rem; min-height: 46px; ${String(val).endsWith('h') ? 'background-color: #6f42c1 !important; border-color: #6f42c1 !important;' : ''}" onclick="openFocusCustomHours('${d.key}')" title="Custom Shift Hours">
                  <i class="bi bi-clock-history d-block d-sm-inline me-sm-1"></i>${String(val).endsWith('h') ? val : 'Hours'}
                </button>
              </div>
              <div class="col-4 col-sm-2">
                <button type="button" class="btn w-100 ${val === 'absent' ? 'btn-danger fw-bold text-white shadow-sm' : 'btn-outline-danger'} py-2" style="font-size: 0.85rem; min-height: 46px;" onclick="setFocusAttendance('${d.key}', 'absent')" title="Absent">
                  <i class="bi bi-x-circle d-block d-sm-inline me-sm-1"></i>Abs
                </button>
              </div>
              <div class="col-4 col-sm-2">
                <button type="button" class="btn w-100 ${val === 'sick' ? 'btn-warning fw-bold text-dark shadow-sm border-warning' : 'btn-outline-warning text-dark'} py-2" style="font-size: 0.85rem; min-height: 46px;" onclick="setFocusAttendance('${d.key}', 'sick')" title="Sick Leave">
                  <i class="bi bi-bandaid d-block d-sm-inline me-sm-1"></i>Sick
                </button>
              </div>
              <div class="col-4 col-sm-2">
                <button type="button" class="btn w-100 ${val === 'emergency' ? 'text-white fw-bold shadow-sm' : 'text-dark border'}" style="font-size: 0.82rem; min-height: 46px; ${val === 'emergency' ? 'background-color: #fd7e14 !important; border-color: #fd7e14 !important;' : 'border-color: #fd7e14 !important; color: #d65b00 !important;'}" onclick="setFocusAttendance('${d.key}', 'emergency')" title="Emergency Leave">
                  <i class="bi bi-exclamation-triangle d-block d-sm-inline me-sm-1"></i>Emg
                </button>
              </div>
            </div>
          </div>

          <!-- OVERTIME SELECTOR -->
          <div class="col-12 col-xl-4">
            <div class="input-group shadow-sm">
              <span class="input-group-text fw-bold bg-white text-danger border-danger">
                <i class="bi bi-stopwatch me-1"></i>OT:
              </span>
              <select class="form-select fw-bold border-danger text-center py-2" style="min-height: 46px;" onchange="setFocusOT('${d.key}', this.value)">
                <option value="0" ${otVal === 0 ? 'selected' : ''}>No Overtime</option>
                <option value="1" ${otVal === 1 ? 'selected' : ''}>+1 hr OT</option>
                <option value="2" ${otVal === 2 ? 'selected' : ''}>+2 hrs OT</option>
                <option value="3" ${otVal === 3 ? 'selected' : ''}>+3 hrs OT</option>
                <option value="4" ${otVal === 4 ? 'selected' : ''}>+4 hrs OT</option>
                <option value="5" ${otVal === 5 ? 'selected' : ''}>+5 hrs OT</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  focusBody.innerHTML = `
    <!-- WORKER HEADER WITH QUICK JUMP & REAL-TIME SUMMARY -->
    <div class="card p-3 mb-3 bg-white border-2 border-danger shadow-sm">
      <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
        <div>
          <div class="d-flex align-items-center gap-2 flex-wrap">
            <h4 class="fw-bold mb-0 text-danger text-uppercase">${w.name}</h4>
            <span class="badge bg-dark fw-bold">${w.role}</span>
            <span class="badge bg-secondary">${targetLoc}</span>
          </div>
          <div class="d-flex align-items-center gap-2 mt-1 flex-wrap">
            <span class="badge bg-light text-dark border px-2 py-1" id="focusRateHeaderBadge">
              <i class="bi bi-tag-fill text-danger me-1"></i>Standard Rate: <strong>₱${dailyRate.toFixed(2)}</strong>/day &bull; <strong>₱${hourlyRate.toFixed(2)}</strong>/hr
            </span>
            <button type="button" class="btn btn-sm ${isFocusRateEditorOpen ? 'btn-danger text-white' : 'btn-outline-danger'} fw-bold py-0 px-2" onclick="toggleFocusRateEditor()" title="Modify standard day and hour rate for this worker">
              <i class="bi ${isFocusRateEditorOpen ? 'bi-chevron-up' : 'bi-pencil-square'} me-1"></i>${isFocusRateEditorOpen ? 'Close Rates' : 'Modify Rates'}
            </button>
          </div>
        </div>
        <div style="min-width: 220px;">
          <label class="form-label small fw-bold text-muted mb-0">Jump to Worker:</label>
          <select class="form-select form-select-sm fw-bold border-secondary" onchange="jumpToFocusWorker(this.value)">
            ${workerOptionsHtml}
          </select>
        </div>
      </div>

      ${isFocusRateEditorOpen ? `
      <!-- RATE MODIFICATION PANEL IN FOCUS MODE -->
      <div class="card p-3 my-2 bg-light border-danger border shadow-sm">
        <div class="d-flex justify-content-between align-items-center mb-2 pb-1 border-bottom flex-wrap gap-1">
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-danger"><i class="bi bi-currency-exchange me-1"></i>Modify Wage Rates</span>
            <strong class="text-dark small">${w.name} (${w.role})</strong>
          </div>
          <span class="badge bg-secondary text-white" style="font-size: 0.7rem;">Site: ${targetLoc}</span>
        </div>

        <div class="row g-2 align-items-end mb-2">
          <div class="col-12 col-sm-4">
            <label class="form-label small fw-bold mb-1 text-muted">Daily Rate (₱/day):</label>
            <div class="input-group input-group-sm shadow-xs">
              <span class="input-group-text fw-bold bg-white">₱</span>
              <input type="number" id="focusDailyRateInput" class="form-control fw-bold" 
                     value="${dailyRate}" min="0" step="any" 
                     placeholder="700.00"
                     oninput="onFocusDailyRateInput(this.value)">
            </div>
          </div>
          <div class="col-12 col-sm-4">
            <label class="form-label small fw-bold mb-1 text-muted">Hourly Rate (₱/hr):</label>
            <div class="input-group input-group-sm shadow-xs">
              <span class="input-group-text fw-bold bg-white">₱</span>
              <input type="number" id="focusHourlyRateInput" class="form-control fw-bold" 
                     value="${hourlyRate}" min="0" step="any" 
                     placeholder="87.50"
                     oninput="onFocusHourlyRateInput(this.value)">
            </div>
          </div>
          <div class="col-12 col-sm-4">
            <label class="form-label small fw-bold mb-1 text-muted">OT Rate (1.0x):</label>
            <div class="form-control form-control-sm bg-white fw-bold text-danger text-center shadow-xs" id="focusOtRateDisplay">
              ₱${otHourlyRate.toFixed(2)}/hr
            </div>
          </div>
        </div>

        <!-- QUICK ROLE PRESET CHIPS -->
        <div class="d-flex flex-wrap align-items-center gap-1 mb-2 pt-1">
          <small class="text-muted fw-bold me-1" style="font-size: 0.72rem;">Presets:</small>
          <button type="button" class="btn btn-outline-secondary btn-sm py-0 px-2" style="font-size: 0.7rem;" onclick="setFocusRatePreset(1100, 137.5)">FOREMAN (₱1100 &bull; ₱137.5/hr)</button>
          <button type="button" class="btn btn-outline-secondary btn-sm py-0 px-2" style="font-size: 0.7rem;" onclick="setFocusRatePreset(720, 90)">SKILLED (₱720 &bull; ₱90/hr)</button>
          <button type="button" class="btn btn-outline-secondary btn-sm py-0 px-2" style="font-size: 0.7rem;" onclick="setFocusRatePreset(700, 87.5)">MASON (₱700 &bull; ₱87.5/hr)</button>
          <button type="button" class="btn btn-outline-secondary btn-sm py-0 px-2" style="font-size: 0.7rem;" onclick="setFocusRatePreset(500, 62.5)">LABOR (₱500 &bull; ₱62.5/hr)</button>
        </div>

        <div class="d-flex justify-content-between align-items-center pt-1 border-top">
          <small id="focusRateSaveStatus" class="text-success fw-semibold" style="font-size: 0.72rem;">✓ Rates synced with weekly payroll.</small>
          <button type="button" class="btn btn-dark btn-sm py-0 px-3 fw-bold" onclick="toggleFocusRateEditor()">Done</button>
        </div>
      </div>
      ` : ''}

      <!-- METRICS CHIPS -->
      <div class="d-flex flex-wrap gap-2 pt-2 border-top">
        <span class="badge bg-dark text-white p-2 fs-6">
          <i class="bi bi-calendar-check me-1"></i>Days: <strong>${m.daysWorked.toFixed(1)}</strong>${m.hourlyHours > 0 ? ` (+${m.hourlyHours}h)` : ''}
        </span>
        <span class="badge bg-warning text-dark p-2 fs-6">
          <i class="bi bi-stopwatch me-1"></i>OT: <strong>${m.totalOT} hrs</strong>
        </span>
        <span class="badge bg-danger text-white p-2 fs-6">
          <i class="bi bi-cash-stack me-1"></i>Bale: <strong>₱${w.baleValue || 0}</strong>
        </span>
        <span class="badge bg-success text-white p-2 fs-6 ms-auto" id="focusEstNetBadge">
          Est. Net: <strong>₱${Math.max(0, estWage).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
        </span>
      </div>
    </div>

    <!-- 6-DAY ROSTER CARDS (.focus-day-item) -->
    <div class="mb-3" id="focusDaysListContainer">
      ${daysCardsHtml}
    </div>

    <!-- WORKER CASH ADVANCE & REMARKS -->
    <div class="card p-3 bg-white border shadow-sm">
      <div class="row g-2 align-items-center">
        <div class="col-12 col-md-5">
          <label class="fw-bold small mb-1"><i class="bi bi-cash me-1 text-danger"></i>Cash Advance (Worker Bale ₱):</label>
          <div class="input-group">
            <span class="input-group-text fw-bold">₱</span>
            <input type="number" id="focusBaleInput" class="form-control fw-bold text-end" placeholder="0.00" value="${w.baleValue || ''}" oninput="updateFocusBale(this.value)">
          </div>
        </div>
        <div class="col-12 col-md-7">
          <label class="fw-bold small mb-1"><i class="bi bi-card-text me-1 text-danger"></i>Worker Remarks / Shift Note:</label>
          <input type="text" class="form-control fw-semibold" placeholder="e.g. half day due to rain, transferred from Site B..." value="${w.remarks || ''}" onchange="updateFocusWorkerRemarks(this.value)">
        </div>
      </div>
    </div>
  `;
}


function setFocusAttendance(dayKey, val) {
  const w = focusWorkerList[focusWorkerIndex];
  if (!w) return;
  if (!w.attendance) w.attendance = {};
  w.attendance[dayKey] = (w.attendance[dayKey] === val) ? "" : val;
  if (w.attendance[dayKey] !== "1.0" && w.attendance[dayKey] !== "1" && w.attendance[dayKey] !== "0.5" && !String(w.attendance[dayKey]).endsWith("h")) {
    if (w.ot) w.ot[dayKey] = 0;
  }
  saveStore();
  renderFocusWorker();
  renderUI();
}

function setFocusOT(dayKey, val) {
  const w = focusWorkerList[focusWorkerIndex];
  if (!w) return;
  if (!w.ot) w.ot = {};
  w.ot[dayKey] = parseInt(val, 10) || 0;
  saveStore();
  renderFocusWorker();
  renderUI();
}

function updateFocusBale(val) {
  const w = focusWorkerList[focusWorkerIndex];
  if (!w) return;
  w.baleValue = parseFloat(val) || 0;
  saveStore();
  renderFocusWorker();
  renderUI();
}

function focusNavWorker(step) {
  const target = focusWorkerIndex + step;
  if (target >= 0 && target < focusWorkerList.length) {
    focusWorkerIndex = target;
    renderFocusWorker();
  }
}


function showSearchWorkerModal() {
  const modalEl = document.getElementById("searchWorkerModal");
  if (!modalEl || !window.bootstrap) return;
  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  
  const field = document.getElementById("workerSearchField");
  if (field) {
    field.value = "";
    handleWorkerSearchLive("");
  }
  modal.show();
  setTimeout(() => field?.focus(), 300);
}

function handleWorkerSearchLive(query) {
  const container = document.getElementById("searchResultsContainer");
  if (!container) return;

  const cleanQuery = (query || "").trim().toUpperCase();
  const results = [];

  for (let loc in (currentActiveData.locations || {})) {
    const workers = currentActiveData.locations[loc].workers || [];
    workers.forEach(w => {
      if (!cleanQuery || w.name.toUpperCase().includes(cleanQuery) || w.role.toUpperCase().includes(cleanQuery)) {
        results.push({ loc, worker: w });
      }
    });
  }

  if (results.length === 0) {
    container.innerHTML = `<div class="p-3 text-center text-muted">No matching workers found for "${cleanQuery}".</div>`;
    return;
  }

  container.innerHTML = results.slice(0, 50).map(r => `
    <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-2" 
         style="cursor: pointer;" onclick="selectSearchedWorker('${r.loc}', '${r.worker.id}')">
      <div>
        <div class="fw-bold text-dark text-uppercase">${r.worker.name}</div>
        <span class="badge bg-secondary me-1" style="font-size: 0.65rem;">${r.worker.role}</span>
        <span class="badge bg-dark" style="font-size: 0.65rem;"><i class="bi bi-building me-1"></i>${r.loc}</span>
      </div>
      <i class="bi bi-chevron-right text-danger"></i>
    </div>
  `).join('');
}

function selectSearchedWorker(loc, workerId) {
  currentLocation = loc;
  const sel = document.getElementById("locationSelector");
  if (sel) sel.value = loc;

  const modalEl = document.getElementById("searchWorkerModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }

  renderUI();

  setTimeout(() => {
    const row = document.getElementById(`workerRow_${workerId}`);
    if (row) {
      row.scrollIntoView({ behavior: 'smooth', block: 'center' });
      row.style.transition = 'background-color 0.5s';
      row.style.backgroundColor = '#fff3cd';
      setTimeout(() => { row.style.backgroundColor = ''; }, 2500);
    }
  }, 200);
}

// --- ADD WORKER MODAL ---
function showAddWorkerModal(loc = null) {
  if (!isAdmin()) {
    alert("Staff accounts cannot add workers. Administrator authorization required.");
    return;
  }

  const targetLoc = loc || (currentLocation === "VIEW_ALL" ? Object.keys(currentActiveData.locations)[0] : currentLocation);
  if (!targetLoc) {
    alert("Please create a site first before adding workers.");
    return;
  }

  const badge = document.getElementById("modalLocName");
  if (badge) badge.innerText = targetLoc;

  const nameInput = document.getElementById("newWorkerName");
  if (nameInput) nameInput.value = "";

  const modalEl = document.getElementById("addWorkerModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

function confirmAddWorker() {
  if (!isAdmin()) {
    alert("Staff accounts cannot add workers. Administrator authorization required.");
    return;
  }

  const targetLoc = document.getElementById("modalLocName")?.innerText || currentLocation;
  const nameInput = document.getElementById("newWorkerName");
  const roleSelect = document.getElementById("newWorkerRole");

  const name = (nameInput?.value || "").trim().toUpperCase();
  const role = roleSelect?.value || "LABOR";

  if (!name) {
    alert("Please enter the worker full name.");
    return;
  }

  if (!currentActiveData.locations[targetLoc]) {
    alert("Target site not found.");
    return;
  }

  const workerId = `w_${targetLoc.substring(0, 3)}_${role.substring(0, 3)}_${Date.now()}`;
  currentActiveData.locations[targetLoc].workers.push({
    id: workerId,
    name: name,
    role: role,
    baleValue: 0,
    notesHistory: [],
    updatedAt: Date.now(),
    attendance: { M: '', T: '', W: '', Th: '', F: '', S: '' },
    ot: { M: 0, T: 0, W: 0, Th: 0, F: 0, S: 0 }
  });

  saveStore();
  renderUI();

  const modalEl = document.getElementById("addWorkerModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }
}

function openAddWorkerModal(loc) {
  showAddWorkerModal(loc);
}

// --- WORKER INDIVIDUAL ANALYTICS & REMARKS MODAL (ALL DATABASE RECORDS) ---
function openWorkerProfileModal(workerId, workerName) {
  activeWorkerForNotes = workerId;
  let targetWorker = null;
  let targetLoc = null;

  // 1. Locate worker in current period
  for (let loc in currentActiveData.locations) {
    const w = (currentActiveData.locations[loc].workers || []).find(item => item.id === workerId);
    if (w) { targetWorker = w; targetLoc = loc; break; }
  }

  // Fallback search across all database periods if not active in current week
  if (!targetWorker) {
    for (let dKey of Object.keys(timesheetDB).sort().reverse()) {
      const periodData = timesheetDB[dKey];
      if (!periodData || !periodData.locations) continue;
      for (let loc in periodData.locations) {
        const w = (periodData.locations[loc].workers || []).find(item => item.id === workerId || (workerName && item.name === workerName));
        if (w) { targetWorker = w; targetLoc = loc; break; }
      }
      if (targetWorker) break;
    }
  }

  if (!targetWorker) return;

  const nameEl = document.getElementById("profileWorkerName");
  const roleBadge = document.getElementById("profileWorkerRole");
  const siteBadge = document.getElementById("profileWorkerSite");
  const historyBadge = document.getElementById("profileWorkerHistoryBadge");
  const ratesEl = document.getElementById("profileWorkerRates");
  const statsGrid = document.getElementById("profileWorkerStatsGrid");
  const allTimeStatsGrid = document.getElementById("profileWorkerAllTimeStatsGrid");
  const pastRecordsTableBody = document.getElementById("profilePastRecordsTableBody");
  const pastWeeksCountBadge = document.getElementById("profilePastWeeksCount");
  const shiftHeaderRow = document.getElementById("profileShiftHeaderRow");
  const shiftStatusRow = document.getElementById("profileShiftStatusRow");
  const shiftOtRow = document.getElementById("profileShiftOtRow");
  const remarkInput = document.getElementById("profileWorkerRemarkInput");
  const allRemarksContainer = document.getElementById("profileAllDatesRemarksContainer");
  const remarksTotalCountBadge = document.getElementById("profileRemarksTotalCount");

  // Current Week Rates
  const dailyRate = getWorkerRate(targetWorker.id, targetWorker.role);
  const hourlyRate = getWorkerHourlyRate(targetLoc, targetWorker.id, dailyRate);
  const otHourlyRate = hourlyRate * 1.0;

  if (nameEl) nameEl.innerText = targetWorker.name;
  if (roleBadge) roleBadge.innerText = targetWorker.role;
  if (siteBadge) siteBadge.innerText = targetLoc || 'All Sites';
  if (ratesEl) {
    ratesEl.innerHTML = `Daily Rate: <strong class="text-dark">₱${dailyRate.toFixed(2)}</strong> &bull; Hourly Rate: <strong class="text-dark">₱${hourlyRate.toFixed(2)}</strong> &bull; OT Rate (1.0x): <strong class="text-danger">₱${otHourlyRate.toFixed(2)}/hr</strong>`;
  }

  // CURRENT WEEK METRICS
  const curM = getWorkerMetrics(targetWorker);
  const curRegPay = curM.daysWorked * dailyRate;
  const curHourlyPay = curM.hourlyHours * hourlyRate;
  const curOtPay = curM.totalOT * otHourlyRate;
  const curGross = curRegPay + curHourlyPay + curOtPay;
  const curBale = parseFloat(targetWorker.baleValue) || 0;
  const curNet = Math.max(0, curGross - curBale);
  const curAttPct = Math.min(100, Math.round((curM.daysWorked / 6) * 100));

  if (statsGrid) {
    statsGrid.innerHTML = `
      <div class="col-6 col-md-4">
        <div class="card p-2 text-center bg-light border shadow-sm h-100">
          <small class="text-muted fw-bold" style="font-size:0.7rem;">CURRENT WEEK ATTENDANCE</small>
          <div class="fs-4 fw-bold ${curAttPct >= 80 ? 'text-success' : (curAttPct >= 50 ? 'text-warning' : 'text-danger')}">${curAttPct}%</div>
          <div class="progress mt-1" style="height: 6px;">
            <div class="progress-bar ${curAttPct >= 80 ? 'bg-success' : (curAttPct >= 50 ? 'bg-warning' : 'bg-danger')}" style="width: ${curAttPct}%;"></div>
          </div>
          <small class="text-muted mt-1" style="font-size:0.7rem;">${curM.daysWorked.toFixed(1)} of 6 standard days</small>
        </div>
      </div>
      <div class="col-6 col-md-4">
        <div class="card p-2 text-center bg-light border shadow-sm h-100">
          <small class="text-muted fw-bold" style="font-size:0.7rem;">DAYS WORKED</small>
          <div class="fs-4 fw-bold text-dark">${curM.daysWorked.toFixed(1)}</div>
          <small class="text-muted" style="font-size:0.7rem;">${curM.hourlyHours > 0 ? `+${curM.hourlyHours}h hourly` : 'Regular shifts'}</small>
        </div>
      </div>
      <div class="col-6 col-md-4">
        <div class="card p-2 text-center bg-light border shadow-sm h-100">
          <small class="text-muted fw-bold" style="font-size:0.7rem;">OVERTIME (OT)</small>
          <div class="fs-4 fw-bold text-danger">${curM.totalOT}h</div>
          <small class="text-danger fw-bold" style="font-size:0.7rem;">+₱${curOtPay.toFixed(2)} OT Pay</small>
        </div>
      </div>
      <div class="col-6 col-md-6">
        <div class="card p-2 text-center bg-light border shadow-sm h-100">
          <small class="text-muted fw-bold" style="font-size:0.7rem;">BALE (ADVANCE DEDUCTION)</small>
          <div class="fs-4 fw-bold text-danger">₱${curBale.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <small class="text-muted" style="font-size:0.7rem;">Deducted from gross</small>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="card p-2 text-center bg-white border-danger border-2 shadow-sm h-100">
          <small class="text-muted fw-bold" style="font-size:0.7rem;">CURRENT WEEK NET PAYOUT</small>
          <div class="fs-4 fw-bold text-success">₱${curNet.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <small class="text-muted" style="font-size:0.7rem;">Gross: ₱${curGross.toFixed(2)} &bull; Deduct Bale: ₱${curBale.toFixed(2)}</small>
        </div>
      </div>
    `;
  }

  // --- HISTORICAL AGGREGATION ACROSS ALL DATES IN DATABASE ---
  const allDbDates = Object.keys(timesheetDB).sort().reverse();
  const historicalRecords = [];
  const allRemarksFeed = [];
  let careerDaysWorked = 0;
  let careerHourlyHours = 0;
  let careerOT = 0;
  let careerGross = 0;
  let careerBale = 0;
  let careerNet = 0;
  let totalWeeksExpected = 0;
  const sitesWorkedSet = new Set();

  allDbDates.forEach(dKey => {
    const periodObj = timesheetDB[dKey];
    if (!periodObj || !periodObj.locations) return;

    for (let loc in periodObj.locations) {
      const workers = periodObj.locations[loc].workers || [];
      const match = workers.find(w => w.id === targetWorker.id || (w.name && targetWorker.name && w.name.trim().toLowerCase() === targetWorker.name.trim().toLowerCase()));
      if (match) {
        sitesWorkedSet.add(loc);
        const m = getWorkerMetrics(match);
        const datesForWeek = calculateDatesForStart(dKey);
        const periodStr = (datesForWeek.length > 0) ? getPeriodString(datesForWeek) : dKey;

        let wDailyRate = DEFAULT_ROLE_DAY_RATES[match.role] || 500;
        if (payrollDB[dKey] && payrollDB[dKey][loc] && payrollDB[dKey][loc][match.id] && payrollDB[dKey][loc][match.id].dailyRate) {
          wDailyRate = payrollDB[dKey][loc][match.id].dailyRate;
        }
        let wHourlyRate = (payrollDB[dKey] && payrollDB[dKey][loc] && payrollDB[dKey][loc][match.id] && payrollDB[dKey][loc][match.id].hourlyRate) 
          ? payrollDB[dKey][loc][match.id].hourlyRate 
          : parseFloat((wDailyRate / 8.0).toFixed(2));

        const wRegPay = m.daysWorked * wDailyRate;
        const wHourlyPay = m.hourlyHours * wHourlyRate;
        const wOtPay = m.totalOT * wHourlyRate;
        const wGross = wRegPay + wHourlyPay + wOtPay;
        const wBale = parseFloat(match.baleValue) || 0;
        const wNet = Math.max(0, wGross - wBale);

        careerDaysWorked += m.daysWorked;
        careerHourlyHours += m.hourlyHours;
        careerOT += m.totalOT;
        careerGross += wGross;
        careerBale += wBale;
        careerNet += wNet;
        totalWeeksExpected += 1;

        historicalRecords.push({
          dateKey: dKey,
          periodStr: periodStr,
          site: loc,
          role: match.role,
          daysWorked: m.daysWorked,
          hourlyHours: m.hourlyHours,
          otHours: m.totalOT,
          dailyRate: wDailyRate,
          gross: wGross,
          bale: wBale,
          net: wNet,
          isCurrent: (dKey === currentDate)
        });

        // Collect timesheet remarks from that date
        if (match.remarks && match.remarks.trim()) {
          allRemarksFeed.push({
            dateKey: dKey,
            periodStr: periodStr,
            site: loc,
            type: 'Timesheet Remark',
            text: match.remarks.trim(),
            dateStr: periodStr
          });
        }

        // Collect detailed notes from that date
        if (Array.isArray(match.notesHistory)) {
          match.notesHistory.forEach(n => {
            if (n && n.text) {
              allRemarksFeed.push({
                dateKey: dKey,
                periodStr: periodStr,
                site: loc,
                type: 'Supervisor Observation',
                text: n.text,
                dateStr: n.dateStr || periodStr
              });
            }
          });
        }
      }
    }
  });

  const totalStandardDays = Math.max(6, totalWeeksExpected * 6);
  const careerAttPct = totalStandardDays > 0 ? Math.min(100, Math.round((careerDaysWorked / totalStandardDays) * 100)) : 0;

  if (historyBadge) {
    historyBadge.innerText = `${historicalRecords.length} Database Week${historicalRecords.length === 1 ? '' : 's'}`;
  }

  // Populate All-Time Stats Grid
  if (allTimeStatsGrid) {
    allTimeStatsGrid.innerHTML = `
      <div class="col-6 col-md-4">
        <div class="card p-2 text-center bg-light border shadow-sm h-100">
          <small class="text-muted fw-bold" style="font-size:0.7rem;">ALL-TIME ATTENDANCE</small>
          <div class="fs-4 fw-bold ${careerAttPct >= 80 ? 'text-success' : (careerAttPct >= 50 ? 'text-warning' : 'text-danger')}">${careerAttPct}%</div>
          <div class="progress mt-1" style="height: 6px;">
            <div class="progress-bar ${careerAttPct >= 80 ? 'bg-success' : (careerAttPct >= 50 ? 'bg-warning' : 'bg-danger')}" style="width: ${careerAttPct}%;"></div>
          </div>
          <small class="text-muted mt-1" style="font-size:0.7rem;">Across ${totalWeeksExpected} recorded week(s)</small>
        </div>
      </div>
      <div class="col-6 col-md-4">
        <div class="card p-2 text-center bg-light border shadow-sm h-100">
          <small class="text-muted fw-bold" style="font-size:0.7rem;">TOTAL DAYS WORKED</small>
          <div class="fs-4 fw-bold text-dark">${careerDaysWorked.toFixed(1)}</div>
          <small class="text-muted" style="font-size:0.7rem;">${careerHourlyHours > 0 ? `+${careerHourlyHours}h hourly shifts` : 'Full / Half shifts'}</small>
        </div>
      </div>
      <div class="col-6 col-md-4">
        <div class="card p-2 text-center bg-light border shadow-sm h-100">
          <small class="text-muted fw-bold" style="font-size:0.7rem;">TOTAL OVERTIME (OT)</small>
          <div class="fs-4 fw-bold text-danger">${careerOT}h</div>
          <small class="text-muted" style="font-size:0.7rem;">Career OT logged</small>
        </div>
      </div>
      <div class="col-6 col-md-4">
        <div class="card p-2 text-center bg-light border shadow-sm h-100">
          <small class="text-muted fw-bold" style="font-size:0.7rem;">TOTAL GROSS EARNINGS</small>
          <div class="fs-4 fw-bold text-dark">₱${careerGross.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <small class="text-muted" style="font-size:0.7rem;">All-time gross pay</small>
        </div>
      </div>
      <div class="col-6 col-md-4">
        <div class="card p-2 text-center bg-light border shadow-sm h-100">
          <small class="text-muted fw-bold" style="font-size:0.7rem;">TOTAL BALE TAKEN</small>
          <div class="fs-4 fw-bold text-danger">₱${careerBale.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <small class="text-muted" style="font-size:0.7rem;">Career advance deductions</small>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="card p-2 text-center bg-white border-danger border-2 shadow-sm h-100">
          <small class="text-muted fw-bold" style="font-size:0.7rem;">TOTAL NET WAGES PAID</small>
          <div class="fs-4 fw-bold text-success">₱${careerNet.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <small class="text-muted" style="font-size:0.7rem;">Lifetime cumulative payout</small>
        </div>
      </div>
    `;
  }

  // Populate Past Records Table
  if (pastWeeksCountBadge) {
    pastWeeksCountBadge.innerText = `${historicalRecords.length} Record${historicalRecords.length === 1 ? '' : 's'}`;
  }

  if (pastRecordsTableBody) {
    if (historicalRecords.length === 0) {
      pastRecordsTableBody.innerHTML = `<tr><td colspan="10" class="p-3 text-muted">No records found for this worker in the database.</td></tr>`;
    } else {
      pastRecordsTableBody.innerHTML = historicalRecords.map(rec => `
        <tr class="${rec.isCurrent ? 'table-warning fw-semibold' : ''}">
          <td class="text-start ps-2">
            <span class="fw-bold">${rec.periodStr}</span>
            ${rec.isCurrent ? '<span class="badge bg-danger ms-1" style="font-size:0.65rem;">Active</span>' : ''}
          </td>
          <td><span class="badge bg-secondary">${rec.site}</span></td>
          <td><span class="badge bg-dark">${rec.role}</span></td>
          <td class="fw-bold">${rec.daysWorked.toFixed(1)}</td>
          <td>${rec.hourlyHours > 0 ? `${rec.hourlyHours}h` : '-'}</td>
          <td class="${rec.otHours > 0 ? 'text-danger fw-bold' : ''}">${rec.otHours > 0 ? `${rec.otHours}h` : '-'}</td>
          <td>₱${rec.dailyRate.toFixed(2)}</td>
          <td>₱${rec.gross.toFixed(2)}</td>
          <td class="text-danger fw-semibold">${rec.bale > 0 ? `₱${rec.bale.toFixed(2)}` : '-'}</td>
          <td class="text-success fw-bold">₱${rec.net.toFixed(2)}</td>
        </tr>
      `).join('');
    }
  }

  // Populate All Dates Remarks Feed
  if (remarksTotalCountBadge) {
    remarksTotalCountBadge.innerText = `${allRemarksFeed.length} Note${allRemarksFeed.length === 1 ? '' : 's'}`;
  }

  if (allRemarksContainer) {
    if (allRemarksFeed.length === 0) {
      allRemarksContainer.innerHTML = `<div class="text-muted small p-3 text-center bg-light border rounded">No remarks or supervisor notes recorded across any database period yet.</div>`;
    } else {
      allRemarksContainer.innerHTML = allRemarksFeed.map(item => `
        <div class="p-2 border rounded bg-white shadow-xs">
          <div class="d-flex justify-content-between align-items-center mb-1 flex-wrap gap-1">
            <div class="d-flex align-items-center gap-1">
              <span class="badge ${item.type === 'Timesheet Remark' ? 'bg-dark' : 'bg-danger'} py-1">${item.type}</span>
              <span class="badge bg-secondary">${item.site}</span>
              <span class="small fw-bold text-dark">${item.periodStr}</span>
            </div>
            <small class="text-muted" style="font-size: 0.72rem;">${item.dateStr || ''}</small>
          </div>
          <div class="small text-dark fw-semibold ps-1">${item.text}</div>
        </div>
      `).join('');
    }
  }

  // 6-day shift breakdown for Current Week
  const dates = getCalculatedDates();
  if (shiftHeaderRow && shiftStatusRow && shiftOtRow) {
    shiftHeaderRow.innerHTML = dates.map(d => `
      <th class="text-center py-1">
        <span class="fw-bold d-block">${d.key}</span>
        <span class="small text-muted">${d.dayNum}</span>
      </th>
    `).join('');

    shiftStatusRow.innerHTML = dates.map(d => {
      const val = (targetWorker.attendance && targetWorker.attendance[d.key]) || '';
      let badge = '<span class="badge bg-light text-muted border">-</span>';
      if (val === '1.0' || val === '1') {
        badge = '<span class="badge bg-success">Full (1.0)</span>';
      } else if (val === '0.5') {
        badge = '<span class="badge bg-primary">Half (0.5)</span>';
      } else if (String(val).endsWith('h')) {
        badge = `<span class="badge text-white" style="background-color:#6f42c1;">${val}</span>`;
      } else if (val === 'absent') {
        badge = '<span class="badge bg-danger">Absent</span>';
      } else if (val === 'sick') {
        badge = '<span class="badge bg-warning text-dark"><i class="bi bi-bandaid me-1"></i>Sick</span>';
      } else if (val === 'emergency') {
        badge = '<span class="badge text-white" style="background-color:#fd7e14;"><i class="bi bi-exclamation-triangle-fill me-1"></i>Emg</span>';
      }
      return `<td class="py-2">${badge}</td>`;
    }).join('');

    shiftOtRow.innerHTML = dates.map(d => {
      const otVal = (targetWorker.ot && targetWorker.ot[d.key]) || 0;
      return `<td class="py-1 small fw-bold ${otVal > 0 ? 'text-danger' : 'text-muted'}">${otVal > 0 ? `+${otVal}h OT` : '-'}</td>`;
    }).join('');
  }

  if (remarkInput) {
    remarkInput.value = targetWorker.remarks || '';
  }

  const modalEl = document.getElementById("workerProfileModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

function launchFocusForActiveWorker() {
  if (!activeWorkerForNotes) return;
  const modalEl = document.getElementById("workerProfileModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }
  startFocusMode(activeWorkerForNotes);
}

function saveWorkerRemarkFromProfile(remark) {
  if (!activeWorkerForNotes) return;
  updateWorkerRemarks(activeWorkerForNotes, remark);
  renderUI();
  // refresh profile modal view
  openWorkerProfileModal(activeWorkerForNotes);
}

function updateWorkerRemarks(workerId, remark) {
  for (let loc in currentActiveData.locations) {
    const w = (currentActiveData.locations[loc].workers || []).find(item => item.id === workerId);
    if (w) {
      w.remarks = remark;
      w.updatedAt = Date.now();
      saveStore();
      return;
    }
  }
}

function renderWorkerNotesList() {
  // Retained for backward compatibility
}

function addWorkerNote() {
  const inputEl = document.getElementById("newWorkerNoteInput");
  if (!inputEl || !activeWorkerForNotes) return;

  const text = inputEl.value.trim();
  if (!text) return;

  for (let loc in currentActiveData.locations) {
    const w = (currentActiveData.locations[loc].workers || []).find(item => item.id === activeWorkerForNotes);
    if (w) {
      if (!w.notesHistory) w.notesHistory = [];
      const now = new Date();
      w.notesHistory.unshift({
        text: text,
        timestamp: Date.now(),
        dateStr: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
      });
      saveStore();
      inputEl.value = "";
      renderUI();
      openWorkerProfileModal(activeWorkerForNotes, w.name);
      return;
    }
  }
}

function deleteWorkerNote(idx) {
  for (let loc in currentActiveData.locations) {
    const w = (currentActiveData.locations[loc].workers || []).find(item => item.id === activeWorkerForNotes);
    if (w && w.notesHistory) {
      w.notesHistory.splice(idx, 1);
      saveStore();
      renderWorkerNotesList();
      renderUI();
      return;
    }
  }
}

// --- SITE NOTES LOGIC ---
let siteNotesVisible = {};

function toggleSiteNotes(loc) {
  siteNotesVisible[loc] = !siteNotesVisible[loc];
  renderUI();
}

function updateSiteRemarks(loc, text) {
  if (currentActiveData.locations[loc]) {
    currentActiveData.locations[loc].remarks = text;
    saveStore();
  }
}

function saveSiteNotesDirect(loc) {
  const textarea = document.getElementById(`siteNotesText_${loc}`);
  if (textarea && currentActiveData.locations[loc]) {
    currentActiveData.locations[loc].remarks = textarea.value;
    saveStore();
    const statusEl = document.getElementById(`siteNotesSavedStatus_${loc}`);
    if (statusEl) {
      statusEl.innerText = "✓ Site notes saved successfully!";
      statusEl.className = "text-success fw-bold small";
      setTimeout(() => {
        if (statusEl) {
          statusEl.innerText = "Notes saved for this site.";
          statusEl.className = "text-muted small";
        }
      }, 3000);
    }
    const previewEl = document.getElementById(`siteNotesPreviewText_${loc}`);
    if (previewEl) {
      previewEl.innerText = textarea.value;
    }
  }
}

function appendSiteNotePreset(loc, presetText) {
  const textarea = document.getElementById(`siteNotesText_${loc}`);
  if (!textarea) return;
  const current = textarea.value.trim();
  const updated = current ? `${current}\n• ${presetText}` : `• ${presetText}`;
  textarea.value = updated;
  updateSiteRemarks(loc, updated);
  const statusEl = document.getElementById(`siteNotesSavedStatus_${loc}`);
  if (statusEl) {
    statusEl.innerText = "✓ Preset added & saved!";
    statusEl.className = "text-success fw-bold small";
    setTimeout(() => {
      if (statusEl) {
        statusEl.innerText = "Notes saved for this site.";
        statusEl.className = "text-muted small";
      }
    }, 2500);
  }
}

let activeSiteForNotesModal = null;

function openSiteNotesModal(loc) {
  activeSiteForNotesModal = loc;
  const locData = currentActiveData.locations[loc];
  const titleEl = document.getElementById("siteNotesModalTitle");
  const textEl = document.getElementById("modalSiteNotesText");
  const statusEl = document.getElementById("modalSiteNotesStatus");

  if (titleEl) titleEl.innerText = loc;
  if (textEl) textEl.value = (locData && locData.remarks) || '';
  if (statusEl) statusEl.innerText = (locData && locData.remarks) ? "Existing notes loaded." : "";

  const modalEl = document.getElementById("siteNotesModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

function saveModalSiteNotes() {
  if (!activeSiteForNotesModal) return;
  const textEl = document.getElementById("modalSiteNotesText");
  const text = textEl ? textEl.value : '';
  updateSiteRemarks(activeSiteForNotesModal, text);
  renderUI();
  const modalEl = document.getElementById("siteNotesModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }
}

function appendModalSiteNotePreset(presetText) {
  const textEl = document.getElementById("modalSiteNotesText");
  if (!textEl) return;
  const current = textEl.value.trim();
  textEl.value = current ? `${current}\n• ${presetText}` : `• ${presetText}`;
}

// --- RENAME WORKER MODAL ---
function openRenameWorkerModal(workerId) {
  if (!isAdmin()) {
    alert("Staff accounts cannot rename workers or change worker roles. Administrator authorization required.");
    return;
  }

  activeWorkerForRename = workerId;
  let targetWorker = null;

  for (let loc in currentActiveData.locations) {
    const w = (currentActiveData.locations[loc].workers || []).find(item => item.id === workerId);
    if (w) { targetWorker = w; break; }
  }

  if (!targetWorker) return;

  const nameInput = document.getElementById("renameWorkerNameInput");
  const roleInput = document.getElementById("renameWorkerRoleInput");

  if (nameInput) nameInput.value = targetWorker.name;
  if (roleInput) roleInput.value = targetWorker.role;

  const modalEl = document.getElementById("renameWorkerModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

function confirmRenameWorker() {
  if (!isAdmin()) {
    alert("Staff accounts cannot rename workers or change worker roles. Administrator authorization required.");
    return;
  }

  if (!activeWorkerForRename) return;
  const name = (document.getElementById("renameWorkerNameInput")?.value || "").trim().toUpperCase();
  const role = document.getElementById("renameWorkerRoleInput")?.value || "LABOR";

  if (!name) {
    alert("Worker name cannot be empty.");
    return;
  }

  for (let loc in currentActiveData.locations) {
    const w = (currentActiveData.locations[loc].workers || []).find(item => item.id === activeWorkerForRename);
    if (w) {
      w.name = name;
      w.role = role;
      w.updatedAt = Date.now();
      saveStore();
      renderUI();
      if (document.getElementById("dailyWagePayrollModal")?.classList.contains("show")) {
        renderPayrollTable();
      }
      break;
    }
  }

  const modalEl = document.getElementById("renameWorkerModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }
}

// --- CREATE STAFF ACCOUNT MODAL ---
function showCreateAccountModal() {
  if (!isAdmin()) {
    alert("Administrator permission required to manage staff accounts.");
    return;
  }

  const userField = document.getElementById("newStaffUsername");
  const passField = document.getElementById("newStaffPassword");
  const alertEl = document.getElementById("createAccountAlert");

  if (userField) userField.value = "";
  if (passField) passField.value = "";
  if (alertEl) alertEl.classList.add("d-none");

  renderStaffAccountsList();

  const modalEl = document.getElementById("createAccountModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

function renderStaffAccountsList() {
  const container = document.getElementById("existingStaffList");
  if (!container) return;

  const accounts = getStaffAccounts();
  if (accounts.length === 0) {
    container.innerHTML = `<div class="text-muted small">No secondary staff accounts registered yet.</div>`;
    return;
  }

  container.innerHTML = accounts.map((acc, idx) => `
    <div class="d-flex justify-content-between align-items-center p-2 border rounded bg-white">
      <div>
        <strong class="text-dark"><i class="bi bi-person-badge text-danger me-1"></i>${acc.username}</strong>
        <span class="badge bg-secondary ms-1">Staff</span>
      </div>
      <button class="btn btn-sm btn-outline-danger p-0 px-2" onclick="deleteStaffAccount(${idx})">
        <i class="bi bi-trash"></i>
      </button>
    </div>
  `).join('');
}

function confirmCreateStaffAccount() {
  const u = (document.getElementById("newStaffUsername")?.value || "").trim();
  const p = (document.getElementById("newStaffPassword")?.value || "").trim();
  const alertEl = document.getElementById("createAccountAlert");

  if (!u || !p) {
    if (alertEl) {
      alertEl.innerText = "Please provide both Username and Password.";
      alertEl.classList.remove("d-none");
    }
    return;
  }

  if (u.toLowerCase() === "admin") {
    if (alertEl) {
      alertEl.innerText = "Cannot create account with reserved name 'Admin'.";
      alertEl.classList.remove("d-none");
    }
    return;
  }

  const accounts = getStaffAccounts();
  if (accounts.some(a => a.username.toLowerCase() === u.toLowerCase())) {
    if (alertEl) {
      alertEl.innerText = "An account with this username already exists.";
      alertEl.classList.remove("d-none");
    }
    return;
  }

  accounts.push({ username: u, password: p, createdAt: Date.now() });
  saveStaffAccounts(accounts);

  if (alertEl) {
    alertEl.className = "alert alert-success py-2 small";
    alertEl.innerText = `Staff account '${u}' created successfully!`;
    alertEl.classList.remove("d-none");
  }

  document.getElementById("newStaffUsername").value = "";
  document.getElementById("newStaffPassword").value = "";
  renderStaffAccountsList();
}

function deleteStaffAccount(idx) {
  if (!isAdmin()) {
    alert("Administrator authorization required to delete staff accounts.");
    return;
  }
  if (confirm("Permanently delete this staff account?")) {
    const accounts = getStaffAccounts();
    accounts.splice(idx, 1);
    saveStaffAccounts(accounts);
    renderStaffAccountsList();
  }
}

// --- CREATE PROJECT SITE MODAL ---
function showCreateProjectModal() {
  if (!isAdmin()) {
    alert("Administrator permission required to create project sites.");
    return;
  }
  const inputEl = document.getElementById("newProjectName");
  if (inputEl) inputEl.value = "";

  const modalEl = document.getElementById("createProjectModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

function confirmCreateProject() {
  if (!isAdmin()) {
    alert("Staff accounts cannot create project sites. Administrator authorization required.");
    return;
  }

  const inputEl = document.getElementById("newProjectName");
  const name = (inputEl?.value || "").trim().toUpperCase();

  if (!name) {
    alert("Please enter a valid project location name.");
    return;
  }

  if (currentActiveData.locations[name]) {
    alert(`Site "${name}" already exists.`);
    return;
  }

  currentActiveData.locations[name] = {
    baleValue: 0,
    isDone: false,
    siteRemarksHistory: [],
    updatedAt: Date.now(),
    workers: []
  };

  currentLocation = name;
  saveStore();
  renderLocationDropdown();
  renderUI();

  const modalEl = document.getElementById("createProjectModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }
}

// --- DAILY WAGE PAYROLL ENGINE ---
function getWorkerHourlyRate(loc, workerId, dailyRate) {
  const dRate = (dailyRate !== undefined && dailyRate !== null) ? parseFloat(dailyRate) : 500;
  const exactHour = Math.round((dRate / 8.0) * 100) / 100;
  if (payrollDB[currentDate] && payrollDB[currentDate][loc] && payrollDB[currentDate][loc][workerId]) {
    const saved = payrollDB[currentDate][loc][workerId].hourlyRate;
    if (saved !== undefined && saved !== null && saved !== "") {
      const numSaved = parseFloat(saved);
      // Auto-correct any legacy integer-rounded rate (e.g. 88 for 87.5, 138 for 137.5, 63 for 62.5)
      if (numSaved === Math.round(dRate / 8.0) && (dRate % 8 !== 0)) {
        payrollDB[currentDate][loc][workerId].hourlyRate = exactHour;
        return exactHour;
      }
      return numSaved;
    }
  }
  return exactHour;
}

function getWorkerRate(workerId, role) {
  const currentWeekRates = payrollDB[currentDate] || {};
  for (let loc in currentWeekRates) {
    if (currentWeekRates[loc] && currentWeekRates[loc][workerId] && currentWeekRates[loc][workerId].dailyRate !== undefined && currentWeekRates[loc][workerId].dailyRate !== null) {
      return currentWeekRates[loc][workerId].dailyRate;
    }
  }
  const cleanRole = (role || "").toUpperCase();
  return DEFAULT_ROLE_DAY_RATES[cleanRole] || 500;
}

function saveWorkerRate(loc, workerId, rate) {
  if (!payrollDB[currentDate]) payrollDB[currentDate] = {};
  if (!payrollDB[currentDate][loc]) payrollDB[currentDate][loc] = {};
  if (!payrollDB[currentDate][loc][workerId]) payrollDB[currentDate][loc][workerId] = {};
  const numRate = parseFloat(rate) || 0;
  payrollDB[currentDate][loc][workerId].dailyRate = numRate;
  // Automatically calculate hourly rate preserving decimals (e.g. 87.5 for 700, 137.5 for 1100, 62.5 for 500)
  const exactHour = Math.round((numRate / 8.0) * 100) / 100;
  payrollDB[currentDate][loc][workerId].hourlyRate = exactHour;
  safeStorageSet(PAYROLL_STORAGE_KEY, JSON.stringify(payrollDB));
}

function saveWorkerHourlyRate(loc, workerId, rate) {
  if (!payrollDB[currentDate]) payrollDB[currentDate] = {};
  if (!payrollDB[currentDate][loc]) payrollDB[currentDate][loc] = {};
  if (!payrollDB[currentDate][loc][workerId]) payrollDB[currentDate][loc][workerId] = {};
  payrollDB[currentDate][loc][workerId].hourlyRate = parseFloat(rate) || 0;
  safeStorageSet(PAYROLL_STORAGE_KEY, JSON.stringify(payrollDB));
}

let isProjectBaleDeducted = true;
let payrollProjectBaleOverride = null;

function getActiveProjectBaleValue() {
  if (payrollProjectBaleOverride !== null) {
    return payrollProjectBaleOverride;
  }
  if (currentLocation === "VIEW_ALL") {
    const delSites = getDeletedSites();
    const sites = Object.keys(currentActiveData.locations || {}).filter(s => !delSites.includes(s.toUpperCase()));
    return sites.reduce((sum, s) => {
      const locObj = currentActiveData.locations[s];
      if (!locObj || locObj.isBaleEnabled === false) return sum;
      return sum + (locObj.baleValue || 0);
    }, 0);
  } else {
    const locObj = currentActiveData.locations[currentLocation];
    if (!locObj || locObj.isBaleEnabled === false) return 0;
    return locObj.baleValue || 0;
  }
}

function toggleProjectBaleDeduction(isChecked) {
  isProjectBaleDeducted = !!isChecked;
  const toggleEl = document.getElementById("payrollProjectBaleToggle");
  if (toggleEl) toggleEl.checked = isProjectBaleDeducted;
  renderPayrollTable();
}

function onPayrollManualBaleInput(val) {
  const num = parseFloat(val);
  payrollProjectBaleOverride = isNaN(num) ? 0 : num;
  if (currentLocation !== "VIEW_ALL" && currentActiveData.locations[currentLocation]) {
    currentActiveData.locations[currentLocation].baleValue = payrollProjectBaleOverride;
    saveStore();
  }
  renderPayrollTable();
}

function openDailyWagePayrollModal() {
  const modalEl = document.getElementById("dailyWagePayrollModal");
  if (!modalEl || !window.bootstrap) return;

  payrollProjectBaleOverride = null;

  const locBadge = document.getElementById("payrollLocationBadge");
  if (locBadge) locBadge.innerText = currentLocation === "VIEW_ALL" ? "ALL SITES" : currentLocation;

  const dates = getCalculatedDates();
  const dateRangeStr = getPeriodString(dates);
  const periodBadge = document.getElementById("payrollPeriodBadge");
  if (periodBadge) periodBadge.innerText = dateRangeStr;

  const toggleEl = document.getElementById("payrollProjectBaleToggle");
  if (toggleEl) toggleEl.checked = isProjectBaleDeducted;

  renderPayrollTable();
  bootstrap.Modal.getOrCreateInstance(modalEl).show();
}

function renderPayrollTable() {
  const tbody = document.getElementById("payrollTableBody");
  const tfoot = document.getElementById("payrollTableFooter");
  if (!tbody || !tfoot) return;

  const delSites = getDeletedSites();
  let sitesToRender = (currentLocation === "VIEW_ALL") 
    ? Object.keys(currentActiveData.locations || {}).filter(s => !delSites.includes(s.toUpperCase()))
    : [currentLocation];

  let totalDays = 0;
  let totalHourlyHours = 0;
  let totalOTHours = 0;
  let totalOTPay = 0;
  let totalSubtotal = 0;

  let rowsHtml = '';

  sitesToRender.forEach(loc => {
    const locData = currentActiveData.locations[loc];
    if (!locData) return;

    let workers = locData.workers || [];
    if (selectedRolesFilter.length > 0) {
      workers = workers.filter(w => selectedRolesFilter.includes(w.role));
    }

    if (currentLocation === "VIEW_ALL" && workers.length > 0) {
      rowsHtml += `
        <tr class="table-dark">
          <td colspan="11" class="text-start ps-3 fw-bold text-uppercase">
            <i class="bi bi-building text-danger me-2"></i>${loc}
          </td>
        </tr>
      `;
    }

    workers.forEach(w => {
      const m = getWorkerMetrics(w);
      const dailyRate = getWorkerRate(w.id, w.role);
      const hourlyRate = getWorkerHourlyRate(loc, w.id, dailyRate);
      const otHourlyRate = hourlyRate * 1.0;

      const regularDaysPay = m.daysWorked * dailyRate;
      const hourlyPay = m.hourlyHours * hourlyRate;
      const otPay = m.totalOT * otHourlyRate;
      const gross = regularDaysPay + hourlyPay + otPay;
      const net = gross;

      totalDays += m.daysWorked;
      totalHourlyHours += m.hourlyHours;
      totalOTHours += m.totalOT;
      totalOTPay += otPay;
      totalSubtotal += gross;

      const safePayrollWorkerName = (w.name || '').replace(/ /g, '&nbsp;');

      rowsHtml += `
        <tr>
          <td class="text-start ps-2 fw-bold text-uppercase text-nowrap">
            <div class="d-flex align-items-center justify-content-between gap-1">
              <span>${safePayrollWorkerName}</span>
              ${isAdmin() ? `
                <button class="btn btn-sm btn-outline-primary p-0 px-1 no-print" onclick="openRenameWorkerModal('${w.id}')" title="Rename worker or change role">
                  <i class="bi bi-pencil-fill" style="font-size: 0.7rem;"></i>
                </button>
              ` : ''}
            </div>
          </td>
          <td class="text-center fw-bold text-muted small">${w.role}</td>
          <td class="text-center fw-bold">${m.daysWorked > 0 ? m.daysWorked.toFixed(1) : '-'}</td>
          <td class="text-center fw-bold text-secondary">${m.hourlyHours > 0 ? `${m.hourlyHours}h` : '-'}</td>
          <td class="text-center fw-bold text-danger">${m.totalOT > 0 ? `${m.totalOT}h` : '-'}</td>
          <td class="text-center p-1">
            <input type="number" step="any" class="form-control form-control-sm text-end fw-bold px-1" 
                   value="${dailyRate}" style="max-width: 90px; margin: 0 auto;"
                   onchange="saveWorkerRate('${loc}', '${w.id}', this.value); renderPayrollTable();">
          </td>
          <td class="text-center p-1">
            <input type="number" step="any" class="form-control form-control-sm text-end fw-bold px-1" 
                   value="${hourlyRate}" style="max-width: 80px; margin: 0 auto;"
                   onchange="saveWorkerHourlyRate('${loc}', '${w.id}', this.value); renderPayrollTable();">
          </td>
          <td class="text-end fw-bold text-danger pe-2">₱${otPay.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
          <td class="text-end fw-bold bg-danger text-white pe-2">₱${net.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
          <td class="text-center text-muted" style="min-width: 100px; height: 32px;"></td>
          <td class="p-1 text-center small text-muted">
            <input type="text" class="form-control form-control-sm text-start fw-semibold px-2 py-1"
                   value="${(w.remarks || '').replace(/"/g, '&quot;')}"
                   placeholder="Remarks..."
                   title="Worker remarks or notes"
                   oninput="updateWorkerRemarks('${w.id}', this.value)"
                   onchange="updateWorkerRemarks('${w.id}', this.value)"
                   style="font-size: 0.78rem; min-width: 110px;">
          </td>
        </tr>
      `;
    });
  });

  const totalAmount = totalSubtotal;
  const siteBale = getActiveProjectBaleValue();
  const finalTotal = Math.max(0, totalAmount - (isProjectBaleDeducted ? siteBale : 0));

  tbody.innerHTML = rowsHtml || `<tr><td colspan="11" class="p-3 text-muted">No workers found.</td></tr>`;

  tfoot.innerHTML = `
    <tr class="table-light fw-bold" style="border-top: 2px solid #3f3f46;">
      <td colspan="2" class="text-end text-dark">WAGES SUB-TOTAL:</td>
      <td class="text-center text-dark">${totalDays.toFixed(1)}d</td>
      <td class="text-center text-dark">${totalHourlyHours}h</td>
      <td class="text-center text-danger">${totalOTHours}h</td>
      <td colspan="2" class="text-muted small">Daily & Hourly Base: ₱${(totalSubtotal - totalOTPay).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
      <td class="text-end text-danger pe-2">₱${totalOTPay.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
      <td class="text-end fw-bold text-dark pe-2">₱${totalAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
      <td colspan="2"></td>
    </tr>
    <tr class="table-secondary fw-bold" style="font-size: 0.95rem;">
      <td colspan="7" class="text-end text-dark">TOTAL AMOUNT:</td>
      <td colspan="2" class="text-end pe-2 fw-bold text-dark fs-6">₱${totalAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
      <td colspan="2" class="small text-muted">Total Worker Wages</td>
    </tr>
    <tr class="table-warning fw-bold" style="font-size: 0.95rem;">
      <td colspan="7" class="text-end text-danger">BALE AMOUNT (${isProjectBaleDeducted ? 'DEDUCTED' : 'EXCLUDED'}):</td>
      <td colspan="2" class="text-end pe-2 text-danger fs-6">${isProjectBaleDeducted ? `-₱${siteBale.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : '₱0.00 (Toggled OFF)'}</td>
      <td colspan="2" class="small text-muted">${currentLocation === 'VIEW_ALL' ? 'All Sites Bale' : 'Site Bale Value'}</td>
    </tr>
    <tr class="table-dark fw-bold" style="border-top: 2px solid #d11a2a; font-size: 1.05rem;">
      <td colspan="7" class="text-end text-white">TOTAL:</td>
      <td colspan="2" class="text-end text-white pe-2 fs-5" style="background-color: #d11a2a !important;">₱${finalTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
      <td colspan="2" class="small text-white-50">Final Net Payout</td>
    </tr>
  `;

  // Synchronize bottom Project Bale card
  const displayTotalEl = document.getElementById("payrollCardTotalAmount");
  const displayFinalEl = document.getElementById("payrollCardFinalTotal");
  const baleInputEl = document.getElementById("payrollProjectBaleInput");
  const toggleBadge = document.getElementById("payrollProjectBaleToggleBadge");
  const baleDeductionLabel = document.getElementById("payrollBaleDeductionLabel");

  if (displayTotalEl) displayTotalEl.innerText = `₱${totalAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  if (displayFinalEl) displayFinalEl.innerText = `₱${finalTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  if (baleInputEl && document.activeElement !== baleInputEl) {
    baleInputEl.value = siteBale;
  }
  if (toggleBadge) {
    toggleBadge.className = isProjectBaleDeducted ? 'badge bg-success' : 'badge bg-secondary';
    toggleBadge.innerText = isProjectBaleDeducted ? 'ON (Deducted)' : 'OFF (Excluded)';
  }
  if (baleDeductionLabel) {
    baleDeductionLabel.innerText = isProjectBaleDeducted 
      ? `Deducted from Total Amount (-₱${siteBale.toLocaleString('en-US', {minimumFractionDigits: 2})})`
      : `Project Bale toggle is OFF (Not deducted)`;
    baleDeductionLabel.className = isProjectBaleDeducted ? 'text-danger d-block mt-1 fw-semibold' : 'text-muted d-block mt-1';
  }
}

function onQuickRoleChange(role) {
  const dayInput = document.getElementById("quickRateDayInput");
  const hourInput = document.getElementById("quickRateHourInput");
  const defaultRate = DEFAULT_ROLE_DAY_RATES[role] || 500;
  const exactHour = Math.round((defaultRate / 8.0) * 100) / 100;
  if (dayInput) dayInput.value = defaultRate;
  if (hourInput) hourInput.value = exactHour;
}

function autoCalculateQuickHourRate(val) {
  const dayVal = parseFloat(val) || 0;
  const hourInput = document.getElementById("quickRateHourInput");
  if (hourInput) hourInput.value = Math.round((dayVal / 8.0) * 100) / 100;
}

function applyQuickRoleRates() {
  const roleSelect = document.getElementById("quickRoleSelect");
  const dayInput = document.getElementById("quickRateDayInput");
  const hourInput = document.getElementById("quickRateHourInput");
  if (!roleSelect || !dayInput) return;

  const role = roleSelect.value;
  const rate = parseFloat(dayInput.value) || 500;
  const hourlyRate = hourInput ? (parseFloat(hourInput.value) || Math.round((rate / 8.0) * 100) / 100) : Math.round((rate / 8.0) * 100) / 100;

  const delSites = getDeletedSites();
  let sitesToUpdate = (currentLocation === "VIEW_ALL") 
    ? Object.keys(currentActiveData.locations || {}).filter(s => !delSites.includes(s.toUpperCase()))
    : [currentLocation];

  sitesToUpdate.forEach(loc => {
    const workers = (currentActiveData.locations[loc]?.workers) || [];
    workers.filter(w => w.role === role).forEach(w => {
      saveWorkerRate(loc, w.id, rate);
      saveWorkerHourlyRate(loc, w.id, hourlyRate);
    });
  });

  renderPayrollTable();
  alert(`Applied ₱${rate}/day (₱${hourlyRate}/hr) to all ${role} workers successfully.`);
}

// --- PROCESSING INDICATOR UTILITIES ---
function showProcessingIndicator(title = "Generating PDF Document...", status = "Processing records and adjusting page layout...") {
  const el = document.getElementById("arcProcessingIndicator");
  const titleEl = document.getElementById("arcProcessingTitle");
  const statusEl = document.getElementById("arcProcessingStatus");
  const barEl = document.getElementById("arcProgressBar");
  if (titleEl) titleEl.innerText = title;
  if (statusEl) statusEl.innerText = status;
  if (barEl) barEl.style.width = "30%";
  if (el) el.style.display = "flex";
}

function updateProcessingStatus(status, percent = null) {
  const statusEl = document.getElementById("arcProcessingStatus");
  const barEl = document.getElementById("arcProgressBar");
  if (statusEl && status) statusEl.innerText = status;
  if (barEl && percent !== null) barEl.style.width = `${percent}%`;
}

function hideProcessingIndicator() {
  const el = document.getElementById("arcProcessingIndicator");
  if (el) el.style.display = "none";
}

// --- STANDARD FILE NAMING HELPER ---
function getStandardExportFileName(reportTag = "", extension = "pdf", customLocation = null, customDates = null) {
  const dates = (customDates && customDates.length > 0) ? customDates : getCalculatedDates();
  let periodStr = "";
  if (dates && dates.length > 0) {
    const first = dates[0];
    const last = dates[dates.length - 1];
    if (first.monthStr === last.monthStr) {
      periodStr = `${first.monthStr} ${first.dayNum}-${last.dayNum}`;
    } else {
      periodStr = `${first.monthStr} ${first.dayNum}-${last.monthStr} ${last.dayNum}`;
    }
  } else {
    periodStr = currentDate;
  }

  const effectiveLoc = customLocation 
    ? (customLocation === "VIEW_ALL" || customLocation === "ALL" ? "All Sites" : customLocation) 
    : (currentLocation === "VIEW_ALL" ? "All Sites" : currentLocation);

  // User spec: "COMPANY NAME LOCATION AND DATE PERIOD start date and end date example Aug 15-21"
  return `ArcDesign ${effectiveLoc} ${periodStr}.${extension}`.replace(/[/\\?%*:|"<>]/g, ' ').replace(/\s+/g, ' ').trim();
}

async function exportPayroll(destination) {
  await exportPayrollPdfLandscape(destination);
}

// --- MULTI-PAGE PDF RENDERER HELPER ---
async function renderPdfFromHtmlElement(tempContainer, fileName, destination, title, message) {
  if (!tempContainer.parentNode) {
    document.body.appendChild(tempContainer);
  }

  try {
    if (typeof window.jspdf === 'undefined') {
      alert("PDF generation library is loading. Please try again in a moment.");
      return;
    }

    updateProcessingStatus("Rendering high-resolution document pages...", 40);

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: 'legal'
    });

    const pdfUsableWidth = 13.0;
    const pdfUsableHeight = 7.45;

    const pageBlocks = tempContainer.querySelectorAll('.arc-pdf-page');

    if (pageBlocks && pageBlocks.length > 0) {
      // Chunked multi-page rendering: each page block is rendered independently so NO rows or names are cut
      for (let i = 0; i < pageBlocks.length; i++) {
        if (i > 0) {
          pdf.addPage();
        }
        updateProcessingStatus(`Rendering document page ${i + 1} of ${pageBlocks.length}...`, Math.round(45 + (i / pageBlocks.length) * 40));
        const pageBlock = pageBlocks[i];
        const pageCanvas = await html2canvas(pageBlock, { scale: 1.6, useCORS: true, logging: false });
        const imgData = pageCanvas.toDataURL('image/jpeg', 0.95);
        const pageHInInches = Math.min(pdfUsableHeight, (pageCanvas.height / pageCanvas.width) * pdfUsableWidth);
        pdf.addImage(imgData, 'JPEG', 0.5, 0.45, pdfUsableWidth, pageHInInches);
        pdf.setFontSize(8);
        pdf.setTextColor(140, 140, 140);
        pdf.text(`ARCDESIGN Official Statement - ${currentLocation === "VIEW_ALL" ? "ALL SITES" : currentLocation} - Page ${i + 1} of ${pageBlocks.length}`, 0.5, 8.15);
      }
    } else {
      // Single continuous element rendering
      const canvas = await html2canvas(tempContainer, { scale: 1.6, useCORS: true, logging: false });
      updateProcessingStatus("Calculating layout...", 75);

      const W = canvas.width;
      const H = canvas.height;
      const pxPerInch = W / pdfUsableWidth;
      const maxSliceH = Math.floor(pdfUsableHeight * pxPerInch);

      if (H <= maxSliceH) {
        const sliceHInInches = H / pxPerInch;
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        pdf.addImage(imgData, 'JPEG', 0.5, 0.5, pdfUsableWidth, sliceHInInches);
        pdf.setFontSize(8);
        pdf.setTextColor(140, 140, 140);
        pdf.text(`ARCDESIGN Official Statement - ${currentLocation === "VIEW_ALL" ? "ALL SITES" : currentLocation} - Page 1 of 1`, 0.5, 8.1);
      } else {
        let currentY = 0;
        let pageNum = 0;
        const ctx = canvas.getContext('2d');

        while (currentY < H) {
          if (pageNum > 0) {
            pdf.addPage();
          }
          let sliceH = Math.min(maxSliceH, H - currentY);
          if (currentY + sliceH < H) {
            const searchStartY = Math.floor(currentY + sliceH);
            const searchMinY = Math.max(searchStartY - 160, currentY + 80);
            let bestY = searchStartY;

            for (let y = searchStartY; y >= searchMinY; y -= 2) {
              let isGap = true;
              for (let x = 60; x < W - 60; x += Math.floor(W / 18)) {
                const px = ctx.getImageData(x, y, 1, 1).data;
                if (px[0] < 230 || px[1] < 230 || px[2] < 230) {
                  isGap = false;
                  break;
                }
              }
              if (isGap) {
                bestY = y;
                break;
              }
            }
            sliceH = bestY - currentY;
          }

          const sliceCanvas = document.createElement('canvas');
          sliceCanvas.width = W;
          sliceCanvas.height = sliceH;
          const sliceCtx = sliceCanvas.getContext('2d');
          sliceCtx.fillStyle = '#ffffff';
          sliceCtx.fillRect(0, 0, W, sliceH);
          sliceCtx.drawImage(canvas, 0, currentY, W, sliceH, 0, 0, W, sliceH);

          const sliceData = sliceCanvas.toDataURL('image/jpeg', 0.95);
          const pdfSliceH = sliceH / pxPerInch;
          pdf.addImage(sliceData, 'JPEG', 0.5, 0.5, pdfUsableWidth, pdfSliceH);

          pdf.setFontSize(8);
          pdf.setTextColor(140, 140, 140);
          pdf.text(`ARCDESIGN Official Statement - ${currentLocation === "VIEW_ALL" ? "ALL SITES" : currentLocation} - Page ${pageNum + 1}`, 0.5, 8.1);

          currentY += sliceH;
          pageNum++;
        }
      }
    }

    updateProcessingStatus("Preparing document for export...", 92);

    if (destination === 'share' || destination === 'messenger') {
      if (window.Android && window.Android.shareFile) {
        updateProcessingStatus("Opening Share Sheet...", 98);
        const base64Data = pdf.output('datauristring').split(',')[1];
        window.Android.shareFile(title, message, base64Data, fileName, "application/pdf", "");
      } else if (navigator.share) {
        updateProcessingStatus("Opening Share Sheet...", 98);
        const blob = pdf.output('blob');
        const file = new File([blob], fileName, { type: 'application/pdf' });
        await navigator.share({ files: [file], title: title, text: message });
      } else {
        pdf.save(fileName);
      }
    } else {
      // destination === 'device' || 'download' || 'print' -> PROMPT DEVICE PRINT FUNCTION
      updateProcessingStatus("Prompting device print dialog...", 98);
      const base64Data = pdf.output('datauristring').split(',')[1];
      if (window.Android && window.Android.printPdf) {
        window.Android.printPdf(base64Data, fileName, title);
      } else if (window.Android && window.Android.printPage) {
        window.Android.printPage();
      } else {
        const blobUrl = pdf.output('bloburl');
        const printWindow = window.open(blobUrl, '_blank');
        if (printWindow) {
          printWindow.onload = () => printWindow.print();
        } else {
          pdf.save(fileName);
        }
      }
    }
  } catch (err) {
    console.error("PDF generation/export error:", err);
    alert("An error occurred during PDF generation: " + (err.message || err));
  } finally {
    if (tempContainer && tempContainer.parentNode) {
      tempContainer.parentNode.removeChild(tempContainer);
    }
    setTimeout(hideProcessingIndicator, 600);
  }
}

// --- DYNAMIC PAGE PACKER FOR LEGAL LANDSCAPE PDFS ---
// Packs rows continuously until reaching bottom of page (maxPageHeight), only moving to next page when worker name reaches the bottom.
function buildDynamicTableReport({
  container,
  items,
  renderPageSkeleton,
  renderRowHtml,
  renderFooterElements,
  maxPageHeight = 740
}) {
  if (!container.parentNode) {
    document.body.appendChild(container);
  }

  if (!items || items.length === 0) {
    const pageObj = renderPageSkeleton(0);
    pageObj.tbody.innerHTML = `<tr><td colspan="25" style="text-align: center; padding: 24px; color: #71717a; font-weight: 700;">No worker records found for this period.</td></tr>`;
    if (renderFooterElements) {
      const { tfootHtml, signaturesHtml } = renderFooterElements();
      if (tfootHtml && pageObj.table) pageObj.table.insertAdjacentHTML('beforeend', tfootHtml);
      if (signaturesHtml && pageObj.footerContainer) pageObj.footerContainer.innerHTML = signaturesHtml;
    }
    const indicator = pageObj.pageDiv.querySelector('.arc-pdf-page-indicator');
    if (indicator) indicator.textContent = '(Page 1 of 1)';
    pageObj.pageDiv.style.minHeight = `${maxPageHeight}px`;
    return;
  }

  const pages = [];
  let currentPageObj = renderPageSkeleton(0);
  pages.push(currentPageObj);

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const isLastItem = (i === items.length - 1);
    const rowHtml = renderRowHtml(item, i);

    currentPageObj.tbody.insertAdjacentHTML('beforeend', rowHtml);
    const appendedRow = currentPageObj.tbody.lastElementChild;

    let wouldOverflow = false;

    if (isLastItem && renderFooterElements) {
      const { tfootHtml, signaturesHtml } = renderFooterElements();
      let testTfoot = null;
      if (tfootHtml && currentPageObj.table) {
        currentPageObj.table.insertAdjacentHTML('beforeend', tfootHtml);
        testTfoot = currentPageObj.table.querySelector('tfoot');
      }
      if (signaturesHtml && currentPageObj.footerContainer) {
        currentPageObj.footerContainer.innerHTML = signaturesHtml;
      }

      if (currentPageObj.pageDiv.offsetHeight > maxPageHeight && currentPageObj.tbody.children.length > 1) {
        wouldOverflow = true;
      }

      if (testTfoot) testTfoot.remove();
      if (currentPageObj.footerContainer) currentPageObj.footerContainer.innerHTML = '';
    } else {
      if (currentPageObj.pageDiv.offsetHeight > maxPageHeight && currentPageObj.tbody.children.length > 1) {
        wouldOverflow = true;
      }
    }

    if (wouldOverflow) {
      appendedRow.remove();

      // Start new page
      currentPageObj = renderPageSkeleton(pages.length);
      pages.push(currentPageObj);

      currentPageObj.tbody.insertAdjacentHTML('beforeend', rowHtml);

      if (isLastItem && renderFooterElements) {
        const { tfootHtml, signaturesHtml } = renderFooterElements();
        if (tfootHtml && currentPageObj.table) currentPageObj.table.insertAdjacentHTML('beforeend', tfootHtml);
        if (signaturesHtml && currentPageObj.footerContainer) currentPageObj.footerContainer.innerHTML = signaturesHtml;
      }
    } else {
      if (isLastItem && renderFooterElements) {
        const { tfootHtml, signaturesHtml } = renderFooterElements();
        if (tfootHtml && currentPageObj.table) currentPageObj.table.insertAdjacentHTML('beforeend', tfootHtml);
        if (signaturesHtml && currentPageObj.footerContainer) currentPageObj.footerContainer.innerHTML = signaturesHtml;
      }
    }
  }

  // Update page indicators and set min-height to consume full legal landscape page
  const totalPages = pages.length;
  pages.forEach((p, idx) => {
    const indicator = p.pageDiv.querySelector('.arc-pdf-page-indicator');
    if (indicator) {
      indicator.textContent = totalPages > 1 ? `(Page ${idx + 1} of ${totalPages})` : `(Page 1 of 1)`;
    }
    p.pageDiv.style.minHeight = `${maxPageHeight}px`;
  });
}

async function exportPayrollPdfLandscape(destination = 'device') {
  showProcessingIndicator("Generating Payroll PDF...", "Processing payroll records and calculating page layout...");

  const dates = getCalculatedDates();
  const dateRangeStr = getPeriodString(dates);
  const genDateStr = `${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}, ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

  const delSites = getDeletedSites();
  let sitesToRender = (currentLocation === "VIEW_ALL") 
    ? Object.keys(currentActiveData.locations || {}).filter(s => !delSites.includes(s.toUpperCase()))
    : [currentLocation];

  const includeSignatures = document.getElementById("payrollSignaturesCheck")?.checked ?? true;

  let allWorkerRows = [];
  let totalDays = 0;
  let totalHourlyHours = 0;
  let totalOTHours = 0;
  let totalOTPay = 0;
  let totalGross = 0;

  sitesToRender.forEach(loc => {
    const locData = currentActiveData.locations[loc];
    if (!locData) return;
    let workers = locData.workers || [];
    if (selectedRolesFilter.length > 0) {
      workers = workers.filter(w => selectedRolesFilter.includes(w.role));
    }
    workers.forEach(w => {
      const m = getWorkerMetrics(w);
      const dailyRate = getWorkerRate(w.id, w.role);
      const hourlyRate = getWorkerHourlyRate(loc, w.id, dailyRate);
      const otHourlyRate = hourlyRate * 1.0;

      const regularDaysPay = m.daysWorked * dailyRate;
      const hourlyPay = m.hourlyHours * hourlyRate;
      const otPay = m.totalOT * otHourlyRate;
      const gross = regularDaysPay + hourlyPay + otPay;
      const net = gross;

      totalDays += m.daysWorked;
      totalHourlyHours += m.hourlyHours;
      totalOTHours += m.totalOT;
      totalOTPay += otPay;
      totalGross += gross;

      allWorkerRows.push({
        loc: loc,
        worker: w,
        metrics: m,
        dailyRate: dailyRate,
        hourlyRate: hourlyRate,
        otPay: otPay,
        amountPaid: net
      });
    });
  });

  const siteBale = getActiveProjectBaleValue();
  const totalAmount = totalGross;
  const finalTotal = Math.max(0, totalAmount - (isProjectBaleDeducted ? siteBale : 0));

  const tempContainer = document.createElement('div');
  tempContainer.style.position = 'absolute';
  tempContainer.style.left = '-9999px';
  tempContainer.style.top = '0';
  tempContainer.style.width = '1300px';
  tempContainer.style.background = '#ffffff';
  document.body.appendChild(tempContainer);

  function renderPageSkeleton(pageIdx) {
    const pageDiv = document.createElement('div');
    pageDiv.className = 'arc-pdf-page';
    pageDiv.style.cssText = 'width: 1300px; padding: 20px 24px; background: #ffffff; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #18181b; display: flex; flex-direction: column; justify-content: flex-start;';

    pageDiv.innerHTML = `
      <!-- PAGE HEADER WITH METADATA -->
      <div style="border-bottom: 3px solid #d11a2a; padding-bottom: 8px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h2 style="font-weight: 900; color: #18181b; margin: 0; text-transform: uppercase; font-size: 20px; letter-spacing: 0.5px;">ARCDESIGN CONSTRUCTION SERVICES</h2>
          <p style="color: #71717a; margin: 3px 0 0 0; font-size: 11px; font-weight: 700;">OFFICIAL WEEKLY PAYROLL STATEMENT (LEGAL LANDSCAPE)</p>
        </div>
        <div style="text-align: right;">
          <div style="font-weight: 800; font-size: 11px; background: #18181b; color: #fff; padding: 3px 9px; border-radius: 4px; display: inline-block;">LOCATION: ${currentLocation === "VIEW_ALL" ? "ALL SITES" : currentLocation}</div>
          <div style="font-weight: 700; font-size: 11px; color: #d11a2a; margin-top: 3px;">DATE PERIOD: ${dateRangeStr}</div>
          <div style="font-weight: 600; font-size: 10px; color: #71717a; margin-top: 2px;">GENERATED: ${genDateStr}</div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span style="font-weight: 800; font-size: 12px; color: #18181b;"><span style="color:#d11a2a;">■</span> PAYROLL ROSTER <span class="arc-pdf-page-indicator"></span></span>
        <span style="font-size: 11px; color: #71717a;">${allWorkerRows.length} Total Workers</span>
      </div>

      <!-- PAYROLL TABLE -->
      <table style="width: 100%; border-collapse: collapse; font-size: 11px; border: 1px solid #d4d4d8;">
        <thead>
          <tr style="background: #18181b; color: #ffffff;">
            <th style="padding: 6px 8px; text-align: left; width: 220px; border: 1px solid #3f3f46;">Worker Name</th>
            <th style="padding: 6px 4px; text-align: center; width: 90px; border: 1px solid #3f3f46;">Position</th>
            <th style="padding: 6px 4px; text-align: center; width: 55px; border: 1px solid #3f3f46;">Days</th>
            <th style="padding: 6px 4px; text-align: center; width: 55px; border: 1px solid #3f3f46;">Hourly</th>
            <th style="padding: 6px 4px; text-align: center; width: 55px; border: 1px solid #3f3f46;">OT (hrs)</th>
            <th style="padding: 6px 4px; text-align: center; width: 85px; border: 1px solid #3f3f46;">Rate / Day</th>
            <th style="padding: 6px 4px; text-align: center; width: 85px; border: 1px solid #3f3f46;">Rate / Hr</th>
            <th style="padding: 6px 8px; text-align: right; width: 95px; border: 1px solid #3f3f46;">OT Amount</th>
            <th style="padding: 6px 8px; text-align: right; width: 110px; background: #d11a2a; color: #ffffff; border: 1px solid #b91c1c;">Amount Paid</th>
            <th style="padding: 6px 4px; text-align: center; width: 100px; border: 1px solid #3f3f46;">Signature</th>
            <th style="padding: 6px 8px; text-align: left; width: 120px; border: 1px solid #3f3f46;">Remarks</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      <div class="arc-pdf-footer-placeholder"></div>
    `;

    tempContainer.appendChild(pageDiv);
    return {
      pageDiv,
      table: pageDiv.querySelector('table'),
      tbody: pageDiv.querySelector('tbody'),
      footerContainer: pageDiv.querySelector('.arc-pdf-footer-placeholder')
    };
  }

  function renderRowHtml(r, idx) {
    const safeName = (r.worker.name || '').replace(/ /g, '&nbsp;');
    return `
      <tr style="border-bottom: 1px solid #e4e4e7;">
        <td style="padding: 6px 8px; font-weight: 800; text-transform: uppercase; border: 1px solid #d4d4d8;">${safeName}</td>
        <td style="padding: 6px 4px; text-align: center; font-size: 10px; font-weight: 700; color: #52525b; border: 1px solid #d4d4d8;">${r.worker.role}</td>
        <td style="padding: 6px 4px; text-align: center; font-weight: 800; border: 1px solid #d4d4d8;">${r.metrics.daysWorked > 0 ? r.metrics.daysWorked.toFixed(1) : '-'}</td>
        <td style="padding: 6px 4px; text-align: center; font-weight: 700; color: #52525b; border: 1px solid #d4d4d8;">${r.metrics.hourlyHours > 0 ? `${r.metrics.hourlyHours}h` : '-'}</td>
        <td style="padding: 6px 4px; text-align: center; font-weight: 800; color: #d11a2a; border: 1px solid #d4d4d8;">${r.metrics.totalOT > 0 ? `${r.metrics.totalOT}h` : '-'}</td>
        <td style="padding: 6px 4px; text-align: center; font-weight: 700; border: 1px solid #d4d4d8;">₱${r.dailyRate}</td>
        <td style="padding: 6px 4px; text-align: center; font-weight: 700; border: 1px solid #d4d4d8;">₱${r.hourlyRate}</td>
        <td style="padding: 6px 8px; text-align: right; font-weight: 800; color: #d11a2a; border: 1px solid #d4d4d8;">₱${r.otPay.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
        <td style="padding: 6px 8px; text-align: right; font-weight: 800; background: #fff1f2; color: #b91c1c; border: 1px solid #fecdd3;">₱${r.amountPaid.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
        <td style="padding: 6px 4px; border: 1px solid #d4d4d8; height: 26px;"></td>
        <td style="padding: 6px 8px; font-size: 10px; color: #3f3f46; border: 1px solid #d4d4d8;">${(r.worker.remarks || '-').replace(/</g, '&lt;')}</td>
      </tr>
    `;
  }

  function renderFooterElements() {
    const tfootHtml = `
      <tfoot>
        <tr style="background: #f4f4f5; font-weight: 800; border-top: 2px solid #3f3f46;">
          <td colspan="2" style="padding: 6px 8px; text-align: right; border: 1px solid #d4d4d8;">WAGES SUB-TOTAL:</td>
          <td style="padding: 6px 4px; text-align: center; border: 1px solid #d4d4d8;">${totalDays.toFixed(1)}d</td>
          <td style="padding: 6px 4px; text-align: center; border: 1px solid #d4d4d8;">${totalHourlyHours}h</td>
          <td style="padding: 6px 4px; text-align: center; color: #d11a2a; border: 1px solid #d4d4d8;">${totalOTHours}h</td>
          <td colspan="2" style="padding: 6px 8px; text-align: center; font-size: 10px; color: #71717a; border: 1px solid #d4d4d8;">Overtime Total:</td>
          <td style="padding: 6px 8px; text-align: right; color: #d11a2a; border: 1px solid #d4d4d8;">₱${totalOTPay.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
          <td style="padding: 6px 8px; text-align: right; font-weight: 900; border: 1px solid #d4d4d8;">₱${totalAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
          <td colspan="2" style="border: 1px solid #d4d4d8;"></td>
        </tr>
        <!-- TOTAL AMOUNT -->
        <tr style="background: #e4e4e7; font-weight: 800; font-size: 12px;">
          <td colspan="7" style="padding: 6px 10px; text-align: right; border: 1px solid #d4d4d8; color: #18181b;">TOTAL AMOUNT:</td>
          <td colspan="2" style="padding: 6px 10px; text-align: right; border: 1px solid #d4d4d8; color: #18181b; font-size: 13px;">₱${totalAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
          <td colspan="2" style="padding: 6px 8px; border: 1px solid #d4d4d8; font-size: 10px; color: #52525b;">Total Worker Wages</td>
        </tr>
        <!-- BALE AMOUNT (DEDUCTED OR EXCLUDED) -->
        <tr style="background: #fef3c7; font-weight: 800; font-size: 12px;">
          <td colspan="7" style="padding: 6px 10px; text-align: right; border: 1px solid #d4d4d8; color: #b45309;">BALE AMOUNT (${isProjectBaleDeducted ? 'DEDUCTED' : 'EXCLUDED'}):</td>
          <td colspan="2" style="padding: 6px 10px; text-align: right; border: 1px solid #d4d4d8; color: #b91c1c; font-size: 13px;">${isProjectBaleDeducted ? `-₱${siteBale.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : '₱0.00 (Toggle OFF)'}</td>
          <td colspan="2" style="padding: 6px 8px; border: 1px solid #d4d4d8; font-size: 10px; color: #78350f;">${currentLocation === "VIEW_ALL" ? 'All Sites Bale' : 'Site Project Bale'}</td>
        </tr>
        <!-- TOTAL -->
        <tr style="background: #18181b; color: #ffffff; font-weight: 900; font-size: 13px; border-top: 2px solid #d11a2a;">
          <td colspan="7" style="padding: 8px 10px; text-align: right; border: 1px solid #27272a; color: #ffffff;">TOTAL:</td>
          <td colspan="2" style="padding: 8px 10px; text-align: right; border: 1px solid #b91c1c; background: #d11a2a; color: #ffffff; font-size: 15px;">₱${finalTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
          <td colspan="2" style="padding: 8px 8px; border: 1px solid #27272a; font-size: 10px; color: #a1a1aa;">Final Net Payout</td>
        </tr>
      </tfoot>
    `;

    const signaturesHtml = (includeSignatures ? `
      <div style="display: flex; justify-content: space-between; margin-top: 24px; padding-top: 10px; border-top: 1.5px solid #e4e4e7;">
        <div style="text-align: center; width: 30%;">
          <div style="border-bottom: 1.5px solid #000; height: 28px;"></div>
          <div style="font-weight: 800; font-size: 10px; margin-top: 4px;">PREPARED BY (TIMEKEEPER)</div>
        </div>
        <div style="text-align: center; width: 30%;">
          <div style="border-bottom: 1.5px solid #000; height: 28px;"></div>
          <div style="font-weight: 800; font-size: 10px; margin-top: 4px;">CHECKED BY (SITE ENGINEER)</div>
        </div>
        <div style="text-align: center; width: 30%;">
          <div style="border-bottom: 1.5px solid #000; height: 28px;"></div>
          <div style="font-weight: 800; font-size: 10px; margin-top: 4px;">APPROVED BY (PROJECT MANAGER)</div>
        </div>
      </div>
    ` : '');

    return { tfootHtml, signaturesHtml };
  }

  buildDynamicTableReport({
    container: tempContainer,
    items: allWorkerRows,
    renderPageSkeleton,
    renderRowHtml,
    renderFooterElements,
    maxPageHeight: 740
  });

  const fileName = getStandardExportFileName("Payroll", "pdf");
  await renderPdfFromHtmlElement(tempContainer, fileName, destination, "ARCDESIGN Payroll PDF", `Payroll report for ${currentLocation} (${dateRangeStr})`);
}

// --- PDF EXPORT & OPTIONS MODAL ---
function exportToPDF(event) {
  if (event && event.preventDefault) event.preventDefault();
  const modalEl = document.getElementById("arcPdfConfigModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

async function handlePdfExportAction(actionType) {
  const isTimesheet = document.getElementById("pdfChoiceTimesheet")?.checked ?? true;
  const includeSignatures = document.getElementById("pdfIncludeSignaturesCheck")?.checked ?? true;
  const includeWorkerBale = document.getElementById("pdfIncludeWorkerBaleCheck")?.checked ?? true;

  const modalEl = document.getElementById("arcPdfConfigModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }

  await generatePDF(actionType, isTimesheet, includeSignatures, includeWorkerBale);
}

// --- DYNAMIC TIMESHEET PAGES BUILDER FOR MULTI-PAGE EXPORT ---
function buildDynamicTimesheetPages(tempContainer, sitesToRender, dates, includeSignatures, includeWorkerBale = true) {
  const dateRangeStr = getPeriodString(dates);
  const genDateStr = `${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}, ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

  let allSiteWorkers = [];
  sitesToRender.forEach(loc => {
    const locData = currentActiveData.locations[loc];
    if (!locData) return;
    let workers = locData.workers || [];
    if (selectedRolesFilter.length > 0) {
      workers = workers.filter(w => selectedRolesFilter.includes(w.role));
    }
    workers.forEach(w => allSiteWorkers.push({ loc, worker: w }));
  });

  let grandTotalDays = 0;
  let grandTotalHourly = 0;
  let grandTotalOT = 0;
  let grandTotalBale = 0;

  allSiteWorkers.forEach(item => {
    const m = getWorkerMetrics(item.worker);
    grandTotalDays += m.daysWorked;
    grandTotalHourly += m.hourlyHours;
    grandTotalOT += m.totalOT;
    grandTotalBale += (item.worker.baleValue || 0);
  });

  function renderPageSkeleton(pageIdx) {
    const pageDiv = document.createElement('div');
    pageDiv.className = 'arc-pdf-page';
    pageDiv.style.cssText = 'width: 1300px; padding: 20px 24px; background: #ffffff; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #18181b; display: flex; flex-direction: column; justify-content: flex-start;';

    pageDiv.innerHTML = `
      <!-- HEADER WITH METADATA -->
      <div style="border-bottom: 3px solid #d11a2a; padding-bottom: 8px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h2 style="font-weight: 900; color: #18181b; margin: 0; text-transform: uppercase; font-size: 20px; letter-spacing: 0.5px;">ARCDESIGN CONSTRUCTION SERVICES</h2>
          <p style="color: #71717a; margin: 3px 0 0 0; font-size: 11px; font-weight: 700;">OFFICIAL ATTENDANCE & TIMESHEET STATEMENT (LEGAL LANDSCAPE)</p>
        </div>
        <div style="text-align: right;">
          <div style="font-weight: 800; font-size: 11px; background: #18181b; color: #fff; padding: 3px 9px; border-radius: 4px; display: inline-block;">LOCATION: ${currentLocation === 'VIEW_ALL' ? 'ALL SITES' : currentLocation}</div>
          <div style="font-weight: 700; font-size: 11px; color: #d11a2a; margin-top: 3px;">DATE PERIOD: ${dateRangeStr}</div>
          <div style="font-weight: 600; font-size: 10px; color: #71717a; margin-top: 2px;">GENERATED: ${genDateStr}</div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span style="font-weight: 800; font-size: 12px; color: #18181b;"><span style="color:#d11a2a;">■</span> FULL TIMESHEET ROSTER <span class="arc-pdf-page-indicator"></span></span>
        <span style="font-size: 11px; color: #71717a;">${allSiteWorkers.length} Workers Listed ${!includeWorkerBale ? '&bull; Worker Bale Column Excluded' : ''}</span>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 11px; border: 1px solid #d4d4d8;">
        <thead>
          <tr style="background: #f4f4f5; border-bottom: 2px solid #a1a1aa;">
            <th style="border: 1px solid #d4d4d8; padding: 6px 8px; text-align: left; width: 220px;">WORKER NAME</th>
            <th style="border: 1px solid #d4d4d8; padding: 6px 4px; text-align: center; width: 85px;">ROLE</th>
            ${currentLocation === 'VIEW_ALL' ? '<th style="border: 1px solid #d4d4d8; padding: 6px 4px; text-align: center; width: 80px;">SITE</th>' : ''}
            ${dates.map(d => `
              <th style="border: 1px solid #d4d4d8; padding: 5px 2px; text-align: center; min-width: 55px;">
                <div style="font-weight: 800; font-size: 11px; color: #18181b;">${d.dayNameShort || d.key}</div>
                <div style="font-weight: 700; font-size: 11px; color: #d11a2a;">${d.dayNum}</div>
              </th>
            `).join('')}
            <th style="border: 1px solid #d4d4d8; padding: 6px 4px; text-align: center; width: 55px; background: #e4e4e7;">DAYS</th>
            <th style="border: 1px solid #d4d4d8; padding: 6px 4px; text-align: center; width: 55px; background: #e4e4e7;">OT</th>
            ${includeWorkerBale ? '<th style="border: 1px solid #d4d4d8; padding: 6px 8px; text-align: right; width: 80px;">BALE</th>' : ''}
            <th style="border: 1px solid #d4d4d8; padding: 6px 8px; text-align: left; width: 170px;">REMARKS</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      <div class="arc-pdf-footer-placeholder"></div>
    `;

    tempContainer.appendChild(pageDiv);
    return {
      pageDiv,
      table: pageDiv.querySelector('table'),
      tbody: pageDiv.querySelector('tbody'),
      footerContainer: pageDiv.querySelector('.arc-pdf-footer-placeholder')
    };
  }

  function renderRowHtml(item, idx) {
    const w = item.worker;
    const m = getWorkerMetrics(w);

    return `
      <tr style="border-bottom: 1px solid #e4e4e7;">
        <td style="border: 1px solid #d4d4d8; padding: 6px 8px; font-weight: 800; text-transform: uppercase;">${w.name}</td>
        <td style="border: 1px solid #d4d4d8; padding: 6px 4px; text-align: center; font-size: 10px; font-weight: 700; color: #52525b;">${w.role}</td>
        ${currentLocation === 'VIEW_ALL' ? `<td style="border: 1px solid #d4d4d8; padding: 6px 4px; text-align: center; font-size: 10px; font-weight: 700; color: #d11a2a;">${item.loc}</td>` : ''}
        ${dates.map(d => {
          const val = getWorkerAttendanceVal(w, d);
          const otVal = getWorkerOtVal(w, d);
          let badgeHtml = '<span style="color:#a1a1aa; font-weight:700;">-</span>';
          if (val === '1.0' || val === '1') {
            badgeHtml = '<span style="background: #198754; color: #fff; padding: 2px 5px; border-radius: 3px; font-weight: 800; font-size: 9px;">Full</span>';
          } else if (val === '0.5') {
            badgeHtml = '<span style="background: #0d6efd; color: #fff; padding: 2px 5px; border-radius: 3px; font-weight: 800; font-size: 9px;">Half</span>';
          } else if (String(val).endsWith('h')) {
            badgeHtml = `<span style="background: #6f42c1; color: #fff; padding: 2px 5px; border-radius: 3px; font-weight: 800; font-size: 9px;">${val}</span>`;
          } else if (val === 'absent') {
            badgeHtml = '<span style="background: #dc3545; color: #fff; padding: 2px 5px; border-radius: 3px; font-weight: 800; font-size: 9px;">Abs</span>';
          } else if (val === 'sick') {
            badgeHtml = '<span style="background: #ffc107; color: #000; padding: 2px 5px; border-radius: 3px; font-weight: 800; font-size: 9px;">Sick</span>';
          } else if (val === 'emergency') {
            badgeHtml = '<span style="background: #fd7e14; color: #fff; padding: 2px 5px; border-radius: 3px; font-weight: 800; font-size: 9px;">Emg</span>';
          }
          return `
            <td style="border: 1px solid #d4d4d8; padding: 4px 2px; text-align: center;">
              <div>${badgeHtml}</div>
              ${otVal > 0 ? `<div style="color:#d11a2a; font-weight:800; font-size:9px; margin-top:1px;">+${otVal}h</div>` : ''}
            </td>
          `;
        }).join('')}
        <td style="border: 1px solid #d4d4d8; padding: 6px 4px; text-align: center; font-weight: 800; background: #fafafa; font-size: 11px;">
          ${m.daysWorked.toFixed(1)}
          ${m.hourlyHours > 0 ? `<div style="font-size:9px; color:#52525b;">+${m.hourlyHours}h</div>` : ''}
        </td>
        <td style="border: 1px solid #d4d4d8; padding: 6px 4px; text-align: center; font-weight: 800; color: #d11a2a; background: #fafafa; font-size: 11px;">
          ${m.totalOT > 0 ? `${m.totalOT}h` : '-'}
        </td>
        ${includeWorkerBale ? `
          <td style="border: 1px solid #d4d4d8; padding: 6px 8px; text-align: right; font-weight: 700;">
            ${(w.baleValue || 0) > 0 ? `₱${(w.baleValue).toLocaleString()}` : '-'}
          </td>
        ` : ''}
        <td style="border: 1px solid #d4d4d8; padding: 6px 8px; font-size: 10px; color: #3f3f46;">
          ${(w.remarks || '-').replace(/</g, '&lt;')}
        </td>
      </tr>
    `;
  }

  function renderFooterElements() {
    const tfootHtml = `
      <tfoot>
        <tr style="background: #18181b; color: #ffffff; font-weight: 800; font-size: 11px;">
          <td colspan="${currentLocation === 'VIEW_ALL' ? 3 : 2}" style="border: 1px solid #27272a; padding: 7px 10px; text-align: right;">GRAND TOTALS:</td>
          <td colspan="${dates.length}" style="border: 1px solid #27272a; padding: 7px; text-align: center; color: #a1a1aa; font-size: 10px;">ALL LISTED WORKERS</td>
          <td style="border: 1px solid #27272a; padding: 7px; text-align: center; color: #ffffff;">${grandTotalDays.toFixed(1)}d</td>
          <td style="border: 1px solid #27272a; padding: 7px; text-align: center; color: #f59e0b;">${grandTotalOT}h</td>
          ${includeWorkerBale ? `<td style="border: 1px solid #27272a; padding: 7px 10px; text-align: right; color: #f87171;">₱${grandTotalBale.toLocaleString()}</td>` : ''}
          <td style="border: 1px solid #27272a; padding: 7px;"></td>
        </tr>
      </tfoot>
    `;

    const signaturesHtml = (includeSignatures ? `
      <div style="display: flex; justify-content: space-between; margin-top: 24px; padding-top: 10px; border-top: 1.5px solid #e4e4e7;">
        <div style="text-align: center; width: 30%;">
          <div style="border-bottom: 1.5px solid #000; height: 28px;"></div>
          <div style="font-weight: 800; font-size: 10px; margin-top: 4px;">PREPARED BY (TIMEKEEPER)</div>
        </div>
        <div style="text-align: center; width: 30%;">
          <div style="border-bottom: 1.5px solid #000; height: 28px;"></div>
          <div style="font-weight: 800; font-size: 10px; margin-top: 4px;">CHECKED BY (SITE ENGINEER)</div>
        </div>
        <div style="text-align: center; width: 30%;">
          <div style="border-bottom: 1.5px solid #000; height: 28px;"></div>
          <div style="font-weight: 800; font-size: 10px; margin-top: 4px;">APPROVED BY (PROJECT MANAGER)</div>
        </div>
      </div>
    ` : '');

    return { tfootHtml, signaturesHtml };
  }

  buildDynamicTableReport({
    container: tempContainer,
    items: allSiteWorkers,
    renderPageSkeleton,
    renderRowHtml,
    renderFooterElements,
    maxPageHeight: 740
  });
}

// --- DYNAMIC ANALYTICS & REMARKS PAGES BUILDER FOR MULTI-PAGE EXPORT ---
function buildDynamicAnalyticsPages(tempContainer, sitesToRender, dates, includeSignatures) {
  const dateRangeStr = getPeriodString(dates);
  const genDateStr = `${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}, ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

  let allSiteWorkers = [];
  let allSitesRemarks = [];

  sitesToRender.forEach(loc => {
    const locData = currentActiveData.locations[loc];
    if (!locData) return;
    let workers = locData.workers || [];
    if (selectedRolesFilter.length > 0) {
      workers = workers.filter(w => selectedRolesFilter.includes(w.role));
    }
    workers.forEach(w => allSiteWorkers.push({ loc, worker: w }));

    if (locData.siteRemarksHistory && locData.siteRemarksHistory.length > 0) {
      allSitesRemarks.push({
        loc: loc,
        remarks: locData.siteRemarksHistory
      });
    }
  });

  function renderPageSkeleton(pageIdx) {
    const pageDiv = document.createElement('div');
    pageDiv.className = 'arc-pdf-page';
    pageDiv.style.cssText = 'width: 1300px; padding: 20px 24px; background: #ffffff; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #18181b; display: flex; flex-direction: column; justify-content: flex-start;';

    pageDiv.innerHTML = `
      <!-- HEADER WITH METADATA -->
      <div style="border-bottom: 3px solid #d11a2a; padding-bottom: 8px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h2 style="font-weight: 900; color: #18181b; margin: 0; text-transform: uppercase; font-size: 20px; letter-spacing: 0.5px;">ARCDESIGN CONSTRUCTION SERVICES</h2>
          <p style="color: #71717a; margin: 3px 0 0 0; font-size: 11px; font-weight: 700;">OFFICIAL SITE ANALYTICS & REMARKS STATEMENT (LEGAL LANDSCAPE)</p>
        </div>
        <div style="text-align: right;">
          <div style="font-weight: 800; font-size: 11px; background: #18181b; color: #fff; padding: 3px 9px; border-radius: 4px; display: inline-block;">LOCATION: ${currentLocation === 'VIEW_ALL' ? 'ALL SITES' : currentLocation}</div>
          <div style="font-weight: 700; font-size: 11px; color: #d11a2a; margin-top: 3px;">DATE PERIOD: ${dateRangeStr}</div>
          <div style="font-weight: 600; font-size: 10px; color: #71717a; margin-top: 2px;">GENERATED: ${genDateStr}</div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span style="font-weight: 800; font-size: 12px; color: #18181b;"><span style="color:#d11a2a;">■</span> WORKER ATTENDANCE ANALYTICS & FIELD NOTES <span class="arc-pdf-page-indicator"></span></span>
        <span style="font-size: 11px; color: #71717a;">${allSiteWorkers.length} Workers Evaluated &bull; Circular Gauges & Attendance Distribution</span>
      </div>

      <!-- WORKER CARDS TABLE -->
      <table style="width: 100%; border-collapse: collapse; font-size: 11px; border: 1px solid #d4d4d8;">
        <thead>
          <tr style="background: #18181b; color: #ffffff;">
            <th style="padding: 7px 8px; text-align: left; width: 170px; border: 1px solid #3f3f46;">Worker & Position</th>
            <th style="padding: 7px 4px; text-align: center; width: 85px; border: 1px solid #3f3f46;">Circle %</th>
            <th style="padding: 7px 8px; text-align: left; width: 210px; border: 1px solid #3f3f46;">Attendance Graph</th>
            <th style="padding: 7px 4px; text-align: center; width: 55px; border: 1px solid #3f3f46;">Days</th>
            <th style="padding: 7px 4px; text-align: center; width: 55px; border: 1px solid #3f3f46;">OT</th>
            <th style="padding: 7px 8px; text-align: left; width: 275px; border: 1px solid #3f3f46; background: #27272a;"><span style="color: #f87171;">●</span> Automated System Remarks</th>
            <th style="padding: 7px 8px; text-align: left; width: 180px; border: 1px solid #3f3f46;">Worker Notes & Remarks</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      <div class="arc-pdf-footer-placeholder"></div>
    `;

    tempContainer.appendChild(pageDiv);
    return {
      pageDiv,
      table: pageDiv.querySelector('table'),
      tbody: pageDiv.querySelector('tbody'),
      footerContainer: pageDiv.querySelector('.arc-pdf-footer-placeholder')
    };
  }

  function renderRowHtml(item, idx) {
    const w = item.worker;
    const m = getWorkerMetrics(w);
    const workerAttPct = Math.min(100, Math.round((m.daysWorked / 6) * 100));
    const pctColor = workerAttPct >= 80 ? '#16a34a' : (workerAttPct >= 50 ? '#2563eb' : '#dc2626');

    let fullCnt = 0, halfCnt = 0, hourlyCnt = 0, absentCnt = 0, sickCnt = 0, emgCnt = 0;
    dates.forEach(d => {
      const v = getWorkerAttendanceVal(w, d);
      if (v === '1.0' || v === '1') fullCnt++;
      else if (v === '0.5') halfCnt++;
      else if (String(v).endsWith('h')) hourlyCnt++;
      else if (v === 'absent') absentCnt++;
      else if (v === 'sick') sickCnt++;
      else if (v === 'emergency') emgCnt++;
    });

    const totalShifts = 6;
    const pFull = Math.round((fullCnt / totalShifts) * 100);
    const pHalf = Math.round((halfCnt / totalShifts) * 100);
    const pHourly = Math.round((hourlyCnt / totalShifts) * 100);
    const pAbsent = Math.round((absentCnt / totalShifts) * 100);
    const pSick = Math.round((sickCnt / totalShifts) * 100);
    const pEmergency = Math.round((emgCnt / totalShifts) * 100);

    const autoRemarks = getWorkerAutomatedRemarks(w, dates);
    const historyNotes = (w.notesHistory || []).slice(-2).map(n => n.text).join('; ');

    return `
      <tr style="border-bottom: 1px solid #e4e4e7;">
        <td style="padding: 8px 8px; border: 1px solid #d4d4d8;">
          <div style="font-weight: 800; text-transform: uppercase; font-size: 11px;">${w.name}</div>
          <div style="font-size: 10px; color: #71717a; margin-top: 2px;">
            <span style="background: #f4f4f5; padding: 1px 5px; border-radius: 3px; font-weight: 700;">${w.role}</span>
            ${currentLocation === 'VIEW_ALL' ? `<span style="color: #d11a2a; margin-left: 4px; font-weight: 700;">${item.loc}</span>` : ''}
          </div>
        </td>
        <td style="padding: 6px 4px; text-align: center; border: 1px solid #d4d4d8;">
          <!-- SVG CIRCLE PERCENTAGE GAUGE -->
          <div style="position: relative; width: 38px; height: 38px; display: inline-flex; justify-content: center; align-items: center;">
            <svg viewBox="0 0 36 36" style="width: 38px; height: 38px; transform: rotate(-90deg);">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e4e4e7" stroke-width="4.5" />
              <path stroke-dasharray="${workerAttPct}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="${pctColor}" stroke-width="4.5" />
            </svg>
            <div style="position: absolute; text-align: center; font-size: 9px; font-weight: 800; color: ${pctColor};">${workerAttPct}%</div>
          </div>
        </td>
        <td style="padding: 8px 8px; border: 1px solid #d4d4d8;">
          <!-- ATTENDANCE DISTRIBUTION GRAPH -->
          <div style="display: flex; height: 9px; border-radius: 4px; background: #e4e4e7; overflow: hidden; width: 100%; margin-bottom: 4px;">
            ${pFull > 0 ? `<div style="width: ${pFull}%; background: #16a34a;" title="Full Days"></div>` : ''}
            ${pHalf > 0 ? `<div style="width: ${pHalf}%; background: #2563eb;" title="Half Days"></div>` : ''}
            ${pHourly > 0 ? `<div style="width: ${pHourly}%; background: #9333ea;" title="Hourly"></div>` : ''}
            ${pAbsent > 0 ? `<div style="width: ${pAbsent}%; background: #dc2626;" title="Absent"></div>` : ''}
            ${pSick > 0 ? `<div style="width: ${pSick}%; background: #f59e0b;" title="Sick"></div>` : ''}
            ${pEmergency > 0 ? `<div style="width: ${pEmergency}%; background: #ea580c;" title="Emergency"></div>` : ''}
          </div>
          <div style="font-size: 9px; color: #52525b; display: flex; gap: 6px; flex-wrap: wrap;">
            <span><strong style="color:#16a34a;">Full:</strong> ${fullCnt}</span>
            <span><strong style="color:#2563eb;">Half:</strong> ${halfCnt}</span>
            <span><strong style="color:#dc2626;">Abs:</strong> ${absentCnt}</span>
            <span><strong style="color:#f59e0b;">Sick:</strong> ${sickCnt}</span>
          </div>
        </td>
        <td style="padding: 6px 4px; text-align: center; font-weight: 800; font-size: 12px; border: 1px solid #d4d4d8; background: #fafafa;">
          ${m.daysWorked.toFixed(1)}
        </td>
        <td style="padding: 6px 4px; text-align: center; font-weight: 800; font-size: 12px; color: #d11a2a; border: 1px solid #d4d4d8; background: #fafafa;">
          ${m.totalOT > 0 ? `${m.totalOT}h` : '-'}
        </td>
        <td style="padding: 6px 8px; border: 1px solid #d4d4d8; background: #fafafa;">
          <!-- AUTOMATED SYSTEM REMARKS BADGES -->
          <div style="display: flex; gap: 3px; flex-direction: column;">
            ${autoRemarks.map(ar => `
              <div style="font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 3px; background: ${ar.bg || '#fef2f2'}; color: ${ar.color || '#991b1b'}; border: 1px solid ${ar.border || '#fecaca'}; display: inline-block;">
                ${ar.text}
              </div>
            `).join('')}
          </div>
        </td>
        <td style="padding: 6px 8px; border: 1px solid #d4d4d8;">
          <!-- WORKER FIELD NOTES -->
          <div style="font-size: 10px; color: #18181b; font-weight: 600;">
            ${(w.remarks || '-').replace(/</g, '&lt;')}
          </div>
          ${historyNotes ? `<div style="color: #71717a; font-size: 8.5px; margin-top: 3px;">Prev: ${historyNotes}</div>` : ''}
        </td>
      </tr>
    `;
  }

  function renderFooterElements() {
    // Generate automated operational remarks summary across all evaluated workers
    const perfectAttWorkers = [];
    const heavyOtWorkers = [];
    const highAbsenceWorkers = [];
    const baleWorkers = [];

    allSiteWorkers.forEach(item => {
      const w = item.worker;
      const m = getWorkerMetrics(w);
      const autoNotes = getWorkerAutomatedRemarks(w, dates);
      
      if (m.daysWorked >= 6) perfectAttWorkers.push(w.name);
      if (m.totalOT >= 8) heavyOtWorkers.push(`${w.name} (+${m.totalOT}h)`);
      const hasAbsences = autoNotes.some(n => n.text.includes('Absent') || n.text.includes('Absences'));
      if (hasAbsences) highAbsenceWorkers.push(w.name);
      if ((w.baleValue || 0) > 0) baleWorkers.push(`${w.name} (₱${Number(w.baleValue).toLocaleString()})`);
    });

    const automatedSummaryHtml = `
      <div style="margin-top: 14px; padding: 10px 14px; background: #fff5f5; border-left: 4px solid #d11a2a; border-radius: 4px; border-top: 1px solid #fecaca; border-right: 1px solid #fecaca; border-bottom: 1px solid #fecaca;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <div style="font-weight: 900; font-size: 11px; color: #991b1b; text-transform: uppercase;">
            <span style="color: #d11a2a;">■</span> System Automated Remarks & Operational Highlights:
          </div>
          <div style="font-size: 9.5px; font-weight: 800; color: #71717a;">
            ${allSiteWorkers.length} Workers Evaluated
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 9.5px; color: #1f2937;">
          <div style="background: #ffffff; padding: 6px 8px; border-radius: 4px; border: 1px solid #fecaca;">
            <strong style="color: #166534;">⭐ Perfect Attendance (${perfectAttWorkers.length}):</strong> 
            <span>${perfectAttWorkers.length > 0 ? perfectAttWorkers.join(', ') : 'None this period'}</span>
          </div>
          <div style="background: #ffffff; padding: 6px 8px; border-radius: 4px; border: 1px solid #fecaca;">
            <strong style="color: #9a3412;">🔥 Heavy Overtime (${heavyOtWorkers.length}):</strong> 
            <span>${heavyOtWorkers.length > 0 ? heavyOtWorkers.join(', ') : 'None this period'}</span>
          </div>
          <div style="background: #ffffff; padding: 6px 8px; border-radius: 4px; border: 1px solid #fecaca;">
            <strong style="color: #991b1b;">⚠️ Workers with Absences (${highAbsenceWorkers.length}):</strong> 
            <span>${highAbsenceWorkers.length > 0 ? highAbsenceWorkers.join(', ') : 'None recorded'}</span>
          </div>
          <div style="background: #ffffff; padding: 6px 8px; border-radius: 4px; border: 1px solid #fecaca;">
            <strong style="color: #1e40af;">💳 Active Bale Deductions (${baleWorkers.length}):</strong> 
            <span>${baleWorkers.length > 0 ? baleWorkers.join(', ') : 'None'}</span>
          </div>
        </div>
      </div>
    `;

    let siteRemarksHtml = '';
    if (allSitesRemarks.length > 0) {
      siteRemarksHtml = `
        <div style="margin-top: 10px; padding: 10px 14px; background: #fdf2f2; border-left: 4px solid #d11a2a; border-radius: 4px;">
          <div style="font-weight: 800; font-size: 11px; color: #991b1b; text-transform: uppercase; margin-bottom: 5px;">
            Site Supervisor Daily Remarks & Field Logs:
          </div>
          ${allSitesRemarks.map(sr => `
            <div style="margin-bottom: 4px; font-size: 10px;">
              <span style="font-weight: 800; color: #18181b;">[${sr.loc}]:</span>
              ${sr.remarks.slice(-3).reverse().map(rem => `<span style="color: #374151; margin-left: 4px;">&bull; <strong>${rem.dateStr || 'Log'}:</strong> ${rem.text}</span>`).join(' ')}
            </div>
          `).join('')}
        </div>
      `;
    }

    const signaturesHtml = (includeSignatures ? `
      <div style="display: flex; justify-content: space-between; margin-top: 26px; padding-top: 10px; border-top: 1.5px solid #e4e4e7;">
        <div style="text-align: center; width: 30%;">
          <div style="border-bottom: 1.5px solid #000; height: 30px;"></div>
          <div style="font-weight: 800; font-size: 10px; margin-top: 4px;">PREPARED BY (TIMEKEEPER)</div>
        </div>
        <div style="text-align: center; width: 30%;">
          <div style="border-bottom: 1.5px solid #000; height: 30px;"></div>
          <div style="font-weight: 800; font-size: 10px; margin-top: 4px;">CHECKED BY (SITE ENGINEER)</div>
        </div>
        <div style="text-align: center; width: 30%;">
          <div style="border-bottom: 1.5px solid #000; height: 30px;"></div>
          <div style="font-weight: 800; font-size: 10px; margin-top: 4px;">APPROVED BY (PROJECT MANAGER)</div>
        </div>
      </div>
    ` : '');

    return {
      tfootHtml: '',
      signaturesHtml: automatedSummaryHtml + siteRemarksHtml + signaturesHtml
    };
  }

  buildDynamicTableReport({
    container: tempContainer,
    items: allSiteWorkers,
    renderPageSkeleton,
    renderRowHtml,
    renderFooterElements,
    maxPageHeight: 740
  });
}

async function generatePDF(actionType = 'download', isTimesheet = true, includeSignatures = true, includeWorkerBale = true) {
  showProcessingIndicator(
    isTimesheet ? "Generating Timesheet PDF..." : "Generating Analytics PDF...",
    "Processing attendance records and computing page layout..."
  );

  const dates = getCalculatedDates();
  const dateRangeStr = getPeriodString(dates);

  const delSites = getDeletedSites();
  const sitesToProcess = (currentLocation === "VIEW_ALL")
    ? Object.keys(currentActiveData.locations || {}).filter(s => !delSites.includes(s.toUpperCase()))
    : [currentLocation];

  const tempContainer = document.createElement('div');
  tempContainer.style.position = 'absolute';
  tempContainer.style.left = '-9999px';
  tempContainer.style.top = '0';
  tempContainer.style.width = '1300px';
  tempContainer.style.background = '#ffffff';
  document.body.appendChild(tempContainer);

  if (isTimesheet) {
    buildDynamicTimesheetPages(tempContainer, sitesToProcess, dates, includeSignatures, includeWorkerBale);
  } else {
    buildDynamicAnalyticsPages(tempContainer, sitesToProcess, dates, includeSignatures);
  }

  const fileName = getStandardExportFileName(isTimesheet ? "Timesheet" : "Analytics", "pdf");
  const title = isTimesheet ? "ARCDESIGN Timesheet PDF" : "ARCDESIGN Analytics & Remarks PDF";
  const message = `${isTimesheet ? 'Timesheet' : 'Analytics & Remarks'} statement for ${currentLocation} (${dateRangeStr})`;

  await renderPdfFromHtmlElement(tempContainer, fileName, actionType, title, message);
}

// --- SHARE MODAL & CHANNELS ---
function promptSharePermissionModal() {
  const modalEl = document.getElementById("arcSharePermissionModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

async function processShareAction(targetChannel) {
  const modalEl = document.getElementById("arcSharePermissionModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }

  showProcessingIndicator(
    "Generating Timesheet Card...",
    "Preparing image file for sharing..."
  );

  try {
    // Generate high-resolution snapshot card (scale 3.0 for crisp zoom)
    const targetArea = document.getElementById("exportArea") || document.getElementById("mainTimesheetContainer");
    if (!targetArea) return;

    updateProcessingStatus("Capturing ultra-high-resolution card...", 60);
    const canvas = await html2canvas(targetArea, { scale: 3.0, useCORS: true, logging: false, backgroundColor: '#ffffff' });
    const imgData = canvas.toDataURL('image/png');
    const base64Data = imgData.split(',')[1];
    const fileName = getStandardExportFileName("Card", "png");

    updateProcessingStatus("Opening Share Sheet...", 95);
    if (window.Android && window.Android.shareFile) {
      window.Android.shareFile("ARCDESIGN Timesheet Card", `Attendance report for ${currentLocation}`, base64Data, fileName, "image/png", "");
    } else if (navigator.share) {
      const blob = await (await fetch(imgData)).blob();
      const file = new File([blob], fileName, { type: 'image/png' });
      await navigator.share({ files: [file], title: "ARCDESIGN Timesheet", text: `Attendance for ${currentLocation}` });
    } else {
      const a = document.createElement('a');
      a.href = imgData;
      a.download = fileName;
      a.click();
    }
  } catch (err) {
    console.error("Share error:", err);
    alert("Unable to complete share operation: " + (err.message || err));
  } finally {
    setTimeout(hideProcessingIndicator, 600);
  }
}

function openShareQrModal() {
  const modalEl = document.getElementById("shareQrCodeModal") || document.getElementById("quickShareQrModal");
  const linkInput = document.getElementById("shareQrLinkText") || document.getElementById("shareQrLinkInput");
  const qrContainer = document.getElementById("qrCodeContainer") || document.getElementById("shareQrImage")?.parentElement;

  const appUrl = window.location.href;
  if (linkInput) linkInput.value = appUrl;

  if (qrContainer) {
    qrContainer.innerHTML = `
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(appUrl)}" 
           alt="QR Code" class="img-fluid border p-1 rounded bg-white shadow-sm" style="max-width: 180px;">
    `;
  }

  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

function copyShareQrLink() {
  const input = document.getElementById("shareQrLinkText") || document.getElementById("shareQrLinkInput");
  if (input) {
    input.select();
    navigator.clipboard?.writeText(input.value);
    alert("Application link copied to clipboard!");
  }
}

function shareDirectQrLink() {
  const appUrl = window.location.href;
  if (Android && Android.shareText) {
    Android.shareText("ARCDESIGN Construction Timesheet", appUrl);
  } else if (navigator.share) {
    navigator.share({ title: "ARCDESIGN Timesheet", url: appUrl });
  } else {
    copyShareQrLink();
  }
}

// --- TXT EXPORT MODAL & TRANSCRIPT GENERATOR ---
function showExportTxtModal() {
  const startEl = document.getElementById("exportStartDate");
  const endEl = document.getElementById("exportEndDate");
  const dates = getCalculatedDates();

  if (dates && dates.length > 0) {
    if (startEl) startEl.value = dates[0].key;
    if (endEl) endEl.value = dates[dates.length - 1].key;
  } else {
    if (startEl) startEl.value = currentDate;
    if (endEl) endEl.value = currentDate;
  }

  const siteLabelEl = document.getElementById("txtExportCurrentSiteLabel");
  if (siteLabelEl) {
    siteLabelEl.innerText = currentLocation === "VIEW_ALL" ? "All Sites" : currentLocation;
  }

  const radioCurrent = document.getElementById("txtExportScopeCurrent");
  const radioAll = document.getElementById("txtExportScopeAll");
  if (currentLocation === "VIEW_ALL") {
    if (radioAll) radioAll.checked = true;
  } else {
    if (radioCurrent) radioCurrent.checked = true;
  }

  const modalEl = document.getElementById("exportTxtModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

function getTranscriptDates(startVal, endVal) {
  if (startVal && endVal) {
    const sDate = new Date(startVal + "T00:00:00");
    const eDate = new Date(endVal + "T00:00:00");
    if (!isNaN(sDate.getTime()) && !isNaN(eDate.getTime()) && sDate <= eDate) {
      const datesArr = [];
      let cur = new Date(sDate);
      const diffDays = Math.round((eDate - sDate) / (1000 * 60 * 60 * 24));
      const count = Math.min(diffDays + 1, 31);
      const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      for (let i = 0; i < count; i++) {
        const y = cur.getFullYear();
        const m = String(cur.getMonth() + 1).padStart(2, '0');
        const d = String(cur.getDate()).padStart(2, '0');
        const dayKey = `${y}-${m}-${d}`;
        const dayNum = String(cur.getDate()).padStart(2, '0');
        datesArr.push({
          key: dayKey,
          dayName: dayNames[cur.getDay()],
          dayNum: dayNum,
          monthStr: monthNames[cur.getMonth()]
        });
        cur.setDate(cur.getDate() + 1);
      }
      return datesArr;
    }
  }
  return getCalculatedDates();
}

function generateTranscriptText(options = {}) {
  const startEl = document.getElementById("exportStartDate");
  const endEl = document.getElementById("exportEndDate");
  const startVal = options.startDate || (startEl ? startEl.value : null);
  const endVal = options.endDate || (endEl ? endEl.value : null);
  const dates = getTranscriptDates(startVal, endVal);

  const scopeRadioAll = document.getElementById("txtExportScopeAll");
  const isAllSelected = options.scope ? (options.scope === "ALL") : (scopeRadioAll ? scopeRadioAll.checked : (currentLocation === "VIEW_ALL"));
  const scope = isAllSelected ? "ALL" : "CURRENT";

  const includeSiteRemarks = options.includeSiteRemarks !== undefined 
    ? options.includeSiteRemarks 
    : (document.getElementById("txtIncludeSiteRemarks") ? document.getElementById("txtIncludeSiteRemarks").checked : true);
  const includeWorkerRemarks = options.includeWorkerRemarks !== undefined 
    ? options.includeWorkerRemarks 
    : (document.getElementById("txtIncludeWorkerRemarks") ? document.getElementById("txtIncludeWorkerRemarks").checked : true);
  const includeAutomatedRemarks = options.includeAutomatedRemarks !== undefined 
    ? options.includeAutomatedRemarks 
    : (document.getElementById("txtIncludeAutomatedRemarks") ? document.getElementById("txtIncludeAutomatedRemarks").checked : true);

  const dateRangeStr = getPeriodString(dates);
  const genDateStr = `${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}, ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

  const delSites = getDeletedSites();
  const allActiveSites = Object.keys(currentActiveData.locations || {}).filter(s => !delSites.includes(s.toUpperCase()));
  let sitesToRender = [];
  if (scope === "ALL" || currentLocation === "VIEW_ALL") {
    sitesToRender = allActiveSites;
  } else {
    sitesToRender = [currentLocation];
  }

  const headerLoc = (scope === "ALL" || currentLocation === "VIEW_ALL") ? "ALL SITES" : currentLocation;

  let txt = `====================================================\n`;
  txt += `ARCDESIGN CONSTRUCTION SERVICES\n`;
  txt += `OFFICIAL TIMESHEET & ATTENDANCE TRANSCRIPT\n`;
  txt += `SCOPE: ${headerLoc}\n`;
  txt += `PERIOD: ${dateRangeStr}\n`;
  txt += `GENERATED: ${genDateStr}\n`;
  txt += `====================================================\n\n`;

  sitesToRender.forEach(loc => {
    const locData = currentActiveData.locations[loc];
    if (!locData) return;

    txt += `[SITE: ${loc}]\n`;
    const isBaleOn = locData.isBaleEnabled !== false;
    txt += `Project Bale: ₱${(locData.baleValue || 0).toLocaleString()} (${isBaleOn ? 'ON / Active' : 'OFF / Excluded'})\n`;
    txt += `Status: ${locData.isDone ? 'COMPLETED' : 'IN PROGRESS'}\n`;

    // Site notes and supervisor remarks
    if (includeSiteRemarks) {
      if (locData.remarks && locData.remarks.trim()) {
        txt += `Site Notes: ${locData.remarks.trim()}\n`;
      }
      if (locData.siteRemarksHistory && locData.siteRemarksHistory.length > 0) {
        txt += `Site Supervisor Daily Field Logs:\n`;
        locData.siteRemarksHistory.slice(-5).reverse().forEach(log => {
          txt += `  * [${log.dateStr || 'Log'}]: ${log.text}\n`;
        });
      }
    }
    txt += `----------------------------------------------------\n`;

    let workers = locData.workers || [];
    if (selectedRolesFilter.length > 0) {
      workers = workers.filter(w => selectedRolesFilter.includes(w.role));
    }

    if (workers.length === 0) {
      txt += `No workers recorded for this site.\n\n`;
      return;
    }

    workers.forEach(w => {
      const m = getWorkerMetrics(w);
      const att = dates.map(d => `${d.dayName} ${d.dayNum}: ${(w.attendance && w.attendance[d.key]) || '-'}`).join(' | ');
      const ot = dates.map(d => `${d.dayName} ${d.dayNum}: ${(w.ot && w.ot[d.key]) || 0}h`).join(' | ');

      txt += `Worker: ${w.name} [Role: ${w.role}]\n`;
      txt += `  Attendance: [ ${att} ]\n`;
      if (m.totalOT > 0) {
        txt += `  Overtime:   [ ${ot} ]\n`;
      }
      txt += `  Summary: Days Worked: ${m.daysWorked.toFixed(1)} | Overtime: ${m.totalOT}h | Bale: ₱${Number(w.baleValue || 0).toLocaleString()}\n`;

      // Worker notes and remarks
      if (includeWorkerRemarks) {
        if (w.remarks && w.remarks.trim()) {
          txt += `  Worker Remarks: ${w.remarks.trim()}\n`;
        }
        if (w.notesHistory && w.notesHistory.length > 0) {
          const notesStr = w.notesHistory.map(n => n.text).join('; ');
          txt += `  Worker Field Notes History: ${notesStr}\n`;
        }
      }

      // Automated remarks
      if (includeAutomatedRemarks) {
        const autoRemarks = getWorkerAutomatedRemarks(w, dates);
        if (autoRemarks && autoRemarks.length > 0) {
          txt += `  Automated Remarks: ${autoRemarks.map(ar => ar.text).join(' | ')}\n`;
        }
      }

      txt += `\n`;
    });

    txt += `\n`;
  });

  return { txt, scope, dates, headerLoc };
}

function executeTxtExport() {
  const { txt, scope, dates, headerLoc } = generateTranscriptText();
  const targetLocName = (scope === "ALL" || currentLocation === "VIEW_ALL") ? "All Sites" : currentLocation;
  const fileName = getStandardExportFileName("Transcript", "txt", targetLocName, dates);
  const base64Data = btoa(unescape(encodeURIComponent(txt)));

  if (window.Android && window.Android.shareFile) {
    window.Android.shareFile("ARCDESIGN Timesheet Transcript", `Text export for ${targetLocName}`, base64Data, fileName, "text/plain", "");
  } else if (navigator.share) {
    const blob = new Blob([txt], { type: 'text/plain' });
    const file = new File([blob], fileName, { type: 'text/plain' });
    navigator.share({ files: [file], title: "ARCDESIGN Transcript" });
  } else {
    const a = document.createElement('a');
    a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(txt);
    a.download = fileName;
    a.click();
  }

  const modalEl = document.getElementById("exportTxtModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }
}

function copyTranscriptToClipboard() {
  const { txt } = generateTranscriptText();
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(txt).then(() => {
      alert("Timesheet details & transcript successfully copied to clipboard!");
    }).catch(() => {
      executeTxtExport();
    });
  } else {
    executeTxtExport();
  }
}

// --- SECURITY CHALLENGES: CLEAR RECORDS & DELETE ---
function generateMathChallenge() {
  const n1 = Math.floor(Math.random() * 12) + 3;
  const n2 = Math.floor(Math.random() * 12) + 2;
  return {
    question: `${n1} + ${n2}`,
    answer: n1 + n2
  };
}

function promptClearRecords() {
  if (currentLocation === "VIEW_ALL") {
    alert("Please select a specific project site to clear records.");
    return;
  }

  currentClearMath = generateMathChallenge();
  const rangeEl = document.getElementById("clearTimeframeRange");
  const qEl = document.getElementById("mathQuestionText");
  const ansEl = document.getElementById("mathAnswerInput");
  const errEl = document.getElementById("mathErrorAlert");

  if (rangeEl) rangeEl.innerText = `${currentLocation} (${currentDate})`;
  if (qEl) qEl.innerText = currentClearMath.question;
  if (ansEl) ansEl.value = "";
  if (errEl) errEl.classList.add("d-none");

  const modalEl = document.getElementById("clearRecordsModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

function executeClearRecords() {
  const ansEl = document.getElementById("mathAnswerInput");
  const errEl = document.getElementById("mathErrorAlert");
  const val = parseInt(ansEl?.value, 10);

  if (val !== currentClearMath.answer) {
    if (errEl) errEl.classList.remove("d-none");
    return;
  }

  if (currentLocation !== "VIEW_ALL" && currentActiveData.locations[currentLocation]) {
    const workers = currentActiveData.locations[currentLocation].workers || [];
    workers.forEach(w => {
      w.attendance = { M: '', T: '', W: '', Th: '', F: '', S: '' };
      w.ot = { M: 0, T: 0, W: 0, Th: 0, F: 0, S: 0 };
      w.baleValue = 0;
      w.updatedAt = Date.now();
    });
    currentActiveData.locations[currentLocation].baleValue = 0;
    saveStore();
    renderUI();
  }

  const modalEl = document.getElementById("clearRecordsModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }
}

function promptDeleteRecordedDate(targetDateKey, targetLabel) {
  targetDatePendingDeletion = targetDateKey || currentDate;
  currentDeleteDateMath = generateMathChallenge();

  const rangeEl = document.getElementById("deleteDateRangeDisplay");
  const qEl = document.getElementById("deleteDateMathQuestionText");
  const ansEl = document.getElementById("deleteDateMathAnswerInput");
  const errEl = document.getElementById("deleteDateMathErrorAlert");

  let displayLabel = targetLabel;
  if (!displayLabel) {
    const dates = calculateDatesForStart(targetDatePendingDeletion);
    displayLabel = (dates.length > 0) ? getPeriodString(dates) : targetDatePendingDeletion;
  }

  if (rangeEl) rangeEl.innerHTML = `<strong>${displayLabel}</strong> <span class="text-muted small">(${targetDatePendingDeletion})</span>`;
  if (qEl) qEl.innerText = currentDeleteDateMath.question;
  if (ansEl) ansEl.value = "";
  if (errEl) errEl.classList.add("d-none");

  const modalEl = document.getElementById("deleteRecordedDateModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

function executeDeleteRecordedDate() {
  const ansEl = document.getElementById("deleteDateMathAnswerInput");
  const errEl = document.getElementById("deleteDateMathErrorAlert");
  const val = parseInt(ansEl?.value, 10);

  if (val !== currentDeleteDateMath.answer) {
    if (errEl) errEl.classList.remove("d-none");
    return;
  }

  const dateToDelete = targetDatePendingDeletion || currentDate;

  delete timesheetDB[dateToDelete];
  if (payrollDB[dateToDelete]) {
    delete payrollDB[dateToDelete];
    safeStorageSet(PAYROLL_STORAGE_KEY, JSON.stringify(payrollDB));
  }

  const delDates = getDeletedDates();
  if (!delDates.includes(dateToDelete)) {
    delDates.push(dateToDelete);
    saveDeletedDates(delDates);
  }

  const remaining = Object.keys(timesheetDB).filter(k => checkHasRecordForDate(k));
  if (remaining.length > 0) {
    currentDate = remaining.sort().reverse()[0];
    currentActiveData = timesheetDB[currentDate];
  } else {
    currentDate = getTodayFormatted();
    timesheetDB[currentDate] = buildFreshLocationsData();
    currentActiveData = timesheetDB[currentDate];
  }

  saveStore();
  const picker = document.getElementById("startDatePicker");
  if (picker) picker.value = currentDate;
  syncWeeklyPayrollRates(currentDate);
  renderLocationDropdown();
  renderRecordedDatesList();
  renderUI();

  const modalEl = document.getElementById("deleteRecordedDateModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }
  targetDatePendingDeletion = null;
}

function promptDeleteSite(loc) {
  if (!isAdmin()) {
    alert("Administrator authorization required to delete project sites.");
    return;
  }

  sitePendingDeletion = loc;
  currentDeleteProjectMath = generateMathChallenge();

  const nameEl = document.getElementById("deleteProjectNameDisplay");
  const qEl = document.getElementById("deleteMathQuestionText");
  const ansEl = document.getElementById("deleteMathAnswerInput");
  const errEl = document.getElementById("deleteMathErrorAlert");

  if (nameEl) nameEl.innerText = loc;
  if (qEl) qEl.innerText = currentDeleteProjectMath.question;
  if (ansEl) ansEl.value = "";
  if (errEl) errEl.classList.add("d-none");

  const modalEl = document.getElementById("deleteProjectModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

function executeDeleteProject() {
  if (!isAdmin()) {
    alert("Administrator authorization required to delete project sites.");
    return;
  }
  const ansEl = document.getElementById("deleteMathAnswerInput");
  const errEl = document.getElementById("deleteMathErrorAlert");
  const val = parseInt(ansEl?.value, 10);

  if (val !== currentDeleteProjectMath.answer) {
    if (errEl) errEl.classList.remove("d-none");
    return;
  }

  if (sitePendingDeletion) {
    const delSites = getDeletedSites();
    if (!delSites.includes(sitePendingDeletion.toUpperCase())) {
      delSites.push(sitePendingDeletion.toUpperCase());
      saveDeletedSites(delSites);
    }

    for (let d in timesheetDB) {
      if (timesheetDB[d].locations && timesheetDB[d].locations[sitePendingDeletion]) {
        delete timesheetDB[d].locations[sitePendingDeletion];
      }
    }

    saveStore();
    currentLocation = "VIEW_ALL";
    renderLocationDropdown();
    renderUI();
  }

  const modalEl = document.getElementById("deleteProjectModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }
}

function promptDeleteWorker(loc, workerId, workerName) {
  if (!isAdmin()) {
    alert("Administrator authorization required to delete workers.");
    return;
  }

  if (confirm(`Permanently remove worker "${workerName}" from ${loc}?`)) {
    if (currentActiveData.locations[loc]) {
      currentActiveData.locations[loc].workers = (currentActiveData.locations[loc].workers || []).filter(w => w.id !== workerId);
      const delWorkers = getDeletedWorkers();
      if (!delWorkers.includes(workerId)) {
        delWorkers.push(workerId);
        saveDeletedWorkers(delWorkers);
      }
      saveStore();
      renderUI();
    }
  }
}

// --- NOTIFICATION PERMISSION & STATUS ---
function updateNotifButtonUI() {
  const isEnabled = localStorage.getItem(NOTIF_FLAG_KEY) === "true";
  const icon = document.getElementById("notifIconStatus");
  const text = document.getElementById("notifStatusText");
  const btn = document.getElementById("btnToggleDeviceNotifs");

  if (!btn || !icon || !text) return;

  if (isEnabled && ("Notification" in window) && Notification.permission === "granted") {
    btn.className = "btn btn-outline-success btn-sm w-100 fw-bold";
    icon.className = "bi bi-bell-fill me-1 text-success";
    text.innerText = "Notifications Active";
  } else {
    btn.className = "btn btn-outline-warning btn-sm w-100 fw-bold";
    icon.className = "bi bi-bell-slash-fill me-1 text-warning";
    text.innerText = "Enable Notifications";
  }
}

async function toggleDeviceNotificationPermission() {
  if (!("Notification" in window)) {
    alert("Device notifications ready.");
    return;
  }

  if (Notification.permission === "granted") {
    const isCurrentlyOn = localStorage.getItem(NOTIF_FLAG_KEY) === "true";
    if (isCurrentlyOn) {
      localStorage.setItem(NOTIF_FLAG_KEY, "false");
      alert("Device notifications muted.");
    } else {
      localStorage.setItem(NOTIF_FLAG_KEY, "true");
      alert("Device notifications activated!");
    }
    updateNotifButtonUI();
    return;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      localStorage.setItem(NOTIF_FLAG_KEY, "true");
      new Notification("ARCDESIGN Timesheet", {
        body: "Notifications active. Daily attendance & payroll updates ready.",
        icon: "arc_logo.jpg"
      });
    } else {
      localStorage.setItem(NOTIF_FLAG_KEY, "false");
    }
  } catch (e) {
    console.warn("Notification request:", e);
  }
  updateNotifButtonUI();
}

// --- FEATURE INTRO MODAL ---
function checkShowFeatureIntro() {
  const dismissed = localStorage.getItem("arc_feature_guide_dismissed_v2");
  if (dismissed === "true") return;

  const modalEl = document.getElementById("appFeaturesModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

function dismissFeatureModal() {
  const dontShow = document.getElementById("dontShowFeatureAgain")?.checked;
  if (dontShow) {
    localStorage.setItem("arc_feature_guide_dismissed_v2", "true");
  }
  const modalEl = document.getElementById("appFeaturesModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }
}

// --- DOM INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  initStore();
  renderLocationDropdown();
  renderUI();
  checkShowFeatureIntro();
});

// --- GLOBAL WINDOW BINDINGS ---
if (typeof attemptLogin === "function") window.attemptLogin = attemptLogin;
if (typeof dismissFeatureModal === "function") window.dismissFeatureModal = dismissFeatureModal;
if (typeof onStartDateChange === "function") window.onStartDateChange = onStartDateChange;
if (typeof switchLocation === "function") window.switchLocation = switchLocation;
if (typeof showExportTxtModal === "function") window.showExportTxtModal = showExportTxtModal;
if (typeof exportToPDF === "function") window.exportToPDF = exportToPDF;
if (typeof promptSharePermissionModal === "function") window.promptSharePermissionModal = promptSharePermissionModal;
if (typeof openDailyWagePayrollModal === "function") window.openDailyWagePayrollModal = openDailyWagePayrollModal;
if (typeof toggleDeviceNotificationPermission === "function") window.toggleDeviceNotificationPermission = toggleDeviceNotificationPermission;
if (typeof startFocusMode === "function") window.startFocusMode = startFocusMode;
if (typeof showSearchWorkerModal === "function") window.showSearchWorkerModal = showSearchWorkerModal;
if (typeof showAddWorkerModal === "function") window.showAddWorkerModal = showAddWorkerModal;
if (typeof showCreateAccountModal === "function") window.showCreateAccountModal = showCreateAccountModal;
if (typeof logoutSession === "function") window.logoutSession = logoutSession;
if (typeof exportPayroll === "function") window.exportPayroll = exportPayroll;
if (typeof onQuickRoleChange === "function") window.onQuickRoleChange = onQuickRoleChange;
if (typeof autoCalculateQuickHourRate === "function") window.autoCalculateQuickHourRate = autoCalculateQuickHourRate;
if (typeof applyQuickRoleRates === "function") window.applyQuickRoleRates = applyQuickRoleRates;
if (typeof focusNavWorker === "function") window.focusNavWorker = focusNavWorker;
if (typeof setCustomHourInputValue === "function") window.setCustomHourInputValue = setCustomHourInputValue;
if (typeof confirmCustomHoursEntry === "function") window.confirmCustomHoursEntry = confirmCustomHoursEntry;
if (typeof handleWorkerSearchLive === "function") window.handleWorkerSearchLive = handleWorkerSearchLive;
if (typeof confirmAddWorker === "function") window.confirmAddWorker = confirmAddWorker;
if (typeof openRenameWorkerModal === "function") window.openRenameWorkerModal = openRenameWorkerModal;
if (typeof showProcessingIndicator === "function") window.showProcessingIndicator = showProcessingIndicator;
if (typeof hideProcessingIndicator === "function") window.hideProcessingIndicator = hideProcessingIndicator;
if (typeof confirmRenameWorker === "function") window.confirmRenameWorker = confirmRenameWorker;
if (typeof addWorkerNote === "function") window.addWorkerNote = addWorkerNote;
if (typeof confirmCreateStaffAccount === "function") window.confirmCreateStaffAccount = confirmCreateStaffAccount;
if (typeof confirmCreateProject === "function") window.confirmCreateProject = confirmCreateProject;
if (typeof executeClearRecords === "function") window.executeClearRecords = executeClearRecords;
if (typeof executeDeleteRecordedDate === "function") window.executeDeleteRecordedDate = executeDeleteRecordedDate;
if (typeof executeDeleteProject === "function") window.executeDeleteProject = executeDeleteProject;
if (typeof executeTxtExport === "function") window.executeTxtExport = executeTxtExport;
if (typeof handlePdfExportAction === "function") window.handlePdfExportAction = handlePdfExportAction;
if (typeof openShareQrModal === "function") window.openShareQrModal = openShareQrModal;
if (typeof processShareAction === "function") window.processShareAction = processShareAction;
if (typeof copyTranscriptToClipboard === "function") window.copyTranscriptToClipboard = copyTranscriptToClipboard;
if (typeof copyShareQrLink === "function") window.copyShareQrLink = copyShareQrLink;
if (typeof shareDirectQrLink === "function") window.shareDirectQrLink = shareDirectQrLink;
window.getWorkerMetrics = getWorkerMetrics;
window.saveWorkerRate = saveWorkerRate;
window.saveWorkerHourlyRate = saveWorkerHourlyRate;
window.renderPayrollTable = renderPayrollTable;
window.updateAttendance = updateAttendance;
window.updateOT = updateOT;
window.updateWorkerBale = updateWorkerBale;
window.updateLocationBale = updateLocationBale;
window.updateLocationBaleForSite = updateLocationBaleForSite;
window.toggleLocationBaleEnabled = toggleLocationBaleEnabled;
window.generateTranscriptText = generateTranscriptText;
window.toggleStatsView = toggleStatsView;
window.openFocusCustomHours = openFocusCustomHours;
window.updateFocusWorkerRemarks = updateFocusWorkerRemarks;
window.jumpToFocusWorker = jumpToFocusWorker;
window.updateSiteRemarks = updateSiteRemarks;

window.setFocusAttendance = setFocusAttendance;
window.setFocusOT = setFocusOT;
window.updateFocusBale = updateFocusBale;
window.focusNavWorker = focusNavWorker;
window.startFocusMode = startFocusMode;
window.renderFocusWorker = renderFocusWorker;

window.openWorkerProfileModal = openWorkerProfileModal;
window.launchFocusForActiveWorker = launchFocusForActiveWorker;
window.saveWorkerRemarkFromProfile = saveWorkerRemarkFromProfile;
window.updateWorkerRemarks = updateWorkerRemarks;
window.deleteWorkerNote = deleteWorkerNote;
window.toggleSiteNotes = toggleSiteNotes;
window.saveSiteNotesDirect = saveSiteNotesDirect;
window.appendSiteNotePreset = appendSiteNotePreset;
window.openSiteNotesModal = openSiteNotesModal;
window.saveModalSiteNotes = saveModalSiteNotes;
window.appendModalSiteNotePreset = appendModalSiteNotePreset;
window.switchAnalyticsSiteRemarks = switchAnalyticsSiteRemarks;
window.saveAnalyticsSiteRemarks = saveAnalyticsSiteRemarks;
window.appendAnalyticsPresetTag = appendAnalyticsPresetTag;
window.renderSingleWorkerGraphCard = renderSingleWorkerGraphCard;
window.filterWorkerGraphs = filterWorkerGraphs;
window.toggleFocusRateEditor = toggleFocusRateEditor;
window.onFocusDailyRateInput = onFocusDailyRateInput;
window.onFocusHourlyRateInput = onFocusHourlyRateInput;
window.setFocusRatePreset = setFocusRatePreset;
window.getWorkerLocation = getWorkerLocation;
window.promptDeleteRecordedDate = promptDeleteRecordedDate;
window.executeDeleteRecordedDate = executeDeleteRecordedDate;
window.selectRecordedDate = selectRecordedDate;

function openArcCompanyProfileCard() {
  const modalEl = document.getElementById("arcCompanyProfileCardModal");
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

async function renderLandscapeProfileCardCanvas() {
  const cardNode = document.getElementById("arcOfficialProfileCardNode");
  if (!cardNode) return null;

  // Create an off-screen fixed container with explicit 1350px width for true landscape export
  const offscreen = document.createElement("div");
  offscreen.style.position = "fixed";
  offscreen.style.left = "-9999px";
  offscreen.style.top = "0";
  offscreen.style.width = "1350px";
  offscreen.style.minWidth = "1350px";
  offscreen.style.maxWidth = "1350px";
  offscreen.style.zIndex = "-9999";
  offscreen.style.background = "#ffffff";

  const clone = cardNode.cloneNode(true);
  clone.style.width = "1350px";
  clone.style.minWidth = "1350px";
  clone.style.maxWidth = "1350px";
  clone.style.margin = "0";
  clone.style.display = "block";
  offscreen.appendChild(clone);
  document.body.appendChild(offscreen);

  // Ensure all image elements within the clone are loaded
  await new Promise(res => setTimeout(res, 250));

  try {
    const canvas = await html2canvas(clone, {
      scale: 2.0,
      width: 1350,
      windowWidth: 1400,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false
    });
    return canvas;
  } finally {
    if (offscreen.parentNode) {
      document.body.removeChild(offscreen);
    }
  }
}

async function downloadProfileCardImage() {
  if (typeof showProcessingIndicator === "function") {
    showProcessingIndicator("Exporting Landscape Profile...", "Generating wide high-resolution landscape PNG...");
  }
  try {
    const canvas = await renderLandscapeProfileCardCanvas();
    if (!canvas) throw new Error("Could not find profile card element.");
    const imgData = canvas.toDataURL('image/png');
    const fileName = "ARCDESIGN_Official_Profile_Landscape.png";

    if (window.Android && Android.shareFile) {
      const base64Data = imgData.split(',')[1];
      Android.shareFile("ARCDESIGN Landscape Profile", "ArcDesign Construction Portfolio & Profile (Landscape)", base64Data, fileName, "image/png", "");
    } else {
      const a = document.createElement('a');
      a.href = imgData;
      a.download = fileName;
      a.click();
    }
  } catch (err) {
    console.error("Profile Card download error:", err);
    alert("Could not export image: " + (err.message || err));
  } finally {
    if (typeof hideProcessingIndicator === "function") {
      setTimeout(hideProcessingIndicator, 600);
    }
  }
}

async function shareProfileCardImage() {
  if (typeof showProcessingIndicator === "function") {
    showProcessingIndicator("Sharing Landscape Profile...", "Generating wide high-resolution landscape PNG...");
  }
  try {
    const canvas = await renderLandscapeProfileCardCanvas();
    if (!canvas) throw new Error("Could not find profile card element.");
    const imgData = canvas.toDataURL('image/png');
    const fileName = "ARCDESIGN_Official_Profile_Landscape.png";
    const base64Data = imgData.split(',')[1];

    if (window.Android && Android.shareFile) {
      Android.shareFile("ARCDESIGN Landscape Profile", "ArcDesign Construction Portfolio & Profile (Landscape)", base64Data, fileName, "image/png", "");
    } else if (navigator.share) {
      const blob = await (await fetch(imgData)).blob();
      const file = new File([blob], fileName, { type: 'image/png' });
      await navigator.share({
        files: [file],
        title: "ArcDesign Construction",
        text: "ArcDesign Construction - Design & Build Services, Sta. Rosa, Nueva Ecija (09164003739)"
      });
    } else {
      const a = document.createElement('a');
      a.href = imgData;
      a.download = fileName;
      a.click();
    }
  } catch (err) {
    console.error("Profile Card share error:", err);
    alert("Could not share card: " + (err.message || err));
  } finally {
    if (typeof hideProcessingIndicator === "function") {
      setTimeout(hideProcessingIndicator, 600);
    }
  }
}

window.openArcCompanyProfileCard = openArcCompanyProfileCard;
window.downloadProfileCardImage = downloadProfileCardImage;
window.shareProfileCardImage = shareProfileCardImage;

