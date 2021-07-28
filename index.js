const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const homeFile = fs.readFileSync('home.html','utf-8');
// console.log(homeFile);
const requests = require('requests');
const replaceVal = (temp,obj) => {
    let temperature = temp.replace("{%tempVal%}",(obj.main.temp-273.15).toFixed(2));
    temperature = temperature.replace("{%tempmin%}",(obj.main.temp_min-273.15).toFixed(2));
    temperature = temperature.replace("{%tempmax%}",(obj.main.temp_max-273.15).toFixed(2));
    temperature = temperature.replace("{%tempstatus%}",obj.weather[0].main);
    temperature = temperature.replace("{%location%}",obj.name);
    temperature = temperature.replace("{%country%}",obj.sys.country);
    return temperature;
    // temperature = temperature.replace("{%tempmin%}",obj.main.temp_min);
};
const server = http.createServer((req,res) => {
    if( req.url == '/'){
        requests("http://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=2830ae02ec5e1bdb1927c61686a0460f")
        .on("data", (chunk) => {
            const objData = JSON.parse(chunk)
            const arrData = [objData];
            console.log(arrData);
            // console.log(arrData[0].main);
            // const result = arrData.map((val) => {
            const result = replaceVal(homeFile,arrData[0])
            // });
            res.write(result);  
        })
        .on("end", (err) => {
            if (err) return console.log("connection closed due to errors",err);
            console.log("end");
            res.end();
        })

    }
})
server.listen(3000,'127.0.0.1',() => {
    console.log("Listening to the port 3000!!!");
});










// // Using Express.. server.js
// const http = require('http');
// const express = require('express');


// // Define Express App
// const app = express();
// const requests = require('requests');
// const PORT = process.env.PORT || 8080;
// const fs = require('fs');
// const homeFile = fs.readFileSync('home.html','utf-8');

// // Serve Static Assets
// app.use(express.static('public'));
// const replaceVal = (temp,obj) => {
//     app.use(express.static('public'));
//     let temperature = temp.replace("{%tempVal%}",obj.main.temp);
//     temperature = temperature.replace("{%tempmin%}",obj.main.temp_min);
//     temperature = temperature.replace("{%tempmax%}",obj.main.temp_max);
//     temperature = temperature.replace("{%location%}",obj.name);
//     temperature = temperature.replace("{%country%}",obj.sys.country);
//     return temperature;
//     // temperature = temperature.replace("{%tempmin%}",obj.main.temp_min);
// };

// // const server = http.createServer((req,res) => {
// //         if( req.url == '/'){
//     app.get("/", (req,res) => {
//             requests("http://api.openweathermap.org/data/2.5/weather?q=Pune&appid=2830ae02ec5e1bdb1927c61686a0460f")
//             .on("data", (chunk) => {
//                 const objData = JSON.parse(chunk)
//                 const arrData = [objData];
//                 console.log(arrData);
//                 // console.log(arrData[0].main);
//                 // const result = arrData.map((val) => {
//                 const result = replaceVal(homeFile,arrData[0])
//                 // });
//                 res.write(result);  
//             })
//             .on("end", (err) => {
//                 if (err) return console.log("connection closed due to errors",err);
//                 console.log("end");
//                 res.end();
//             })
//         });
    
//     //     }
//     // })

// app.listen(PORT, () => {
//     console.log('Server connected at:', PORT);
// });