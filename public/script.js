// Selectors
const dots = document.querySelectorAll(".dot");
const sections = document.querySelectorAll("section, .about");
const toggleBtn = document.getElementById('theme-toggle');
const iconSpan = document.getElementById('theme-icon');
const body = document.body;
const cursor = document.querySelector('.custom-cursor');

const moonSVG = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
    d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
</svg>
`;

const sunSVG = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
    d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M6.05 6.05L4.636 4.636M18.364 5.636l-1.414 1.414M6.05 17.95l-1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z" />
</svg>
`;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark-theme' || savedTheme === 'light-theme') {
  body.classList.add(savedTheme);
  iconSpan.innerHTML = savedTheme === 'dark-theme' ? moonSVG : sunSVG;
} else {
  body.classList.add('dark-theme');
  iconSpan.innerHTML = moonSVG;
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id") || "about";
      const dot = document.querySelector(`.dot[data-section="${id}"]`);
      
      if (entry.isIntersecting) {
        dots.forEach(d => d.classList.remove("active"));
        if (dot) dot.classList.add("active");
      }
    });
  },
  { 
    threshold: 0.5,
    rootMargin: "-10% 0px -10% 0px"
  }
);

sections.forEach(section => {
  if (!section.id) {
    section.id = "hero";
  }
  observer.observe(section);
});

toggleBtn.addEventListener('click', () => {
  const isDark = body.classList.contains('dark-theme');

  body.classList.toggle('dark-theme', !isDark);
  body.classList.toggle('light-theme', isDark);

  iconSpan.innerHTML = isDark ? sunSVG : moonSVG;

  localStorage.setItem('theme', !isDark ? 'dark-theme' : 'light-theme');
});

if (cursor) {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    cursor.style.display = 'none';
  } else {
    window.addEventListener('mousemove', e => {
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
    });
  }
}

let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateTimelineScroll();
      ticking = false;
    });
    ticking = true;
  }
});

function initTypingEffect() {
  const demoElement = document.getElementById('demo');
  if (demoElement) {
      const texts = ["veloper", "signer"];
      let textIndex = 0;
      let charIndex = 0;

      function typeText() {
          if (charIndex < texts[textIndex].length) {
              demoElement.innerHTML += texts[textIndex].charAt(charIndex);
              charIndex++;
              setTimeout(typeText, 150);
          } else {
              setTimeout(eraseText, 2000);
          }
      }

      function eraseText() {
          if (charIndex > 0) {
              demoElement.innerHTML = texts[textIndex].substring(0, charIndex - 1);
              charIndex--;
              setTimeout(eraseText, 50);
          } else {
              textIndex = (textIndex + 1) % texts.length;
              setTimeout(typeText, 500);
          }
      }

      typeText();
  }
}

function updateTimelineScroll() {
  const timeline = document.querySelector('.timeline');
  const timelineLine = document.querySelector('.timeline-line');
  const timelineDots = document.querySelectorAll('.timeline-dot');

  if (!timeline || !timelineLine || !timelineDots.length) return;

  const viewportHeight = window.innerHeight;
  const scrollY = window.scrollY;

  const timelineRect = timeline.getBoundingClientRect();
  const timelineTop = scrollY + timelineRect.top;
  const timelineHeight = timeline.offsetHeight;
  const timelineBottom = timelineTop + timelineHeight;

  const visibleTop = Math.max(scrollY, timelineTop);
  const visibleBottom = Math.min(scrollY + viewportHeight - 100, timelineBottom);
  const visibleHeight = Math.max(0, visibleBottom - timelineTop);

  timelineLine.style.background = `linear-gradient(to bottom, var(--primary-color) ${visibleHeight}px, var(--text-muted) ${visibleHeight}px)`;

  const scrollTriggerY = scrollY + viewportHeight - 100;

  timelineDots.forEach(dot => {
    const dotTop = dot.getBoundingClientRect().top + scrollY;
    const timelineItem = dot.closest('.timeline-item');

    if (scrollTriggerY >= dotTop) {
      dot.classList.add('active');
      if (timelineItem) timelineItem.classList.add('active');
    } else {
      dot.classList.remove('active');
      if (timelineItem) timelineItem.classList.remove('active');
    }
  });
}

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const skills = entry.target.querySelectorAll('.skill');
    if (entry.isIntersecting) {
      skills.forEach(skill => {
        skill.classList.add('animate');
      });
    }
  });
}, {
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.skills-list').forEach(skillsList => {
  skillsObserver.observe(skillsList);
});

const imgCursor = document.querySelector('.image-hover-cursor');
const imageElements = document.querySelectorAll('.gallery-scroll img');
const mainCursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
    if (imgCursor.style.display === 'block') {
        imgCursor.style.left = e.clientX + 'px';
        imgCursor.style.top = e.clientY + 'px';
    }
});

imageElements.forEach(img => {
    img.addEventListener('mouseenter', () => {
        imgCursor.style.display = 'block';
        mainCursor.style.display = 'none';
    });
    
    img.addEventListener('mouseleave', () => {
        imgCursor.style.display = 'none';
        mainCursor.style.display = 'block';
    });
});

const projectCursor = document.querySelector('.project-hover-cursor');
const projectCards = document.querySelectorAll('.project-card');

document.addEventListener('mousemove', (e) => {
  mainCursor.style.left = e.clientX + 'px';
  mainCursor.style.top = e.clientY + 'px';
  projectCursor.style.left = e.clientX + 'px';
  projectCursor.style.top = e.clientY + 'px';
});

projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    mainCursor.style.display = 'none';
    projectCursor.style.display = 'block';
  });
  
  card.addEventListener('mouseleave', () => {
    mainCursor.style.display = 'block';
    projectCursor.style.display = 'none';
  });
});

if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  mainCursor.style.display = 'none';
  projectCursor.style.display = 'none';
}

const projectcard = document.getElementById("projectcard");
const section = document.getElementById("projects");
const observer1 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        projectcard.classList.add("show");
      } else {
        projectcard.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.3,
  }
);

const projectcardright = document.getElementById("projectcardright");
const section1 = document.getElementById("project-a");
const observer2 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        projectcardright.classList.add("show");
      } else {
        projectcardright.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.3,
  }
);

observer1.observe(section);
observer2.observe(section1);

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
});
