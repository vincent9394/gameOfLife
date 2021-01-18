

const upBtn = document.querySelector('#up-btn');
const downBtn = document.querySelector('#down-btn');
//console.log(upBtn);

upBtn.addEventListener('click', function(event){
  //  console.log(event);
    window.scrollBy(0, +100);
})

downBtn.addEventListener('click', function(event){
    //console.log(event);
    window.scrollBy(0, -100);
})

//$('body').scrollspy({ target: '#navbar-example' })