require 'test_helper'

class WaitListsControllerTest < ActionController::TestCase
  setup do
    @wait_list = wait_lists(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:wait_lists)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create wait_list" do
    assert_difference('WaitList.count') do
      post :create, wait_list: { email: @wait_list.email }
    end

    assert_redirected_to wait_list_path(assigns(:wait_list))
  end

  test "should show wait_list" do
    get :show, id: @wait_list
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @wait_list
    assert_response :success
  end

  test "should update wait_list" do
    put :update, id: @wait_list, wait_list: { email: @wait_list.email }
    assert_redirected_to wait_list_path(assigns(:wait_list))
  end

  test "should destroy wait_list" do
    assert_difference('WaitList.count', -1) do
      delete :destroy, id: @wait_list
    end

    assert_redirected_to wait_lists_path
  end
end
