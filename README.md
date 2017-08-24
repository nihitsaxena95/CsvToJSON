Project Title: CSV-to-JSON

About the project: It is a simple project that converts the CSV file(Indicators.csv) into three JSON files(asia.json, india.json, top.json), based on the requirements to make the charts and graphs. It is a simple CSV to JSON converter for LifeExpectancy data,using JavaScript ES-6, which works for the given csv file and conditions specific to project only.

Prerequisites: Your system must have latest version of node js installed and a text editor.

Built with: JavaScript

Description: Indicators.csv is a file that contains data in form of comma seperated values. The data from the file is received in asynchronous manner, using readStream. The wdi.js ia a javaScript file that creates three JSON files,for plotting graphs of:

   Data cumulated for Asian countries over the years supplied (1960 - 2015) ->Life expectancy at birth, female (years) ->Life expectancy at birth, male (years)
   India over the years supplied (1960 - 2015) -> Birth rate, crude (per 1,000 people) ->Death rate, crude (per 1,000 people)
   Top 5 countries with highest Life expectancy at birth, total (years) in the given time period of 1960 - 2015