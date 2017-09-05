var dispalyedImage = document.querySelector('.display-img');
var thumbBar = document.querySelector('.thumb-bar');

btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');

for (var i = 1; i <= 4; i++) {
    var newImage = document.createElement('img');
    newImage.setAttribute('src', 'images/img' + i + ".jpg");
    thumbBar.appendChild(newImage);
    newImage.onclick = function (e) {
        var imgSrc = e.target.getAttribute("src");
        dispalyImage(imgSrc);
    }
}

function dispalyImage(imgSrc) {
    dispalyedImage.setAttribute("src", imgSrc);
}

btn.onclick = function () {
    var btnClass = btn.getAttribute('class');
    if (btnClass === 'dark') {
        btn.setAttribute('class', 'light');
        btn.textContent = '变亮';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else {
        btn.setAttribute('class', 'dark');
        btn.textContent = '变暗';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
}