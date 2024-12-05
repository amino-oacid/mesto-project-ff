(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/cohort-mag-4",headers:{authorization:"fd26f244-7976-420d-9518-a53afadd5e52","Content-Type":"application/json"}};function t(t){return fetch("".concat(e.baseUrl,"/cards/").concat(t),{headers:e.headers,method:"DELETE"}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}var n=document.querySelector("#card-template").content;function r(t,n,r){(function(t,n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{headers:e.headers,method:n?"DELETE":"PUT"}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))})(r,t.classList.contains("card__like-button_is-active")).then((function(e){t.classList.toggle("card__like-button_is-active"),n.textContent=e.likes.length})).catch((function(e){console.log(e)}))}function o(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранение...";t.textContent=e?r:n}function a(e){e.classList.add("popup_is-opened"),e.addEventListener("mousedown",i),document.addEventListener("keydown",u)}function c(e){e.classList.remove("popup_is-opened"),e.removeEventListener("mousedown",i),document.removeEventListener("keydown",u)}function i(e){e.target==e.currentTarget&&c(e.target)}function u(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}var s={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function l(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(s.inputErrorClass),n.textContent="",n.classList.remove(s.errorClass)}function d(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:s,n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){(function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?l(e,t):function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(s.inputErrorClass),r.textContent=n,r.classList.add("popup__error_visible")}(e,t,t.validationMessage)})(e,o),function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n)):(t.disabled=!0,t.classList.add(n))}(n,r,t.inactiveButtonClass)}))}))}function f(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:s,n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(t){l(e,t),t.setCustomValidity("")})),r.disabled=!0,r.classList.add(t.inactiveButtonClass)}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var m,v=document.querySelector(".places__list"),_=document.forms,y=document.querySelectorAll(".popup__close"),h=document.querySelector(".profile__title"),b=document.querySelector(".profile__description"),S=document.querySelector(".profile__image-picture"),g=document.querySelector(".popup_type_image"),k=g.querySelector(".popup__image"),E=g.querySelector(".popup__caption"),L=document.querySelector(".profile__add-button"),q=document.querySelector(".popup_type_new-card"),C=_["new-place"],j=C.elements,A=j["place-name"],x=j.link,P=document.querySelector(".profile__edit-button"),w=document.querySelector(".popup_type_edit"),U=_["edit-profile"],T=U.elements,O=T.name,B=T.description,D=document.querySelector(".profile__image"),M=document.querySelector(".popup_type_avatar"),N=_["change-avatar"],I=N.elements["avatar-link"];function J(e){a(g),k.setAttribute("src",e.link),k.setAttribute("alt",e.name),E.textContent=e.name}function V(e,o){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"prepend",c=function(e,o,a){var c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:r,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:t,u=n.cloneNode(!0),s=u.querySelector(".card__title"),l=u.querySelector(".card__image"),d=u.querySelector(".card__delete-button"),f=u.querySelector(".card__like-button"),p=u.querySelector(".card__like-count"),m=e._id;return s.textContent=e.name,p.textContent=e.likes.length,l.src=e.link,l.alt=e.name,l.addEventListener("click",(function(){return a(e)})),e.likes.some((function(e){return e._id===o}))&&f.classList.add("card__like-button_is-active"),f.addEventListener("click",(function(){return c(f,p,m)})),e.owner._id!==o?(console.log("не моя карта"),d.classList.add("card__delete-button-unactive")):d.addEventListener("click",(function(){i(m),d.closest(".places__item").remove()})),u}(e,o,J);v[a](c)}P.addEventListener("click",(function(e){a(w),O.value=h.textContent,B.value=b.textContent,f(U,s)})),U.addEventListener("submit",(function(t){var n,r;t.preventDefault(),o(!0,t.submitter),(n=O.value,r=B.value,fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers,method:"PATCH",body:JSON.stringify({name:n,about:r})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){h.textContent=e.name,b.textContent=e.about,c(w)})).finally((function(){return o(!1,t.submitter)}))})),D.addEventListener("click",(function(e){a(M),f(N,s)})),N.addEventListener("submit",(function(t){var n;t.preventDefault(),o(!0,t.submitter),(n=I.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{headers:e.headers,method:"PATCH",body:JSON.stringify({avatar:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){S.src=e.avatar,c(M)})).finally((function(){return o(!1,t.submitter)}))})),L.addEventListener("click",(function(e){a(q),f(C,s)})),C.addEventListener("submit",(function(t){var n,r;t.preventDefault(),o(!0,t.submitter),(n=A.value,r=x.value,fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers,method:"POST",body:JSON.stringify({name:n,link:r})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){V(e,m,"prepend"),C.reset(),c(q)})).finally((function(){return o(!1,t.submitter)}))})),y.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return c(t)}))})),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s;Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){d(t,e)}))}(s),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a,c,i=[],u=!0,s=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=a.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){s=!0,o=e}finally{try{if(!u&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(s)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],a=r[1];h.textContent=o.name,b.textContent=o.about,S.src=o.avatar,m=o._id,a.forEach((function(e){V(e,m,"append")}))})).catch((function(e){console.log(e)}))})();