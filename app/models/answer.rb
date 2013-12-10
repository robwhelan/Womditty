class Answer < ActiveRecord::Base
  include PublicActivity::Common

  belongs_to :post
  belongs_to :user
  has_one :photo
  attr_accessible :body, :likes, :user_id, :post_id, :photo_attributes

  acts_as_followable
  acts_as_taggable
  acts_as_voteable

  accepts_nested_attributes_for :photo

end
