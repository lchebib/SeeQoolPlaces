import scrapy


class RestaurantsCaSpider(scrapy.Spider):
    name = 'restaurants_ca'
    allowed_domains = []
    start_urls = ['http://www.tripadvisor.ca/Restaurants-g28926-California.html/']

    """
    Scrapes the first page of regions within CA.
    Grabs and follows link to each region.
    """

    def parse(self, response):

        print('****************************************************')
        print('...............Parsing regions (first page)...............')

        region_links = response.xpath("//div[@class='geo_name']/a/@href")

        for region_link in region_links:
            yield response.follow(url=region_link, callback=self.parse_all_restaurants)

        second_page = response.xpath("//a[@class='nav next rndBtn ui_button primary taLnk']/@href").get()
        if second_page is not None:
            yield response.follow(url=second_page, callback=self.parse_regions)

    """
    Scrapes the second page onwards of regions within CA.
    Tripadvisor has it so that the first page has a completely different format than all other pages,
    therefore we needed a seperate function to parse those pages.
    Grabs and follows link to each region.
    """

    def parse_regions(self, response):
        print('****************************************************')
        print('...............Parsing regions...............')

        region_links = response.xpath("//ul[@class='geoList']/li/a/@href")

        for region_link in region_links:
            yield response.follow(url=region_link, callback=self.parse_all_restaurants)

        last_page = response.xpath("//span[@class='guiArw pageEndNext']")

        if (last_page is not None):
            next_page = response.xpath("//a[@class='guiArw sprite-pageNext  pid0']/@href").get()
            yield response.follow(url=next_page, callback=self.parse_regions)

    """
    Scrapes and follows link to each restaurant.
    """

    def parse_all_restaurants(self, response):

        if (response.xpath("//div[@id='PAGE']/@class").get() == " non_hotels_like desktop scopedSearch"):
            return self.parse(response)

        rest_links = response.xpath("//a[@class='bHGqj Cj b']/@href")

        for link in rest_links:
            yield response.follow(url=link, callback=self.parse_restaurant)

        next_page = response.xpath("//a[@class='nav next rndBtn ui_button primary taLnk']/@href").get()

        if (next_page is not None):
            yield response.follow(url=next_page, callback=self.parse_all_restaurants)

    """
    Scrapes restaurant information from restaurant page.
    """

    def parse_restaurant(self, response):
        restaurant_name = response.xpath("//h1[@class='fHibz']/text()").get()
        # address = response.xpath("//a[@class='fhGHT']/text()").get()
        rating = response.xpath("//a[@class='iPqaD _F G- ddFHE eKwUx']/*[local-name() = 'svg']/@title").get()
        num_reviews = response.xpath("//span[@class='eBTWs']/text()").get()
        rank_in_city = [response.xpath("//a[@class='fhGHT']/span/b/span/text()").get(), response.xpath("//a[@class='fhGHT']/span/text()").get()]
        tags = response.xpath("//a[@class='drUyy']/text()").getall()
        cost = ""
        if (tags):
            if ("$" in tags[0]):
                cost = tags.pop(0)

        yield {
            'restaurant_name': restaurant_name,
            # 'address': address,
            'rating': rating,
            'num_reviews': num_reviews,
            'rank_in_city': rank_in_city,
            'cost': cost,
            'categories': tags,

        }
