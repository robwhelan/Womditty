class Inquiry < ActiveRecord::Base
  belongs_to :user
  belongs_to :vendor
  attr_accessible :command, :email, :first_name, :last_name, :move_date, :number_of_bedrooms, :number_of_people, :phone_number, :rank, :user_id, :vendor_id

end
