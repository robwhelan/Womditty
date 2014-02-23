class Group < ActiveRecord::Base
  belongs_to :forum
  has_many :posts, :dependent => :destroy
  has_many :users, :through => :group_memberships
  has_many :group_memberships
  
  attr_accessible :name, :forum_id, :unique_identifier, :private_group

end
