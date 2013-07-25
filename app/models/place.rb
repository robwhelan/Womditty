class Place < ActiveRecord::Base
  belongs_to :neighborhood
  belongs_to :city
  attr_accessible :address_line1, :address_line2, :name, :place_type, :xgps, :ygps, :zip_code,
                  :neighborhood_id, :city_id, :tag_list, :google_place_id

  has_many :reviews
  has_one :military_discount
  has_many :coordinates
  has_many :comments

  acts_as_taggable
  acts_as_taggable_on :place_types
  acts_as_voteable
  
  def self.place_types
     ['grocery store', 'playground', 'school', 'restaurant', 'gas station', 'convenience store', 'apartment complex', 'other']
  end

end
