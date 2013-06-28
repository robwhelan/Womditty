class City < ActiveRecord::Base
  attr_accessible :country, :name, :state

  has_many :users 
  has_many :places 
  has_many :reviews
  has_many :duty_stations
  has_many :neighborhoods
  has_many :coordinates

  acts_as_voteable

end
