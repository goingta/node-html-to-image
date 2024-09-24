const express = require('express');
const app = express();
const port = 8080;

const nodeHtmlToImage = require('node-html-to-image');

// 你的 key
const yourSecretKey = 'gthti';


const validKey = (requiredKey) => {
    return (req, res, next) => {
      const headerKey = req.headers['x-api-key'];
  
      if (headerKey && headerKey === requiredKey) {
        next(); // 如果 key 匹配，继续下一个中间件或路由处理
      } else {
        res.status(403).send('Forbidden: Invalid key');
      }
    };
  };

app.get(`/api/html_to_image`, validKey(yourSecretKey), async function(req, res) {
    const query = req.query;
    const html = query.htmlcode_htmlurl;
    const imgformat = query.imgformat || 'jpeg';
    const image = await nodeHtmlToImage({
      html: html
    });
    res.writeHead(200, { 'Content-Type': 'image/' + imgformat });
    res.end(image, 'binary');
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});