module ApplicationHelper

  def title
    base_title = "Urban Recon"
    if @title.nil?
      base_title
    else
      "#{@title}"
    end
  end

end
