module ApplicationHelper

  def title
    base_title = "Womditty"
    if @title.nil?
      base_title
    else
      "#{@title}"
    end
  end

end
