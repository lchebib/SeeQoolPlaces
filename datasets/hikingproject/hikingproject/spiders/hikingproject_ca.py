import re
import scrapy
import requests
from bs4 import BeautifulSoup


class HikingprojectCaSpider(scrapy.Spider):
    name = 'hikingproject_ca'
    allowed_domains = []
    start_urls = ['https://www.hikingproject.com/directory/8007121/california']

    def parse(self, response):
        trail_rows = response.xpath("//tr[@class='trail-row']")

        print('****************************************************')
        print('...............Parsing trails...............')

        rank = 1

        for row in trail_rows:
            link = row.xpath(".//td/a/@href").get()
            # rank = row.xpath(".//td/a/span/text()").get()
            location = row.xpath(".//td[3]/text()").get()
            yield response.follow(url=link, callback=self.parse_trail, meta={'rank': rank, 'location': location})
            rank += 1

        total_trails = response.xpath("//span/div/h2[@class='dont-shrink']/text()[2]").get()
        total_trails = self.parse_int(total_trails)
        remaining_trails = total_trails - 10
        
        page_num = 1
        while remaining_trails > 0: # uncomment to scrape all trails
        # while page_num < 2: # uncomment to test on second page

            print(f'...............Trails parsed: {total_trails - remaining_trails}...............')
            print(f'...............Trails remaining: {remaining_trails}...............')

            next_page = f'https://www.hikingproject.com/ajax/area/8007121/trails?idx={page_num}'
            trail_rows = self.parse_additional_rows(next_page)

            for row in trail_rows:
                yield response.follow(url=row['link'], callback=self.parse_trail, meta={'rank': rank, 'location': row['location']})
                rank += 1
            remaining_trails = remaining_trails - len(trail_rows)
            page_num += 1
            
        print(f'...............Finished parsing...............')
        print('****************************************************')

        
    def parse_trail(self, response):
        trail = {}
        trail['rank'] = response.meta.get('rank')
        trail['trail_name'] = response.xpath("//h1[@id='trail-title']/text()").get()
        trail['location'] = response.meta.get('location')

        breadcrumbs = response.xpath("//li[@class='breadcrumb-item']/a/span[2]/text()").getall()
        another_breadcrumb = response.xpath("(//li[@class='breadcrumb-item']/a/text())[3]").get()
        breadcrumbs.append(another_breadcrumb)
        ','.join(breadcrumbs)
        trail['breadcrumbs'] = breadcrumbs

        trail['difficulty'] = response.xpath("//span[@class='difficulty-text text-white align-middle']/text()").get()
        trail['rating'] = response.xpath("(//span[@class='title text-muted'])[1]/span[2]/text()").get()
        trail['num_reviews'] = response.xpath("(//span[@class='title text-muted'])[1]/span[3]/text()").get()
        trail['route_type'] = response.xpath("(//div[@id='trail-stats-bar']/div/h3)[1]/text()").get()
        trail['length'] = response.xpath("//div[@id='trail-stats-bar']/div/span[@class='metric']/h3/text()").get()
        trail['high'] = response.xpath("(//div[@class='stat-block mx-1 mt-1']/h3/span[@class='metric'])[1]/text()").get()
        trail['low'] = response.xpath("(//div[@class='stat-block mx-1 mt-1']/h3/span[@class='metric'])[2]/text()").get()
        trail['gmaps_link'] = response.xpath("(//a[@class='btn btn-xs btn-secondary width100'])[2]/@href").get()
        trail['description'] = ''.join(response.xpath("(//div[@class='mb-1'])[2]").getall())
        trail['photo'] = ""
        
        photo_url = response.xpath("//div[@id='carousel-item-0']/a/@href").get()
        if (photo_url):
            yield response.follow(url=photo_url, callback=self.parse_photo, meta={"trail": trail})

        else:
            yield trail

    def parse_int(self, text):
        digit_list = [char for char in text if char.isdigit()]
        digit_string = ''.join(digit_list)
        digit = int(digit_string)
        return digit

    def parse_additional_rows(self, url):
        rows = []
        html = requests.get(url).text

        soup = BeautifulSoup(html, 'html.parser')
        tags = soup.find_all('tr')

        links = [tag.get('data-href') for tag in tags]
        links = [link.replace('\\', '') for link in links]
        links = [link.replace('\"', '') for link in links]

        locations = re.findall(r"\s([\w]+?[\(?\w+-? ?\)?]*, [\w]+)\\n", html, re.I)
        locations = locations[::2]

        num_links = len(links)
        num_locations = len(locations)
        print("********************************************************************************************************")
        print(num_links)
        print("********************************************************************************************************")
        print(num_locations)
        print("********************************************************************************************************")

        if num_links != num_locations:
            quit
            
        for x in range(0, num_links):
            row = {'link': links[x], 'location': locations[x]}
            rows.append(row)

        return rows
        

    def parse_photo(self, response):
        photo = response.xpath("//*[@id='body-hike']/div[8]/div/div[3]/div[1]/div[1]/img/@src").get()
        trail = response.meta.get('trail')
        trail['photo'] = photo

        yield trail

