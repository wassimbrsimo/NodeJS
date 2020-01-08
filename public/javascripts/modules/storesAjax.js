import axios from 'axios';
var Page=1;
var Pages=0;
function renderHTMLStores(stores){
  return stores.map(store => {
    //HTML pris depuis la page deja rendu 
    return `
    <div class="store" style="width:33%"><div class="store__hero"><div class="store__actions"><div class="store__action store__action--count"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" version="1.1" x="0px" y="0px"><title>Artboard</title><desc>Created with Sketch.</desc><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g stroke="#ffffff" stroke-width="4.5"><g transform="translate(5.000000, 10.000000)"><path d="M82.7031209,0.82 L7.70136256,0.82 C3.55882358,0.82 0.204,4.17834017 0.204,8.32087915 L0.204,57.0924182 C0.204,61.2349572 3.56234017,64.5932974 7.70136256,64.5932974 L60.3376303,64.5932974 L75.1987251,79.4543922 L75.1987251,64.5932974 L82.7031209,64.5932974 C86.8456598,64.5932974 90.204,61.2349572 90.204,57.0924182 L90.204,8.32087915 C90.204,4.17834017 86.8456598,0.82 82.7031209,0.82 L82.7031209,0.82 Z M30.5556587,36.467638 C28.4843892,36.467638 26.8069774,34.7902262 26.8069774,32.7189567 C26.8069774,30.6476873 28.4843892,28.9702755 30.5556587,28.9702755 C32.6269281,28.9702755 34.3043399,30.6512038 34.3043399,32.7189567 C34.3043399,34.7867096 32.6269281,36.467638 30.5556587,36.467638 L30.5556587,36.467638 Z M45.2022417,36.467638 C43.1309722,36.467638 41.4535604,34.7902262 41.4535604,32.7189567 C41.4535604,30.6476873 43.1309722,28.9702755 45.2022417,28.9702755 C47.2735112,28.9702755 48.950923,30.6512038 48.950923,32.7189567 C48.950923,34.7867096 47.2735112,36.467638 45.2022417,36.467638 L45.2022417,36.467638 Z M60.2004834,36.467638 C58.1292139,36.467638 56.4518021,34.7902262 56.4518021,32.7189567 C56.4518021,30.6476873 58.1292139,28.9702755 60.2004834,28.9702755 C62.2717529,28.9702755 63.9491647,30.6512038 63.9491647,32.7189567 C63.9491647,34.7867096 62.2717529,36.467638 60.2004834,36.467638 L60.2004834,36.467638 Z"></path></g></g></g></svg>
    <span>${store.reviews.length}</span></div></div>
    <img src="/uploads/${store.photo}">
    <h2 class="title"><a href="/store/${store.slug}">${store.name}</a></h2></div>
    <div class="store__details"><p>${store.description}</p></div></div>`;
  }).join('');
}


function renderPagination(data){
  return `Page `+Page+` of `+Pages+` — ${data.count} total results`;
}

function storesAjax(Stores,Pagination) {
    if(!Stores)
      return;
   getStores(Stores,Pagination,1)
    
}

function next(Stores,Pagination){
  if(Page<Pages){
    Page++
    getStores(Stores,Pagination)
  
}
}
function prev(Stores,Pagination){
  if(Page>1){
    Page--
    getStores(Stores,Pagination)
  
}
}

function getStores(Stores,Pagination){
  Stores.innerHTML = LoadingCircle()
  axios
  .get(`/api/stores/${Page}`)
  .then(res => {
    if (res.data) {
      Page=res.data.page;
      Pages=res.data.pages;
      console.log(" PAGE :"+Page+"/"+Pages)
      Stores.innerHTML =`<div class="stores" >`+renderHTMLStores(res.data.stores)+"</div>"
      Pagination.innerHTML = renderPagination(res.data)
      return;
    }
    // tell them nothing came back
    Stores.innerHTML = `<div class="search__result">No results for it</div>`
  })
  .catch(err => {
    console.error(err);
  });
}


function LoadingCircle(){
return (`
<style>
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #303030;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;
}
/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
<div class="loader"></div>
`)

}
  export {storesAjax,next,prev};