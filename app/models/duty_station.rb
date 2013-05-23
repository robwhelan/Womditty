class DutyStation < ActiveRecord::Base
  belongs_to :city
  belongs_to :military_branch
  attr_accessible :name

  has_many :users

end
