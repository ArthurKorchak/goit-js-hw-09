!function(){var t,e=document.querySelector("button[data-start]"),n=document.querySelector("button[data-stop]");n.disabled=!0,e.addEventListener("click",(function(){e.disabled=!0,n.disabled=!1,t=setInterval((function(){document.querySelector("body").style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),n.addEventListener("click",(function(){clearInterval(t),e.disabled=!1,n.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.399f063e.js.map
