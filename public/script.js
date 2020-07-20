// http://localhost:8800/quote
// https://thesimpsonsquoteapi.glitch.me/quotes
const getQuote = () => {
    return fetch("http://localhost:8800/quote")
        .then((response) => response.json())
        .then((data) => data[0].quote);
};
let quoteSpanArr;
const setQuote = async () => {
    const quote = await getQuote();
    quoteSpanArr = [];
    quoteDisplay.innerHTML = null;
    quoteInput.value = '';
    startTimer();
    quote.split("").forEach((char) => {
        const span = document.createElement("span");
        span.innerText = char;
        quoteSpanArr.push(span);
        quoteDisplay.appendChild(span);
    });
};


quoteInput.addEventListener("input", () => {
    let allCorrect = true;
    const inputCharArr = quoteInput.value.split("");
    for (let i=0; i<quoteSpanArr.length; i++){
        if (inputCharArr[i]){
            if (inputCharArr[i] === quoteSpanArr[i].innerText){
                quoteSpanArr[i].classList.add('correct')
                quoteSpanArr[i].classList.remove('incorrect')
            } else {
                quoteSpanArr[i].classList.remove('correct')
                quoteSpanArr[i].classList.add('incorrect')
                allCorrect = false;
            }
        } else {
            quoteSpanArr[i].classList.remove('correct')
            quoteSpanArr[i].classList.remove('incorrect')
            allCorrect = false;
        }
    }
    if (allCorrect){
        reset();
    }
});

let startTime;
const startTimer = () => {
    startTime = new Date();
}

setInterval(() => {
    if (startTime)
        timer.innerText = Math.floor((new Date() - startTime)/1000);
}, 1000)
const reset = () => {
    quoteDisplay.innerHTML = 'Getting Quote...';
    setQuote();
}
reset();
