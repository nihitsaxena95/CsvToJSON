let fs = require('fs');
let MaindataReader = fs.createReadStream('./../json/Indicators.csv','UTF-8');
let TopfiveWriter = fs.createWriteStream('./../json/Total.json');
let AsianWriter = fs.createWriteStream('./../json/Asia.json');
let IndianWriter = fs.createWriteStream('./../json/India.json');
let Asianmain=[],Indiamain =[],Topmain=[];
MaindataReader.on('data',(chunk)=> {
	let data;
	data += chunk;
	data.trim().split('\n').map((line) => {
		let extra = line.split('\t');
		let Element = extra[0].split(",");
		if(Element[Element.length - 3] == "SP.DYN.LE00.IN") {
				Topmain.push({	Country : Element[0],
								TotalVal : Element[Element.length - 1]   })
			}
		if(Element[1] == "IND" && (Element[Element.length - 3] == "SP.DYN.CBRT.IN" || Element[Element.length - 3] == "SP.DYN.CDRT.IN")) {
				if(Indiamain.find(x => x.year == Element[Element.length - 2]) == undefined) {
					let temp = { year : Element[Element.length - 2] }
					temp[(Element[Element.length - 3] == "SP.DYN.CBRT.IN")?"BIRTH":"DEATH"] = parseFloat(Element[Element.length - 1]);
					Indiamain.push(temp);
				}
				else {
					let index = Indiamain.findIndex(x => x.year == Element[Element.length -2]);
					Indiamain[index][(Element[Element.length - 3] == "SP.DYN.CBRT.IN")?"BIRTH":"DEATH"] = parseFloat(Element[Element.length - 1]);
				}
		}
		if(asia.find(x => x === Element[1]) != undefined && (Element[Element.length - 3] == "SP.DYN.LE00.FE.IN" || Element[Element.length - 3] == "SP.DYN.LE00.MA.IN")) {
		if(Asianmain.find(x => (x.Country == Element[1])) == undefined) {
					let temp = {Country : (Element[1].length == 3)?Element[1]:Element[2] }
					temp[(Element[Element.length - 3] == "SP.DYN.LE00.FE.IN")?"LifeExpectancyFemale":"LifeExpectancyMale"] = parseFloat(Element[Element.length - 1]);
					Asianmain.push(temp);
				}
				else {
					let index = Asianmain.findIndex(x => x.Country == Element[1]);
					if(Asianmain[index][(Element[Element.length - 3] == "SP.DYN.LE00.FE.IN")?"LifeExpectancyFemale":"LifeExpectancyMale"] == undefined) {
					Asianmain[index][(Element[Element.length - 3] == "SP.DYN.LE00.FE.IN")?"LifeExpectancyFemale":"LifeExpectancyMale"] = parseFloat(Element[Element.length - 1]);
					} else {
						Asianmain[index][(Element[Element.length - 3] == "SP.DYN.LE00.FE.IN")?"LifeExpectancyFemale":"LifeExpectancyMale"] = Asianmain[index][(Element[Element.length - 3] == "SP.DYN.LE00.FE.IN")?"LifeExpectancyFemale":"LifeExpectancyMale"] + parseFloat(Element[Element.length - 1]);
					}
				}
		}
	})
})
MaindataReader.on('end',() => {
let i = 1,a = [];
Topmain.sort( (p, p2) => {return p.TotalVal - p2.TotalVal }); 
while(a.length < 5) {
 if(a.find(x => x.Country == Topmain[Topmain.length - i]["Country"]) == undefined) {
 	let temp = {	Country : Topmain[Topmain.length - i]["Country"],
 					TotalVal : Topmain[Topmain.length - i]["TotalVal"] }
 	a.push(temp);
 }
i++;
}
	TopfiveWriter.write(JSON.stringify(a,null,2),'UTF-8');	
	IndianWriter.write(JSON.stringify(Indiamain,null,2),'UTF-8');
	AsianWriter.write(JSON.stringify(Asianmain,null,2),'UTF-8');
});
let asia=['ARM', 'AZE', 'BHR', 'BGD', 'BTN', 'BRN', 'KHM', 'CHN', 'CXR', 'CCK', 'IOT', 'GEO', 'HKG', 'IND', 'IDN', 'IRN', 'IRQ', 'ISR', 'JPN', 'JOR', 'KAZ', 'KWT', 'KGZ', 'LAO', 'LBN', 'MAC', 'MYS', 'MDV', 'MNG', 'MMR', 'NPL', 'PRK', 'OMN', 'PAK', 'PSE', 'PHL', 'QAT', 'SAU', 'SGP', 'KOR', 'LKA', 'SYR', 'TWN', 'TJK', 'THA', 'TUR', 'TKM', 'ARE', 'UZB', 'VNM', 'YEM'];