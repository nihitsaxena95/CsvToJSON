let fs = require('fs');
let MaindataReader = fs.createReadStream('Indicators.csv','UTF-8');
let TopfiveWriter = fs.createWriteStream('Total.json');
let AsianWriter = fs.createWriteStream('Asia.json');
let IndianWriter = fs.createWriteStream('India.json');
let Asianmain={},Indiamain ={},Topmain=[];
MaindataReader.on('data',(chunk)=> {
	let data;
	data += chunk;
	data.trim().split('\n').map((line) => {
		let extra = line.split('\t');
		let Element = extra[0].split(",");
		if(Element[Element.length - 3] == "SP.DYN.LE00.IN") {
				Topmain.push({	Country : Element[0],
								CountryCode : (Element[1].length == 3)?Element[1]:Element[2],
								Year : Element[Element.length - 2],
								TotalVal : Element[Element.length - 1]   })
			}
		if(Element[1] == "IND") {
			if(Element[Element.length - 3] == "SP.DYN.CBRT.IN" ) {
				Indiamain[Element[Element.length - 2]] = Indiamain[Element[Element.length - 2]] || [];
				Indiamain[Element[Element.length - 2]].push({	CountryCode : Element[1],
																"Birth rate, crude (per 1,000 people)" : Element[Element.length - 1]	})
			} else if(Element[Element.length - 3] == "SP.DYN.CDRT.IN") {
				Indiamain[Element[Element.length - 2]] = Indiamain[Element[Element.length - 2]] || [];
				Indiamain[Element[Element.length - 2]].push({	CountryCode : Element[1],
																"Death rate, crude (per 1,000 people)" : Element[Element.length - 1]  })
			}
		}
		if(asia.find(x => x === Element[1]) != undefined) {
			if(Element[Element.length - 3] == 'SP.DYN.LE00.FE.IN') {
				Asianmain[Element[Element.length - 2]] = Asianmain[Element[Element.length - 2]] || [];
				Asianmain[Element[Element.length - 2]].push({	CountryCode : Element[1],
																CountryName : Element[0],
																"Life expectancy at birth, female (years)" : Element[Element.length - 1]	})	
		} else if(Element[Element.length - 3] == 'SP.DYN.LE00.MA.IN') {
				Asianmain[Element[Element.length - 2]] = Asianmain[Element[Element.length - 2]] || [];
				Asianmain[Element[Element.length - 2]].push({	CountryCode : Element[1],
																CountryName : Element[0],
																"Life expectancy at birth, males (years)" : Element[Element.length - 1] 	})
			}
		}
	})
})
MaindataReader.on('end',() => {
let i = 1,a = [];
Topmain.sort( (p, p2) => {return p.TotalVal - p2.TotalVal }); 
while(i<=5) { a.push(Topmain[Topmain.length - i++]) }
	TopfiveWriter.write(JSON.stringify(a,null,2),'UTF-8');	
	IndianWriter.write(JSON.stringify(Indiamain,null,2),'UTF-8');
	AsianWriter.write(JSON.stringify(Asianmain,null,2),'UTF-8');
});
let asia=['ARM', 'AZE', 'BHR', 'BGD', 'BTN', 'BRN', 'KHM', 'CHN', 'CXR', 'CCK', 'IOT', 'GEO', 'HKG', 'IND', 'IDN', 'IRN', 'IRQ', 'ISR', 'JPN', 'JOR', 'KAZ', 'KWT', 'KGZ', 'LAO', 'LBN', 'MAC', 'MYS', 'MDV', 'MNG', 'MMR', 'NPL', 'PRK', 'OMN', 'PAK', 'PSE', 'PHL', 'QAT', 'SAU', 'SGP', 'KOR', 'LKA', 'SYR', 'TWN', 'TJK', 'THA', 'TUR', 'TKM', 'ARE', 'UZB', 'VNM', 'YEM'];