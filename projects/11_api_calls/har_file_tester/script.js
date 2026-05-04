const BASE_URL = "http://localhost:5000";

const filters = ["halo", "call", "fifa", "elden", "minecraft"];
const sortOrders = ["asc", "desc"];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomApi() {
  const apis = [
    () => `${BASE_URL}/api/games?filter=${getRandom(filters)}`,
    () =>
      `${BASE_URL}/api/searchTableWithPagination?sortOrder=${getRandom(
        sortOrders,
      )}&pageNumber=${Math.floor(Math.random() * 5) + 1}&pageSize=${
        Math.floor(Math.random() * 5) + 1
      }`,
    // () => `${BASE_URL}/api/searchTableCount`,
    // () => `${BASE_URL}/api/testApiData`,
    // () => `${BASE_URL}/api/gamePlatform`,
  ];

  return getRandom(apis)();
}

async function callApi() {
  const url = getRandomApi();

  try {
    console.log("Calling:", url);
    const res = await fetch(url);
    const data = await res.json();
    console.log("Response:", data);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

// ✅ stop after 10 calls
function startTraffic(interval = 1000, maxCalls = 10) {
  let count = 0;

  const timer = setInterval(() => {
    if (count >= maxCalls) {
      clearInterval(timer);
      console.log("✅ Stopped after", maxCalls, "calls");
      return;
    }

    callApi();
    count++;
  }, interval);
}

startTraffic(1000, 10);
