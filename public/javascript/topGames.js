let startingPoint = 0

function init() {
    fetch("https://api.twitch.tv/helix/games/top", {
        method: "GET",
        headers: {
            "Client-ID": "w6k0p7kqfipr0j3xuj55q2z85vrs57",
            "Authorization": "Bearer t3brkytbcv2i1175txe20x1epa3lj6"
        }
    })
        .then(function (response) {
            response.json()
                .then(function (data) {
                    let topGameContainer = document.querySelector("#top-games");
                    topGameContainer.innerHTML = "";
                    let gameArr = [];
                    let imgArr = [];
                    let number = 4;
                    for (let i = startingPoint; i < (number + startingPoint); i++) {
                        let tempID = data.data[i].id;
                        if (tempID === "509658" || tempID === "26936") {
                            number++;
                            startingPoint++;
                        } else {
                            let tempName = data.data[i].name
                            let tempImgURL = data.data[i].box_art_url
                            gameArr.push(tempName),
                                imgArr.push(tempImgURL)
                        }
                    }
                    for (let i = 0; i < 4; i++) {
                        let tempName = gameArr[i]
                        let tempImgURL = imgArr[i]
                        let twitchLink = "https://www.twitch.tv/directory/game/" + encodeURIComponent(gameArr[i].trim())
                        let fixImgUrl = tempImgURL.split('{width');
                        let imgUrl = fixImgUrl[0] + '300x400.jpg'
                        //create container 
                        let cardContainer = document.createElement("div");
                        cardContainer.classList = "col-3";
                        //create card
                        let cardEl = document.createElement("div");
                        cardEl.classList = "card";
                        //create hyperlink picture
                        let hyperEl = document.createElement("a");
                        hyperEl.setAttribute("href", twitchLink);
                        hyperEl.setAttribute("target", "_blank");
                        hyperEl.setAttribute("rel", "noreferrer");
                        //create image
                        let cardImageURL = document.createElement("img");
                        cardImageURL.classList = "card-img-top";
                        cardImageURL.src = imgUrl;
                        hyperEl.appendChild(cardImageURL);
                        cardEl.appendChild(hyperEl);
                        //created the card body
                        let cardBodyEl = document.createElement("div");
                        cardBodyEl.classList = "card-body";
                        //title for card body
                        let contentInfoEl = document.createElement("p");
                        contentInfoEl.classList = "card-text";
                        contentInfoEl.innerHTML = tempName;
                        cardBodyEl.appendChild(contentInfoEl);
                        //append header and content to container
                        cardEl.appendChild(cardBodyEl);
                        cardContainer.appendChild(cardEl);
                        //append card to box
                        topGameContainer.appendChild(cardContainer);
                    }

                });
        });
}

function nextFour() {
    if (startingPoint >= 14) {
        startingPoint = 0
        init()
    } else {
        startingPoint += 4;
        init();
    }

}

function lastFour() {
    if (startingPoint <= 4) {
        startingPoint = 13;
        init();
    } else {
        startingPoint -= 4;
        init();
    }
}


document.querySelector('#greatThan').addEventListener('click', nextFour);
document.querySelector('#lessThan').addEventListener('click', lastFour);
init();