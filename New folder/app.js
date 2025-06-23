let storyId = "";
function startStory(id) {
  storyId = id;
  document.getElementById("app").innerHTML = "<p>Loading...</p>";
  sendChoice("");
}

async function sendChoice(choice) {
  const res = await fetch("https://f558c3ca-3754-4fe8-8d9d-7e9b80b44765-00-6vb9q4wju81e.spock.replit.dev/story", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ choice })
  });
  const data = await res.json();
  displayStory(data);
}

function displayStory({ story, options, audioUrl }) {
  const app = document.getElementById("app");
  app.innerHTML = `<p>${story.replace(/\n/g, "<br>")}</p>`;
  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => sendChoice(opt);
    app.appendChild(btn);
  });
  const audio = new Audio(audioUrl);
  audio.play();
}
