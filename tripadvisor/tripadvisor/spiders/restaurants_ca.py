import scrapy


class RestaurantsCaSpider(scrapy.Spider):
    name = 'restaurants_ca'
    allowed_domains = ['www.tripadvisor.ca/Restaurants-g28926-California.html']
    start_urls = ['http://www.tripadvisor.ca/Restaurants-g28926-California.html/']

    def parse(self, response):
        pass
