require 'test_helper'

class PagesControllerTest < ActionController::TestCase
  test "should get google_map" do
    get :google_map
    assert_response :success
  end

end
