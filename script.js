const display = document.getElementsByClassName("display")[0];
const start = document.getElementsByClassName("start")[0];
const stop = document.getElementsByClassName("stop")[0];
const reset = document.getElementsByClassName("reset")[0];
const lap = document.getElementsByClassName("lap")[0];
const clear = document.getElementsByClassName("clear")[0];
const lapList = document.getElementsByClassName("laps")[0];
const empty = document.getElementsByClassName("empty-state")[0];

let timer = 0,
  laptime = 0,
  interval = null;

const formatTime = (ms) => {
  const h = String(Math.floor(ms / 3600000)).padStart(2, "0");
  const m = String(Math.floor((ms % 3600000) / 60000)).padStart(2, "0");
  const s = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
  const cs = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
  return `${h}:${m}:${s}.${cs}`;
};

const updateDisplay = () => {
  laptime = Date.now() - timer;
  display.innerHTML = formatTime(laptime);
};

start.addEventListener("click", () => {
  if (interval === null) {
    timer = Date.now() - laptime;
    interval = setInterval(updateDisplay, 10);
  }
});

stop.addEventListener("click", () => {
  clearInterval(interval);
  interval = null;
});

reset.addEventListener("click", () => {
     clearInterval(interval);
     interval = null;
     laptime = 0;
     display.innerHTML = formatTime(laptime);
});


// For lapping on the stopwatch
let laplist = [];

lap.addEventListener("click", () => {
     if(laplist.length === 0) {
          lapList.classList.remove("hidden");
          empty.classList.add("hidden");
     }
     laplist.push(laptime);
     const li = document.createElement("li");
     li.innerHTML = `<span><b>${laplist.length}</b> -  ${formatTime(laptime)}</span><button class="del">Delete</button>`;
     lapList.appendChild(li);
});

// For clearing the laps
clear.addEventListener("click", () => {
     laplist = [];
     lapList.innerHTML = "";
     lapList.classList.add("hidden");
     empty.classList.remove("hidden");
});

// For deleting a lap
lapList.addEventListener("click", (e) => {
     if (e.target.classList.contains("del")) {
          if(laplist.length === 1) {
               lapList.classList.add("hidden");
               empty.classList.remove("hidden");
          }
          const index = Array.from(e.target.parentNode.parentNode.children).indexOf(e.target.parentNode);
          laplist.splice(index, 1);
          e.target.parentNode.remove();
          lapList.innerHTML = "";
          laplist.forEach((lap, i) => {
               const li = document.createElement("li");
               li.innerHTML = `<span><b>${i + 1}</b> -  ${formatTime(lap)}</span><button class="del">Delete</button>`;
               lapList.appendChild(li);
          });
     }
});
 