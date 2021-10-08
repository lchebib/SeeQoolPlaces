import scrapy


class AttractionsCaSpider(scrapy.Spider):
    name = 'attractions_ca'
    allowed_domains = ['www.tripadvisor.ca/Attractions-g28926-Activities-a_allAttractions.true-California.html']
    start_urls = ['http://www.tripadvisor.ca/Attractions-g28926-Activities-a_allAttractions.true-California.html/']

    def parse(self, response):
        pass
