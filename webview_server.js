const express =require('express');
const expressReactViews= require('express-react-views');
const path= require ('path');

const app = express();

//app.set('views', path.join(__dirname, './src/components'));
app.engine('jsx', expressReactViews.createEngine());
app.set('view engine', 'jsx');

app.use(express.static(path.join(__dirname, './out/webview/')))
const port=3000
app.listen(port);
console.log(`port number = ${port}`)