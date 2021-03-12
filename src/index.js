const http = require("http");
const ytgets = require("yt-gets")
const url = require('url')
const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const URL = url.parse(req.url, true)
    if (req.method == 'GET' && URL.pathname.includes('yt-gets') &&  (URL.query.url ||  URL.query.id) ) {
        ytgets.fetch(URL.query.link).then((data)=>{
            res.writeHead(200,'application/json');
            res.end(JSON.stringify(data));
        }).catch((err)=>{
            res.writeHead(500);
            res.end(JSON.stringify(err));
        })    
    }else{
        res.writeHead(404,'application/json');
        res.end(JSON.stringify({
            message:'either provide id or video link',
            help:'HOST/yt-gets?id=XXXXXXX OR HOST/yt-gets?url=XXXXXXXXXXXXXXXXXXXXXXXXXXXXX ONLY GET request'
        }));
    }
});

server.listen(port, () => {
   console.log(`Server running at :${port}/`);
})