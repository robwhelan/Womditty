class Neighborhood < ActiveRecord::Base
  belongs_to :city

  attr_accessible :name, :city_id
  attr_accessible :community_amenities
  attr_accessible :grocery_stores
  attr_accessible :kids
  attr_accessible :lifestyle
  attr_accessible :love
  attr_accessible :noise
  attr_accessible :pets
  attr_accessible :schools
  attr_accessible :shopping
  attr_accessible :traffic
  attr_accessible :walkability
  
  has_many :users
  has_many :photos
  has_many :reviews
  has_many :places
  has_many :coordinates
  has_many :posts
  has_one :center_coordinate
  has_many  :hosts
  
  accepts_nested_attributes_for :center_coordinate
  accepts_nested_attributes_for :users

  acts_as_voteable

  has_attached_file :community_amenities, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  has_attached_file :grocery_stores, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  has_attached_file :kids, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  has_attached_file :lifestyle, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  has_attached_file :love, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  has_attached_file :noise, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  has_attached_file :pets, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  has_attached_file :schools, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  has_attached_file :shopping, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  has_attached_file :traffic, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  has_attached_file :walkability, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"

end
