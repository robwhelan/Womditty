require 'google_analytics_api'

class ApplicationController < ActionController::Base

  protect_from_forgery
  #after_filter :set_access_control_headers
  
  include PublicActivity::StoreController

  rescue_from CanCan::AccessDenied do |exception|
    if current_user.role == nil
      redirect_to root_path
    end
  end

  def after_sign_in_path_for(resource)
    surveys_path
  end
  
#  def set_access_control_headers
#    headers['Access-Control-Allow-Origin'] = "*"
#    headers['Access-Control-Request-Method'] = %w{GET POST OPTIONS}.join(",")
#  end
  
end
