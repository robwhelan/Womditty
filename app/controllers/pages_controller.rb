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

    if params[:initiator]
      @initiator = User.find(params[:initiator])
      @receiver = User.find(params[:receiver])
      @forum = Forum.find(params[:forum])

      # check to see if group with identifier initiatorid-receiver id OR receiver-initiator
      # if yes, set @group to it
      # if not, create that group, create the group memberships, and set group to it
      name_1 = "user" + @initiator.id.to_s + "user" + @receiver.id.to_s
      name_2 = "user" + @receiver.id.to_s + "user" + @initiator.id.to_s
      final_name = @initiator.name.to_s + " - " + @receiver.name.to_s
      
      if @forum.groups.exists?(:unique_identifier => name_1)
        @group = @forum.groups.find_by_unique_identifier(name_1)
      elsif @forum.groups.exists?(:unique_identifier => name_2)
        @group = @forum.groups.find_by_unique_identifier(name_2)
      else
        @group = Group.create( :name => final_name, 
                      :unique_identifier => name_1,
                      :private_group => true,
                      :forum_id => @forum.id )
                      
        # subscribe the receiver to the group
        @receiver.groups << @group
      end
        
    elsif params[:changeForum]
      @city1 = City.find(params[:city1])
      @city2 = City.find(params[:city2])
      name_1 = "city" + @city1.id.to_s + "city" + @city2.id.to_s
      name_2 = "city" + @city2.id.to_s + "city" + @city1.id.to_s

      if Forum.exists?(:unique_identifier => name_1)
        @forum = Forum.find_by_unique_identifier(name_1)
      else Forum.exists?(:unique_identifier => name_2)
        @forum = Forum.find_by_unique_identifier(name_2)
      end
      
      @group = @forum.groups.first
      
    else
      if params[:forum]
        @forum = Forum.find(params[:forum])
      else
        @forum = Forum.first
      end
    
      if params[:group]
        @group = Group.find(params[:group])
      else
        @group = Group.first
      end
    end
    
    #update profile image because I couldn't figure out how to do it anywhere else
    unless current_user.provider == "facebook"
      if current_user.avatar.exists?
        current_user.update_attributes(:profile_image => current_user.avatar.url)
      end
    end    
    
    #subscribe to a chat group
    unless GroupMembership.exists?({:user_id => current_user.id, :group_id => @group.id})
      current_user.groups << @group
    end
    
    @public_groups = @forum.groups.where(:private_group => false)
    @private_groups = current_user.groups.where(:private_group => true).where(:forum_id => @forum.id)
    
    @users_in_group = @group.users.uniq
    @number_of_users_in_group = @users_in_group.count
    
    @posts = @group.posts.page(params[:page]).per(10)
    
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
