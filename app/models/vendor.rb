class Vendor < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :business_name, :first_name, :last_name, :biography, :text, :address_line_1, :address_line_2, :zip_code, :phone_number, :contact_email, :site_url, :profession
  attr_accessible :main_image, :promotion_image, :extra_image_1, :extra_image_2, :extra_image_3, :logo_image, :city_id

  validates_attachment :main_image, :content_type => { :content_type => "image/jpeg" }, :size => { :in => 0..1000.kilobytes }
  validates_attachment :promotion_image, :content_type => { :content_type => "image/jpeg" }, :size => { :in => 0..1000.kilobytes }
  validates_attachment :extra_image_1, :content_type => { :content_type => "image/jpeg" }, :size => { :in => 0..1000.kilobytes }
  validates_attachment :extra_image_2, :content_type => { :content_type => "image/jpeg" }, :size => { :in => 0..1000.kilobytes }
  validates_attachment :extra_image_3, :content_type => { :content_type => "image/jpeg" }, :size => { :in => 0..1000.kilobytes }
  validates_attachment :logo_image, :content_type => { :content_type => "image/jpeg" }, :size => { :in => 0..1000.kilobytes }

  has_attached_file :main_image, :styles => { :full => "500x500>", :medium => "300x300>", :thumb => "100x100>" }, 
                            :convert_options => {:all => '-auto-orient'}, :default_url => ""
  has_attached_file :promotion_image, :styles => { :full => "500x500>", :medium => "300x300>", :thumb => "100x100>" }, 
                            :convert_options => {:all => '-auto-orient'}, :default_url => ""
  has_attached_file :extra_image_1, :styles => { :full => "500x500>", :medium => "300x300>", :thumb => "100x100>" }, 
                            :convert_options => {:all => '-auto-orient'}, :default_url => ""
  has_attached_file :extra_image_2, :styles => { :full => "500x500>", :medium => "300x300>", :thumb => "100x100>" }, 
                            :convert_options => {:all => '-auto-orient'}, :default_url => ""
  has_attached_file :extra_image_3, :styles => { :full => "500x500>", :medium => "300x300>", :thumb => "100x100>" }, 
                            :convert_options => {:all => '-auto-orient'}, :default_url => ""
  has_attached_file :logo_image, :styles => { :full => "500x500>", :medium => "300x300>", :thumb => "100x100>" }, 
                            :convert_options => {:all => '-auto-orient'}, :default_url => ""
  
  belongs_to :city	  
  has_many :inquiries
  has_many :posts
  
end
