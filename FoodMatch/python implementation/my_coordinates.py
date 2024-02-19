import geocoder

def get_coordinates():
    location = geocoder.ip('me')
    latitude = location.latlng[0]
    longitude = location.latlng[1]
    return latitude, longitude

def print_coordinates():
    try:
        coordinates = get_coordinates()
        print(f"Latitude: {coordinates[0]}, Longitude: {coordinates[1]}")
    except Exception as e:
        print(f"Error: {e}")
