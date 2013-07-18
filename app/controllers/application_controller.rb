class ApplicationController < ActionController::Base
  protect_from_forgery

  rescue_from CanCan::AccessDenied do |exception|
    if current_user.role == nil
      redirect_to root_path
    end
  end

  def after_sign_in_path_for(resource)
    root_path
  end
  
end
