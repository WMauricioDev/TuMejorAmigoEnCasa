fetch("../../components/omab_sidebar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("sidebar-container").innerHTML = data;

    document.getElementById("toggleBtn").addEventListener("click", () => {
      document.getElementById("sidebar").classList.toggle("collapsed");
    });
  });


