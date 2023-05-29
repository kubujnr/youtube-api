const express = require('express')
const ytdl = require('ytdl-core')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 8080

app.use(cors())

app.get('/', (req, res) => {
    res.send('<h2>Welcome to Experimental Youtube API.</h2>')
})

app.get('/video', async (req, res) => {
    const { url: videoUrl } = req.query;
  try {
    const videoInfo = await ytdl.getInfo(videoUrl);
    res.status(200).json(videoInfo);
  } catch (error) {
    console.log(error);

    res.status(500).json({error})
  }
})

app.get('/download-video', async (req, res) => {
  const { url, itag } = req.query;

  try {
    const videoStream = ytdl(url, { quality: itag });
    res.setHeader("Content-Disposition", `attachment; filename=video.mp4`);
    videoStream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.listen(PORT, () => {
    console.log(`Express app listen on port:${PORT}`);
})