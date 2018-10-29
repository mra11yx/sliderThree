let sliders = document.querySelectorAll(".slider input[type='range']");
let thumbs = document.querySelectorAll(".slider .thumb");
var sty = document.createElement("style");
document.head.appendChild(sty);
let resultsEl = document.querySelector(".resultsEl");

function adjThumbs(percentage, rot, floatVal) {
    let thumbHeight = "";
    let propThumbs = ["-webkit-slider-thumb", "-moz-range-thumb"];
    if (!percentage && !floatVal) {
        console.log("both are null");
        percentage = 0;
        floatVal = 1;
        propThumbs.forEach(function (thumbType) {
            thumbHeight += ".slider input[type='range']::" + thumbType + "{background-color: rgba(0,0,0,1); transform: scale(" + 1 + ");}"

        });
    } else {
        propThumbs.forEach(function (thumbType) {
            // thumbHeight += ".slider input[type='range']::" + thumbType + " {background-color: rgba(" + percentage * 255 + "," + percentage * 255 + "," + percentage * 255 + ",1" + "); transform: scale(" + floatVal + ");}";
            // thumbHeight += ".slider input[type='range']::" + thumbType + " {background-color: rgba(" + percentage * 255 + "," + percentage * 255 + "," + percentage * 255 + ",1" + "); transform: scale(" + 1 + ") rotate("+rot+"deg);}";
            // thumbHeight += ".slider input[type='range']::" + thumbType + " {background-color: rgba(" + percentage * 255 + "," + percentage * 255 + "," + percentage * 255 + ",1" + "); transform: scale(" + 1 + ");}";
        });
    }
    return thumbHeight;

}

sty.innerText = adjThumbs();

function setSlider(evt, minVal, maxVal, currVal, percentage, rot, currResults) {
    let tgt = evt.target;
    let evType = evt.type;
    tgt.setAttribute("aria-valuenow", currVal);
    tgt.setAttribute("aria-valuetext", currVal + " pizzas");
    currResults.innerText = tgt.value;
    let elWidth = parseFloat(tgt.getBoundingClientRect().width);
    let elRight = parseFloat(tgt.getBoundingClientRect().right);
    let elLeft = parseFloat(tgt.getBoundingClientRect().left);
    let diffPx = elWidth - elRight;
    
    let elVal = elRight * percentage;

    console.log("event type: " + evType + "\nmax: " + maxVal + "\nmin: " + minVal + "\ncurrent: " + currVal);
    console.log("\nwidth: " + elWidth + "\nright: " + elRight + "\ndiff: " + diffPx);
    console.log("percent ", percentage);
    if (percentage > .5) {
        // thumbs[0].style.left = "calc(" + percentage * 100 + "% - " + percentage * percentage * percentage + "rem)";
    } else if (percentage < .5) {
        console.log(currVal / 10);
        console.log("currVal split " + String(currVal / 10).split(".")[0]);
        // let parsedVal = parseFloat(String(currVal)[0]+"."+String(percentage).split(".")[1]);
        let parsedVal = percentage * 2;
        // console.log("parsedVal ", parsedVal);
        // thumbs[0].style.left = "calc("+percentage*100+"% - "+parsedVal+"rem)";    


    } else if (percentage === .5) {
        // thumbs[0].style.left = percentage * 100 + "%";
    }

    // thumbs[0].style.right = "0%";
    // thumbs[0].style.width = "auto";
    // thumbs[0].style.width = "calc("+percentage*100+"% + "+percentage*10+"%)";
    // thumbs[0].style.left = "calc(("+percentage*100 + "% - 2rem))";
    // thumbs[0].style.left = "calc(("+percentage*100 + "% - 2rem))";
    // let test = parseFloat(thumbs[0].getBoundingClientRect().left)+-128+"px";
    // thumbs[0].style.left = test;
    // console.log(test);
    console.log(currVal+"asf");
    let floatVal;
    if (percentage < 1) {
        floatVal = parseFloat("1." + String(percentage).split(".")[1]);
    } else {
        floatVal = 2;
    }
    floatVal = String(floatVal);
    console.log("percentage: " + percentage + "\nfloatVal: ", floatVal);
    // thumbHeight = ".slider input[type='range']::-webkit-slider-thumb {border-radius: " + percentage * 50 + "%; background-color: rgba(" + percentage*255+","+percentage*255+","+percentage*255+",1" + "); transform: scale("+floatVal+");}";
    // thumbHeight = ".slider input[type='range']::-moz-range-thumb {border-radius: " + percentage * 50 + "%; background-color: rgba(" + percentage*255+","+percentage*255+","+percentage*255+",1" + "); transform: scale("+floatVal+");}";

    sty.innerText = adjThumbs(percentage, rot, floatVal);

    // tgt.setAttribute("style","height: "+percentage*10+"rem;")
    //new results stuff
    resultsEl.style.left = ((resultsEl.parentElement.getBoundingClientRect().width * percentage) - resultsEl.getBoundingClientRect().width / 2) + "px";
    // console.log(resultsEl.style.left);
}

// resultsNew.style.transform = "translateX(-350%)";


sliders.forEach(function (elem) {
    console.log(elem);
    let maxVal = elem.max;
    let minVal = elem.min;
    let percentage = elem.value / maxVal;
    let currResults = elem.parentElement.querySelector(".resultsEl");
    currResults.innerText = elem.value;
    elem.setAttribute("aria-valuenow", elem.value);
    elem.setAttribute("aria-valuetext", elem.value + " pizzas");
    resultsEl.style.left = ((resultsEl.parentElement.getBoundingClientRect().width * percentage) - resultsEl.getBoundingClientRect().width / 2) + "px";
    let rot = percentage*360
    elem.multEvs(["input", "change"], function (evt) {
        setSlider(evt,minVal,maxVal,elem.value,percentage = elem.value/maxVal, rot = percentage * 360, currResults);
    });
});
