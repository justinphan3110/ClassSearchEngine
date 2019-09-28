import scrapy
import csv
from pymongo import MongoClient
import pdb
import re   

class StockSpider(scrapy.Spider):
  name = "class"
  mainUrl = 'http://bulletin.case.edu/course-descriptions/'
  start_urls = ['http://bulletin.case.edu/course-descriptions/#text']
  courseList = []
  writer = None


  def __init__(self):
        connection = MongoClient('localhost', 27017)
        db = connection['classCrawling']
        db['class'].drop()
        self.collection = db['class']

  def parse(self, response):
    #  title = response.xpath("//html/body[@class=' coursedescs']/div[@id='content-wrapper']/div[@class='wrap clearfix']/div[@id='right-col']/div[@id='content']/div[@id='textcontainer']/ul[1]/li[1]/a/strong/text()").extract()[0]
    for ul in range(42):
         for li in range(50):
            test  = response.xpath("/html/body[@class=' coursedescs']/div[@id='content-wrapper']/div[@class='wrap clearfix']/div[@id='right-col']/div[@id='content']/div[@id='textcontainer']/ul[" + str(ul) +"]"+"/li[" + str(li) + "]/u/a/text()").get()
            if test is not None:
                self.courseList.append(test.split()[0][1:-1])
    
    for course in self.courseList:
        link = self.mainUrl + course.lower() + '/'
        # print(link)
        yield scrapy.Request(link, callback = self.parse_course, meta = {'courseSection' : course})



  def parse_course(self,response):
    # courseSection = response.meta.get('courseSection')
    for n in range (300):
        title = response.xpath("/html/body/div[@id='content-wrapper']/div[@class='wrap clearfix']/div[@id='right-col']/div[@id='content']/div[@id='textcontainer']/div[@class='sc_sccoursedescs']/div[@class='courseblock']["+ str(n) +"]/p[@class='courseblocktitle']/strong/text()").get()
        description = response.xpath("/html/body/div[@id='content-wrapper']/div[@class='wrap clearfix']/div[@id='right-col']/div[@id='content']/div[@id='textcontainer']/div[@class='sc_sccoursedescs']/div[@class='courseblock'][" + str(n) + "]/p[@class='courseblockdesc']/text()").get()
        if title is not None and description is not None:
            self.writeMongo(title.lower(), description.lower())
            self.initAndWriteCSV(title.lower(), description.lower())


  def writeMongo(self,title, description):
      self.collection.insert_one({'CODE': title.split('.')[0].split()[0].strip()
                         , 'ID': title.split('.')[0].split()[1].strip()
                         , 'NAME': title.split('.')[1].strip()
                         , 'Unit': title.split('.')[2].strip().rsplit(' ', 1)[0].strip()
                         , 'Description': description[1:-1]})


  def initAndWriteCSV(self, title, description):
      if self.writer is None:
        file_name = open('class.csv','w')
        self.writer = csv.DictWriter(file_name, fieldnames=['CODE', 'ID', 'NAME', 'Unit', 'Description'])
        self.writer.writeheader()
      self.writeCSV(title.lower(), description)


  def writeCSV(self, title, description):
    # title = title.split('.')
    # print(title)
    print(description[1:-1])
    self.writer.writerow({'CODE': title.split('.')[0].split()[0].strip()
                         , 'ID': title.split('.')[0].split()[1].strip()
                         , 'NAME': title.split('.')[1].strip()
                         , 'Unit': title.split('.')[2].strip().rsplit(' ', 1)[0].strip()
                         , 'Description': description[1:-1]}) 