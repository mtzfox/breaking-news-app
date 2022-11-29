



// TODO: Add an error catch





//export default searchNews;



// fetch('https://google-news-api1.p.rapidapi.com/search?language=EN&q=breaking%20news&from=2021-11-20&to=2022-11-20', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));


    //Fixed version
    // async function searchNews(q) {
    //     q = encodeURIComponent(q);
    //     const response = await fetch(`https://bing-news-search1.p.rapidapi.com/news/search?freshness=Day&textFormat=Raw&safeSearch=Strict&q=${q}`, {
    //       "method": "GET",
    //       "headers": {
    //         "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
    //         "x-rapidapi-key": /* paste your RapidAPI key here */,
    //         "x-bingapis-sdk": "true"
    //       }
    //     });
    //     const body = await response.json();
    //     return body.value;
    //   }