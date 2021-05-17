'use strict';
let attempts = 0;
let maxAttempts = 25;
let attemptsEl = document.getElementById('attempts');
let product = [];
let productimagestag = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg'];
let leftImgIndex;
let midImgIndex;
let rightImgIndex;
let lImgEl = document.getElementById('leftImg');
let mImgEl = document.getElementById('midImg');
let rImgEl = document.getElementById('rightImg');
//let imagename= [];
function productImage(productName){
    this.productName = productName .split('.')[0];
    this.source = 'img/' + productName;
    this.clicks = 0;
    this.views = 0;
    product.push(this);
  //  imagename.push(this.productName);
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
    result();
    let ulEl = document.getElementById('results');
    let liEl;
    for (let i = 0; i < product.length; i++) {
        liEl = document.createElement('li');
        ulEl.appendChild(liEl);
        liEl.textContent = `${product[i].productName} has ${product[i].views} views and has ${product[i].clicks} clicks.`
    }

    lImgEl.removeEventListener("click", handelClicks);
    mImgEl.removeEventListener("click", handelClicks);
    rImgEl.removeEventListener("click", handelClicks);
}
}



























/*function chartRender (){
    var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
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
}*/