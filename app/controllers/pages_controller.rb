class PagesController < ApplicationController
  before_filter :authenticate_user!
#  load_and_authorize_resource

  def google_map
    @coordinates = Coordinate.where(:neighborhood_id => 4).order(:coordinate_number)

    gon.users = User.all
  end
  
  def census
  end
  
end
