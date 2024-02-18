import pandas as pd

csv_file_path = '/Users/colinbitz/Desktop/CS/personal projects/Dinner App/samplefile.csv'
df = pd.read_csv(csv_file_path)
df.columns = df.columns.str.strip()

def get_data_length():
    return len(df) - 1

def get_restaurant_name(index = 1):
    restaurant_name = df.loc[index, 'Restaurant name']
    return restaurant_name

def get_type_of_food(index = 1):
    type_of_food = df.loc[index, 'Type of food']
    return type_of_food.strip(' " ')

def get_price(index = 1):
    price = df.loc[index, 'Price']
    return price.strip(' " ')

def get_restaurant_latitude(index = 1):
    restaurant_latitude = df.loc[index, 'Latitude']
    return restaurant_latitude

def get_restaurant_longitude(index = 1):
    restaurant_longitude = df.loc[index, 'Longitude']
    return restaurant_longitude