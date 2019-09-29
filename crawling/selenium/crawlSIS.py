from selenium import webdriver

chrome_path = r'/home/long/github/ClassSearchEngine/lib/chromedriver'
driver = webdriver.Chrome(chrome_path)
driver.get("https://sisguest.case.edu")