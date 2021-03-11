(()=>{"use strict";var e,t,a,n,o,r,c,l;(function(e){var t=document.querySelector("#timer-hours"),a=document.querySelector("#timer-minutes"),n=document.querySelector("#timer-seconds");function o(e){return e<10&&(e="0"+e),e}var r=setInterval((function(){var e,c,l,u,i=(c=(new Date("19 mar 2021 20:00:00").getTime()-(e=(new Date).getTime()))/1e3,l=Math.floor(c%60),u=Math.floor(c/60%60),{timeRemaining:c,dateNow:e,hours:Math.floor(c/3600),minutes:u,seconds:l});t.textContent=o(i.hours),a.textContent=o(i.minutes),n.textContent=o(i.seconds),(0===i.timeRemaining||i.timeRemaining<0)&&(t.textContent="00",a.textContent="00",n.textContent="00",clearInterval(r))}),1e3)})(),function(){document.querySelector(".menu");var e=document.querySelector("menu"),t=(document.querySelector(".close-btn"),e.querySelectorAll("ul>li>a"),function(){return e.classList.toggle("active-menu")});document.body.addEventListener("click",(function(a){var n=a.target;n.closest(".menu")?t():n.closest("menu")?n.matches("menu a")&&t():e.classList.remove("active-menu")}))}(),c=document.querySelector(".popup"),l=document.querySelector(".popup-content"),document.querySelectorAll(".popup-btn").forEach((function(e){e.addEventListener("click",(function(){if(c.style.display="block",window.innerWidth>768){var e,t=0;!function a(){e=requestAnimationFrame(a),++t>=23?cancelAnimationFrame(e):l.style.left=2*t+"%"}()}}))})),c.addEventListener("click",(function(e){var t=e.target;t.classList.contains("popup-close")?c.style.display="none":t=t.closest(".popup-content"),t||(c.style.display="none")})),document.body.addEventListener("click",(function(e){var t=e.target,a=e.target.closest("a");if(!t.matches("button")&&!t.classList.contains("close-btn")&&(e.preventDefault(),a&&"#"===a.getAttribute("href")[0]&&a.getAttribute("href").length>2)){var n=a.getAttribute("href").substring(1);document.getElementById(n).scrollIntoView({behavior:"smooth",block:"start"})}})),n=document.querySelector(".service-header"),o=n.querySelectorAll(".service-header-tab"),r=document.querySelectorAll(".service-tab"),n.addEventListener("click",(function(e){var t=e.target;(t=t.closest(".service-header-tab"))&&o.forEach((function(e,a){e===t&&function(e){for(var t=0;t<r.length;t++)e===t?(o[t].classList.add("active"),r[t].classList.remove("d-none")):(o[t].classList.remove("active"),r[t].classList.add("d-none"))}(a)}))})),function(){var e,t,a=document.querySelectorAll(".portfolio-item"),n=(document.querySelectorAll(".portfolio-btn"),document.querySelector(".portfolio-dots")),o=document.querySelector(".portfolio-content"),r=0;!function(){for(var t=0;t<a.length;t++){var o=document.createElement("li");o.classList.add("dot"),n.append(o)}(e=document.querySelectorAll(".dot"))[0].classList.add("dot-active")}();var c=function(e,t,a){e[t].classList.remove(a)},l=function(e,t,a){e[t].classList.add(a)},u=function(){c(a,r,"portfolio-item-active"),c(e,r,"dot-active"),++r>=a.length&&(r=0),l(a,r,"portfolio-item-active"),l(e,r,"dot-active")},i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3e3;t=setInterval(u,e)};o.addEventListener("click",(function(t){t.preventDefault();var n=t.target;n.matches(".portfolio-btn, .dot")&&(c(a,r,"portfolio-item-active"),c(e,r,"dot-active"),n.matches("#arrow-right")?r++:n.matches("#arrow-left")?r--:n.matches(".dot")&&e.forEach((function(e,t){e===n&&(r=t)})),r>=a.length&&(r=0),r<0&&(r=a.length-1),l(a,r,"portfolio-item-active"),l(e,r,"dot-active"))})),o.addEventListener("mouseover",(function(e){(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&clearInterval(t)})),o.addEventListener("mouseout",(function(e){(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&i()})),i(1500)}(),a=document.querySelector(".calc-block"),document.querySelector(".footer-form-input"),a.addEventListener("input",(function(e){var t=e.target;t.matches("input")&&(t.value=t.value.replace(/\D/g,""))})),document.addEventListener("focusout",(function(e){var t=e.target;e.target.matches("input")&&(t.value=t.value.replace(/^(\s+)|(\s+)$/g,""),t.value=t.value.replace(/[\s]{2,}/g," "),t.value=t.value.replace(/[\-]{2,}/,"-"),(t.matches("#form2-name")||t.matches("#form2-message")||t.matches("#form1-name")||t.matches("#form3-name"))&&(t.value=t.value.replace(/[^а-яё\-\ ]/gi,""),(t.matches("#form2-name")||t.matches("#form1-name")||t.matches("#form3-name"))&&(t.value=t.value.replace(/^[а-яё]/,(function(e){return e.toUpperCase()})))),(t.matches("#form2-email")||t.matches("#form1-email")||t.matches("#form3-email"))&&(t.value=t.value.replace(/[^\w\@\-\_\.\!\~\*\'']/gi,"")),(t.matches("#form2-phone")||t.matches("#form1-phone")||t.matches("#form3-phone"))&&(t.value=t.value.replace(/[^\d\(\)\-\+]/,"")),t.matches("input")&&t.classList.contains("calc-item")&&(t.value=t.value.replace(/\D/g,"")))})),document.body.addEventListener("input",(function(e){var t=e.target;(t.matches("#form1-name")||t.matches("#form2-name")||t.matches("#form3-name"))&&(t.value=t.value.replace(/[^а-яё\-\ ]/gi,"")),t.matches("#form2-message")&&(t.value=t.value.replace(/[^(а-яё|\d)\-\.\!\,\:\? ]/gi,"")),(t.matches("#form3-email")||t.matches("#form2-email")||t.matches("#form1-email"))&&(t.value=t.value.replace(/[^\w\@\-\_\.\!\~\*\'']/gi,"")),(t.matches("#form3-phone")||t.matches("#form2-phone")||t.matches("#form1-phone"))&&(t.value.match(/^\+/)&&(t.value=t.value.substring(0,12)),t.value.match(/^(7|8)/)&&(t.value=t.value.substring(0,11)),t.value=t.value.replace(/[^\d\(\)\-\+]/,""))})),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100,t=document.querySelector(".calc-block"),a=document.querySelector(".calc-type"),n=document.querySelector(".calc-square"),o=document.querySelector(".calc-count"),r=document.querySelector(".calc-day"),c=document.getElementById("total"),l=function(){var t=0,l=1,u=1,i=+a.options[a.selectedIndex].value,s=+n.value;o.value>1&&(l+=(o.value-1)/10),r.value&&r.value<5?u*=2:r.value&&r.value<10&&(u*=1.5),i&&s&&(t=e*i*s*l*u);var m=1;requestAnimationFrame((function e(){var a=requestAnimationFrame(e);m*=2,c.textContent=m,m>=t&&(c.textContent=t,cancelAnimationFrame(a))}))};t.addEventListener("input",(function(e){var t=e.target;(t.matches("select")||t.matches("input"))&&l()}))}(100),(t=document.getElementById("command")).addEventListener("mouseover",(function(e){var t;return t=[e.target.src,e.target.dataset.img],e.target.dataset.img=t[0],e.target.src=t[1],t})),t.addEventListener("mouseout",(function(e){var t;return t=[e.target.dataset.img,e.target.src],e.target.src=t[0],e.target.dataset.img=t[1],t})),(e=document.createElement("div")).style.cssText="font-size: 2.5rem;",document.body.addEventListener("submit",(function(t){if(t.preventDefault(),e.style.color="white",0!==t.target.querySelector('[type="email"]').value.length)if(t.target.querySelector('[type="tel"]').value.match(/^\+/)&&t.target.querySelector('[type="tel"]').value.length<12)alert("Недостаточно символов для номера телефона");else if(t.target.querySelector('[type="tel"]').value.match(/^(7|8)/)&&t.target.querySelector('[type="tel"]').value.length<11)alert("Недостаточно символов для номера телефона");else{var a;t.target.appendChild(e),e.textContent="Загрузка...",(a=new FormData(t.target),fetch("./server.php",{method:"POST",body:a})).then((function(e){if(200!==e.status)throw new Error("Network status is not 200")})).then((function(){t.target.querySelectorAll("input").forEach((function(e){e.value=""})),e.textContent="Спасибо! Мы скоро с вами свяжемся."})).catch((function(t){e.textContent="Что-то пошло не так.",console.error(t)})).finally((function(){setTimeout((function(){e.textContent=""}),3e3)}))}else alert("Поле email обязательное")}))})();