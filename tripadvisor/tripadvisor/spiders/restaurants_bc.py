import scrapy
import requests
from bs4 import BeautifulSoup


class RestaurantsBcSpider(scrapy.Spider):
    name = 'restaurants_bc'
    allowed_domains = []
    start_urls = ['http://www.tripadvisor.ca/Restaurants-g154922-British_Columbia.html/']

    counter = 0

    def parse(self, response):
        
        print('****************************************************')
        print('...............Parsing regions (first page)...............')
        
        region_links = response.xpath("//div[@class='geo_name']/a/@href")

        for region_link in region_links:
            yield response.follow(url=region_link, callback=self.parse_all_restaurants)

        # second_page = response.xpath("//a[@class='nav next rndBtn ui_button primary taLnk']/@href").get()
        # if second_page is not None:
        #     yield response.follow(url=second_page, callback=self.parse_regions)


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

        # if (response.xpath("//div[@id='PAGE']/@class" == " non_hotels_like desktop scopedSearch")):
        #     return self.parse(response)
    

        links = response.xpath("//a[@class='bHGqj Cj b']/@href")

        for link in links:
            yield response.follow(url=link, callback=self.parse_restaurant)



    def parse_restaurant(self, response):
        restaurant_name = response.xpath("//h1[@class='fHibz']/text()").get()
        address = response.xpath("//a[@class='fhGHT']/text()").get()
        rating = response.xpath("//a[@class='iPqaD _F G- ddFHE eKwUx']/*[local-name() = 'svg']/@title").get()
        num_reviews = response.xpath("//span[@class='eBTWs']/text()").get()
        tripadvisor_rating = [response.xpath("//a[@class='fhGHT']/span/b/span/text()").get(), response.xpath("//a[@class='fhGHT']/span/text()").get()]
        tags = response.xpath("//a[@class='drUyy']/text()").getall()
        cost = tags.pop(0)
        website = self.parse_url(response.url)
        # website = response.xpath("(//a[@class='dOGcA Ci Wc _S C fhGHT'])[1]").getall()
        # hours = response.xpath("//div[@class='cFfqI']/div/span/span/text()").get()
        # for x in range (7):
        #     if hours[1] == "PM":
        # sun = [hours[0]]
        # mon = []
        # tues = []
        # weds = []
        # thurs = []
        # fri = []
        # sat = []
        # google_maps_link = response.xpath("(//a[@class='dOGcA Ci Wc _S C dkdrG'])[1]/@href").get()

        
        yield {
            'restaurant_name': restaurant_name,
            'address': address,
            'rating': rating,
            'num_reviews': num_reviews,
            'tripadvisor_rating': tripadvisor_rating,
            'cost': cost,
            'tags': tags,
            # 'website': website,
            # 'google_maps_link': google_maps_link
    
        }




    # def parse_int(self, text):
    #     digit_list = [char for char in text if char.isdigit()]
    #     digit_string = ''.join(digit_list)
    #     digit = int(digit_string)
    #     return digit
        
    def parse_url(self, page):
        html = requests.get(page).text
        soup = BeautifulSoup(html, 'html.parser')
        link = soup.find(class_= 'dOGcA Ci Wc _S C fhGHT')
        return link

        
