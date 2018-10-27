let sliders = document.querySelectorAll(".slider input[type='range']");
let thumbs = document.querySelectorAll(".slider .thumb");
var sty = document.createElement("style");
document.head.appendChild(sty);

function adjThumbs(percentage, floatVal) {
    let thumbHeight = "";
    let propThumbs = ["-webkit-slider-thumb","-moz-range-thumb"];
    if(!percentage && !floatVal) {
        console.log("both are null");
        percentage = 0;
        floatVal = 1;
        propThumbs.forEach(function(thumbType) {
            thumbHeight += ".slider input[type='range']::"+thumbType+"{background-color: rgba(0,0,0,1); transform: scale("+1+");}"
        });
    } else {
        propThumbs.forEach(function(thumbType) {
            thumbHeight += ".slider input[type='range']::"+thumbType+" {background-color: rgba(" + percentage*255+","+percentage*255+","+percentage*255+",1" + "); transform: scale("+floatVal+");}";
        });
    }
    return thumbHeight;
    
}

sty.innerText = adjThumbs();

function setSlider(evt) {
    let tgt = evt.target;
    let evType = evt.type;
    let maxVal = tgt.max;
    let minVal = tgt.min;
    let currVal = tgt.value;
    tgt.setAttribute("aria-valuenow",currVal);
    tgt.setAttribute("aria-valuetext",currVal+" pizzas");
    let elWidth = parseFloat(tgt.getBoundingClientRect().width);
    let elRight = parseFloat(tgt.getBoundingClientRect().right);
    let elLeft = parseFloat(tgt.getBoundingClientRect().left);
    let diffPx = elWidth - elRight;
    let percentage = currVal / maxVal;
    let elVal = elRight * percentage;
    console.log("event type: " + evType + "\nmax: " + maxVal + "\nmin: " + minVal + "\ncurrent: " + currVal);
    console.log("\nwidth: " + elWidth + "\nright: " + elRight + "\ndiff: " + diffPx);
    console.log("percent ", percentage);
    if (percentage > .5) {
        thumbs[0].style.left = "calc(" + percentage * 100 + "% - " + percentage * percentage * percentage + "rem)";
    } else if (percentage < .5) {
        console.log(currVal / 10);
        console.log("currVal split " + String(currVal / 10).split(".")[0]);
        // let parsedVal = parseFloat(String(currVal)[0]+"."+String(percentage).split(".")[1]);
        let parsedVal = percentage * 2;
        // console.log("parsedVal ", parsedVal);
        // thumbs[0].style.left = "calc("+percentage*100+"% - "+parsedVal+"rem)";    


    } else if (percentage === .5) {
        thumbs[0].style.left = percentage * 100 + "%";
    }

    // thumbs[0].style.right = "0%";
    thumbs[0].style.width = "auto";
    // thumbs[0].style.width = "calc("+percentage*100+"% + "+percentage*10+"%)";
    // thumbs[0].style.left = "calc(("+percentage*100 + "% - 2rem))";
    // thumbs[0].style.left = "calc(("+percentage*100 + "% - 2rem))";
    // let test = parseFloat(thumbs[0].getBoundingClientRect().left)+-128+"px";
    // thumbs[0].style.left = test;
    // console.log(test);
    console.log(currVal);
    let floatVal;
    if(percentage < 1) {
        floatVal = parseFloat("1."+String(percentage).split(".")[1]);
    } else {
        floatVal = 2;
    }
    floatVal = String(floatVal);
    console.log("percentage: "+percentage+"\nfloatVal: ",floatVal);
    // thumbHeight = ".slider input[type='range']::-webkit-slider-thumb {border-radius: " + percentage * 50 + "%; background-color: rgba(" + percentage*255+","+percentage*255+","+percentage*255+",1" + "); transform: scale("+floatVal+");}";
    // thumbHeight = ".slider input[type='range']::-moz-range-thumb {border-radius: " + percentage * 50 + "%; background-color: rgba(" + percentage*255+","+percentage*255+","+percentage*255+",1" + "); transform: scale("+floatVal+");}";

    sty.innerText = adjThumbs(percentage, floatVal);

    // tgt.setAttribute("style","height: "+percentage*10+"rem;")

}

sliders.multEvs(["input", "change"], function (evt) {
    setSlider(evt);

});