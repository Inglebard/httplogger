const bodyParser = require('body-parser')
const express = require('express')

const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//
// // parse application/json
// app.use(bodyParser.json())

var logArray=[];

function escapeHtml(unsafe) {
  return unsafe
       .replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;")
       .replace(/'/g, "&#039;");
} 


app.use(function (req, res, next) {
	var logLine="";
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	logLine += "["+new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })+"] "+ req.method +" "+fullUrl; 
	var params="";
	if(Object.keys(req.query).length != 0 )
	{
		if(params!="")
		{
			params+=", ";
		}
		params+="Query : "+JSON.stringify(req.query)+"; ";
	}
	if(Object.keys(req.params).length != 0 )
	{
		if(params!="")
		{
			params+=", ";
		}
		params+="Params : "+JSON.stringify(req.params)+"; ";
	}
	if(Object.keys(req.body).length != 0 )
	{
		if(params!="")
		{
			params+=", ";
		}
		params+="Body : "+JSON.stringify(req.body)+";"
    }
	if(params!="")
	{
		logLine +=", "+params;
	}

	if(typeof req.query.nolog == "undefined")
	{
		if(logArray.length >= 1000 && !req.query.nolog)
		{
			logArray.shift();
		}
		logArray.push(escapeHtml(logLine));
	}
	next();
});



app.get('*', (req, res) => {
	  res.send(logArray.join('<br/>'));
})

app.listen(port, () => {
	  console.log(`App listening at http://localhost:${port}`)
})

