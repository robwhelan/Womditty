class Host < ActiveRecord::Base
  belongs_to :user
  belongs_to :neighborhood
  attr_accessible :user_id, :neighborhood_id
end
