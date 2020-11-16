const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner(){
    if(!loader.hidden){
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}


// 1st Method: Get Quote from API
let counter = 0; // If counter > 10, quote API page has some problem

async function getQuote(){
    const proxyUrl = 'https://blooming-plains-93648.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        
        showLoadingSpinner();
        const response = await fetch(proxyUrl + apiUrl)
        const data = await response.json();
        
        // If Author is blank or null add 'Unknown'
        if( data.quoteAuthor === ''|| !data.quoteAuthor ){
            authorText.innerText = "Unknown";
        } else{
            authorText.innerText = data.quoteAuthor;
        }
        
        // if quote text length is greater, then decrease the font size;
        if( data.quoteText.length > 120 ){
            quoteText.classList.add('long-quote');
        } else{
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerText = data.quoteText;
        hideLoadingSpinner();
    } catch(error){
        if(counter > 10){
            console.log('Whoops no Quote'+ error);
            counter = 0;
        } else{
            getQuote();
            counter++;
        }
    }
}

// Tweet Quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);





// // 2nd Method: Get Quote from API
// let apiQuotes = [];

// function newQuote(){
//     showLoadingSpinner();
//     // getting random quote from apiQuotes
//     const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
//     // Check if quote.author exist
//     if(!quote.author)
//         authorText.innerText = "unknown";
//     else
//         authorText.textContent = quote.author;
    
    
//     // if quote text length is greater, then decrease the font size;
//     if( quote.text.length > 120 ){
//         quoteText.classList.add('long-quote');
//     } else{
//         quoteText.classList.remove('long-quote');
//     }
//     // quote of the author
//     quoteText.textContent = quote.text;
//     hideLoadingSpinner();
// }

// async function getQuote(){
//     showLoadingSpinner();
//     const proxyUrl = 'http://api.allorigins.win/get?url=';
//     const apiUrl = 'https://type.fit/api/quotes';
//     try{
//         const response = await fetch(apiUrl)
//         apiQuotes = await response.json();
//         newQuote();
//     } catch(error){
            // newQuote();
//     }
// }


// // Tweet Quote
// function tweetQuote(){
//     const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

//     window.open(twitterUrl, '_blank');
// }

// // Event Listeners
// newQuoteBtn.addEventListener('click', newQuote);
// twitterBtn.addEventListener('click', tweetQuote);




// On Load
getQuote();
