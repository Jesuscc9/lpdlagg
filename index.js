import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import cheerio from 'cheerio'

const app = express()

app.use(express.json())
app.use(cors())

const SERVER = 'euw'
const URL = `https://${SERVER}.op.gg`

// function to get the raw data
const getRawData = (URL) => {
  return fetch(URL)
    .then((response) => response.text())
    .then((data) => {
      return data
    })
}

// start of the program
const scrapeData = async () => {
}

scrapeData()

app.get('/summoners/:summonerName', (req, res) => {
  const { summonerName } = req.params

  getRawData(`${URL}/summoners/${SERVER}/${summonerName}`).then((rawData) => {
    const $ = cheerio.load(rawData)
    const matchHistoryContainer = $('script#__NEXT_DATA__')
    const parsedData = JSON.parse(matchHistoryContainer.get()[0].children[0].data)

    res.json(parsedData.props.pageProps)
  })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log('Server running on port 3001')
})
