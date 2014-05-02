class Engagement < ActiveRecord::Base
  belongs_to :vendor
  attr_accessible :engagement_type, :vendor_id
end
