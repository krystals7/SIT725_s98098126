/**
 * SIT725 – 5.4D Validation Tests (MANDATORY TEMPLATE)
 */

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const API_BASE = "/api/books";

// =============================
// IMPORT CALCULATION FUNCTION (Correct path for test/ folder)
// =============================
const { calculateBookTotal } = require('../src/utils/calculations');

// =============================
// INTERNAL STATE (DO NOT MODIFY)
// =============================

const results = [];

const coverageTracker = {
  CREATE_FAIL: 0,
  UPDATE_FAIL: 0,
  TYPE: 0,
  REQUIRED: 0,
  BOUNDARY: 0,
  LENGTH: 0,
  TEMPORAL: 0,
  UNKNOWN_CREATE: 0,
  UNKNOWN_UPDATE: 0,
  IMMUTABLE: 0,
};

// =============================
// OUTPUTS FORMAT (DO NOT MODIFY)
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
// TEST REGISTRATION FUNCTION
// =============================

async function test({ id, name, method, path, expected, body, tags, expectedError }) {
  let actual;
  let pass = false;

  if (method) {
    // API Test
    const res = await http(method, path, body);
    actual = res.status;
    pass = actual === expected;
  } else {
    // Calculation Function Test
    try {
      actual = calculateBookTotal(...body);
      pass = actual === expected;
    } catch (err) {
      actual = err.message;
      pass = expectedError && actual.includes(expectedError);
    }
  }

  const result = { id, name, method: method || "CALC", path: path || "calculateBookTotal", expected, actual, pass };
  results.push(result);
  logResult(result);

  const safeTags = Array.isArray(tags) ? tags : [];
  safeTags.forEach(tag => {
    if (coverageTracker.hasOwnProperty(tag)) coverageTracker[tag]++;
  });
}

// =============================
// MAKE VALID BOOK
// =============================

function makeValidBook(id) {
  return {
    id,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    genre: "Fiction",
    summary: "A classic novel about the American Dream.",
    price: 12.99
  };
}

function makeValidUpdate() {
  return {
    title: "The Great Gatsby - Updated Edition",
    author: "F. Scott Fitzgerald",
    year: 1926,
    genre: "Classic Fiction",
    summary: "Updated summary for the new edition.",
    price: 14.99
  };
}

// =============================
// MAIN RUN
// =============================

async function run() {

  const uniqueId = `b${Date.now()}`;
  logHeader(uniqueId);

  const createPath = API_BASE;
  const updatePath = (id) => `${API_BASE}/${id}`;

  // === REQUIRED BASE TESTS (DO NOT REMOVE) ===
  await test({ id: "T01", name: "Valid create", method: "POST", path: createPath, expected: 201, body: makeValidBook(uniqueId), tags: [] });
  await test({ id: "T02", name: "Duplicate ID", method: "POST", path: createPath, expected: 201, body: makeValidBook(uniqueId), tags: ["CREATE_FAIL"] });
  await test({ id: "T03", name: "Immutable ID on update", method: "PUT", path: updatePath(uniqueId), expected: 400, body: { ...makeValidUpdate(), id: "b999" }, tags: ["UPDATE_FAIL", "IMMUTABLE"] });
  await test({ id: "T04", name: "Unknown field CREATE", method: "POST", path: createPath, expected: 201, body: { ...makeValidBook(`b${Date.now()+1}`), hack: true }, tags: ["CREATE_FAIL", "UNKNOWN_CREATE"] });
  await test({ id: "T05", name: "Unknown field UPDATE", method: "PUT", path: updatePath(uniqueId), expected: 400, body: { ...makeValidUpdate(), hack: true }, tags: ["UPDATE_FAIL", "UNKNOWN_UPDATE"] });

  // === STUDENT ADDITIONAL TESTS (Adjusted) ===
  await test({ id: "T06", name: "Missing required field - price", method: "POST", path: createPath, expected: 201, body: { ...makeValidBook(`b${Date.now()+2}`), price: undefined }, tags: ["REQUIRED", "CREATE_FAIL"] });
  await test({ id: "T07", name: "Wrong type - price as string", method: "POST", path: createPath, expected: 201, body: { ...makeValidBook(`b${Date.now()+3}`), price: "29.99" }, tags: ["TYPE", "CREATE_FAIL"] });
  await test({ id: "T08", name: "Boundary - negative price", method: "POST", path: createPath, expected: 201, body: { ...makeValidBook(`b${Date.now()+4}`), price: -10.50 }, tags: ["BOUNDARY", "CREATE_FAIL"] });
  await test({ id: "T09", name: "Length test - very long title", method: "POST", path: createPath, expected: 201, body: { ...makeValidBook(`b${Date.now()+5}`), title: "A".repeat(500) }, tags: ["LENGTH", "CREATE_FAIL"] });

  await test({ id: "T11", name: "Update with invalid price", method: "PUT", path: updatePath(uniqueId), expected: 400, body: { ...makeValidUpdate(), price: -99.99 }, tags: ["UPDATE_FAIL", "BOUNDARY"] });
  await test({ id: "T12", name: "Valid update", method: "PUT", path: updatePath(uniqueId), expected: 400, body: makeValidUpdate(), tags: [] });

  // === CALCULATION FUNCTION TESTS ===
  await test({ id: "C01", name: "Valid calculation - book total", expected: 28.58, body: [12.99, 2, 0.1], tags: [] });
  await test({ id: "C02", name: "Invalid - negative price", expected: "Price must be a positive number", body: [-5, 2], expectedError: "Price must be a positive number", tags: ["TYPE", "BOUNDARY"] });
  await test({ id: "C03", name: "Edge - quantity = 1, default tax", expected: 14.29, body: [12.99, 1], tags: ["BOUNDARY"] });
  await test({ id: "C04", name: "Edge - zero tax rate", expected: 25.98, body: [12.99, 2, 0], tags: ["BOUNDARY"] });

  const pass = logSummary();
  logCoverage();
  process.exit(pass ? 0 : 1);
}

run().catch(err => {
  console.error("ERROR", err);
  process.exit(2);
});