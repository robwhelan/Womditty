require 'mailchimp'
require 'mandrill'

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         
  devise :omniauthable, :omniauth_providers => [:facebook]       

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :provider, :uid, :name, :role
  attr_accessible :duty_station, :firstname, :has_kids, :invited_by_user_id, 
                  :lastname, :member_rank, :number_of_invites, :profile_image_url, 
                  :role, :location, :birthday, :gender, :profile_image, :drive_time,
                  :neighborhood_id, :duty_station_id, :move_status, :avatar, :city_id

  belongs_to :city
  belongs_to :career_specialty 
  belongs_to :duty_station
  belongs_to :military_branch
  belongs_to :neighborhood
  has_many :groups, :through => :group_memberships
  has_many :group_memberships
  
  accepts_nested_attributes_for :neighborhood
  
  has_many :comments
  has_many :reviews
  has_many :photos
  has_many :posts
  has_many :answers
  has_many :neighborhood_thoughts
  has_many :inquiries
  
  acts_as_reader
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

  has_attached_file :avatar, :styles => { :full => "500x500>", :medium => "300x300>", :thumb => "100x100>" }, 
                            :convert_options => {:all => '-auto-orient'}, :default_url => ""
                            
  validates_attachment :avatar, :content_type => { :content_type => "image/jpeg" }, :size => { :in => 0..3000.kilobytes }
  validates :name, presence: true
  
  def self.roles
    ['Member of the military', 'Spouse', 'Significant Other', 'Family member', 'Admin']
  end

  def self.ranks
    ['Officer', 'Enlisted']
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
    
      self.get_welcome_email
   end
   
   def get_welcome_email
     if self.move_status == true
       template_name = "Welcome email - moving to Charleston"
       campaign = "New signup email - moving to Charleston"
       subject = "Welcome! Switch cities with Womditty"
     else
       template_name = "Welcome email - already living in Charleston"
       campaign = "New signup email - already in Charleston"
       subject = "Welcome! Switch cities with Womditty"
     end
       
       begin
           mandrill = Mandrill::API.new 'Ut9NXkhKFDLJVBTqMRGV7Q'
           template_content = []
           message = {"subaccount"=>"Womditty",
            "preserve_recipients"=>nil,
            "images"=>[],
            "merge"=>true,
            "inline_css"=>nil,
            "auto_html"=>nil,
            "from_name"=>"Womditty",
            "text"=>"",
            "return_path_domain"=>nil,
            "view_content_link"=>nil,
            "google_analytics_domains"=>["womditty.com"],
            "tags"=>["welcome-emails"],
            "html"=>"<p>Example HTML content</p>",
            "tracking_domain"=>nil,
            "important"=>false,
            "google_analytics_campaign"=> campaign,
            "signing_domain"=>nil,
            "bcc_address"=>"message.bcc_address@example.com",
            "track_opens"=>true,
            "from_email"=>"rob@womditty.com",
            "subject"=> subject,
            "metadata"=>{"website"=>"www.womditty.com"},
            "track_clicks"=>true,
            "headers"=>{"Reply-To"=>"rob@womditty.com"},
            "attachments"=>[],
            "global_merge_vars"=>[],
            "url_strip_qs"=>nil,
            "auto_text"=>nil,
            "recipient_metadata"=>[],
            "to"=>[{"email"=> self.email,"type"=>"to","name"=>self.name}]}
           async = false
           ip_pool = "Main Pool"
           send_at = ""
           result = mandrill.messages.send_template template_name, template_content, message, async, ip_pool, send_at

       rescue Mandrill::Error => e
           # Mandrill errors are thrown as exceptions
           puts "A mandrill error occurred: #{e.class} - #{e.message}"
           # A mandrill error occurred: Mandrill::UnknownSubaccountError - No subaccount exists with the id 'customer-123'    
           raise
       end
   end
        
end
