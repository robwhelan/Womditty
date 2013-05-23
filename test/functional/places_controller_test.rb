require 'test_helper'

class PlacesControllerTest < ActionController::TestCase
  setup do
    @place = places(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:places)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create place" do
    assert_difference('Place.count') do
      post :create, place: { address_line1: @place.address_line1, address_line2: @place.address_line2, name: @place.name, type: @place.type, xgps: @place.xgps, ygps: @place.ygps, zip_code: @place.zip_code }
    end

    assert_redirected_to place_path(assigns(:place))
  end

  test "should show place" do
    get :show, id: @place
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @place
    assert_response :success
  end

  test "should update place" do
    put :update, id: @place, place: { address_line1: @place.address_line1, address_line2: @place.address_line2, name: @place.name, type: @place.type, xgps: @place.xgps, ygps: @place.ygps, zip_code: @place.zip_code }
    assert_redirected_to place_path(assigns(:place))
  end

  test "should destroy place" do
    assert_difference('Place.count', -1) do
      delete :destroy, id: @place
    end

    assert_redirected_to places_path
  end
end
