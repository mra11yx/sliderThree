let sliders = document.querySelectorAll(".slider input[type='range']");
let thumbs = document.querySelectorAll(".slider .thumb");

function setSlider(evt) {

    let tgt = evt.target;
    let evType = evt.type;
    let maxVal = tgt.max;
    let minVal = tgt.min;
    let currVal = tgt.value;
    let elWidth = parseFloat(tgt.getBoundingClientRect().width);
    let elRight = parseFloat(tgt.getBoundingClientRect().right);
    let elLeft = parseFloat(tgt.getBoundingClientRect().left);
    let diffPx = elWidth - elRight;
    let percentage = currVal / maxVal;
    let elVal = elRight * percentage;
    console.log("event type: " + evType + "\nmax: " + maxVal + "\nmin: " + minVal + "\ncurrent: " + currVal);
    console.log("\nwidth: " + elWidth + "\nright: " + elRight + "\ndiff: " + diffPx);
    console.log("percent ", percentage);
    if(percentage > .5) {
        thumbs[0].style.left = "calc("+percentage*100+"% - "+percentage*percentage*percentage+"rem)";    
    } else if(percentage < .5) {
        console.log(currVal/10);
        console.log("currVal split "+String(currVal/10).split(".")[0]);
        let parsedVal = parseFloat(String(currVal)[0]+"."+String(percentage).split(".")[1]);
        // let parsedVal = percentage *2;
        console.log("parsedVal ",parsedVal);
        thumbs[0].style.left = "calc("+percentage*100+"% - "+parsedVal+"rem)";    

        
    } else if (percentage === .5) {
        thumbs[0].style.left = percentage*100+"%";
    }
    
    thumbs[0].style.right = "0%";
    thumbs[0].style.width = "auto";
    // thumbs[0].style.width = "calc("+percentage*100+"% + "+percentage*10+"%)";
    // thumbs[0].style.left = "calc(("+percentage*100 + "% - 2rem))";
    // thumbs[0].style.left = "calc(("+percentage*100 + "% - 2rem))";
    // let test = parseFloat(thumbs[0].getBoundingClientRect().left)+-128+"px";
    // thumbs[0].style.left = test;
    // console.log(test);
}

sliders.multEvs(["input", "change"], function (evt) {
    setSlider(evt);

});