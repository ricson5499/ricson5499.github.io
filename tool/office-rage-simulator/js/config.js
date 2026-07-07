const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const officeItems = [
    "🐞 Bug", "📧 Email", "📅 Meeting", "☕ Coffee",
    "💾 Memory Leak", "🖥 Laptop", "📄 Excel",
    "🔥 Production", "💬 Slack", "📝 TODO"
];

const rageMessages = [
    "Bug Fixed!", "Meeting Cancelled!", "Inbox Zero!",
    "Production Stable!", "Deadline Escaped!",
    "Merge Conflict Solved!", "Coffee Refilled!", "Deploy Successful!"
];

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function randomColor() {
    return randomItem(["#ff5252", "#ffb300", "#42a5f5", "#66bb6a", "#ab47bc"]);
}
