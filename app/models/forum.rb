class Forum < ActiveRecord::Base
  attr_accessible :name, :unique_identifier
  has_many :groups, :dependent => :destroy
end
