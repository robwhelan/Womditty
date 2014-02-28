class Post < ActiveRecord::Base
  include PublicActivity::Common

  has_many :answers
  has_one :photo

  belongs_to :user
  belongs_to :place
  belongs_to :neighborhood
  belongs_to :neighborhood_topic
  belongs_to :group
  
  attr_accessible :body, :likes, :title, :user_id, :tag_list, :place_id, :photo_attributes, :group_id

  acts_as_followable
  acts_as_taggable
  acts_as_voteable
  acts_as_readable :on => :created_at

  accepts_nested_attributes_for :photo

  default_scope order('created_at DESC')

end
