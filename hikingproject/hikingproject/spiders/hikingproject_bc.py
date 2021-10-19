import scrapy


class HikingprojectBcSpider(scrapy.Spider):
    name = 'hikingproject_bc'
    allowed_domains = []
    start_urls = ['http://www.hikingproject.com/directory/8006666/british-columbia/']

    def parse(self, response):
        trails = response.xpath("//tr[@class='trail-row']")

        print('****************************************************')
        print('...............Parsing trails...............')

        for trail in trails:
            link = trail.xpath(".//td/a/@href").get()
            yield response.follow(url=link, callback=self.parse_trail)
        
        total_trails = response.xpath("//span/div/h2[@class='dont-shrink']/text()[2]").get()
        total_trails = self.parse_int(total_trails)
        remaining_trails = total_trails - 10

        page_num = 1
        while remaining_trails > 0: # uncomment to scrape all trails
        # while page_num < 3: # uncomment to test on first 3 pages

            print(f'...............Trails parsed: {total_trails - remaining_trails}...............')
            print(f'...............Trails remaining: {remaining_trails}...............')

            next_page = f'https://www.hikingproject.com/ajax/area/8007121/trails?idx={page_num}'
            urls = self.parse_urls(next_page)
            for url in urls:
                yield response.follow(url=url, callback=self.parse_trail)
            remaining_trails = remaining_trails - len(urls)
            page_num += 1
            
        print(f'...............Finished parsing...............')
        print('****************************************************')
        


        
    def parse_trail(self, response):
        # logging.info(response.url)
        trail_name = response.xpath("//h1[@id='trail-title']/text()").get()
        breadcrumbs = response.xpath("//li[@class='breadcrumb-item']/a/span[2]/text()").getall()
        another_breadcrumb = response.xpath("(//li[@class='breadcrumb-item']/a/text())[3]").get()
        breadcrumbs.append(another_breadcrumb)
        ','.join(breadcrumbs)
        difficulty = response.xpath("//span[@class='difficulty-text text-white align-middle']/text()").get()
        rating = response.xpath("(//span[@class='title text-muted'])[1]/span[2]/text()").get()
        num_reviews = response.xpath("(//span[@class='title text-muted'])[1]/span[3]/text()").get()
        route_type = response.xpath("(//div[@id='trail-stats-bar']/div/h3)[1]/text()").get()
        length = response.xpath("//div[@id='trail-stats-bar']/div/span[@class='metric']/h3/text()").get()
        high = response.xpath("(//div[@class='stat-block mx-1 mt-1']/h3/span[@class='metric'])[1]/text()").get()
        low = response.xpath("(//div[@class='stat-block mx-1 mt-1']/h3/span[@class='metric'])[2]/text()").get()
        google_maps_link = response.xpath("(//a[@class='btn btn-xs btn-secondary width100'])[2]/@href").get()
        description = ''.join(response.xpath("(//div[@class='mb-1'])[2]").getall())
        
        yield {
            'trail_name': trail_name,
            'location': breadcrumbs,
            'difficulty': difficulty,
            'rating': rating,
            'num_reviews': num_reviews,
            'route_type': route_type,
            'length': length,
            'high': high,
            'low': low,
            'google_maps_link': google_maps_link,
            'description': description
        }

    def parse_int(self, text):
        digit_list = [char for char in text if char.isdigit()]
        digit_string = ''.join(digit_list)
        digit = int(digit_string)
        return digit
        
    def parse_urls(self, page):
        html = requests.get(page).text
        soup = BeautifulSoup(html, 'html.parser')
        tags = soup.find_all('a')
        urls = [tag.get('href') for tag in tags]
        urls = [url.replace('\\', '') for url in urls]
        urls = [url.replace('\"', '') for url in urls]
        return urls

        
