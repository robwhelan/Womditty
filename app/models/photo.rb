class Photo < ActiveRecord::Base
  belongs_to :place
  belongs_to :neighborhood
  belongs_to :user
  belongs_to :city
  attr_accessible :image_url

  has_many :comments

  acts_as_voteable

end
