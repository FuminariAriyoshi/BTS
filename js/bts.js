const hero = document.querySelectorAll(".hero"),
  heroimage = document.querySelectorAll(".image");

let isShrunk = false;
// === scroll変化 ===
let smoother = ScrollSmoother.create({
  smooth: 1.5,
  effects: true,
  normalizeScroll: true
});

//=== disable system ===
const preventScroll = (e) => e.preventDefault();
const passiveFalse = { passive: false }

function disableScroll() {
  // wheel & touchmove イベントを抑制
  window.addEventListener("wheel", preventScroll, passiveFalse);
  window.addEventListener("touchmove", preventScroll, passiveFalse);
}

function enableScroll() {
  // 通常スクロールに戻す
  window.removeEventListener("wheel", preventScroll, passiveFalse);
  window.removeEventListener("touchmove", preventScroll, passiveFalse);
}

// === songs ===
const songs = document.querySelectorAll(".song");

function wrapLettersInSpan(element) {
  const text = element.textContent;
  element.innerHTML = text
    .split('')
    .map(char => char === ' ' ? '<span> </span>' : `<span class="letter">${char}</span>`)
    .join('');
  return element; // ✅ これを追加！
};
songs.forEach(song => {
  wrapLettersInSpan(song)
});

const songsWords = document.querySelectorAll('.letter');

function songShow() {
  const tlShow = gsap.timeline({
    opacity: 1,
    duration: 0.125,
    ease: "expo.out"
  });

  tlShow.fromTo(songs, { opacity: 0 }, {
    opacity: 1
  });
  tlShow.fromTo(songsWords, { yPercent: 100, opacity: 0 }, {
    opacity: 1,
    yPercent: 0,
    stagger: 0.01,
  });
};

// === loading ===
window.Webflow ||= [];
window.Webflow.push(() => {
  const smoother = ScrollSmoother.get();
  if (smoother) smoother.paused(true);
  const loadingPage = document.querySelector('.loadingpage');

  if (loadingPage) {
    console.log("✅ .loadingpage found");

    gsap.to(loadingPage, {
      opacity: 0,
      duration: 3,
      ease: "power1.in",
      onComplete: () => {
        loadingPage.style.visibility = 'hidden';
        loadingPage.style.pointerEvents = 'none';
        songShow();
      }
    });
  } else {
    console.warn("⚠️ .loadingpage not found");
  }
});

// === wheel shrink && wheel expand ===
function shrink() {
  console.log(shrink);
  gsap.to(heroimage, {
    scale: 0.9,
    duration: 0.8,
    ease: "power2.inOut",
    onComplete: () => {
      isShrunk = true;
      if (smoother) smoother.paused(false);
    }
  });
  gsap.to(".title", {
    opacity: 0,
    duration: 0.8,
    ease: "power2.inOut"
  }, "<")
}

Observer.create({
  target: hero,
  type: "wheel,touch",
  onUp: () => {
    if (!isShrunk) {
      shrink();
      isShrunk = true;
    }
  },
  wheelSpeed: -1,
  preventDefault: false
});

// === 回転 ===
const herowrapper = document.querySelector(".hero_wrapper2");
const number = 3;
const half = herowrapper.getBoundingClientRect().width / number
const wrap = gsap.utils.wrap(-half, 0);
const sets = gsap.utils.toArray(".set");
console.log("sets", sets);

let xTo,
  scaleTo,
  incrTick = 0,
  interactionTimeout;

xTo = gsap.quickTo(hero, "x", {
  duration: 1, // Will vary over 1s
  ease: 'power4', // Non-linear
  modifiers: {
    x: gsap.utils.unitize(wrap)
  },
})
scaleTo = gsap.quickTo(hero, "scaleX", {
  duration: 0.6, // Will vary over 0.6s
  ease: 'power4' // Non-linear
})

function tick(time, dt) {
  if (!isShrunk) return;
  incrTick -= dt / 20 // Adjust the speed of automatic scrolling
  xTo(incrTick)
}

gsap.ticker.add(tick);

document.addEventListener("click", (e) => {
  console.log("=== CLICK DEBUG ===");
  console.log("Clicked element:", e.target);
});
// === news ===

// === aboutus ===
const aboutus = document.querySelector(".aboutus");
const paragraphs = document.querySelector(".aboutus_content");
const aboutusWrapper = document.querySelector(".aboutus_wrapper");

const tlAbout = gsap.timeline({
  scrollTrigger: {
    trigger: aboutusWrapper,
    start: "top center"
  }
});

tlAbout.fromTo(aboutus, {
  opacity: 0,
  yPercent: 100
}, {
  yPercent: 0,
  opacity: 1,
  duration: 1,
  ease: "power4.out",
});

tlAbout.fromTo(paragraphs, {
  opacity: 0,
  yPercent: 100
}, {
  yPercent: 0,
  opacity: 1,
  duration: 0.9,
  ease: "power4.out",
}, "<");

// === chronology ===
const chro = document.querySelector(".chrowrapper");

const age = document.querySelector(".age");
const content = document.querySelector(".content");

// Pin the entire .figure container

const duration = 0.5;
// === first 中央計算 ===
const first = document.getElementById("first");
const xPosFirst = first.getBoundingClientRect();
const centerFirst = xPosFirst.left + xPosFirst.width / 2;
const xCenterFirst = window.innerWidth / 2 - centerFirst;
console.log("firstCoordinate", centerFirst);
// ===line 中央計算 ===
const line = document.querySelector(".line");
const lineWrapper = document.querySelector(".linewrapper");
const xPosLine = lineWrapper.getBoundingClientRect();
const centerLine = xPosLine.left + xPosLine.width / 2;
const xCenterLine = window.innerWidth / 2 - centerLine;
// 1️⃣ Animate the #first element in
const offset = window.innerHeight * 0.8 - (age.offsetHeight + content.offsetHeight + 9);
const collection = document.querySelector(".collection-list-wrapper");
console.log("offsetHeight", collection);
const offsetNew = collection.offsetHeight - (age.offsetHeight + content.offsetHeight + 9) - 30;

gsap.set(first, { zIndex: 2 })
const sectionHeight = window.innerHeight * 0.1;

function lineAnimation() {
  function LA() {
    const currentScroll = chro.getBoundingClientRect().top;
    gsap.to(line, {
      height: 750,
      ease: "power4.out",
      scrollTrigger: {
        trigger: chro,
        start: sectionHeight + "px center",
        end: offsetNew + "px center", // どの範囲で伸ばすか
        pin: first,
        pinSpacing: false,
        scrub: true, // ✅ スクロール量に同期
        markers: true
      }
    });
  }
  gsap.fromTo(line, {
    autoAlpha: 1, // ← 初期値（属性として指定）
  }, {
    autoAlpha: 1,
    duration: duration,
    ease: "power4.out",
    onComplete: () => {
      chroArrayFun();
      LA();
    }
  })
}
lineAnimation();

const chroArray = gsap.utils.toArray(".chro");
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: chro,
    start: "top center",
    end: "+=" + offset, // enough scro.ll to show all slides
  }
});

chroArray.forEach((item, i) => {
  if (i !== 0) return;
  tl.fromTo(item, {
    opacity: 0,
    yPercent: 100
  }, {
    opacity: 1,
    yPercent: 0,
    duration: duration,
    ease: "power4.out",
  }, "<")
});

function chroArrayFun() {
  console.log("chroArray", chroArray);
  chroArray.forEach((item, i) => {
    const currentScroll = chro.getBoundingClientRect().top;
    // それ以外は ScrollTrigger で発火
    gsap.fromTo(item, { opacity: 0, yPercent: 100 },
    {
      opacity: 1,
      yPercent: 0,
      duration: duration,
      ease: "power4.out",
      scrollTrigger: {
        trigger: chro,
        start: "+=" + (i * sectionHeight) + " center",
        start: sectionHeight + "px center",
        end: "+=" + sectionHeight * 5.5,
        scrub: true
      }
    });
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: chro,
        start: "top center",
        end: "top+=" + sectionHeight + "px center",
        scrub: true, // ✅ スクロール量に同期
        // markers: true
      }
    })
    tl2.fromTo(line, { height: 0 }, {
      height: 0,
      ease: "power4.out"
    });
    tl2.fromTo(first, { opacity: 0, yPercent: 250 }, {
      opacity: 1,
      yPercent: 0,
      ease: "none"
    }, "<");
  });
}