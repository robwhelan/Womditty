class Post < ActiveRecord::Base
  has_many :answers
  belongs_to :user
  
  attr_accessible :body, :likes, :title, :user_id
  acts_as_taggable
  acts_as_voteable

end
