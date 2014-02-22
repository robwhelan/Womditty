class Group < ActiveRecord::Base
  belongs_to :forum
  has_many :posts, :dependent => :destroy
  has_many :users
  
  attr_accessible :name, :forum_id, :unique_identifier

end
