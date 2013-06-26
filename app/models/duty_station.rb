class DutyStation < ActiveRecord::Base
  belongs_to :city
  belongs_to :military_branch
  attr_accessible :name, :city_id, :military_branch_id

  has_many :users
  
  def drive_time_from(neighborhood)
    average_drive_time = User.where(:neighborhood_id => neighborhood.id, :duty_station_id => self.id).average(:drive_time).to_f    
    return average_drive_time
  end
  
end
