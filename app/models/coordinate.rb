class Coordinate < ActiveRecord::Base
  belongs_to :neighborhood
  belongs_to :city
  belongs_to :place
  belongs_to :duty_station
  attr_accessible :coordinate_number, :lat, :lat_center, :lng, :lng_center, :neighborhood_id
end
