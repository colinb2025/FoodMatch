from distance_calculation import haversine_distance
from filereading import *
from questions import *
import random

maximum_price = price_range()
maximum_distance = distance_range()

def restaurant_finder():
    while True:
        index = random.randint(0, get_data_length())

        distance = haversine_distance(get_restaurant_latitude(index), get_restaurant_longitude(index))

        name = "Name:".ljust(15) + get_restaurant_name(index)
        food_type = "Type of Food:".ljust(15) + get_type_of_food(index)
        price = "Price:".ljust(15) + get_price(index)
        distance_str = f"Distance:".ljust(15) + f"{distance:.2f} miles"

        print(name)
        print(food_type)
        print(price)
        print(distance_str)

        if len(price) <= len(maximum_price) and float(distance) <= float(maximum_distance):
            break

        answer = input("Y/N: ")
        if answer.startswith("y"):
            break        

restaurant_finder()
