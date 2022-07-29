const goTo = (pageId) => {
  const list = document.querySelectorAll(".page:not(.hidden)");
  for (let i = 0; i < list.length; ++i) {
    list[i].classList.add("hidden");
  }
  setTimeout(() => {
    document.querySelector(`#${pageId}`).classList.remove("hidden");
  }, 300)
}