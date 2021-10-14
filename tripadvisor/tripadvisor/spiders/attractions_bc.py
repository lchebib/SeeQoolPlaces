import scrapy


class AttractionsBcSpider(scrapy.Spider):
    name = 'attractions_bc'
    allowed_domains = []
    start_urls = [
        'http://www.tripadvisor.ca/Attractions-g154922-Activities-a_allAttractions.true-British_Columbia.html/']
    
    counter = 0

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
        next_page = response.xpath("//a[@class='dfuux f u j _T z _F _S ddFHE bVTsJ emPJr']/@href").get()

        # if (last_page is not None) and (self.counter < 3):
        if (next_page is not None) and (self.counter < 3):
            # next_page = response.xpath("//a[@class='dfuux f u j _T z _F _S ddFHE bVTsJ emPJr']/@href").get()
            yield response.follow(url=next_page, callback=self.parse)
            self.counter =+ 1

    # not working: attraction rating, website_link, photo, about
    def parse_attraction(self, response):
        attraction_name = response.xpath(
            "//h1[@class='WlYyy cPsXC GeSzT']/text()").get()
        # seems fixed:
        attraction_rating = response.xpath(
            "//div[@class='WlYyy cPsXC fksET cMKSg']/text()").get()
        attraction_category = response.xpath(
            "(//div[@class='WlYyy diXIH dDKKM'])[5]/text()").get()
        rank_in_city = response.xpath(
            "(//div[@class='WlYyy diXIH dDKKM'])[4]/text()").get()
        # TODO
        # website_link = response.xpath(
        #     "(//div[@class='fvqxY f dlzPP'])[1]").get()
        # kind of fixed; get the whole div
        photo = response.xpath(
            "(//div[@class='eMVst _R w h GA'])[1]/@style").get()
        # maybe
        about = response.xpath(
            "(//div[@class='WlYyy diXIH dDKKM'])[14]").get()
        suggested_duration = response.xpath(
            "//div[@class='cYygO _c']/text()").get()

        yield {
            'attraction_name': attraction_name,
            'attraction_rating': attraction_rating,
            'attraction_category': attraction_category,
            #TODO
            # 'website_link': website_link,
            'rank_in_city': rank_in_city,
            'photo': photo,
            'about': about,
            'suggested_duration': suggested_duration
        }
