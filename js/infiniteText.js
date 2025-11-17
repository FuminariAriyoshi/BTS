let xTo;
let total = 0;
const text = document.querySelector(".infinite");
const unitWidth = text.querySelector(".textwrapper").clientWidth;

// ラップ範囲＝ -unitWidth .. 0 で1塊ぶんを循環
const wrap = gsap.utils.wrap(-unitWidth, 0);

// const half = text.clientWidth;

// const wrap = gsap.utils.wrap(-half, 0);

xTo = gsap.quickTo(text, "x", {
  duration: 0.5, // Will transition over 0.5s
  ease: 'power3',
  modifiers: {
    x: gsap.utils.unitize(wrap),
  },
});

function tick(time, deltaTime) {
  total -= deltaTime / 10 // Adjust the speed of automatic scrolling    
  xTo(total)
}

gsap.ticker.add(tick);
