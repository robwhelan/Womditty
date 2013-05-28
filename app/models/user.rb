class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, 
         :omniauthable, :omniauth_providers => [:facebook]
         

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :provider, :uid
  belongs_to :city
  belongs_to :career_specialty 
  belongs_to :duty_station
  belongs_to :military_branch
  belongs_to :neighborhood
  
  attr_accessible :duty_station, :firstname, :has_kids, :invited_by_user_id, :lastname, :member_rank, :number_of_invites, :profile_image_url, :role

  has_many :comments
  has_many :reviews
  has_many :photos

  def self.roles
    ['Member of the military', 'Spouse', 'Significant Other', 'Family member']
  end

  def self.ranks
    ['E1,' 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8', 'O9', 'O10', 'W1', 'W2', 'W3', 'W4', 'W5', 'GS1', 'GS2', 'GS3', 'GS4,' 'GS5', 'GS6,' 'GS7,' 'GS8,' 'GS9' 'GS10,' 'GS11,' 'GS12', 'GS13', 'GS14', 'GS15']
  end

  def self.find_for_facebook_oauth(auth, signed_in_resource=nil)
    user = User.where(:provider => auth.provider, :uid => auth.uid).first
    unless user
      user = User.create(name:auth.extra.raw_info.name,
                           provider:auth.provider,
                           uid:auth.uid,
                           email:auth.info.email,
                           password:Devise.friendly_token[0,20]
                           )
    end
    user
  end
  
  def self.new_with_session(params, session)
     super.tap do |user|
       if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
         user.email = data["email"] if user.email.blank?
       end
     end
   end
   
end
