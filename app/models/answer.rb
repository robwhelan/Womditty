class Answer < ActiveRecord::Base
  belongs_to :post
  belongs_to :user
  attr_accessible :body, :likes, :user_id, :post_id

  acts_as_followable
  acts_as_taggable
  acts_as_voteable

end
