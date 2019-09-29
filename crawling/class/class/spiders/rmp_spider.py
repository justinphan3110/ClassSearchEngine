import scrapy
import csv
from pymongo import MongoClient
from lxml import html
import pdb
import re  
from scrapy.http import HtmlResponse

class ratemProf(scrapy.Spider):
    name = "prof"
    start_urls = ['https://www.ratemyprofessors.com/ShowRatings.jsp?tid=1626731&showMyProfs=true']

    def parse(self, reponse):
        response = HtmlResponse(url='https://www.ratemyprofessors.com/ShowRatings.jsp?tid=1626731&showMyProfs=true')
        # overallGrade = 
        print("hello")
        print(response)