class Review < ActiveRecord::Base
  belongs_to :place
  belongs_to :user
  belongs_to :neighborhood
  attr_accessible :body, :rating, :place_id, :neighborhood_id, :user_id
end
