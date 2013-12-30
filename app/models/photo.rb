class Photo < ActiveRecord::Base
  belongs_to :place
  belongs_to :neighborhood
  belongs_to :user
  belongs_to :city
  attr_accessible :image_url, :post_id, :answer_id, :image, :user_id, :neighborhood_id, :place_id, :city_id

  has_many :comments
  belongs_to :post
  belongs_to :answer
    
  acts_as_voteable

  has_attached_file :image, :styles => { :full => "500x500>", :medium => "300x300>", :thumb => "100x100>" }, 
                            :convert_options => {:all => '-auto-orient'}, :default_url => ""
                            
  validates_attachment :image, :content_type => { :content_type => "image/jpeg" }, :size => { :in => 0..3000.kilobytes }

end
