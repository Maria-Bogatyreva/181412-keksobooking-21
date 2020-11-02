(()=>{"use strict";(()=>{const e=function(e,t){const n=e-.5+Math.random()*(t-e+1);return Math.round(n)};window.util={getRandomNumber:e,getRandomElement:function(e){return e[Math.floor(Math.random()*e.length)]},getRandomArray:function(t){const n=t.slice();let o,r;for(let e=n.length-1;e>0;e--)o=Math.floor(Math.random()*(e+1)),r=n[e],n[e]=n[o],n[o]=r;return n.slice(e(0,n.length))}}})(),(()=>{const e=document.querySelector(".ad-form"),t=document.querySelector(".map__pin--main"),n=document.querySelector(".map__filters"),o=e.querySelector("#address"),r=document.querySelector(".map");window.constant={adForm:e,MIN_Y:130,MAX_Y:630,MIN_X:0,MAX_X:1200,mapPin:t,mapFilter:n,inputAdress:o,map:r,MAP_PIN_WIDTH:65,MAP_PIN_HEIGHT:84}})(),(()=>{const e=function(e,t,n){const o=new XMLHttpRequest;o.responseType="json",o.addEventListener("load",(function(){200===o.status?e(o.response):t("Статус ответа: "+o.status+" "+o.statusText)})),o.addEventListener("error",(function(){t("Произошла ошибка соединения")})),o.addEventListener("timeout",(function(){t("Запрос не успел выполниться за "+o.timeout+"мс")})),o.timeout=1e4,n?(o.open("POST","https://21.javascript.pages.academy/keksobooking"),o.send(n)):(o.open("GET","https://21.javascript.pages.academy/keksobooking/data"),o.send())};window.backend={load:function(t,n){e(t,n)},save:function(t,n,o){e(t,n,o)}}})(),window.debounce=function(e){var t=null;return function(...n){t&&window.clearTimeout(t),t=window.setTimeout((function(){e(...n)}),500)}},(()=>{const e=window.constant.map,t={flat:"Квартира",bungalow:"Бунгало",house:"Дом",palace:"Дворец"},n=function(n){const o=e.querySelector(".map__filters-container"),r=document.querySelector("#card").content.querySelector(".map__card").cloneNode(!0);if(r.querySelector(".popup__title").textContent=n.offer.title,r.querySelector(".popup__text--address").textContent=n.offer.address,r.querySelector(".popup__text--price").textContent=n.offer.price+"₽/ночь",r.querySelector(".popup__type").textContent=t[n.offer.type],r.querySelector(".popup__text--capacity").textContent=`${n.offer.rooms} комнаты для ${n.offer.guests} гостей`,r.querySelector(".popup__text--time").textContent=`Заезд после ${n.offer.checkin}, выезд до ${n.offer.checkout}`,r.querySelector(".popup__description").textContent=n.offer.description,r.querySelector(".popup__avatar").src=n.author.avatar,0===n.offer.photos.length)r.querySelector(".popup__photos").style.display="none";else{const e=r.querySelector(".popup__photos"),t=e.querySelector(".popup__photo"),o=n.offer.photos;e.innerHTML="";const i=document.createDocumentFragment();o.forEach((function(e){const n=t.cloneNode(!0);n.src=e,i.appendChild(n)})),e.appendChild(i)}if(0===n.offer.photos.length)r.querySelector(".popup__features").style.display="none";else{const e=r.querySelector(".popup__features"),t=e.querySelector(".popup__feature"),o=n.offer.features;e.innerHTML="";const i=document.createDocumentFragment();o.forEach((function(e){const n=t.cloneNode(!0);n.classList.add("popup__feature--"+e),i.appendChild(n)})),e.appendChild(i)}e.insertBefore(r,o)},o=function(){const t=e.querySelector(".map__card");if(t){const n=t.querySelector(".popup__close");e.removeChild(t),n.removeEventListener("click",r),document.removeEventListener("keydown",i)}},r=function(){o(),e.querySelector(".map__pin--active").classList.remove("map__pin--active")},i=function(t){"Escape"===t.key&&(t.preventDefault(),o(),e.querySelector(".map__pin--active").classList.remove("map__pin--active"))};window.card={create:n,open:function(t){o(),n(t),e.querySelector(".map__card").querySelector(".popup__close").addEventListener("click",r),document.addEventListener("keydown",i)},close:o}})(),(()=>{const e=window.constant.mapFilter,t=e.querySelector("#housing-type"),n=e.querySelector("#housing-guests"),o=e.querySelector("#housing-rooms"),r=e.querySelector("#housing-price"),i=e.querySelector("#housing-features");window.filter=function(e){let c=[];return e.forEach((function(e){(function(e){return"any"===t.value||e.offer.type===t.value})(e)&&function(e){return"any"===o.value||e.offer.rooms===Number(o.value)}(e)&&function(e){return"any"===n.value||e.offer.guests===Number(n.value)}(e)&&function(e){return"any"===r.value||("low"===r.value?e.offer.price<1e4:"middle"===r.value?e.offer.price>1e4&&e.offer.price<5e4:e.offer.price>5e4)}(e)&&function(e){const t=i.querySelectorAll(".map__checkbox:checked");return Array.from(t).every((function(t){return e.offer.features.includes(t.value)}))}(e)&&c.push(e)})),c}})(),(()=>{const e=window.constant.map,t=window.card.open,n=window.card.close,o=window.constant.mapFilter,r=window.filter,i=window.debounce,c=function(n){const o=document.querySelector(".map__pins"),r=document.createDocumentFragment();let i=5<n.length?5:n.length;n.slice(0,i).forEach((function(n){r.appendChild(function(n){if("offer"in n){const o=document.querySelector("#pin").content.querySelector(".map__pin").cloneNode(!0);o.style.left=n.location.x-25+"px",o.style.top=n.location.y-70+"px",o.querySelector("img").src=n.author.avatar,o.querySelector("img").alt=n.offer.title;const r=function(){let r=e.querySelector(".map__pin--active");r&&r.classList.remove("map__pin--active"),t(n),o.classList.add("map__pin--active")},i=function(e){"Enter"===e.key&&(t(n),o.classList.add("map__pin--active"))};return o.addEventListener("click",r),o.addEventListener("keydown",i),o}return!1}(n))})),o.appendChild(r)},a=function(){document.querySelectorAll(".map__pin").forEach((function(e){e.classList.contains("map__pin--main")||e.remove()}))},u=function(){a(),c(r(d)),n()},s=i((function(){u()}));o.addEventListener("change",s);let d=[];window.mark={add:c,delete:a,update:u,successHandler:function(e){d=e,c(e)},errorHandler:function(e){const t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center; background-color: red;",t.style.position="absolute",t.style.left=0,t.style.right=0,t.style.fontSize="30px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)}}})(),(()=>{const e=window.constant.MAP_PIN_WIDTH,t=window.constant.MAP_PIN_HEIGHT,n=window.constant.MIN_Y,o=window.constant.MAX_Y,r=window.constant.MIN_X,i=window.constant.MAX_X,c=window.constant.mapPin,a=window.constant.inputAdress;window.move={onMousedown:function(u){u.preventDefault();let s={x:u.clientX,y:u.clientY};const d=function(u){u.preventDefault();const d=s.x-u.clientX,l=s.y-u.clientY;s={x:u.clientX,y:u.clientY},c.offsetTop-l<n-t?c.style.top=n-t+"px":c.offsetTop-l>o-t?c.style.top=o-t+"px":c.style.top=c.offsetTop-l+"px",c.offsetLeft-d<r-Math.round(e/2)?c.style.left=r-Math.round(e/2)+"px":c.offsetLeft-d>i-Math.round(e/2)?c.style.left=i-Math.round(e/2)+"px":c.style.left=c.offsetLeft-d+"px",a.value=`${parseInt(c.style.left,10)+Math.round(e/2)}, ${parseInt(c.style.top,10)+t}`},l=function(e){e.preventDefault(),document.removeEventListener("mousemove",d),document.addEventListener("mouseup",l)};document.addEventListener("mousemove",d),document.addEventListener("mouseup",l)}}})(),(()=>{const e=window.constant.MAP_PIN_WIDTH,t=window.constant.MAP_PIN_HEIGHT,n=window.constant.mapPin,o=window.constant.adForm,r=window.constant.mapFilter,i=window.move.onMousedown,c=window.constant.inputAdress,a=window.backend.load,u=window.mark.successHandler,s=window.mark.errorHandler,d=n.offsetLeft,l=n.offsetTop,p=function(e){Array.from(e.children).forEach((function(e){e.setAttribute("disabled","disabled")}))},m=function(e){Array.from(e.children).forEach((function(e){e.removeAttribute("disabled","disabled")}))},f=function(){document.querySelector(".map").classList.remove("map--faded"),document.querySelector(".ad-form").classList.remove("ad-form--disabled"),a(u,s),m(o),m(r),function(){const o=parseInt(n.style.left,10),r=parseInt(n.style.top,10);c.value=`${o+Math.round(e/2)}, ${r+t}`}(),n.removeEventListener("mousedown",y),n.removeEventListener("keydown",v),n.addEventListener("mousedown",i)},y=function(e){0===e.button&&f()},v=function(e){"Enter"===e.key&&f()};window.map={deactivate:function(){document.querySelector(".map").classList.add("map--faded"),document.querySelector(".ad-form").classList.add("ad-form--disabled"),p(o),p(r),n.addEventListener("mousedown",y),n.addEventListener("keydown",v),n.style.left=d+"px",n.style.top=l+"px",function(){const t=parseInt(n.style.left,10),o=parseInt(n.style.top,10);c.value=`${t+Math.round(e/2)}, ${o+Math.round(e/2)}`}()},onMousedown:y,onEnterPress:v,inputAdress:c}})(),(()=>{const e=window.constant.mapPin,t=window.map.deactivate,n=window.map.onMousedown,o=window.map.onPinEnterPress;t(),e.addEventListener("mousedown",n),e.addEventListener("keydown",o)})(),(()=>{const e=window.constant.inputAdress,t=window.constant.adForm,n=t.querySelector("#room_number"),o=t.querySelector("#capacity"),r=t.querySelector("#title"),i=t.querySelector("#price"),c=t.querySelector("#type"),a=t.querySelector("#timein"),u=t.querySelector("#timeout"),s=t.querySelector("#avatar"),d=t.querySelector("#images"),l=function(){"1"===n.value&&"1"!==o.value?n.setCustomValidity("1 комната только для 1 гостя"):"2"!==n.value||"3"!==o.value&&"0"!==o.value?"3"===n.value&&"0"===o.value?n.setCustomValidity("Для 3 или менее гостей"):"100"===n.value&&"0"!==o.value?n.setCustomValidity("Не для гостей"):n.setCustomValidity(""):n.setCustomValidity("Для 2 и менее гостей"),n.reportValidity()};o.addEventListener("change",l),n.addEventListener("change",l),r.setAttribute("required","required"),r.addEventListener("input",(function(){let e=r.value.length;e<30?r.setCustomValidity("Ещё "+(30-e)+" симв."):e>100?r.setCustomValidity("Удалите лишние "+(e-100)+" симв."):r.setCustomValidity(""),r.reportValidity()})),i.setAttribute("max","1000000"),i.setAttribute("required","required"),i.addEventListener("input",(function(){i.value>1e6?i.setCustomValidity("Максимальная цена 1000000"):i.setCustomValidity(""),i.reportValidity()}));const p=function(){"bungalow"===c.value&&i.value<0?(i.setCustomValidity("Для бунгало минимальная цена за ночь 0р"),i.setAttribute("placeholder","0"),i.setAttribute("min","0")):"flat"===c.value&&i.value<1e3?(i.setCustomValidity("Для квартиры минимальная цена за ночь 1000р"),i.setAttribute("placeholder","1000"),i.setAttribute("min","1000")):"house"===c.value&&i.value<5e3?(i.setCustomValidity("Для дома минимальная цена за ночь 5000р"),i.setAttribute("placeholder","5000"),i.setAttribute("min","5000")):"palace"===c.value&&i.value<5e3?(i.setCustomValidity("Для дворца минимальная цена за ночь 10000р"),i.setAttribute("placeholder","10000"),i.setAttribute("min","10000")):i.setCustomValidity(""),i.reportValidity()};i.addEventListener("change",p),c.addEventListener("change",p),e.setAttribute("readonly","readonly"),a.addEventListener("change",(function(){u.value=a.value})),u.addEventListener("change",(function(){a.value=u.value})),s.setAttribute("accept","image/*"),d.setAttribute("accept","image/*")})(),(()=>{const e=window.constant.adForm,t=window.map.deactivate,n=window.backend.save,o=window.mark.delete,r=window.card.close,i=document.querySelector("#success").content.querySelector(".success").cloneNode(!0),c=document.querySelector("#error").content.querySelector(".error").cloneNode(!0),a=function(e){"Escape"===e.key&&(e.preventDefault(),i&&i.remove(),c&&c.remove())},u=function(){c.remove(),document.removeEventListener("keydown",a),document.removeEventListener("click",u),c.querySelector(".error__button").removeEventListener("click",u)},s=function(){i.remove(),document.removeEventListener("keydown",a),document.removeEventListener("click",s)},d=function(){e.reset(),o(),r(),t()},l=function(){d(),document.body.insertAdjacentElement("afterbegin",i),document.addEventListener("keydown",a),document.addEventListener("click",s)},p=function(){r(),document.querySelector("main").insertAdjacentElement("afterbegin",c),document.addEventListener("keydown",a),document.addEventListener("click",u),c.querySelector(".error__button").addEventListener("click",u)};e.addEventListener("submit",(function(t){t.preventDefault(),n(l,p,new FormData(e))})),e.querySelector(".ad-form__reset").addEventListener("click",(function(e){e.preventDefault(),d()}))})()})();