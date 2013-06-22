class DutyStation < ActiveRecord::Base
  belongs_to :city
  belongs_to :military_branch
  attr_accessible :name, :city_id, :military_branch_id

  has_many :users

end
