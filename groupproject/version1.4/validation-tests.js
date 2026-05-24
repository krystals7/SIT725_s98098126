/**
 * SIT725 Validation Tests
 */

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const API_BASE = "/api/haircuts";

// =============================
// INTERNAL STATE
// =============================
const results = [];

const coverageTracker = {
  CREATE_FAIL: 0, UPDATE_FAIL: 0, TYPE: 0, REQUIRED: 0,
  BOUNDARY: 0, LENGTH: 0, TEMPORAL: 0, UNKNOWN_CREATE: 0,
  UNKNOWN_UPDATE: 0, IMMUTABLE: 0,
};

// =============================
// OUTPUT FUNCTIONS
// =============================
function logHeader(uniqueId) {
  console.log("SIT725_VALIDATION_TESTS");
  console.log(`BASE_URL=${BASE_URL}`);
  console.log(`API_BASE=${API_BASE}`);
  console.log(`INFO|Generated uniqueId=${uniqueId}`);
}

function logResult(r) {
  console.log(`TEST|${r.id}|${r.name}|${r.method}|${r.path}|expected=${r.expected}|actual=${r.actual}|pass=${r.pass ? "Y" : "N"}`);
}

function logSummary() {
  const failed = results.filter(r => !r.pass).length;
  console.log(`SUMMARY|pass=${failed === 0 ? "Y" : "N"}|failed=${failed}|total=${results.length}`);
  return failed === 0;
}

function logCoverage() {
  console.log(
    `COVERAGE|CREATE_FAIL=${coverageTracker.CREATE_FAIL}|UPDATE_FAIL=${coverageTracker.UPDATE_FAIL}|` +
    `TYPE=${coverageTracker.TYPE}|REQUIRED=${coverageTracker.REQUIRED}|BOUNDARY=${coverageTracker.BOUNDARY}|` +
    `LENGTH=${coverageTracker.LENGTH}|TEMPORAL=${coverageTracker.TEMPORAL}|UNKNOWN_CREATE=${coverageTracker.UNKNOWN_CREATE}|` +
    `UNKNOWN_UPDATE=${coverageTracker.UNKNOWN_UPDATE}|IMMUTABLE=${coverageTracker.IMMUTABLE}`
  );
}

// =============================
// HTTP HELPER
// =============================
async function http(method, path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: res.status };
}

// =============================
// TEST FUNCTION
// =============================
async function test({ id, name, method, path, expected, body, tags = [] }) {
  const res = await http(method, path, body);
  const actual = res.status;
  const pass = actual === expected;

  const result = { id, name, method, path, expected, actual, pass };
  results.push(result);
  logResult(result);

  tags.forEach(tag => {
    if (coverageTracker.hasOwnProperty(tag)) coverageTracker[tag]++;
  });
}

// =============================
// MAIN RUN
// =============================
async function run() {
  const uniqueId = `b${Date.now()}`;
  logHeader(uniqueId);

  const createPath = API_BASE;

  await test({ id: "T01", name: "Missing required field - price", method: "POST", path: createPath, expected: 400, 
    body: { ...makeValidHaircut(`b${Date.now()+1}`), price: undefined }, tags: ["REQUIRED", "CREATE_FAIL"] });

  await test({ id: "T02", name: "Wrong type - price as string", method: "POST", path: createPath, expected: 400, 
    body: { ...makeValidHaircut(`b${Date.now()+2}`), price: "29.99" }, tags: ["TYPE", "CREATE_FAIL"] });

  await test({ id: "T03", name: "Boundary - negative price", method: "POST", path: createPath, expected: 400, 
    body: { ...makeValidHaircut(`b${Date.now()+3}`), price: -10.50 }, tags: ["BOUNDARY", "CREATE_FAIL"] });

  await test({ id: "T04", name: "Length test - very long title", method: "POST", path: createPath, expected: 400, 
    body: { ...makeValidHaircut(`b${Date.now()+4}`), title: "A".repeat(500) }, tags: ["LENGTH", "CREATE_FAIL"] });

  const pass = logSummary();
  logCoverage();

  // Clean exit to avoid Windows assertion error
  setTimeout(() => process.exit(pass ? 0 : 1), 500);
}

function makeValidHaircut(id) {
  return {
    id: id,
    title: "Men's Haircut",
    price: 35.00,
    duration: 30,
    description: "Classic men's haircut"
  };
}

run().catch(err => {
  console.error("ERROR:", err);
  process.exit(2);
});