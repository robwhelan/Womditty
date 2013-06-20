class Place < ActiveRecord::Base
  belongs_to :neighborhood
  belongs_to :city
  attr_accessible :address_line1, :address_line2, :name, :place_type, :xgps, :ygps, :zip_code,
                  :neighborhood_id, :city_id, :tag_list

  has_many :reviews
  has_one :military_discount

  acts_as_taggable
  acts_as_taggable_on :place_types
  
  def self.place_types
     ['grocery store', 'playground', 'school', 'restaurant', 'gas station', 'convenience store', 'apartment complex', 'other']
  end

end
