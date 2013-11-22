class NeighborhoodThought < ActiveRecord::Base
  belongs_to :user
  belongs_to :neighborhood

  attr_accessible :user_id, :neighborhood_id, :community_amenities, :cost_of_living, :crime, :grocery_stores, :lifestyle,
                  :night_life, :noise, :pets, :shopping, :kids, :traffic, :walkability, :not_love, :love, :schools

end
