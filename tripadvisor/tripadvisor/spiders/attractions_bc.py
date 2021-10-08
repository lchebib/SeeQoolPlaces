import scrapy


class AttractionsBcSpider(scrapy.Spider):
    name = 'attractions_bc'
    allowed_domains = []
    start_urls = ['http://www.tripadvisor.ca/Attractions-g154922-Activities-a_allAttractions.true-British_Columbia.html/']

    def parse(self, response):
            
            print('****************************************************')
            print('...............Parsing attractions (first page)...............')
            
            # collect links for attractions here

            attraction_links = response.xpath("//div[@class='fVbwn cdAAV cagLQ eZTON dofsx']/a[1]/@href")

            for attraction_link in attraction_links:
                yield response.follow(url=attraction_link, callback=self.parse_attraction)

            #TODO 
            # last_page = response.xpath("//span[@class='guiArw pageEndNext']")

            # if (last_page is not None) and (self.counter < 3):
            #     next_page = response.xpath("//a[@class='guiArw sprite-pageNext  pid0']/@href").get()
            #     yield response.follow(url=next_page, callback=self.parse)
            #     self.counter =+ 1

    def parse_attraction(self, response):
        attraction_name = response.xpath("//h1[@class='WlYyy cPsXC GeSzT']/text()").get()
        attraction_rating = response.xpath("(//div[@class='RTVWf o W f u w eeCyE'])[1]/text()").get()
        attraction_category = response.xpath("(//div[@class='WlYyy diXIH dDKKM'])[5]/text()").get()
        rank_in_city = response.xpath("(//div[@class='WlYyy diXIH dDKKM'])[4]/text()").get()
        website_link = response.xpath("(//div/a[@class='bfQwA _G B- _S _T c G_ P0 ddFHE cnvzr bTBvn'])[1]/@href").get()
        photo = response.xpath("(//div[@class='eMVst _R w h GA'])[1]/@href").get()
        about = response.xpath("(//div[@class='duhwe _T bOlcm'])[1]/text()").get()
        suggested_duration = response.xpath("//div[@class='cYygO _c']/text()").get()
            
        yield {
            'attraction_name': attraction_name,
            'attraction_rating': attraction_rating,
            'attraction_category': attraction_category,
            'website_link': website_link,
            'rank_in_city': rank_in_city,
            'photo': photo,
            'about': about,
            'suggested_duration': suggested_duration
        }


            
