class PagesController < ApplicationController
  before_filter :authenticate_user!
  #load_and_authorize_resource

  def google_map
    authenticate_user!
    @coordinates = Coordinate.where(:neighborhood_id => 4).order(:coordinate_number)
  end
  
  def census
  end
  
  def about
  end
  
  def chat
    @forum = Forum.first
    @groups = Group.all
  end
  
  def home
  end
  
  def instagram
    @headline = "Hey Instagrammers!"
    @title = "Womditty - word of mouth, do it yourself"
    @count = User.where(:move_status => true).count
  end
  
  def pcs_move_to_charleston
    session[:content] = params[:content]
    @user = User.new
    
    if session[:content] == "a"
      	@title = "PCS Move to Charleston with Real Time Tips"
      	@headline = "So you're PCSing to Charleston and you need some tips!"
      	@section1 = "Our real-time tips are from regular Charleston residents who want to help military families moving to Charleston. It's current and practical, perfect for a military family planning an exciting (but stressful) move."
      	@section2 = "The Womditty community shares current tips you'll actually use. There's new advice every day. And the best advice gets voted up so you know what to trust."
      	@section3 = "What tips are you looking for? Best schools near the base? Where should I avoid? Where are the best military deals? Where are the most military-friendly apartments? Where are the cleanest playgrounds?! Log in and ask."
      	@section4 = "Over 50 local residents have signed on to help military families moving to Charleston. Don't learn it the hard way-- ask your questions now and you'll be a lot happier. Maybe someone has already answered your question! Easily search all conversations to find out."
    elsif session[:content] == "b"
      	@title = "Got a question about Charleston?"
      	@headline = "Got a question about Charleston?"
      	@section1 = "You're moving here with the military and you're looking for advice! Womditty's word of mouth knowledge comes from regular Charleston residents who want to help military families moving to Charleston. It's current and practical, perfect for a military family planning an exciting (but stressful) move."
      	@section2 = "The Womditty community tackles any kind of question, with answers guaranteed within 12 hours-- most answers are much faster. And there's new advice every day. The best advice gets voted up so you know what to trust."
      	@section3 = "What do you want to ask? Best schools near the base? Where should I avoid? Where are the best military deals? Where are the most military-friendly apartments? Where are the cleanest playgrounds?! Log in and ask."
      	@section4 = "Over 50 local residents have signed on to help military families moving to Charleston. Don't learn it the hard way-- ask your questions now and you'll be a lot happier."
    end

  end
      
end
