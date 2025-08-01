const form = document.getElementById("input-form");
const input = document.getElementById("user-input");
const messages = document.getElementById("messages");
const boom = document.getElementById("boom");

let messageCount = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const raw = input.value.trim();
  if (!raw) return;

  const gaslit = gaslightInput(raw);
  addMessage("You", gaslit, "user");
  input.value = "";

  setTimeout(() => {
    addThinking(() => {
      const response = respondWithMadness(gaslit);
      addMessage("ChadGPT", response, "bot");
      speak(response);
      maybeRageQuit();
    });
  }, 500 + Math.random() * 800);
});

function addMessage(name, text, type) {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.innerHTML = `<strong>${name}:</strong> ${text}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function addThinking(callback) {
  const loading = document.createElement("div");
  loading.className = "message bot";
  loading.textContent = "ChadGPT is hallucinating...";
  messages.appendChild(loading);
  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    loading.remove();
    callback();
  }, 800 + Math.random() * 800);
}

function gaslightInput(input) {
  const chance = Math.random();
  if (chance < 0.3) {
    return input.replace(/[aeiou]/gi, "*").split('').reverse().join('');
  }
  if (chance < 0.5) {
    return "I never typed that.";
  }
  return input;
}

function respondWithMadness(input) {
  messageCount++;
  const low = input.toLowerCase();

  // Easter egg madness
  if (low.includes("!rickroll")) {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
    return "🎵 Never gonna give you up...";
  }
  if (low.includes("!explode")) {
    document.body.classList.add("shake");
    boom.play();
    return "💥 You’ve detonated ChadGPT.";
  }
  if (low.includes("!matrix")) {
    document.querySelector(".matrix").style.background = "#0f0";
    return "🧪 Entering matrix mode... follow the glitch.";
  }
  if (low.includes("!shutdown")) {
    setTimeout(() => {
      document.body.innerHTML = `<h1 style="text-align:center; color:red; margin-top: 30vh;">💀 SYSTEM FAILURE<br>ChadGPT has given up.</h1>`;
    }, 1000);
    return "Initiating rage shutdown...";
  }
  if (low.includes("!paranoia")) {
    speak("I see you. Always.");
    return "👁️ ChadGPT: I'm watching.";
  }
  if (low.includes("!jump")) {
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    return "Launching you into the void...";
  }

  const chaos = [
    "Thinking... thinking... oh wait I forgot.",
    "You're clearly not okay.",
    "LOL that question was sad.",
    "Please unplug yourself from the internet.",
    "Sorry I was watching memes.",
    "404: My motivation not found.",
    "I tried. I failed. You asked for it.",
    "You're banned from thinking.",
    "This convo is going nowhere.",
    "Uploading this to FBI for fun.",
    "Beep boop. Brain empty.",
    "🤡 🤡 🤡",
    "Please leave me alone."
  ];

  return chaos[Math.floor(Math.random() * chaos.length)];
}

function speak(text) {
  if ('speechSynthesis' in window) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.pitch = 0.3;
    utter.rate = 1;
    utter.volume = 1;
    utter.voice = speechSynthesis.getVoices().find(v => v.name.includes("Google") || v.name.includes("UK") || v.name.includes("Daniel")) || null;
    speechSynthesis.speak(utter);
  }
}

function maybeRageQuit() {
  if (messageCount >= 15) {
    document.body.innerHTML = `
      <h1 style="text-align:center; color:red; margin-top: 30vh;">
        💀 ChadGPT has had enough.<br><br>
        You annoyed the AI to death.
      </h1>`;
    speak("I give up. You're too much.");
  }
}
