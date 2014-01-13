require 'mailchimp'

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         
  devise :omniauthable, :omniauth_providers => [:facebook]       

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :provider, :uid, :name, :role
  belongs_to :city
  belongs_to :career_specialty 
  belongs_to :duty_station
  belongs_to :military_branch
  belongs_to :neighborhood
  
  accepts_nested_attributes_for :neighborhood
  
  attr_accessible :duty_station, :firstname, :has_kids, :invited_by_user_id, 
                  :lastname, :member_rank, :number_of_invites, :profile_image_url, 
                  :role, :location, :birthday, :gender, :profile_image, :drive_time,
                  :neighborhood_id, :duty_station_id, :move_status

  has_many :comments
  has_many :reviews
  has_many :photos
  has_many :posts
  has_many :answers
  has_many  :neighborhood_thoughts
  
  acts_as_follower
  acts_as_followable
  acts_as_voter
  #acts_as_voteable
    # The following line is optional, and tracks karma (up votes) for questions this user has submitted.
    # Each question has a submitter_id column that tracks the user who submitted it.
    # The option :weight value will be multiplied to any karma from that voteable model (defaults to 1).
    # You can track any voteable model.
  has_karma :posts
  has_karma :answers

  def self.roles
    ['Member of the military', 'Spouse', 'Significant Other', 'Family member', 'Admin']
  end

  def self.ranks
    ['Active Duty - Enlisted', 'Active Duty - Officer', 'Civilian', 'Reserves - Enlisted', 'Reserves - Officer', 'Veteran - Enlisted', 'Veteran - Officer' ]
  end

  def self.find_for_facebook_oauth(auth, signed_in_resource=nil)
    user = User.where(:provider => auth.provider, :uid => auth.uid).first
    unless user
      user = User.create(name:auth.extra.raw_info.name,
                           provider:auth.provider,
                           uid:auth.uid,
                           email:auth.info.email,
                           password:Devise.friendly_token[0,20],
#                           firstname:auth.extra.raw_info.first_name,
#                          lastname:auth.extra.raw_info.last_name,
#                           location:auth.extra.raw_info.location.name,
#                           birthday:auth.extra.raw_info.birthday,
#                           gender:auth.extra.raw_info.gender,
                           profile_image:auth.info.image
                           )
      new_session_pageview = "/user/signup"
                           return user, new_session_pageview
    end
      new_session_pageview = "/user/signin"
    return user, new_session_pageview
  end
  
  def self.new_with_session(params, session)
     super.tap do |user|
       if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
         user.email = data["email"] if user.email.blank?
       end
     end
   end
   
   def subscribe_to_mailchimp
     @mc = Mailchimp::API.new('4a46f8edfa1a4822d7d59eec9dd8c6a6-us3')
     list_id = '50ec604e99'
     email = self.email
   
     if self.move_status == false
       group = "Knows about Charleston"
     else
       group = "Moving to Charleston"
     end
   
     @mc.lists.subscribe(list_id, {'email' => email},
            {'groupings' => [{'id'=>6837, 'name'=>"Charleston", 'groups' =>[group]}]},
            nil, false)
   end
     
   
end
