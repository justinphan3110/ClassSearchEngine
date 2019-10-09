import scrapy
import csv
from pymongo import MongoClient
from scrapy_splash import SplashRequest
from lxml import html
import pdb
import re   

class sisSpider(scrapy.Spider):
  name = "sis"
  mainUrl = 'http://bulletin.case.edu/course-descriptions/'
  start_urls = ['https://sisguest.case.edu/psc/P92SCWR_newwin/EMPLOYEE/SA/c/SSR_STUDENT_FL.SSR_START_PAGE_FL.GBL?GMenu=SSR_STUDENT_FL&GComp=SSR_START_PAGE_FL&GPage=SSR_START_PAGE_FL&21&scname=CS_SSR_MANAGE_CLASSES_NAV&ICAJAXTrf=true']
#   start_urls = ['https://sisguest.case.edu/']
  courseList = []
  writer = None

  def start_requests(self):

      yield SplashRequest(url = self.start_urls[0], callback =self.searchClassForm, args={"wait":2})

  def searchClassForm(self, reponse):
      test = reponse.xpath("/html[@class='pc chrome linux psc_dir-ltr psc_mode-md psc_ajaxtrf psc_form-xlarge']/body/form[@id='SSR_MD_SP_FL']/div[@id='PT_WRAPPER']/div[@id='PT_HEADER']/div[@id='PT_HEADER_PANEL']/div[@id='win56divPSPAGECONTAINER_HDR']/div[@id='win56hdrdivPTLAYOUT_HEADER_GROUPBOX0']/div[@id='win56hdrdivPT_CUSTOM_BOTTOM']/div[@id='win56div$ICField101']/div[@id='win56divPT_PANEL2_CONTAIN']/div[@id='win56divPT_PANEL2_MAIN']/section[@id='win56divPT_PANEL2_CNTINNER']/div[@id='win56divCW_SR0047_WRK_GROUPBOX8']/div[@id='win56divPT_PANEL2_TITLE1']/div[@id='win56divCW_SR0047_WRK_GROUPBOX17']/div[@id='win56divCW_SR0047_WRK_GROUPBOX4']/div[@id='win56div$ICField131']/div[@id='win56div$ICField202']/div[@id='win56divCW_RSLT_NAV_WRK_HTMLAREA1']/div[@class='ps-htmlarea']")
      print("hello world")
      print(test)
      data = {'CW_CLSRCH_WRK2_PTUN_KEYWORD': 'EECS341'}
    #   yield scrapy.FormRequest(url=self.start_urls[0], formdata = data, callback=self.parse)


#   def parse(self, reponse):
    #   all_links = response.xpath('*//a/@href').extract()
    #   print("hello world")
    #   test = reponse.xpath("/html[@class='pc chrome linux psc_dir-ltr psc_mode-md psc_ajaxtrf psc_form-xlarge']/body/form[@id='SSR_MD_SP_FL']/div[@id='PT_WRAPPER']/div[@id='PT_HEADER']/div[@id='PT_HEADER_PANEL']/div[@id='win56divPSPAGECONTAINER_HDR']/div[@id='win56hdrdivPTLAYOUT_HEADER_GROUPBOX0']/div[@id='win56hdrdivPT_CUSTOM_BOTTOM']/div[@id='win56div$ICField101']/div[@id='win56divPT_PANEL2_CONTAIN']/div[@id='win56divPT_PANEL2_MAIN']/section[@id='win56divPT_PANEL2_CNTINNER']/div[@id='win56divCW_SR0047_WRK_GROUPBOX8']/div[@id='win56divPT_PANEL2_TITLE1']/div[@id='win56divCW_SR0047_WRK_GROUPBOX17']/div[@id='win56divCW_SR0047_WRK_GROUPBOX4']/div[@id='win56div$ICField131']/div[@id='win56div$ICField202']/div[@id='win56divCW_RSLT_NAV_WRK_HTMLAREA1']/div[@class='ps-htmlarea']")
    #   print(test)
    #   print()