require 'test_helper'

class CenterCoordinatesControllerTest < ActionController::TestCase
  setup do
    @center_coordinate = center_coordinates(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:center_coordinates)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create center_coordinate" do
    assert_difference('CenterCoordinate.count') do
      post :create, center_coordinate: { lat: @center_coordinate.lat, lng: @center_coordinate.lng }
    end

    assert_redirected_to center_coordinate_path(assigns(:center_coordinate))
  end

  test "should show center_coordinate" do
    get :show, id: @center_coordinate
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @center_coordinate
    assert_response :success
  end

  test "should update center_coordinate" do
    put :update, id: @center_coordinate, center_coordinate: { lat: @center_coordinate.lat, lng: @center_coordinate.lng }
    assert_redirected_to center_coordinate_path(assigns(:center_coordinate))
  end

  test "should destroy center_coordinate" do
    assert_difference('CenterCoordinate.count', -1) do
      delete :destroy, id: @center_coordinate
    end

    assert_redirected_to center_coordinates_path
  end
end
