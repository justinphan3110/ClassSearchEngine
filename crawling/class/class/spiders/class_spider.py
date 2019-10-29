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
  termMap = {'spring2018', 'summer2018', 'fall2018', 'spring2019', 'summer2019', 'fall2019','spring2020'}
  writer = None


  def __init__(self):
        connection = MongoClient('localhost', 27017)
        self.db = connection['classCrawling']
        self.db['class'].drop()
        self.collection = self.db['class']

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
            # self.initAndWriteCSV(title.lower(), description.lower())


  def writeMongo(self,title, description):
      subject = title.split('.')[0].split()[0].strip()
      catalog = title.split('.')[0].split()[1].strip()
      self.collection.insert_one({'Subject': subject
                         , 'Catalog': title.split('.')[0].split()[1].strip()
                         , 'Title': title.split('.')[1].strip()
                         , 'Credit': title.split('.')[2].strip().rsplit(' ', 1)[0].strip()
                         , 'Description': description[1:-1]
                         , 'Code': subject + catalog + " / " + subject + " " + catalog
                         , 'Term': self.termOffered(subject + catalog)
                         })

  def classInfo(self, code):
      query = {'Code': code}
      # print(code)
      termDict = []
      for term in self.termMap:
        termCol = self.db[self.termMap[term]]
        # print(self.termMap[term])
        cursor = termCol.find(query)
        # meeting = []
        for m in cursor:
          classNum = m['number']
          # del m['number']
          del m['_id']
          m['Term'] = self.termMap[term]
          # print("termMap: " + m)
          termDict.append(m)
        # if len(meeting) > 0:
        #   termDict.append(meeting)

      return termDict

  def termOffered(self, code):
        query = {'Code': code}
        termDict = ""
        for term in self.termMap:
          termCol = self.db[term]
          cursor = termCol.find(query)
          if cursor.count() != 0:
            # print(term)
            termDict += term + " "

        return termDict.strip()


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