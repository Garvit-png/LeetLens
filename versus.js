/*
  FILE PURPOSE
  This script powers Versus Mode (compare two users).

  QUICK DEFINITIONS
  - DOM: Web page elements JavaScript can read and modify.
  - API call: Request sent to a server to fetch data.
  - Promise.all: Run multiple async requests at the same time.
  - Conditional (if/else): Chooses which block runs based on a condition.
*/

// 1) Grab needed DOM elements.
const compareBtn = document.getElementById('compare-btn');
const user1Input = document.getElementById('user1');
const user2Input = document.getElementById('user2');
const loader = document.getElementById('loader');
const errorMsg = document.getElementById('error-msg');

const card1 = document.getElementById('stats1');
const card2 = document.getElementById('stats2');
const vsBadge = document.getElementById('vs-badge');
const resultBox = document.getElementById('comparison-result');
const winnerText = document.getElementById('winner-text');

// 2) Fetch and combine solved + skills data for one username.
async function fetchUser(user) {
    try {
        const [solvedRes, skillRes] = await Promise.all([
            fetch(`https://alfa-leetcode-api.onrender.com/${user}/solved`),
            fetch(`https://alfa-leetcode-api.onrender.com/skillStats/${user}`)
        ]);

        if (!solvedRes.ok || !skillRes.ok) return null;

        const solved = await solvedRes.json();
        const skills = await skillRes.json();
        return { ...solved, skills };
    } catch (e) {
        return null;
    }
}

// 3) Render one user's data inside card 1 or card 2.
function updateCard(num, data, user) {
    document.getElementById(`stats${num}`).classList.remove('hidden');
    document.getElementById(`u${num}-name`).innerText = user;
    document.getElementById(`u${num}-total`).innerText = data.solvedProblem;
    document.getElementById(`u${num}-easy`).innerText = `E: ${data.easySolved}`;
    document.getElementById(`u${num}-medium`).innerText = `M: ${data.mediumSolved}`;
    document.getElementById(`u${num}-hard`).innerText = `H: ${data.hardSolved}`;

    const list = document.getElementById(`u${num}-topics`);
    list.innerHTML = '';

    // Show top 3 intermediate topics for each user.
    const tags = data.skills.data.matchedUser.tagProblemCounts.intermediate;
    tags.slice(0, 3).forEach((tag) => {
        const li = document.createElement('li');
        li.innerText = tag.tagName;
        list.appendChild(li);
    });
}

// 4) Main flow: validate -> fetch both users -> render -> decide winner.
async function handleComparison() {
    const u1 = user1Input.value.trim();
    const u2 = user2Input.value.trim();

    if (!u1 || !u2) return alert('Enter BOTH usernames!');

    // Reset UI before fresh comparison.
    card1.classList.add('hidden');
    card2.classList.add('hidden');
    vsBadge.classList.add('hidden');
    resultBox.classList.add('hidden');
    errorMsg.classList.add('hidden');
    loader.classList.remove('hidden');

    const [data1, data2] = await Promise.all([fetchUser(u1), fetchUser(u2)]);

    loader.classList.add('hidden');

    if (!data1 || !data2) {
        errorMsg.innerText = 'One or both users not found!';
        errorMsg.classList.remove('hidden');
        return;
    }

    updateCard('1', data1, u1);
    updateCard('2', data2, u2);
    vsBadge.classList.remove('hidden');
    resultBox.classList.remove('hidden');

    // Winner rule: higher solvedProblem wins; equal means draw.
    if (data1.solvedProblem > data2.solvedProblem) {
        winnerText.innerText = `${u1} is the winner! 🏆`;
    } else if (data2.solvedProblem > data1.solvedProblem) {
        winnerText.innerText = `${u2} is the winner! 🏆`;
    } else {
        winnerText.innerText = "It's a draw! 🤝";
    }
}

// 5) Start comparison when user clicks the button.
compareBtn.addEventListener('click', handleComparison);
