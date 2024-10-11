document.addEventListener("mousemove", (e) => {
  Object.assign(document.documentElement, {
    style: `
    --move-x: ${(e.clientX - window.innerWidth / 2) * -0.005}deg;
		--move-y: ${(e.clientY - window.innerHeight / 2) * 0.01}deg;
		`,
  });
});

// --move-x: ${(e.clientX - window.innerWidth / 2) * -0.003}deg;
// --move-y: ${(e.clientY - window.innerHeight / 2) * 0.001}deg;
