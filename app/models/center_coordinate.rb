class CenterCoordinate < ActiveRecord::Base

  belongs_to :neighborhood
  belongs_to :place
  belongs_to :city
  belongs_to :duty_station
  belongs_to :photo

  attr_accessible :lat, :lng, :neighborhood_id, :place_id, :city_id, :duty_station_id, :photo_id

end
