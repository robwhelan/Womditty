class CareerSpecialty < ActiveRecord::Base
  belongs_to :military_branch
  attr_accessible :name
  
  has_many :users
  
  def self.types
    ['Submarines', 'Aviation', 'Surface Fleet', 'Special Warfare']
  end
  
  
end
