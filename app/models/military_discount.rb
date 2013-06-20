class MilitaryDiscount < ActiveRecord::Base
  belongs_to :place
  attr_accessible :description, :place_id
end
