const bodyParser = require("body-parser");
const translate = require('@vitalets/google-translate-api');
var app = require('./app');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res, next) => {
    res.status(200);
    res.send({status:'OK', message:'Ready to rock.'});
});

app.post('/translate',(req,res,next)=>{
    var text = req.body.text;
    var lang = req.body.lang;
    translate(text, {to: lang}).then(data => {
        console.log(data.text);
        //=> I speak English
        console.log(data.from.language.iso);
        //=> nl
        res.status(200)
        res.send({text: data.text});
    }).catch(err => {
        console.error(err);
    }); 
});

app.post('/detect',(req,res,next)=>{
    var text = req.body.text;
    translate(text, {to: 'en'}).then(data => {
        console.log(data.text);
        //=> I speak English
        console.log(data.from.language.iso);
        //=> nl
        res.status(200)
        res.send({iso: data.from.language.iso});
    }).catch(err => {
        console.error(err);
    });
});
app.listen(8000);