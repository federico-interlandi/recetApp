import{a as l,b as v}from"./chunk-BUHBS7HV.js";import{Ha as m,h as t,l as a,o as n,r as s,u as o,va as p}from"./chunk-T663EOGS.js";var f=class i{constructor(e,r,c){this.errorNotificationService=e;this.http=r;this.cookieService=c}URL=l.api;register(e){return this.http.post(`${this.URL}/auth/signup`,e).pipe(a((r,c)=>(this.errorNotificationService.showError("Ocurrio un error al registrar el usuario"),t(()=>new Error(r.message)))))}logIn(e){return this.http.post(`${this.URL}/auth/login`,e).pipe(n(r=>{this.cookieService?.set("token",r.idToken)}),a((r,c)=>(this.errorNotificationService.showError("Ocurrio un error con tu email o password"),t(()=>new Error(r.message)))))}logOut(){this.cookieService?.delete("token"),localStorage.removeItem("favorites"),localStorage.removeItem("recipes")}static \u0275fac=function(r){return new(r||i)(o(v),o(p),o(m))};static \u0275prov=s({token:i,factory:i.\u0275fac,providedIn:"root"})};export{f as a};
