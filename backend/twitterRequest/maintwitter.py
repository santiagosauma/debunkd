from twikit import Client,TooManyRequests
import time
from datetime import datetime
import csv
from configparser import ConfigParser
from random import randint 

MINIMUM_TWEETS = 10 
QUERY = 'chatgpt'

#* login credentials 
config =  ConfigParser()
config.read('config.ini')
username = config.get['X']['username']
email = config.get['X']['email']
password = config.get['X']['password']

#* autenticate to X.com
#user login credentials or use cookies

client = Client(language='en-US')
client.login(auth_info_1=username,auth_info_2=email,password=password)
client.save_cookies('cookies.json')