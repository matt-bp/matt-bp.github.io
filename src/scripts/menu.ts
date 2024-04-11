// @ts-ignore
document.querySelector('.xmark-icon')?.classList.add("hidden");

document.querySelector('.hamburger')?.addEventListener('click', () => {
  document.querySelector('.nav-links')?.classList.toggle('expanded')
  document.querySelector('.xmark-icon')?.classList.toggle("hidden");
  document.querySelector('.menu-icon')?.classList.toggle("hidden");
})

console.log('Hello world!')
