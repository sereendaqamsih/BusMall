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
for (let i = 0; i< productimagestag.length; i++) {
    new productImage(productimagestag[i]);

}

function generateImage() {
    return Math.floor(Math.random() * product.length);
}

function renderImg() {
    leftImgIndex = generateImage();
    midImgIndex = generateImage();
    rightImgIndex = generateImage();
    while (leftImgIndex === midImgIndex || leftImgIndex === rightImgIndex || midImgIndex === rightImgIndex){
    leftImgIndex = generateImage();
    midImgIndex = generateImage();
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
function result()
{
    let ulEl = document.getElementById('result');
    let liEl;
    for (let i = 0; i < product.length; i++) {
        liEl = document.createElement('li');
        ulEl.appendChild(liEl);
        liEl.textContent = `${product[i].productName} has ${product[i].views} views and has ${product[i].clicks} clicks.`
        productClicks.push(product[i].clicks);
       productViews.push(product[i].views);
    }


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
