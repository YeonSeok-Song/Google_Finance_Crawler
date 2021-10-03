import axios from "axios";
import cheerio from "cheerio";

const getHTML = async (message) => {
    const [stockName, marketName] = message.split(":")
    try {
        return await axios(`https://www.google.com/finance/quote/${stockName}:${marketName}`)
    } catch(e) {
        return null
    }
}

const crawler = async (message) => {
    
    let crawlingList = []

    try {
        const html = await getHTML(message)
        if(html === null) {
            throw new Error("Error get html");
        }
        const $ = cheerio.load(html.data)
        const $currentPrice = $(".rPF6Lc").text()
        const $data = $(".eYanAe .gyFHrc").children(".P6K39c")
        
        $data.each((i, d) => {
            crawlingList.push(d.children[0].data)
        })

        const stockData = {
            '현재가' : $currentPrice,
            '전일 종가' : crawlingList[0],
            '일일 변동폭' : crawlingList[1],
            '52주 변동폭' : crawlingList[2],
            '시가 총액' : crawlingList[3],
            '수량' : crawlingList[4],
            '주가수익률' : crawlingList[5],
            '배당수익률' : crawlingList[6],
            '기본 거래소' : crawlingList[7],
        }

        stockData['전일 대비 변동가'] = (parseFloat($currentPrice.replace(/[^.\d]+/g, "")) - parseFloat(crawlingList[0].replace(/[^.\d]+/g, ""))).toFixed(2)
        stockData['전일 대비 변동률'] = ((stockData['전일 대비 변동가'] / parseFloat(crawlingList[0].replace(/[^.\d]+/g, "")))*100).toFixed(3)

        return stockData

    } catch (e) {
        console.log(e.message)
    }
}

export default crawler;