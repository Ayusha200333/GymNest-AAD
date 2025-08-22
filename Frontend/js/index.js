// // Navbar color change on scroll + active link highlight
// const nav = document.getElementById('mainNav');
// const backToTop = document.getElementById('backToTop');
// const navLinks = document.querySelectorAll('#navbarNav .nav-link');
//
// function onScroll() {
//   const scrolled = window.scrollY > 80;
//   nav.classList.toggle('scrolled', scrolled);
//   backToTop.style.display = window.scrollY > 200 ? 'inline-grid' : 'none';
//
//   // Active nav link update (basic section spy)
//   const sections = [...document.querySelectorAll('section[id]')];
//   const y = window.scrollY + 120; // offset for fixed nav
//   let current = sections.findLast(s => s.offsetTop <= y);
//   if (current) {
//     navLinks.forEach(l => l.classList.remove('active'));
//     const active = document.querySelector(`#navbarNav .nav-link[href="#${current.id}"]`);
//     if (active) active.classList.add('active');
//   }
// }
// window.addEventListener('scroll', onScroll);
// onScroll();
//
// // Smooth scroll for internal links
// document.querySelectorAll('a[href^="#"]').forEach(a => {
//   a.addEventListener('click', e => {
//     const target = document.querySelector(a.getAttribute('href'));
//     if (target) {
//       e.preventDefault();
//       const y = target.getBoundingClientRect().top + window.pageYOffset - 80;
//       window.scrollTo({ top: y, behavior: 'smooth' });
//       // collapse navbar on mobile
//       const navCollapse = document.getElementById('navbarNav');
//       if (navCollapse.classList.contains('show')) {
//         const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navCollapse);
//         bsCollapse.hide();
//       }
//     }
//   });
// });
//
// // Back to top
// backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));



'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = function () { navbar.classList.toggle("active"); }

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () { navbar.classList.remove("active"); }

addEventOnElem(navLinks, "click", closeNavbar);



/**
 * header & back top btn active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

