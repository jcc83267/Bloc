function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function init (){
    title = document.location.href;
    titleArr = title.split('/')
    for(let i = 0; i < titleArr.length; i++) {
        console.log(i, titleArr[i])
    }
    console.log(title);

    titleEl = document.querySelector('.review-title');
    titleEl.innerHTML = capitalizeFirstLetter(titleArr[4]);
}

init();