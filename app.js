
document.addEventListener("DOMContentLoaded", () => {

  const avatar = document.getElementById("avatar");
  const startScreen = document.getElementById("startScreen");
  const startBtn = document.getElementById("startBtn");

  const mainButtons = document.getElementById("mainButtons");
  const tierButtons = document.getElementById("tierButtons");
  const hearAnotherBtn = document.getElementById("hearAnotherBtn");
  const doneBtn = document.getElementById("doneBtn");

  let currentMain = "";
  let currentTier = 1;

  // ----- Random phrases -----
  const phrases = {
    outside: {
      1: [
        "It’s perfectly okay to stay inside for now. You’re being thoughtful and careful, and that’s a good start.",
        "Just noticing your thoughts and feelings is already a brave step — no need to rush.",
        "Take your time. Being aware of your comfort zone is progress in itself.",
        "You’re safe where you are, and that’s enough for today. I’m right here with you.",
        "Even staying in and taking a few deep breaths counts as moving forward — you’re doing well."
      ],
      2: [
        "Maybe open the door just a little and notice the fresh air. No pressure to move further — every small action counts.",
        "Putting on your shoes or standing by the doorway is already a meaningful step forward.",
        "You might try stepping outside for just a few moments. Remember, you are in control of the pace.",
        "Even preparing to go out — like checking your coat or bag — is progress. Celebrate it quietly.",
        "Notice the light, the air, or the sounds around you — even small observations are victories."
      ],
      3: [
        "Taking even ten seconds outside is a win. You’re showing courage, and that matters.",
        "Feel your feet on the ground and notice the world around you. You’re doing wonderfully.",
        "Remember, it’s okay to turn back at any moment. The effort itself is what counts.",
        "The sensation of stepping outside will come and go, but your bravery remains steady.",
        "Every small step forward is a success — take it slowly and know that I’m proud of you."
      ]
    },
    clinic: {
      1: [
        "It’s okay to wait and plan first. Taking time is a brave choice.",
        "Just thinking about going already shows courage. You don’t need to do more right now.",
        "You’re safe at home, and that’s enough for today. I’m here with you.",
        "No pressure to go today — acknowledging your feelings counts as progress.",
        "Even preparing mentally by imagining the visit is a step forward."
      ],
      2: [
        "Maybe write down the questions or notes for your visit — preparation is progress.",
        "Checking the schedule or planning your route is already a meaningful step.",
        "You might call the clinic just to clarify, no need to go yet.",
        "Packing your bag or organizing what you need counts as moving forward.",
        "Even visualizing yourself arriving safely is a small victory."
      ],
      3: [
        "Even a short visit is an achievement — celebrate each moment outside your comfort zone.",
        "Take one step at a time — walking in, checking in, breathing — you are capable.",
        "Remember, it’s okay to pause or step back if things feel overwhelming.",
        "Each moment you face this fear builds strength — you are doing wonderfully.",
        "Focus on one small action at a time, and notice the courage in every step you take."
      ]
    },
    social: {
      1: [
        "It’s perfectly fine to stay home today. Your feelings are important, and you’re being thoughtful.",
        "Even noticing your anxiety is a brave first step — no need to force yourself.",
        "You can take time to observe from a distance; just being aware counts as progress.",
        "You’re safe where you are, and that’s enough for today. I’m here with you.",
        "Even taking a few deep breaths and checking in with yourself is a small success."
      ],
      2: [
        "Maybe start by sending a message or RSVP first — small actions count.",
        "Arriving a few minutes late can ease you in gently.",
        "Choosing a quiet corner or familiar spot helps you feel more comfortable.",
        "Bringing a trusted friend for support is a meaningful step forward.",
        "Noticing the environment and how it feels around you is already progress."
      ],
      3: [
        "Even spending five minutes is a success — every moment counts.",
        "Focus on your breath and surroundings — you’re handling this wonderfully.",
        "It’s okay to leave or take a break if it becomes overwhelming — effort matters, not perfection.",
        "Every interaction, no matter how small, is a step forward. You’re doing great.",
        "Notice your courage in each step — even trying is an achievement in itself."
      ]
    }
  };

  const welcomePhrase = "Hey, it’s really good to have you here. No pressure at all — just breathe, and know that I’m here to support you every step of the way.";

  // ----- TTS function (works for browser & MIT App Inventor) -----
  function speak(text, callback) {
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(text);
      avatar.src = "talking.gif";
      utter.onend = () => {
        avatar.src = "idle.gif";
        if (callback) callback();
      };
      window.speechSynthesis.speak(utter);
    } else if (window.AppInventor) {
      avatar.src = "talking.gif";
      window.AppInventor.setWebViewString(text);
      // Callback will be triggered by App Inventor GotWebViewString event
      window.speechFinishedCallback = callback;
    } else {
      console.log("TTS:", text);
      avatar.src = "idle.gif";
      if (callback) callback();
    }
  }

  // ----- START BUTTON -----
  startBtn.addEventListener("click", () => {
    startScreen.style.display = "none";
    avatar.src = "waving.gif";
    avatar.style.display = "inline-block";

    speak(welcomePhrase, () => {
      avatar.src = "idle.gif";
      mainButtons.style.display = "block";
    });
  });

  // ----- MAIN BUTTONS -----
  mainButtons.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      currentMain = btn.dataset.type;
      tierButtons.style.display = "block";
      mainButtons.querySelectorAll("button").forEach(b => {
        if (b !== btn) b.style.display = "none";
      });
      hearAnotherBtn.style.display = "none";
      doneBtn.style.display = "none";
    });
  });

  // ----- TIER BUTTONS -----
  tierButtons.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      currentTier = btn.dataset.tier;
      const list = phrases[currentMain][currentTier];
      const text = list[Math.floor(Math.random() * list.length)];

      speak(text, () => {
        hearAnotherBtn.style.display = "inline-block";
        doneBtn.style.display = "inline-block";
      });
    });
  });

  // ----- HEAR ANOTHER -----
  hearAnotherBtn.addEventListener("click", () => {
    const list = phrases[currentMain][currentTier];
    const text = list[Math.floor(Math.random() * list.length)];

    speak(text);
  });

  // ----- DONE -----
  doneBtn.addEventListener("click", () => {
    tierButtons.style.display = "none";
    hearAnotherBtn.style.display = "none";
    doneBtn.style.display = "none";
    mainButtons.querySelectorAll("button").forEach(b => b.style.display = "inline-block");
  });

  // ----- MIT App Inventor Callback -----
  if (window.AppInventor) {
    window.WebViewer1GotWebViewString = function() {
      // TTS finished
      if (window.speechFinishedCallback) window.speechFinishedCallback();
    };
  }

});
