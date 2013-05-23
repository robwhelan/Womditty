class MilitaryBranch < ActiveRecord::Base
  attr_accessible :name

  has_many :career_specialties
  has_many :users
  has_many :duty_stations

  def self.branches
    ['Air Force', 'Army', 'Coast Guard', 'Marines', 'Navy']
  end

end
