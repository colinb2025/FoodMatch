import warnings
from math import radians, sin, cos, sqrt, atan2
from my_coordinates import get_coordinates

def haversine_distance(restaurant_latitude, restaurant_longitude):
    warnings.simplefilter(action='ignore', category=FutureWarning)

    my_latitude, my_longitude = get_coordinates()
    
    R = 3958.8

    lat1_rad, lon1_rad = radians(my_latitude), radians(my_longitude)
    lat2_rad, lon2_rad = radians(restaurant_latitude), radians(restaurant_longitude)

    dlat = lat2_rad - lat1_rad
    dlon = lon2_rad - lon1_rad

    a = sin(dlat / 2)**2 + cos(lat1_rad) * cos(lat2_rad) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    distance = R * c

    return distance
