class PagesController < ApplicationController
#  before_filter :authenticate_user!
#  load_and_authorize_resource

  def google_map
    authenticate_user!
    @coordinates = Coordinate.where(:neighborhood_id => 4).order(:coordinate_number)

    gon.users = User.all
  end
  
  def census
  end
  
  def about
  end
  
  def home
  end
  
  def pcs_move_to_charleston
    session[:content] = params[:content]
    
    if session[:content] == "a"
      	@title = "PCS Move to Charleston with Real Time Tips"
      	@headline = "So you're PCSing to Charleston and you need some tips!"
      	@section1 = "our real-time tips are from regular Charleston residents who want to help military families moving to Charleston. It's current and practical, perfect for a military family planning an exciting (but stressful) move."
      	@section2 = "the Womditty community shares photos of stuff you actually want to see, like where the clean playgrounds are!"
      	@section3 = "we're just getting started, so we need your questions to unlock the knowledge. What tips are you looking for? Best schools near the base? Where do I live to get away from work but not have too far of a drive? Which places should I avoid? Log in and ask."
      	@section4 = "Over 50 local residents have signed on to help military families. Don't learn it the hard way-- ask your question now and you'll be much happier."
    end
  end
      
end
