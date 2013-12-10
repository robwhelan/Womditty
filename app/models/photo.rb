class Photo < ActiveRecord::Base
  belongs_to :place
  belongs_to :neighborhood
  belongs_to :user
  belongs_to :city
  attr_accessible :image_url, :post_id, :answer_id, :image, :user_id

  has_many :comments
  belongs_to :post
  belongs_to :answer
    
  acts_as_voteable

  has_attached_file :image, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"

end
