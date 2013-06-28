class MilitaryDiscount < ActiveRecord::Base
  belongs_to :place
  attr_accessible :description, :place_id

  acts_as_voteable

end
