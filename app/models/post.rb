class Post < ActiveRecord::Base
  include PublicActivity::Common

  has_many :answers
  belongs_to :user
  belongs_to :place
  belongs_to :neighborhood
  belongs_to :neighborhood_topic
  
  attr_accessible :body, :likes, :title, :user_id, :tag_list, :place_id

  acts_as_followable
  acts_as_taggable
  acts_as_voteable

  default_scope order('created_at DESC')

end
