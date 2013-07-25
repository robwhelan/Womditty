class Comment < ActiveRecord::Base
  belongs_to :place
  belongs_to :review
  belongs_to :photo
  belongs_to :user
  attr_accessible :body, :place_id, :review_id, :photo_id, :user_id

  acts_as_voteable

end
