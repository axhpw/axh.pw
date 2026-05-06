async function loadProfile() {
  console.log("fetching profile...");
  const res = await fetch("/api/profile");
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

window.addEventListener("DOMContentLoaded", () => {
  loadProfile().then(renderProfile);
});
