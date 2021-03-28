function init () {
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
                    console.log(data);
                    let topGameContainer = document.querySelector("#top-games");
                    let gameArr = [];
                    let imgArr = [];
                    let number = 4
                    for (let i = 0; i < number; i++) { 
                        let tempID = data.data[i].id;
                        if (tempID === "509658" || tempID === "26936") {
                            number ++;
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
                        let fixImgUrl = tempImgURL.split('{width');
                        let imgUrl = fixImgUrl[0] + '300x400.jpg'
                        console.log(imgUrl)
                        //create container 
                        let cardContainer = document.createElement("div");
                        cardContainer.classList = "col-3";
                        //create card
                        let cardEl = document.createElement("div");
                        cardEl.classList = "card";
                        //create image
                        let cardImageURL = document.createElement("img");
                        cardImageURL.classList = "card-img-top";
                        cardImageURL.src = imgUrl;
                        // //title for header
                        // let titleEl = document.createElement("p");
                        // titleEl.classList = "card-header-title has-background-link-light";
                        // titleEl.innerHTML = tempName;
                        cardEl.appendChild(cardImageURL);
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

init();