import snscrape.modules.twitter as sntwitter
import pandas as pd

query = "Trump"

for tweet in sntwitter.TwitterSearchScraper(query).get_items():

    print(vars(tweet))
    break