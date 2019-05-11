$(function () {

    $("document").ready(function () {
        $('#stopTheNewsShowButton').css('display', 'none');
        $('#infoNewsShowStarted').css('display', 'none');
        $('#container').css('width', '550');
        $('#container').css('height', '40');
        window.urls = [
            "https://www.finanzen.net/aktien/SAP-Aktie",
            "https://www.nasdaq.com/symbol/?Load=true&Search=tesla",
            "https://www.spiegel.de/",
            "https://www.nasdaq.com/symbol/aapl",
            "https://www.nasdaq.com/de/symbol/amzn/real-time",
            "https://www.nasdaq.com/symbol/sap",
            "https://coinmarketcap.com/currencies/basic-attention-token/",
            "https://coinmarketcap.com/currencies/eos/",
            "https://coinmarketcap.com/currencies/ethereum/",
            "https://coinmarketcap.com/currencies/tron/",
            "https://www.crypto-news.net/",
            "https://www.youtube.com/channel/UCY0xL8V6NzzFcwzHCgB8orQ",
            "https://www.dhbw-mannheim.de",
            "https://fance-fitness.com/",
            "https://www.nasdaq.com/symbol/baba",
            "https://www.nasdaq.com/symbol/dax",
            "https://www.google.com/search?q=nasdaq+dow+jones"
        ]
        window.preventAds
        window.speed = 0.5
        window.minimum = Math.floor((100000 / (100 * window.speed) + 7000) / 1000)
        window.maximum = Math.floor((400000 / (100 * window.speed) + 7000) / 1000)
        output.innerHTML = `${output.innerHTML} <br> (Minimum Pause in Seconds: ${window.minimum} <br> Maximum Pause in Seconds: ${window.maximum})`;
    
        updateList(window.urls);
    })
    $("#allowAds").click(function () {
        updateRecommendation()
    })
    $("#preventAds").click(function () {
        updateRecommendation()
    })

    $("#addNewURL").click(function () {
        addURL()
    })

    $("#stopTheNewsShowButton").click(function () {
        $('#startTheNewsShowButton').show()
        $('#customize').show()
        $('#stopTheNewsShowButton').css('display', 'none');
        stopNewsShow()
    })

    $("#startTheNewsShowButton").click(function () {
        $('#startTheNewsShowButton').css('display', 'none');
        $('#customize').css('display', 'none');
        $('#stopTheNewsShowButton').show()

        startTheNewsShow()
    })

    // $('#urls .list').click(function (e) {
    //     const index = $(e.target).parent().attr("id").split("urlentry")[1]
    //     alert(index)
    //     $(e.target).parent().remove();
    //     window.urls.splice(index, 1)
    // });
})


function stopNewsShow() {
    clearInterval(window.myIntervalID)
}

function startTheNewsShow() {
    const index = getRandomNumber(0, window.urls.length - 1)
    chrome.tabs.update({
        url: window.urls[index]
    });

    const randomNumber = getRandomNumber(window.minimum * 1000, window.maximum * 1000)

    window.myIntervalID = setInterval(() => {
        const index = getRandomNumber(0, window.urls.length - 1)
        chrome.tabs.update({
            url: window.urls[index]
        });

    }, randomNumber)
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}


function addURL() {
    const newURL = document.getElementById("newURL").value
    var valid = /^(ftp|http|https):\/\/[^ "]+$/.test(newURL);
    if (valid) {
        window.urls.push(newURL)
        document.getElementById("newURL").value = ""
        updateList(window.urls)
    } else {
        alert("I can only accept valid https urls")
    }
}

function updateList(urls) {
    $('#urls .list').empty()

    $.each(urls, function (index, userName) {
        // $('#urls .list').append('<p id="urlentry' + index + '"><a href="' + userName + '">' + userName + "</a>" + ' <br><button id="removeURL" type="button" class="btn btn-danger">Remove</button></p>')
        $('#urls .list').append('<p><a href="' + userName + '">' + userName + "</a>" + ' <br></p>')
    });
}

function updateRecommendation() {

    var radioButtons = document.getElementsByName("adsSettings")

    for (var i = 0, length = radioButtons.length; i < length; i++) {
        if (radioButtons[i].checked) {
            window.preventAds = (radioButtons[i].value === "preventAds") ? true : false

            break;
        }
    }

    $('#recommendation #content').remove()

    if (window.preventAds) {
        $('#recommendation').append('<div id="content"><p></p>To prevent ads from your show We recommend the <a href="https://brave.com/fan464" target="_blank">Brave Browser</a>. <br> Brave blocks all ads by default and seems to be the best Browser on earth.</div>')
    } else {
        $('#recommendation').append('<div id="content"><p></p>If it is o.k. for you to have ads in your News Show, you can earn <a href="https://basicattentiontoken.org" target="_blank">BAT</a> using the <a href="https://brave.com/fan464" target="_blank">Brave Browser</a>. <br></div>')
    }

}



var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = "medium";

slider.oninput = function () {
    output.innerHTML = "very slow";
    if (this.value >= 20 && this.value < 40) {
        output.innerHTML = "slow";
    } else if (this.value >= 40 && this.value < 60) {
        output.innerHTML = "medium";
    } else if (this.value >= 60 && this.value < 80) {
        output.innerHTML = "fast";
    } else if (this.value >= 80) {
        output.innerHTML = "very fast";
    }

    window.speed = this.value / 100
    window.minimum = Math.floor((100000 / (100 * window.speed) + 7000) / 1000)
    window.maximum = Math.floor((400000 / (100 * window.speed) + 7000) / 1000)
    output.innerHTML = `${output.innerHTML} <br> (Minimum Pause in Seconds: ${window.minimum} <br> Maximum Pause in Seconds: ${window.maximum})`;


}
