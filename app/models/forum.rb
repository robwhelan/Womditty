class Forum < ActiveRecord::Base
  attr_accessible :name
  has_many :groups, :dependent => :destroy
end
