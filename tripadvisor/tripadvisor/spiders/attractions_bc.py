import scrapy


class AttractionsBcSpider(scrapy.Spider):
    name = 'attractions_bc'
    allowed_domains = []
    start_urls = [
        'http://www.tripadvisor.ca/Attractions-g154922-Activities-a_allAttractions.true-British_Columbia.html/']
    
    counter = 0
    num_results = 8612
    results_parsed = 30
    
    def parse(self, response):

        print('****************************************************')
        print('...............Parsing attractions (first page)...............')

        # collect links for attractions here

        attraction_links = response.xpath(
            "//div[@class='fVbwn cdAAV cagLQ eZTON dofsx']/a[1]/@href")

        for attraction_link in attraction_links:
            yield response.follow(url=attraction_link, callback=self.parse_attraction)

        # TODO WORKING ON THIS
        # last_page = response.xpath("")

        while (self.results_parsed < self.num_results) and (self.counter < 3): # uncomment to scrape all trails

            print(f'...............Attractions remaining: {self.num_results - self.results_parsed}...............')

            next_page = f'https://www.tripadvisor.ca/Attractions-g154922-Activities-oa{self.results_parsed}-British_Columbia.html'
            yield response.follow(url=next_page, callback=self.parse)
            self.results_parsed += 30
            self.counter += 1
            
        print(f'...............Finished parsing...............')
        print('****************************************************')


    # not working: attraction rating, website_link, photo, about
    def parse_attraction(self, response):
        attraction_name = response.xpath(
            "//h1[@class='WlYyy cPsXC GeSzT']/text()").get()
        # seems fixed:
        attraction_rating = response.xpath(
            "//div[@class='WlYyy cPsXC fksET cMKSg']/text()").get()
        attraction_category = response.xpath(
            "(//div[@class='WlYyy diXIH dDKKM'])[5]/text()").get()
        num_reviews = response.xpath(
            "(//span[@class='cfIVb'])[1]/text()").get()
        rank_in_city = response.xpath(
            "(//div[@class='WlYyy diXIH dDKKM'])[4]/text()").get()
        photo = response.xpath(
            "(//div[@class='eMVst _R w h GA'])[1]/@style").get()
        about = response.xpath(
            "(//div[@class='WlYyy diXIH dDKKM'])[14]").get()
        suggested_duration = response.xpath(
            "//div[@class='cYygO _c']/text()").get()

        yield {
            'attraction_name': attraction_name,
            'attraction_rating': attraction_rating,
            'attraction_category': attraction_category,
            'num_reviews': num_reviews,
            'rank_in_city': rank_in_city,
            'photo': photo,
            'about': about,
            'suggested_duration': suggested_duration
        }
