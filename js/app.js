'use strict';
let attempts = 0;
let maxAttempts = 25;
let attemptsEl = document.getElementById('attempts');
let product = [];
let productimagestag = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg'];
let leftImgIndex;
let midImgIndex;
let rightImgIndex;
let productClicks = [];
let productViews = [];
let viewSumarr=[];
let clickSumarr=[];
let productImagesNames = [];
let lImgEl = document.getElementById('leftImg');
let mImgEl = document.getElementById('midImg');
let rImgEl = document.getElementById('rightImg');
function productImage(productName){
    this.productName = productName .split('.')[0];
    this.source = 'img/' + productName;
    this.clicks = 0;
    this.views = 0;
    product.push(this);
    productImagesNames.push(this.productName);
}

function settingItems() {
    let data = JSON.stringify(product);
    console.log(data);
    localStorage.setItem('BusMall', data);
    let views2 = JSON.stringify(viewSumarr);
    localStorage.setItem('Views',views2);
    let clicks2 = JSON.stringify(clickSumarr);
    localStorage.setItem('Clicks',clicks2);
}

function gettingItems() {
    let stringObj = localStorage.getItem('productImage');
    let normalObj = JSON.parse(stringObj);
    if (normalObj !== null) {product = normalObj;}
    let views3 = localStorage.getItem('views');
    let views4=JSON.parse(views3);
    if (views4 !== null) {viewSumarr = views4;}
}
    
for (let i = 0; i< productimagestag.length; i++) {
    new productImage(productimagestag[i]);

}

function generateImage() {
    return Math.floor(Math.random() * product.length);
}
let image1;
let image2;
let image3;
let imageCollection=[];

function renderImg() {
    leftImgIndex = generateImage();
    midImgIndex = generateImage();
    rightImgIndex = generateImage();
    while (leftImgIndex === midImgIndex || leftImgIndex === rightImgIndex || midImgIndex === rightImgIndex || image1===leftImgIndex || image1 === midImgIndex ||image1 === rightImgIndex ||  image2===leftImgIndex || image2 === midImgIndex ||image2=== rightImgIndex|| image3===leftImgIndex || image3 === midImgIndex ||image3 === rightImgIndex){
    leftImgIndex = generateImage();
    midImgIndex = generateImage();
    rightImgIndex = generateImage();

    }
          
    lImgEl.setAttribute('src', product[leftImgIndex].source);
    lImgEl.setAttribute('title', product[leftImgIndex].source);
    product[leftImgIndex].views++;

    mImgEl.setAttribute('src', product[midImgIndex].source);
    mImgEl.setAttribute('title', product[midImgIndex].source);
    product[midImgIndex].views++;

    rImgEl.setAttribute('src', product[rightImgIndex].source);
    rImgEl.setAttribute('title', product[rightImgIndex].source);
    product[rightImgIndex].views++;
    attemptsEl.textContent = attempts;

    imageCollection[0]=leftImgIndex;
    image1=imageCollection[0];
    imageCollection[1]=midImgIndex;
    image2=imageCollection[1];
    imageCollection[2]=rightImgIndex;
    image3=imageCollection[2];

}
renderImg();

lImgEl.addEventListener("click", handelClicks);
mImgEl.addEventListener("click", handelClicks);
rImgEl.addEventListener("click", handelClicks);

function handelClicks(event){

    attempts++;
    if (attempts <= maxAttempts){
         if (event.target.id === "leftImg"){product[leftImgIndex].clicks++;  }
         if (event.target.id === "midImg") {product[midImgIndex].clicks++; }
         if (event.target.id === "rightImg") {product[rightImgIndex].clicks++; }
         renderImg();

    }
else {
    let button=document.getElementById('butt');

    button.addEventListener("click", result);
   
}}
let viewsum;
let clicksum;
let totalviews=0;
let totalclicks=0;
function result() {
    let ulEl = document.getElementById('result');
    let liEl;
    for (let i = 0; i < product.length; i++) {
        liEl = document.createElement('li');
        ulEl.appendChild(liEl);
        liEl.textContent = `${product[i].productName} has ${product[i].views} views and has ${product[i].clicks} clicks.`
        productClicks.push(product[i].clicks);
        productViews.push(product[i].views);
    }
    viewsum=productViews;
    clicksum=productClicks;
for (let i=0; i<product.length;i++){
totalclicks=productClicks[i]+clicksum[i];
clickSumarr.push(totalclicks);
totalviews=productViews[i]+viewsum[i];
viewSumarr.push(totalviews);

}
    settingItems();

    lImgEl.removeEventListener("click", handelClicks);
    mImgEl.removeEventListener("click", handelClicks);
    rImgEl.removeEventListener("click", handelClicks);
    chartRender ();
}

function chartRender (){
    var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels:productImagesNames,
        datasets: [{
            label: '# of Clicks',
            data: productClicks,
            backgroundColor: ['rgba(255, 99, 132, 0.2)',      
            ],
            borderColor: [
                
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        },
    
        {
            label: '# of Views',
            data: productViews,
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 3
        }]
    },
    
    
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}

gettingItems();
