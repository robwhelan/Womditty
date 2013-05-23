class Neighborhood < ActiveRecord::Base
  belongs_to :city
  attr_accessible :name

  has_many :users
  has_many :photos
  has_many :reviews
  has_many :places

end
