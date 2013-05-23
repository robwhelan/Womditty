class Place < ActiveRecord::Base
  belongs_to :neighborhood
  belongs_to :city
  attr_accessible :address_line1, :address_line2, :name, :type, :xgps, :ygps, :zip_code

  has_many :reviews

  def self.types
     ['grocery store', 'playground', 'school', 'restaurant', 'gas station', 'convenience store', 'apartment complex', 'other']
  end

end
