 



let trendId;

    const urlHeader={
        /* 'x-rapidapi-key': '32f42afe51msha8504fa4fcb37a5p132197jsnea3e7d67f415',
        'x-rapidapi-host': 'shein-scraper-api.p.rapidapi.com' */
        'x-rapidapi-key': '2d148f2205msh88c163f3a739a2cp13022fjsnafb8f743d20a',
            'x-rapidapi-host': 'shein-scraper-api.p.rapidapi.com'
    }
    localStorage.getItem("trendId") ? trendId = localStorage.getItem("trendId") : trendId = 0
    console.log(trendId) 
    
      /* getSpecificTrend(trendId).then(data => {
        console.log(data)
    })  */   


    

async function getSpecificTrend(trendId) {
    try{ 
        const response = await fetch(`https://shein-scraper-api.p.rapidapi.com/shein/trends/products?trend_id=${trendId}&page=1&size=22&sort=recommend&country=us&language=en&currency=usd`, {
            method: 'GET',
            headers: urlHeader
        })
        if(!response.ok){
            throw Error(`${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;    
    }
    catch(error){
        console.log(error);
    }

}

