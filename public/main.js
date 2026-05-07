async function loadProfile() {
  console.log("fetching profile...");
  const res = await fetch("/api/profile");
  return res.json();
}

async function loadProjects() {
  console.log("fetching projects...");
  const res = await fetch("/api/projects");
  return res.json();
}

function renderProfile(profile) {
  document.querySelector("#name").textContent = profile.name;
  document.querySelector("#bio").textContent = profile.bio;
  document.querySelector("#avatar").src = profile.avatarUrl;

  const links = document.querySelector("#links");
  links.innerHTML = "";

  profile.links.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.url;
    a.textContent = link.label;
    a.target = "_blank";
    links.appendChild(a);
  });
}

// <div class="project-card">
//     <h3 id="projTitle"></h3>
//     <p id="projSub" class="project-subtitle"></p>
//     <p id="projDesc" class="project-description"></p>
// </div>

// document.querySelector("#projTitle").textContent = project.title;
// document.querySelector("#projSub").textContent = project.subtitle;
// document.querySelector("#projDesc").textContent = project.description;

function renderProjects(projects) {
  const projSection = document.querySelector("#projects");
  projSection.innerHTML = "";

  projects.projects.forEach((project) => {
    projSection.innerHTML += `
      <div class="project-card">
        <h3>${project.title}</h3>
        <p class="project-subtitle">${project.subtitle}</p>
        <p class="project-description">${project.description}</p>
      </div>
    `;
  });
}

window.addEventListener("DOMContentLoaded", () => {
  loadProfile().then(renderProfile);
  loadProjects().then(renderProjects);
});
