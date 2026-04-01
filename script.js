/*
  FILE PURPOSE
  This script powers the Single Analytics page.

  QUICK DEFINITIONS
  - DOM: The page structure that JavaScript can read/change.
  - API: A server endpoint that returns data (here, LeetCode stats).
  - async/await: Syntax to wait for network results without freezing UI.
  - Promise.all: Runs multiple async tasks in parallel.
  - Event listener: Runs a function when a user action happens (like click).
*/

// 1) Grab required DOM elements once and reuse them.
const searchBtn = document.getElementById('search-btn');
const usernameInput = document.getElementById('username');
const loader = document.getElementById('loader');
const errorMsg = document.getElementById('error-msg');
const statsCard = document.getElementById('stats-card');

// 2) Fetch and merge data from two APIs for one user.
async function fetchFullStats(user) {
    try {
        const [solvedRes, skillRes] = await Promise.all([
            fetch(`https://alfa-leetcode-api.onrender.com/${user}/solved`),
            fetch(`https://alfa-leetcode-api.onrender.com/skillStats/${user}`)
        ]);

        // If either request fails (non-2xx), treat it as a failed lookup.
        if (!solvedRes.ok || !skillRes.ok) return null;

        // Convert JSON responses to JavaScript objects.
        const solvedData = await solvedRes.json();
        const skillData = await skillRes.json();

        // Spread operator (...) copies solved fields; skills is added as nested object.
        return { ...solvedData, skills: skillData };
    } catch (err) {
        // Network/runtime errors also return null so UI can show a friendly message.
        return null;
    }
}

// 3) Render fetched data into the page.
function updateSingleUI(data, user) {
    statsCard.classList.remove('hidden');

    document.getElementById('display-name').innerText = user;
    document.getElementById('total-solved').innerText = data.solvedProblem;
    document.getElementById('easy-count').innerText = `E: ${data.easySolved}`;
    document.getElementById('medium-count').innerText = `M: ${data.mediumSolved}`;
    document.getElementById('hard-count').innerText = `H: ${data.hardSolved}`;

    // Clear old topics, then insert fresh topic items.
    const list = document.getElementById('topics-list');
    list.innerHTML = "";

    // Read intermediate topics and display top 5.
    const tags = data.skills.data.matchedUser.tagProblemCounts.intermediate;
    tags.slice(0, 5).forEach((tag) => {
        const li = document.createElement('li');
        li.innerText = tag.tagName;
        list.appendChild(li);
    });
}

// 4) Main workflow: validate input -> fetch -> update UI.
async function handleSearch() {
    const user = usernameInput.value.trim();
    if (!user) return alert('Please enter a username!');

    // Reset state before new request.
    statsCard.classList.add('hidden');
    errorMsg.classList.add('hidden');
    loader.classList.remove('hidden');

    const data = await fetchFullStats(user);

    loader.classList.add('hidden');

    if (data) {
        updateSingleUI(data, user);
    } else {
        errorMsg.classList.remove('hidden');
    }
}

// 5) Connect button click to the main workflow function.
searchBtn.addEventListener('click', handleSearch);
