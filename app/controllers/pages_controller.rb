class PagesController < ApplicationController

  def google_map
    @coordinates = Coordinate.where(:neighborhood_id => 4).order(:coordinate_number)
  end
  
end
