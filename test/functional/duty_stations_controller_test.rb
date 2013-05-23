require 'test_helper'

class DutyStationsControllerTest < ActionController::TestCase
  setup do
    @duty_station = duty_stations(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:duty_stations)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create duty_station" do
    assert_difference('DutyStation.count') do
      post :create, duty_station: { name: @duty_station.name }
    end

    assert_redirected_to duty_station_path(assigns(:duty_station))
  end

  test "should show duty_station" do
    get :show, id: @duty_station
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @duty_station
    assert_response :success
  end

  test "should update duty_station" do
    put :update, id: @duty_station, duty_station: { name: @duty_station.name }
    assert_redirected_to duty_station_path(assigns(:duty_station))
  end

  test "should destroy duty_station" do
    assert_difference('DutyStation.count', -1) do
      delete :destroy, id: @duty_station
    end

    assert_redirected_to duty_stations_path
  end
end
