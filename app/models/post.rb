class Post < ActiveRecord::Base
  has_many :answers
  belongs_to :user
  
  attr_accessible :body, :likes, :title, :user_id, :tag_list

  acts_as_followable
  acts_as_taggable
  acts_as_voteable

  default_scope order('created_at DESC')

end
