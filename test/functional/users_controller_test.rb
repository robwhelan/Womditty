require 'test_helper'

class UsersControllerTest < ActionController::TestCase
  setup do
    @user = users(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:users)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create user" do
    assert_difference('User.count') do
      post :create, user: { duty_station: @user.duty_station, firstname: @user.firstname, has_kids: @user.has_kids, invited_by_user_id: @user.invited_by_user_id, lastname: @user.lastname, member_rank: @user.member_rank, number_of_invites: @user.number_of_invites, profile_image_url: @user.profile_image_url, role: @user.role }
    end

    assert_redirected_to user_path(assigns(:user))
  end

  test "should show user" do
    get :show, id: @user
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @user
    assert_response :success
  end

  test "should update user" do
    put :update, id: @user, user: { duty_station: @user.duty_station, firstname: @user.firstname, has_kids: @user.has_kids, invited_by_user_id: @user.invited_by_user_id, lastname: @user.lastname, member_rank: @user.member_rank, number_of_invites: @user.number_of_invites, profile_image_url: @user.profile_image_url, role: @user.role }
    assert_redirected_to user_path(assigns(:user))
  end

  test "should destroy user" do
    assert_difference('User.count', -1) do
      delete :destroy, id: @user
    end

    assert_redirected_to users_path
  end
end
