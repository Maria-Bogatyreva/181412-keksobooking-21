(()=>{"use strict";(()=>{const e=function(e,t){const n=e-.5+Math.random()*(t-e+1);return Math.round(n)};window.util={getRandomNumber:e,getRandomElement:function(e){return e[Math.floor(Math.random()*e.length)]},getRandomArray:function(t){const n=t.slice();let o,r;for(let e=n.length-1;e>0;e--)o=Math.floor(Math.random()*(e+1)),r=n[e],n[e]=n[o],n[o]=r;return n.slice(e(0,n.length))}}})(),(()=>{const e=document.querySelector(".ad-form"),t=document.querySelector(".map__pin--main"),n=document.querySelector(".map__filters"),o=e.querySelector("#address"),r=document.querySelector(".map");window.constant={adForm:e,MIN_Y:130,MAX_Y:630,MIN_X:0,MAX_X:1200,mapPin:t,mapFilter:n,inputAdress:o,map:r,MAP_PIN_WIDTH:65,MAP_PIN_HEIGHT:84}})(),(()=>{const e=(e,t,n)=>{const o=new XMLHttpRequest;o.responseType="json",o.addEventListener("load",(()=>{200===o.status?e(o.response):t("Статус ответа: "+o.status+" "+o.statusText)})),o.addEventListener("error",(()=>{t("Произошла ошибка соединения")})),o.addEventListener("timeout",(()=>{t("Запрос не успел выполниться за "+o.timeout+"мс")})),o.timeout=1e4,n?(o.open("POST","https://21.javascript.pages.academy/keksobooking"),o.send(n)):(o.open("GET","https://21.javascript.pages.academy/keksobooking/data"),o.send())};window.backend={load:(t,n)=>{e(t,n)},save:(t,n,o)=>{e(t,n,o)}}})(),window.debounce=e=>{var t=null;return(...n)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...n)}),500)}},(()=>{const e=window.constant.map,t={flat:"Квартира",bungalow:"Бунгало",house:"Дом",palace:"Дворец"},n=n=>{const o=e.querySelector(".map__filters-container"),r=document.querySelector("#card").content.querySelector(".map__card").cloneNode(!0);if(r.querySelector(".popup__title").textContent=n.offer.title,r.querySelector(".popup__text--address").textContent=n.offer.address,r.querySelector(".popup__text--price").textContent=n.offer.price+"₽/ночь",r.querySelector(".popup__type").textContent=t[n.offer.type],r.querySelector(".popup__text--capacity").textContent=`${n.offer.rooms} комнаты для ${n.offer.guests} гостей`,r.querySelector(".popup__text--time").textContent=`Заезд после ${n.offer.checkin}, выезд до ${n.offer.checkout}`,r.querySelector(".popup__description").textContent=n.offer.description,r.querySelector(".popup__avatar").src=n.author.avatar,0===n.offer.photos.length)r.querySelector(".popup__photos").style.display="none";else{const e=r.querySelector(".popup__photos"),t=e.querySelector(".popup__photo"),o=n.offer.photos;e.innerHTML="";const a=document.createDocumentFragment();o.forEach((e=>{const n=t.cloneNode(!0);n.src=e,a.appendChild(n)})),e.appendChild(a)}if(0===n.offer.photos.length)r.querySelector(".popup__features").style.display="none";else{const e=r.querySelector(".popup__features"),t=e.querySelector(".popup__feature"),o=n.offer.features;e.innerHTML="";const a=document.createDocumentFragment();o.forEach((e=>{const n=t.cloneNode(!0);n.classList.add("popup__feature--"+e),a.appendChild(n)})),e.appendChild(a)}e.insertBefore(r,o)},o=()=>{const t=e.querySelector(".map__card");if(t){const n=t.querySelector(".popup__close");e.removeChild(t),n.removeEventListener("click",r),document.removeEventListener("keydown",a)}},r=()=>{o(),e.querySelector(".map__pin--active").classList.remove("map__pin--active")},a=t=>{"Escape"===t.key&&(t.preventDefault(),o(),e.querySelector(".map__pin--active").classList.remove("map__pin--active"))};window.card={create:n,open:t=>{o(),n(t),e.querySelector(".map__card").querySelector(".popup__close").addEventListener("click",r),document.addEventListener("keydown",a)},close:o}})(),(()=>{const e=window.constant.mapFilter,t=e.querySelector("#housing-type"),n=e.querySelector("#housing-guests"),o=e.querySelector("#housing-rooms"),r=e.querySelector("#housing-price"),a=e.querySelector("#housing-features");window.sort={filter:function(e){let i=[];return e.forEach((function(e){(function(e){return"any"===t.value||e.offer.type===t.value})(e)&&function(e){return"any"===o.value||e.offer.rooms===Number(o.value)}(e)&&function(e){return"any"===n.value||e.offer.guests===Number(n.value)}(e)&&function(e){return"any"===r.value||("low"===r.value?e.offer.price<1e4:"middle"===r.value?e.offer.price>1e4&&e.offer.price<5e4:e.offer.price>5e4)}(e)&&function(e){const t=a.querySelectorAll(".map__checkbox:checked");return Array.from(t).every((function(t){return e.offer.features.includes(t.value)}))}(e)&&i.push(e)})),i}}})(),(()=>{const e=window.constant.map,t=window.card.open,n=window.card.close,o=window.constant.mapFilter,r=window.sort.filter,a=window.debounce,i=function(n){const o=document.querySelector(".map__pins"),r=document.createDocumentFragment();let a=5<n.length?5:n.length;n.filter((e=>e.offer)).slice(0,a).forEach((function(n){r.appendChild(function(n){const o=document.querySelector("#pin").content.querySelector(".map__pin").cloneNode(!0);return o.style.left=n.location.x-25+"px",o.style.top=n.location.y-70+"px",o.querySelector("img").src=n.author.avatar,o.querySelector("img").alt=n.offer.title,o.addEventListener("click",(function(){let r=e.querySelector(".map__pin--active");r&&r.classList.remove("map__pin--active"),t(n),o.classList.add("map__pin--active")})),o.addEventListener("keydown",(function(e){"Enter"===e.key&&(t(n),o.classList.add("map__pin--active"))})),o}(n))})),o.appendChild(r)},s=function(){document.querySelectorAll(".map__pin").forEach((function(e){e.classList.contains("map__pin--main")||e.remove()}))},c=function(){s(),i(r(u)),n()},d=a((function(){c()}));o.addEventListener("change",d);let u=[];window.mark={add:i,delete:s,update:c,successHandler:function(e){u=e,i(e)},errorHandler:function(e){const t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center; background-color: red;",t.style.position="absolute",t.style.left=0,t.style.right=0,t.style.fontSize="30px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)}}})(),(()=>{const e=window.constant.MAP_PIN_WIDTH,t=window.constant.MAP_PIN_HEIGHT,n=window.constant.MIN_Y,o=window.constant.MAX_Y,r=window.constant.MIN_X,a=window.constant.MAX_X,i=window.constant.mapPin,s=window.constant.inputAdress;window.move={onMousedown:function(c){c.preventDefault();let d={x:c.clientX,y:c.clientY};const u=function(c){c.preventDefault();const u=d.x-c.clientX,l=d.y-c.clientY;d={x:c.clientX,y:c.clientY},i.offsetTop-l<n-t?i.style.top=n-t+"px":i.offsetTop-l>o-t?i.style.top=o-t+"px":i.style.top=i.offsetTop-l+"px",i.offsetLeft-u<r-Math.round(e/2)?i.style.left=r-Math.round(e/2)+"px":i.offsetLeft-u>a-Math.round(e/2)?i.style.left=a-Math.round(e/2)+"px":i.style.left=i.offsetLeft-u+"px",s.value=`${parseInt(i.style.left,10)+Math.round(e/2)}, ${parseInt(i.style.top,10)+t}`},l=function(e){e.preventDefault(),document.removeEventListener("mousemove",u),document.addEventListener("mouseup",l)};document.addEventListener("mousemove",u),document.addEventListener("mouseup",l)}}})(),(()=>{const e=window.constant.MAP_PIN_WIDTH,t=window.constant.MAP_PIN_HEIGHT,n=window.constant.mapPin,o=window.constant.adForm,r=window.constant.mapFilter,a=window.move.onMousedown,i=window.constant.inputAdress,s=window.backend.load,c=window.mark.successHandler,d=window.mark.errorHandler,u=n.offsetLeft,l=n.offsetTop,p=function(e){Array.from(e.children).forEach((function(e){e.setAttribute("disabled","disabled")}))},m=function(e){Array.from(e.children).forEach((function(e){e.removeAttribute("disabled","disabled")}))},f=function(){document.querySelector(".map").classList.remove("map--faded"),document.querySelector(".ad-form").classList.remove("ad-form--disabled"),s(c,d),m(o),m(r),function(){const o=parseInt(n.style.left,10),r=parseInt(n.style.top,10);i.value=`${o+Math.round(e/2)}, ${r+t}`}(),n.removeEventListener("mousedown",y),n.removeEventListener("keydown",v),n.addEventListener("mousedown",a)},y=function(e){0===e.button&&f()},v=function(e){"Enter"===e.key&&f()};window.map={deactivate:function(){document.querySelector(".map").classList.add("map--faded"),document.querySelector(".ad-form").classList.add("ad-form--disabled"),p(o),p(r),n.addEventListener("mousedown",y),n.addEventListener("keydown",v),n.style.left=u+"px",n.style.top=l+"px",function(){const t=parseInt(n.style.left,10),o=parseInt(n.style.top,10);i.value=`${t+Math.round(e/2)}, ${o+Math.round(e/2)}`}()},onMousedown:y,onEnterPress:v,inputAdress:i}})(),(()=>{const e=window.constant.mapPin,t=window.map.deactivate,n=window.map.onMousedown,o=window.map.onPinEnterPress;t(),e.addEventListener("mousedown",n),e.addEventListener("keydown",o)})(),(()=>{const e=["gif","jpg","jpeg","png"],t=window.constant.inputAdress,n=window.constant.adForm,o=n.querySelector("#room_number"),r=n.querySelector("#capacity"),a=n.querySelector("#title"),i=n.querySelector("#price"),s=n.querySelector("#type"),c=n.querySelector("#timein"),d=n.querySelector("#timeout"),u=n.querySelector("#images"),l=n.querySelector(".ad-form__field input[type=file]"),p=n.querySelector(".ad-form-header__preview img"),m=n.querySelector(".ad-form__photo"),f=function(){"1"===o.value&&"1"!==r.value?o.setCustomValidity("1 комната только для 1 гостя"):"2"!==o.value||"3"!==r.value&&"0"!==r.value?"3"===o.value&&"0"===r.value?o.setCustomValidity("Для 3 или менее гостей"):"100"===o.value&&"0"!==r.value?o.setCustomValidity("Не для гостей"):o.setCustomValidity(""):o.setCustomValidity("Для 2 и менее гостей"),o.reportValidity()};r.addEventListener("change",f),o.addEventListener("change",f),a.setAttribute("required","required"),a.addEventListener("input",(function(){let e=a.value.length;e<30?a.setCustomValidity("Ещё "+(30-e)+" симв."):e>100?a.setCustomValidity("Удалите лишние "+(e-100)+" симв."):a.setCustomValidity(""),a.reportValidity()})),i.setAttribute("max","1000000"),i.setAttribute("required","required"),i.addEventListener("input",(function(){i.value>1e6?i.setCustomValidity("Максимальная цена 1000000"):i.setCustomValidity(""),i.reportValidity()}));const y=function(){"bungalow"===s.value&&i.value<0?(i.setCustomValidity("Для бунгало минимальная цена за ночь 0р"),i.setAttribute("placeholder","0"),i.setAttribute("min","0")):"flat"===s.value&&i.value<1e3?(i.setCustomValidity("Для квартиры минимальная цена за ночь 1000р"),i.setAttribute("placeholder","1000"),i.setAttribute("min","1000")):"house"===s.value&&i.value<5e3?(i.setCustomValidity("Для дома минимальная цена за ночь 5000р"),i.setAttribute("placeholder","5000"),i.setAttribute("min","5000")):"palace"===s.value&&i.value<1e4?(i.setCustomValidity("Для дворца минимальная цена за ночь 10000р"),i.setAttribute("placeholder","10000"),i.setAttribute("min","10000")):i.setCustomValidity(""),i.reportValidity()};i.addEventListener("change",y),s.addEventListener("change",y),t.setAttribute("readonly","readonly"),c.addEventListener("change",(function(){d.value=c.value})),d.addEventListener("change",(function(){c.value=d.value})),l.setAttribute("accept","image/*"),l.addEventListener("change",(function(){const t=l.files[0],n=t.name.toLowerCase();if(e.some((function(e){return n.endsWith(e)}))){const e=new FileReader;e.addEventListener("load",(function(){p.src=e.result})),e.readAsDataURL(t)}})),u.setAttribute("accept","image/*"),u.addEventListener("change",(function(){const t=u.files[0],n=t.name.toLowerCase();if(e.some((function(e){return n.endsWith(e)}))){const e=new FileReader;e.addEventListener("load",(function(){const t=document.createElement("img");m.innerHTML="",t.src=e.result,t.classList.add("ad-form__photo-preview"),m.append(t)})),e.readAsDataURL(t)}})),window.validate={avatarPreview:p,imagesPreview:m,defaultAvatarUrl:"img/muffin-grey.svg"}})(),(()=>{const e=window.constant.adForm,t=window.map.deactivate,n=window.backend.save,o=window.mark.delete,r=window.card.close,a=window.validate.avatarPreview,i=window.validate.imagesPreview,s=window.validate.defaultAvatarUrl,c=document.querySelector("#success").content.querySelector(".success").cloneNode(!0),d=document.querySelector("#error").content.querySelector(".error").cloneNode(!0),u=e=>{"Escape"===e.key&&(e.preventDefault(),c&&c.remove(),d&&d.remove())},l=()=>{d.remove(),document.removeEventListener("keydown",u),document.removeEventListener("click",l),d.querySelector(".error__button").removeEventListener("click",l)},p=()=>{c.remove(),document.removeEventListener("keydown",u),document.removeEventListener("click",p)},m=()=>{a.src=s,i.innerHTML="",e.reset(),o(),r(),t()},f=()=>{m(),document.body.insertAdjacentElement("afterbegin",c),document.addEventListener("keydown",u),document.addEventListener("click",p)},y=()=>{r(),document.querySelector("main").insertAdjacentElement("afterbegin",d),document.addEventListener("keydown",u),document.addEventListener("click",l),d.querySelector(".error__button").addEventListener("click",l)};e.addEventListener("submit",(t=>{t.preventDefault(),n(f,y,new FormData(e))})),e.querySelector(".ad-form__reset").addEventListener("click",(e=>{e.preventDefault(),m()}))})()})();