(() => {
    console.log("fired");

    let body = document.getElementById("app"),
        darkModeBtn = document.getElementById("dark-mode"),
        photoBoard = document.getElementsByClassName("post-div")[0],
        postsBtn = document.getElementById("posts-btn"),
        taggedBtn = document.getElementById("tagged-btn"),
        postsBtnIcon = document.getElementById("posts-btn-icon"),
        taggedBtnIcon = document.getElementById("tagged-btn-icon"),
        postsBtnText = document.getElementById("posts-btn-text"),
        taggedBtnText = document.getElementById("tagged-btn-text"),
        currTag = "posts-btn";

    // toggle dark mode
    darkModeBtn.addEventListener("click", () => {
        if (body.classList.contains("darkmode")) {
            body.classList.remove("darkmode");
        } else {
            body.classList.add("darkmode");
        }
    });

    const postlist = ["136669390_425875312093233_3025457713389608371_n", "137304733_746913602601551_4002666236453792058_n", "139469851_1090148494834583_5939736627068666381_n", "141133570_1063204750863089_715432850083682244_n", "142116121_517630632550066_6523820258129454437_n", "143540504_270108397790344_5116628483225644169_n", "144007665_249375823458536_106881166673130857_n", "146089109_262662968552919_5935619820302556320_n", "147063917_862981881153242_2048379424703025599_n", "147121469_101290888608361_3140544320035805870_n", "147390513_898825713991437_7499585302640991011_n", "149531254_278087553666748_7821420576907287875_n", "149862408_4109737982391187_878376174714887001_n", "149943653_234350001665293_4708603956858728219_n", "150438975_700325643982986_7857172496936033925_n", "151139946_2553676074941324_2209167278594978968_n", "152133125_140530864516032_8435437142206466602_n", "153113503_128351079121260_2019388504824871018_n", "154942672_493460265344536_651300079101479921_n", "155175797_221830272974775_8860676481135206204_n", "155259245_775297983087652_1267663785828455174_n"];

    const taglistIndex = [
        3, 4, 5, 10, 13, 15, 17, 18, 20
    ];

    // function: shuffle / randomize a list
    const shuffleList = (list) => {
        for (let i = list.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = list[i];
          list[i] = list[j];
          list[j] = temp;
        }
    }

    // randomize the postlist
    shuffleList(postlist);

    // for each photo, randomnize the like and comment counts
    let randomNumbers = [];
    postlist.forEach((post) => {
        const numLikes = Math.floor(Math.random() * 100) + 100;
        const numComments = Math.floor(Math.random() * 100) + 100;
        randomNumbers.push([numLikes, numComments]);
    })

    // add event listener to posts buttom
    postsBtn.addEventListener("click", (event) => {
        event.preventDefault();
        if (currTag != "posts-btn") {
            currTag = "posts-btn";
            taggedBtnText.classList.remove("active");
            postsBtnText.classList.add("active");
            taggedBtnIcon.classList.remove("active");
            postsBtnIcon.classList.add("active");
            if (photoBoard.childElementCount > 0) { // remove all children
                photoBoard.innerHTML = "";
            }
            postlist.forEach((post, index) => {
                attachPhoto(post, randomNumbers[index][0], randomNumbers[index][1]);
            });
        }
    });

    // add event listener to tagged button
    taggedBtn.addEventListener("click", (event) => {
        event.preventDefault();
        if (currTag != "tagged-btn") {
            currTag = "tagged-btn";
            postsBtnText.classList.remove("active");
            taggedBtnText.classList.add("active");
            postsBtnIcon.classList.remove("active");
            taggedBtnIcon.classList.add("active");
            if (photoBoard.childElementCount > 0) { // remove all children
                photoBoard.innerHTML = "";
            }
            taglistIndex.forEach((tagIndex) => {
                attachPhoto(postlist[tagIndex], randomNumbers[tagIndex][0], randomNumbers[tagIndex][1]);
            });
        }
    });

    // function: create photo element and attach it to the photo board
    const attachPhoto = (photo, numLikes, numComments) => {
        let div = document.createElement("div");
        div.classList.add("post");
        
        let a = document.createElement("a"),
            img = document.createElement("img");
        img.src = `images/posts/${photo}.jpg`;
        img.alt = "Post Image";
        a.appendChild(img);
    
        let ul = document.createElement("ul"),
            li1 = document.createElement("li"),
            li2 = document.createElement("li"),
            img1 = document.createElement("img"),
            img2 = document.createElement("img"),
            text1 = document.createTextNode(`${numLikes}`),
            text2 = document.createTextNode(`${numComments}`);
        img1.src = "images/icon/heart-solid.svg";
        img1.alt = "Like Icon";
        img2.src = "images/icon/comment-solid.svg";
        img2.alt = "Comment Icon";
        li1.append(img1, text1);
        li2.append(img2, text2);
        ul.append(li1, li2);
    
        div.append(a, ul);

        photoBoard.appendChild(div);
    }

    // initilize photo board
    postlist.forEach((post, index) => {
        attachPhoto(post, randomNumbers[index][0], randomNumbers[index][1]);
    });

})();