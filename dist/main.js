document.addEventListener("DOMContentLoaded",(function(){const e="https://jordan.ashton.fashion/api/goods/30/comments",t=document.getElementById("comments-wrapper"),n=document.getElementById("input-name"),a=document.getElementById("input-text"),s=document.getElementById("form-button"),i=document.getElementById("form-text-success");let c,d,o,r,l=!1;function m(e){e.focus(),e.classList.add("error"),e.setAttribute("placeholder","Это поле обязательно для заполнения"),e.addEventListener("keyup",(function(){""!==e.value.trim()?e.classList.remove("error"):e.classList.add("error")})),e.addEventListener("change",(function(){""!==this.value.trim()?this.classList.remove("error"):this.classList.add("error"),this.value=this.value.trim()}))}function u(){c.data.forEach((e=>{const t=document.createElement("p");t.innerHTML=`Имя: ${e.name}, комментарий: ${e.text}`,t.classList.add("comments-text"),d.append(t)})),c.next_page_url&&(o=document.createElement("button"),o.setAttribute("type","button"),o.innerHTML="Показать ещё",o.classList.add("section-button"),o.addEventListener("click",(()=>{l=!0,p(c.next_page_url)})),t.append(o)),r=document.createElement("div"),r.classList.add("pagination-block"),c.links.forEach((e=>{const t=document.createElement("span");t.innerHTML=e.label,t.classList.add("pagination-link"),e.active&&t.classList.add("active"),r.append(t),e.url?t.addEventListener("click",(()=>{p(e.url)})):t.classList.add("disabled")})),t.append(r)}function p(e){fetch(e).then((e=>e.json())).then((e=>{c=JSON.parse(JSON.stringify(e)),l?(t.removeChild(o),t.removeChild(r),u()):(t.innerHTML="",d=document.createElement("div"),d.classList.add("comments-block"),t.append(d),u()),l=!1}))}p(e),s.addEventListener("click",(function(t){let s=!0;""===n.value.trim()&&(m(n),s=!1),""===a.value.trim()&&(m(a),s=!1),s&&(fetch(e,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({name:n.value,text:a.value})}).then((()=>{i.classList.add("active"),setTimeout((()=>{i.classList.remove("active")}),2e3)})).then((()=>{p(c.links.find((e=>e.active)).url)})),n.value="",a.value="")}))}));