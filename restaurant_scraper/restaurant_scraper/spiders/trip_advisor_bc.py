import scrapy
import requests
from bs4 import BeautifulSoup



class TripAdvisorBcSpider(scrapy.Spider):
    name = 'trip_advisor_bc'
    allowed_domains = []
    start_urls = ['http://www.tripadvisor.ca/Restaurants-g154922-British_Columbia.html/']

    counter = 0

    def parse(self, response):
        
        print('****************************************************')
        print('...............Parsing regions (first page)...............')
        
        region_links = response.xpath("//div[@class='geo_name']/a/@href")

        for region_link in region_links:
            yield response.follow(url=region_link, callback=self.parse_all_restaurants)

        second_page = response.xpath("//a[@class='nav next rndBtn ui_button primary taLnk']/@href").get()
        if second_page is not None:
            yield response.follow(url=second_page, callback=self.parse_regions)

    def parse_regions(self, response):
        
        print('****************************************************')
        print('...............Parsing regions...............')

        region_links = response.xpath("//ul[@class='geoList']/li/a/@href")

        for region_link in region_links:
            yield response.follow(url=region_link, callback=self.parse_all_restaurants)


        last_page = response.xpath("//span[@class='guiArw pageEndNext']")

        if (last_page is not None) and (self.counter < 3):
            next_page = response.xpath("//a[@class='guiArw sprite-pageNext  pid0']/@href").get()
            yield response.follow(url=next_page, callback=self.parse_regions)
            self.counter =+ 1



        
    def parse_all_restaurants(self, response):
        
        links = response.xpath("//a[@class='bHGqj Cj b']/@href")

        for link in links:
            yield response.follow(url=link, callback=self.parse_restaurant)



    def parse_restaurant(self, response):


        restaurant_name = response.xpath("//h1[@class='fHibz']/text()").get()
        address = response.xpath("//a[@class='fhGHT']/text()").get()
        # cost = response.xpath("//tag[@class='fhGHT']//text()").get()
        # rating = response.xpath("//tag[@attribute='atribute_name']//text()").get()
        # num_reviews = response.xpath("//tag[@attribute='atribute_name']//text()").get()
        # tags = response.xpath("//tag[@attribute='atribute_name']//text()").get()
        # hours = response.xpath("//tag[@attribute='atribute_name']//text()").get()
        
        yield {
            'restaurant_name': restaurant_name,
            'address': address
            # 'cost': cost,
            # 'rating': rating,
            # 'num_reviews': num_reviews,
            # 'tags': tags,
            # 'hours': hours
        }




    # def parse_int(self, text):
    #     digit_list = [char for char in text if char.isdigit()]
    #     digit_string = ''.join(digit_list)
    #     digit = int(digit_string)
    #     return digit
        
    # def parse_urls(self, page):
    #     html = requests.get(page).text
    #     soup = BeautifulSoup(html, 'html.parser')
    #     tags = soup.find_all('a')
    #     urls = [tag.get('href') for tag in tags]
    #     urls = [url.replace('\\', '') for url in urls]
    #     urls = [url.replace('\"', '') for url in urls]
    #     return urls

        
