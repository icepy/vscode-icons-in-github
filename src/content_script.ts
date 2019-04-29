import run from "./run";

const repoPjax = document.querySelector("#js-repo-pjax-container");
if (repoPjax) {
  const observer = new MutationObserver(() => {
    setTimeout(() => {
      run();
    }, 1000);
  });
  const config = { attributes: true, childList: true, characterData: true }
  observer.observe(repoPjax!, config);
}

run();
